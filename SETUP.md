# راهنمای راه‌اندازی پروژه احراز هویت

## مقدمه
این پروژه یک سیستم احراز هویت کامل با استفاده از Vue.js/Nuxt.js و Firebase است که شامل صفحات ورود، ثبت نام و داشبورد می‌باشد.

## فناوری‌های استفاده شده
- ✅ **Nuxt.js 3** - فریمورک Vue.js
- ✅ **Firebase Authentication** - سیستم احراز هویت
- ✅ **Vuex** - مدیریت state
- ✅ **Bootstrap 5** - طراحی UI
- ✅ **Bootstrap Icons** - آیکون‌ها
- ✅ **Vuelidate** - اعتبارسنجی فرم‌ها

## امکانات پیاده سازی شده

### صفحات
- 🏠 **صفحه اصلی**: نمایش پیام خوش‌آمدگویی و لینک‌های ورود/ثبت نام
- 🔐 **صفحه ورود**: ورود با ایمیل و رمز عبور
- 📝 **صفحه ثبت نام**: ثبت نام با ایمیل، رمز عبور و تکرار رمز عبور
- 📊 **داشبورد**: نمایش اطلاعات کاربر و امکانات مختلف

### ویژگی‌های امنیتی
- 🛡️ **محافظت از مسیرها**: عدم دسترسی به داشبورد قبل از ورود
- 🚫 **کنترل دسترسی**: عدم دسترسی به صفحه ورود پس از authentication
- ⏰ **خروج خودکار**: خروج خودکار پس از یک ساعت (قابل تنظیم)
- 💾 **حفظ وضعیت**: حفظ وضعیت ورود پس از refresh

### اعتبارسنجی
- ✉️ **بررسی فرمت ایمیل**
- 🔑 **حداقل طول رمز عبور** (6 کاراکتر)
- 🔄 **تطابق رمز عبور** در صفحه ثبت نام
- ⚠️ **نمایش پیام‌های خطا** به فارسی

## راه‌اندازی پروژه

### 1. تنظیم Firebase

1. به [Firebase Console](https://console.firebase.google.com) بروید
2. پروژه جدید ایجاد کنید
3. به بخش **Authentication** بروید
4. در تب **Sign-in method**، گزینه **Email/Password** را فعال کنید
5. از بخش **Project settings** اطلاعات پیکربندی را کپی کنید

### 2. تنظیم متغیرهای محیطی

فایل `.env` در ریشه پروژه ایجاد کرده و اطلاعات Firebase را وارد کنید:

\`\`\`env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
\`\`\`

### 3. نصب dependencies

\`\`\`bash
npm install
\`\`\`

### 4. اجرای پروژه

\`\`\`bash
npm run dev
\`\`\`

پروژه در آدرس `http://localhost:3000` در دسترس خواهد بود.

## ساختار پروژه

\`\`\`
frontend-test/
├── layouts/
│   └── default.vue          # لایه اصلی با header و logout
├── middleware/
│   ├── auth.ts             # محافظت از صفحات محرمانه
│   └── guest.ts            # هدایت کاربران وارد شده
├── pages/
│   ├── index.vue           # صفحه اصلی
│   ├── login.vue           # صفحه ورود
│   ├── register.vue        # صفحه ثبت نام
│   └── dashboard.vue       # داشبورد کاربر
├── plugins/
│   └── firebase.client.ts  # پیکربندی Firebase
├── stores/
│   └── auth.ts             # مدیریت state احراز هویت
└── nuxt.config.ts          # تنظیمات Nuxt
\`\`\`

## نحوه استفاده

### ثبت نام کاربر جدید
1. به `/register` بروید
2. ایمیل، رمز عبور و تکرار رمز عبور را وارد کنید
3. پس از ثبت نام موفق، به داشبورد هدایت می‌شوید

### ورود کاربر
1. به `/login` بروید
2. ایمیل و رمز عبور را وارد کنید
3. پس از ورود موفق، به داشبورد هدایت می‌شوید

### داشبورد
- نمایش ایمیل کاربر
- نمایش وضعیت حساب
- امکان به‌روزرسانی اطلاعات
- امکان خروج از حساب

## ویژگی‌های پیشرفته

### خروج خودکار
کاربر پس از یک ساعت به صورت خودکار از سیستم خارج می‌شود.

### مدیریت خطاها
پیام‌های خطای Firebase به فارسی ترجمه شده و به کاربر نمایش داده می‌شود.

### طراحی واکنش‌گرا (Responsive)
طراحی برای همه اندازه‌های صفحه بهینه‌سازی شده است.

## آشنایی با Webpack
Webpack ابزار قدرتمندی برای bundle کردن فایل‌های JavaScript، CSS و سایر assets است. در Nuxt.js 3:

- **میزان آشنایی**: متوسط تا پیشرفته
- **استفاده در پروژه**: Nuxt.js به صورت داخلی از Vite (جایگزین سریع‌تر Webpack) استفاده می‌کند
- **قابلیت‌ها**: 
  - بهینه‌سازی خودکار کد
  - Code splitting
  - Tree shaking
  - Hot Module Replacement (HMR)
  - Bundle analysis

## مشکلات احتمالی و راه حل

### خطای Firebase Configuration
اطمینان حاصل کنید که تمام متغیرهای محیطی صحیح تنظیم شده‌اند.

### خطای CORS
در تنظیمات Firebase، دامنه localhost را به لیست authorized domains اضافه کنید.

### مشکل در validation
اطمینان حاصل کنید که کتابخانه Vuelidate صحیح نصب شده است.

## نکات توسعه

- برای production، متغیرهای محیطی را در سرور تنظیم کنید
- قوانین امنیتی Firebase را برای production بهینه کنید  
- در صورت نیاز، قابلیت reset password اضافه کنید
- می‌توانید profile management و تغییر رمز عبور را اضافه کنید

## پشتیبانی
برای سوالات و مشکلات، به مستندات Firebase و Nuxt.js مراجعه کنید:
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Nuxt.js Documentation](https://nuxt.com/docs) 