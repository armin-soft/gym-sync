
// سیستم لاگ سرویس ورکر

let version = 'v1.9.3';

// راه‌اندازی لاگر با نسخه
export function initLogger(appVersion) {
  version = appVersion || 'v1.9.3';
}

// لاگ اطلاعات
export function info(message) {
  console.log(`[Service Worker ${version}] ${message}`);
}

// لاگ خطاها
export function error(message, err) {
  console.error(`[Service Worker ${version}] ${message}`, err);
}

// لاگ دیباگ
export function debug(message) {
  if (isDebugMode()) {
    console.debug(`[Service Worker ${version}] ${message}`);
  }
}

// بررسی حالت دیباگ
function isDebugMode() {
  // @ts-ignore
  return self.location.search.includes('debug=true');
}
