
// نقطه ورودی سرویس ورکر
import { registerEventHandlers } from './event-handlers.js';
import './config.js';
import './utils.js';
import './cache-core.js';

console.log('[Service Worker] راه‌اندازی نسخه ماژولار');

// راه‌اندازی تمام هندلرهای رویداد
registerEventHandlers();
