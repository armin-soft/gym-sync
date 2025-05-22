
// سرویس ورکر اصلی - بهینه‌سازی شده با ساختار ماژولار
// تنها نقطه ورودی سرویس ورکر

// بارگذاری ماژول‌های لازم
importScripts('./src/service-worker/utils/logger.js');
importScripts('./src/service-worker/config.js');
importScripts('./src/service-worker/utils.js');
importScripts('./src/service-worker/cache-core.js');
importScripts('./src/service-worker/event-handlers.js');
importScripts('./src/service-worker/index.js');

// راه‌اندازی تمام هندلرهای رویدادها
registerEventHandlers();

console.log('[Service Worker] نسخه ماژولار راه‌اندازی شد');
