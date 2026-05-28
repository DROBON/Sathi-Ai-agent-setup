import { spawn } from "child_process";
import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { authMiddleware } from "./server/middleware/auth";
import { createServer } from "http";
import { Server } from "socket.io";

// Routes
import threadRouter from "./server/routes/threads";
import runRouter from "./server/routes/runs";
import uploadRouter from "./server/routes/uploads";
import snippetRouter from "./server/routes/snippets";
import skillRouter from "./server/routes/skills";
import statelessRunsRouter from "./server/routes/statelessRuns";
import modelsRouter from "./server/routes/models";
import memoryRouter from "./server/routes/memory";
import mcpRouter from "./server/routes/mcp";
import channelsRouter from "./server/routes/channels";
import authRouter from "./server/routes/auth";
import assistantsRouter from "./server/routes/assistants";
import artifactsRouter from "./server/routes/artifacts";
import suggestionsRouter from "./server/routes/suggestions";
import securityRouter from "./server/routes/security";
import evolutionRouter from "./server/routes/evolution";
// import chatRouter from "./server/routes/chat";

async function startServer() {
  // Start Python FastAPI Backend with self-healing cascading fallback
  const spawnAttempts = [
    { cmd: "uv", args: ["run", "uvicorn", "backend.sathiai.main:app", "--host", "127.0.0.1", "--port", "8000"] },
    { cmd: "python3", args: ["-m", "uvicorn", "backend.sathiai.main:app", "--host", "127.0.0.1", "--port", "8000"] },
    { cmd: "python", args: ["-m", "uvicorn", "backend.sathiai.main:app", "--host", "127.0.0.1", "--port", "8000"] },
    { cmd: "backend/.venv/bin/uvicorn", args: ["backend.sathiai.main:app", "--host", "127.0.0.1", "--port", "8000"] },
    { cmd: ".venv/bin/uvicorn", args: ["backend.sathiai.main:app", "--host", "127.0.0.1", "--port", "8000"] },
    { cmd: "uvicorn", args: ["backend.sathiai.main:app", "--host", "127.0.0.1", "--port", "8000"] }
  ];

  let currentAttempt = 0;
  let pythonBackendProcess: any = null;

  function trySpawnPythonBackend() {
    if (currentAttempt >= spawnAttempts.length) {
      console.error("CRITICAL ERROR: Failed to start Sathi Python Engine with all execution fallbacks.");
      return;
    }

    const { cmd, args } = spawnAttempts[currentAttempt];
    console.log(`[Python Startup Opt ${currentAttempt + 1}/${spawnAttempts.length}] Spawning: ${cmd} ${args.join(" ")}`);

    pythonBackendProcess = spawn(cmd, args, {
      stdio: "inherit"
    });

    pythonBackendProcess.on("error", (err: any) => {
      if (err.code === "ENOENT") {
        console.warn(`[Python Startup] ${cmd} not found (ENOENT). Retrying next fallback...`);
        currentAttempt++;
        trySpawnPythonBackend();
      } else {
        console.error(`[Python Startup] Process for ${cmd} encountered an unexpected error:`, err);
      }
    });

    pythonBackendProcess.on("exit", (code: number, signal: string) => {
      if (code !== 0 && code !== null) {
        console.warn(`[Python Startup] Process ${cmd} exited with error code ${code} (signal: ${signal}).`);
      } else {
        console.log(`[Python Startup] Process ${cmd} exited normally.`);
      }
    });
  }

  trySpawnPythonBackend();

  const app = express();
  const PORT = 3000;

  // Create HTTP server
  const httpServer = createServer(app);

  // Initialize Socket.io
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Socket.io Logic
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_thread", (threadId) => {
      socket.join(threadId);
      console.log(`User ${socket.id} joined thread: ${threadId}`);
    });

    socket.on("new_message", (data) => {
      // Broadcast to other devices/users in the same thread
      socket.to(data.thread_id).emit("message_received", data);
    });

    socket.on("mission_update", (data) => {
      // Broadcast mission updates to all connected consoles
      io.emit("mission_status", data);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // Trust proxy for services like Cloud Run/Nginx
  app.set("trust proxy", 1);

  if (!process.env.GEMINI_API_KEY) {
    console.warn("WARNING: GEMINI_API_KEY is not defined.");
  } else {
    console.log("GEMINI_API_KEY is found.");
  }

  // Setup data directory
  const DATA_DIR = path.join(process.cwd(), "data");
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  // Security Middlewares
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "https:", "http:"],
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        "frame-ancestors": ["'self'", "https://*.google.com", "https://*.googleusercontent.com", "https://*.studio.google", "https://*.studio.google.com"],
      },
    },
    crossOriginEmbedderPolicy: false,
    xFrameOptions: false, // Disable X-Frame-Options to allow embedding in AI Studio
  }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2000, // Increased limit to prevent "Failed to fetch" on rapid client requests
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false }, // Handled by app.set('trust proxy', 1)
    message: { error: "Too many requests, please try again later." }
  });

  app.use("/api/", limiter);
  app.use(express.json({ limit: '10mb' })); // Limit input size
  app.use(cookieParser());
  app.use(authMiddleware);

  // Mount API Routes
  app.use("/api/threads", threadRouter);
  app.use("/api/threads/:thread_id/runs", runRouter);
  app.use("/api/threads/:thread_id/uploads", uploadRouter);
  app.use("/api/threads/:thread_id/snippets", snippetRouter);
  app.use("/api/skills", skillRouter);
  app.use("/api/runs", statelessRunsRouter);
  app.use("/api/models", modelsRouter);
  app.use("/api/memory", memoryRouter);
  app.use("/api/mcp", mcpRouter);
  app.use("/api/channels", channelsRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/assistants", assistantsRouter);
  app.use("/api", artifactsRouter);
  app.use("/api", suggestionsRouter);
  app.use("/api", securityRouter);
  app.use("/api/evolution", evolutionRouter);
  // app.use("/api/chat", chatRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();