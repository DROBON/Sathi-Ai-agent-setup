# Node Dockerfile for Sathi AI (React + Express)
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency configs
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the production assets and server bundle
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine AS runtime

WORKDIR /app

# Copy production package.json and built outputs
COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

# Create base environment configuration
COPY .env.example .env

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start"]