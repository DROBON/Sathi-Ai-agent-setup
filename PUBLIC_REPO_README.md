🌟 Sathi AI (সাথী AI) — Multi-Language Setup & Installation Guide
Welcome to the public setup, installation, and publication directives for Sathi AI (সাথী AI), a state-of-the-art personal assistant application designed for browsers and mobile devices.

This repository serves as a Setup and Documentation Guide for developers, customers, and contributors. The core source code is kept Strictly Private to protect your intellectual property, branding, and proprietary local offline optimizations.

Select your preferred language below to view the setup, Docker configuration, Android compilation, and security guidelines:

🌐 Select Your Language (ভাষা নির্বাচন করুন)
🇧🇩 Bengali / বাংলা
🇺🇸 English / ইংরেজি
🇪🇸 Spanish / Español
🇸🇦 Arabic / العربية
🇮🇳 Hindi / हिन्दी
🇫🇷 French / Français
🇧🇩 Bangla / বাংলা
১. বাংলা সেটআপ নির্দেশিকা দেখতে এখানে ক্লিক করুন (Click to expand)
📋 সূচিপত্র
মূল টেকনোলজি
লোকাল কম্পিউটারে রান
ডকার কন্টেইনারাইজেশন
অ্যান্ড্রয়েড অ্যাপ বিল্ড
ব্যবহারকারী এপিআই কী
🚀 মূল টেকনোলজি
মাল্টি-মডেল সাপোর্ট: Gemini, OpenAI-এর ChatGPT এবং DeepSeek-এর চমৎকার সংযোগ।
অফলাইন হাইব্রিড ক্যাশ: লোকাল ডিভাইসে দ্রুত গতিতে আগের জিজ্ঞাসিত উত্তর প্রসেস করার সাবলীল সুবিধা।
ডবল-লেয়ার সিকিউরিটি: এপিআই কী ও চ্যাট হিস্ট্রি সরাসরি লোকাল ব্রাউজারের এনক্রিপ্টেড ডাটাবেজে সংরক্ষণ।
💻 লোকাল কম্পিউটারে রান
আপনি যদি মেইন ডেভেলপার হয়ে থাকেন তবে প্রজেক্টটি লোকালি রান করতে নিচের ধাপগুলো অনুসরণ করুন:

১. সিস্টেম ডিপেন্ডেন্সি ইনস্টলেশন
ডিরেক্টরি ওপেন করে রান করুন:

npm install
২. এনভায়রনমেন্ট ফাইল সেটআপ
.env.example ফাইলকে কপি করে .env তৈরি করুন এবং আপনার এপিআই কী লিখে দিন:

GEMINI_API_KEY="আপনার_জেমিনি_কী"
OPENAI_API_KEY="আপনার_ওপেনএআই_কী"
DEEPSEEK_API_KEY="আপনার_ডিপসিক_কী"
৩. সার্ভার বুট করুন
npm run dev
সার্ভার চালু হলে ব্রাউজারে http://localhost:3000 লিংকে চলে যান।

🐳 ডকার কন্টেইনারাইজেশন
ডকার ব্যবহার করে সম্পূর্ণ আইসোলেটেড এনভায়রনমেন্টে রান করার নিয়ম:

১. ডকার কম্পোজ প্রোডাকশন বুট
docker-compose up --build -d
২. আলাদা ইমেজ তৈরি করে রান করা
docker build -t sathi-ai-app .
docker run --env-file .env -p 3000:3000 -d sathi-ai-app
📱 অ্যান্ড্রয়েড অ্যাপ বিল্ড
ক্যাপাসিটর ফ্লামওয়ার্ক দিয়ে সহজেই ফোনের জন্য বিল্ড করতে ব্যবহার করুন:

ক) সরাসরি ফোনে ইন্সটল করার জন্য রিলিজ APK ফাইল বিল্ড:
npm run android:build-apk
ফাইল লোকেশন: ./android/app/build/outputs/apk/release/app-release-unsigned.apk

খ) গুগল প্লে-স্টোরে সাবমিট করার মত রিলিজ বান্ডেল (.aab) বিল্ড:
npm run android:build-bundle
🔑 ব্যবহারকারী এপিআই কী
সাথী AI এর সিকিউরিটি এবং সার্ভার বিল মেইনটেইন করার জন্য এটি সম্পূর্ণ Multi-Key Client Capable।

ইউজাররা অ্যাপের উপরের ডানের Settings (🔑) ক্লিক করে তাদের ব্যক্তিগত এপিআই কী যুক্ত করতে পারবেন।
আপনার কী সমূহ ব্রাউজারের অত্যন্ত সুরক্ষিত ভল্টে এনক্রিপ্টেড উপায়ে সঞ্চিত থাকে।
আমাদের সেন্ট্রাল সার্ভার ব্যবহার করার পরিবর্তে আপনার মেসেজগুলোর প্রসেসিং ক্লায়েন্ট-এন্ড থেকেই সম্পূর্ণ ফ্রিতে পরিচালিত হবে!
🇺🇸 English
2. Click here to read the English Setup Guide
🇪🇸 Spanish / Español
3. Haga clic para leer la guía de instalación en Español
🇸🇦 Arabic / العربية
4. اضغط هنا لقراءة دليل الإعداد والتثبيت باللغة العربية
🇮🇳 Hindi / हिन्दी
5. हिंदी स्थापना और कॉन्फ़िगरेशन गाइड पढ़ने के लिए यहां क्लिक करें
🇫🇷 French / Français
6. Cliquez ici pour lire le guide de configuration en Français
💡 For any technical cooperation or specialized modifications, feel free to submit a request directly through the official repository contact channel.