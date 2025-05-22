
// سرویس ورکر اصلی - بهینه‌سازی شده با ساختار ماژولار

importScripts('./service-worker/config.js');
importScripts('./service-worker/utils.js');
importScripts('./service-worker/cache-core.js');
importScripts('./service-worker/event-handlers.js');

// راه‌اندازی تمام هندلرهای رویدادها
registerEventHandlers();

console.log('[Service Worker] نسخه ماژولار راه‌اندازی شد');
