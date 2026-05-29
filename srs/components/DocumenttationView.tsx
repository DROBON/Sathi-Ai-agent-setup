import React, { useState } from 'react';
import { Book, ChevronRight, Download, Zap, Heart, Cpu, Settings, Shield, Wrench, Sparkles, Terminal, Users, Globe, Code, FileText, CheckCircle, Search, FileArchive, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const meta = {
  index: { title: "Install", icon: Download },
  "quick-start": { title: "Quick Start", icon: Zap },
  "design-principles": { title: "Design Principles", icon: Heart },
  "lead-agent": { title: "Lead Agent", icon: Cpu },
  "middlewares": { title: "Middlewares", icon: Settings },
  "configuration": { title: "Configuration", icon: Shield },
  "memory": { title: "Memory", icon: Sparkles },
  "tools": { title: "Tools", icon: Wrench },
  "skills": { title: "Skills", icon: Code },
  "sandbox": { title: "Sandbox", icon: Terminal },
  "subagents": { title: "Subagents", icon: Users },
  "cyber-security": { title: "Cyber Security Agents", icon: Shield },
  "mcp": { title: "MCP Integration", icon: Globe },
};

const metaItems = [
  { id: 'index', title: "Install", icon: Download, description: 'ডিরফ্লো সিস্টেম ইনস্টলেশন এবং ডিপ্লয়মেন্ট নির্দেশিকা।' },
  { id: 'quick-start', title: "Quick Start", icon: Zap, description: 'সাথী ডিরফ্লোর সাথে দ্রুত শুরু করার সহজ ধাপসমূহ।' },
  { id: 'design-principles', title: "Design Principles", icon: Heart, description: 'আমাদের ডিজাইন ফিলোসফি এবং ইউজার এক্সপেরিয়েন্স গাইড।' },
  { id: 'lead-agent', title: "Lead Agent", icon: Cpu, description: 'মূল এজেন্টের কার্যপ্রণালী এবং কনফিগারেশন সংক্রান্ত তথ্য।' },
  { id: 'middlewares', title: "Middlewares", icon: Settings, description: 'সিস্টেমের মিডলওয়্যার এবং রিকোয়েস্ট প্রসেসিং লেয়ার।' },
  { id: 'configuration', title: "Configuration", icon: Shield, description: 'এনভায়রনমেন্ট ভেরিয়েবল এবং সিস্টেম সেটিংস কনফিগারেশন।' },
  { id: 'memory', title: "Memory", icon: Sparkles, description: 'এপিসোডিক এবং সেম্যান্টিক মেমোরি ম্যানেজমেন্ট সিস্টেম।' },
  { id: 'tools', title: "Tools", icon: Wrench, description: 'সিস্টেম টুলস এবং এক্সটারনাল এপিআই ইন্টিগ্রেশন প্রোটোকল।' },
  { id: 'skills', title: "Skills", icon: Code, description: 'স্পেশালাইজড স্কিল এবং পার্সোনা বিল্ডিং মেকানিজম।' },
  { id: 'sandbox', title: "Sandbox", icon: Terminal, description: 'কোড এক্সিকিউশন এবং স্যান্ডবক্স এনভায়রনমেন্ট গাইড।' },
  { id: 'subagents', title: "Subagents", icon: Users, description: 'মাল্টি-এজেন্ট কোলাবরেশন এবং সাব-এজেন্ট ম্যানেজমেন্ট।' },
  { id: 'cyber-security', title: "Cyber Security Agents", icon: Shield, description: 'সেন্টিনেল, স্কাউট এবং গার্ডিয়ান সাব-এজেন্টদের ব্যবহার বিধি।' },
  { id: 'mcp', title: "MCP Integration", icon: Globe, description: 'মডেল কনটেক্সট প্রোটোকল ইন্টিগ্রেশন এবং ইউজ কেস।' },
  { id: 'customization', title: "Customization", icon: FileText, description: 'সিস্টেমকে আপনার প্রয়োজন অনুযায়ী কাস্টমাইজ করার উপায়।' },
  { id: 'integration-guide', title: "Integration Guide", icon: CheckCircle, description: 'অন্যান্য অ্যাপ্লিকেশনের সাথে ইন্টিগ্রেশন করার পূর্ণাঙ্গ গাইড।' },
];

export const DocumentationView: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50/30">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-indigo-600 flex items-center gap-3">
          <Book className="w-8 h-8" /> নলেজ বেস ও ডকুমেন্টেশন
        </h2>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-black ml-11">Sathi AI Documentation & Guides</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metaItems.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setActiveDoc(item.id)}
            className="group text-left bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-6 shadow-inner relative z-10">
              <item.icon className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-2 relative z-10">{item.title}</h3>
            <p className="text-sm text-gray-400 font-medium leading-relaxed relative z-10">{item.description}</p>

            <div className="mt-6 flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest relative z-10">
              <span>বিস্তারিত পড়ুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeDoc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-3xl bg-white border border-gray-100 shadow-2xl rounded-[3rem] p-12 relative overflow-y-auto max-h-[80vh]"
            >
              <button 
                onClick={() => setActiveDoc(null)}
                className="absolute top-8 right-8 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors font-black text-gray-400"
              >
                বন্ধ করুন
              </button>

              <div className="mb-10">
                <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Guides / {activeDoc}</p>
                <h2 className="text-4xl font-black text-gray-900">{metaItems.find(m => m.id === activeDoc)?.title}</h2>
              </div>

              <div className="prose prose-indigo max-w-none">
                {activeDoc === 'cyber-security' ? (
                  <div className="space-y-6">
                    <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 text-blue-900 font-medium mb-8">
                       সাথী AI এখন উন্নত সাইবার সিকিউরিটি সাব-এজেন্ট দ্বারা সজ্জিত। এগুলো স্যান্ডবক্স এনভায়রনমেন্টে (Docker) চলে এবং আপনার নির্দেশ অনুযায়ী কাজ করে।
                    </div>

                    <section>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-indigo-600" /> Sentinel (সেন্টিনেল)
                      </h3>
                      <p className="text-gray-600 mt-2">নেটওয়ার্ক স্ক্যানিং, পোর্ট অডিট এবং সিস্টেমের দুর্বলতা খুঁজে বের করতে এটি দক্ষ।</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Search className="w-5 h-5 text-indigo-600" /> Recon Pro (রিকনেস্যান্স প্রো)
                      </h3>
                      <p className="text-gray-600 mt-2">সাব-ডোমেইন এবং টেক-স্ট্যাক শনাক্তকরণের জন্য ডকার-ভিত্তিক সাব-এজেন্ট।</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-indigo-600" /> Web Vuln Scanner (ওয়েব স্ক্যানার)
                      </h3>
                      <p className="text-gray-600 mt-2">যেকোনো ওয়েবসাইটের লিঙ্ক দিলে এটি সেটির নিরাপত্তা ত্রুটি (XSS, SQLi, মিসকনফিগারেশন) চেক করে রিপোর্ট দিবে।</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-indigo-600" /> Injection Expert (ইনজেকশন এক্সপার্ট)
                      </h3>
                      <p className="text-gray-600 mt-2">SQLi এবং XSS পরীক্ষার জন্য হার্ডেন্ড স্যান্ডবক্স সাব-এজেন্ট।</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" /> Scout (স্কাউট)
                      </h3>
                      <p className="text-gray-600 mt-2">ডার্ক ওয়েব এবং পাবলিক ডাটাবেস থেকে থ্রেট ইন্টেলিজেন্স এবং ডাটা লিক মনিটর করে।</p>
                      <ul className="list-disc ml-5 text-sm text-gray-500 mt-2 italic">
                        <li>"চেক করো আমাদের অ্যাডমিন ইমেইল কোনো ডাটা লিক লিস্টে আছে কি না।"</li>
                        <li>"নতুন কোনো জিরো-ডে অ্যাটাক সম্পর্কে আপডেট দাও।"</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-indigo-600" /> Vision Analyst (ভিশন এনালিস্ট)
                      </h3>
                      <p className="text-gray-600 mt-2">ছবির টেক্সট পড়া (OCR) এবং বিষয়বস্তু বিশ্লেষণের জন্য সাব-এজেন্ট। এটি ছবির ভেতরের হিডেন ডাটা খুঁজে বের করে।</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <FileArchive className="w-5 h-5 text-indigo-600" /> Malware Buster (ম্যালওয়্যার বাস্টার)
                      </h3>
                      <p className="text-gray-600 mt-2">ফাইল ইন্টিগ্রিটি এবং ক্ষতিকারক কোড শনাক্তকরণের জন্য স্যান্ডবক্স সাব-এজেন্ট। এটি জিপ (ZIP) ফাইল এবং অন্যান্য ফাইল স্ক্যান করে।</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-indigo-600" /> Social Media Guardian (গার্ডিয়ান)
                      </h3>
                      <p className="text-gray-600 mt-2">সোশ্যাল মিডিয়ার লিঙ্ক এবং একাউন্ট সুরক্ষায় এটি পারদর্শী।</p>
                      <ul className="list-disc ml-5 text-sm text-gray-500 mt-2 italic">
                        <li>"হোয়াটসঅ্যাপে আসা এই লিঙ্কটি কি নিরাপদ? [LINK]"</li>
                        <li>"ফেসবুক প্রাইভেসি অডিট করতে সাহায্য করো।"</li>
                      </ul>
                    </section>
                  </div>
                ) : (
                  <>
                    <div className="p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100 text-indigo-900 font-medium mb-8">
                      এটি ডেমো কন্টেন্ট। {activeDoc} বিষয়ে বিস্তারিত ডকুমেন্টেশন এখানে প্রদর্শিত হবে।
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      সাথী ডিরফ্লো সিস্টেমটি এমনভাবে ডিজাইন করা হয়েছে যাতে এটি আপনার পার্সোনাল এবং প্রফেশনাল মেমোরি হিসেবে কাজ করতে পারে। এই সেকশনে আপনি পাবেন কিভাবে সিস্টেমটি অপ্টিমাইজ করতে হয় তার সঠিক দিকনির্দেশনা।
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};