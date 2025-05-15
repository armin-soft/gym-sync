
// Service Worker logging utility
// Provides consistent log formatting and level-based filtering

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

// Current log level - can be changed at runtime
let currentLogLevel = LOG_LEVELS.INFO;

// Main logging functions with consistent formatting
export function debug(message, data) {
  if (currentLogLevel <= LOG_LEVELS.DEBUG) {
    console.log(`[Service Worker][DEBUG] ${message}`, data || '');
  }
}

export function info(message, data) {
  if (currentLogLevel <= LOG_LEVELS.INFO) {
    console.log(`[Service Worker] ${message}`, data || '');
  }
}

export function warn(message, data) {
  if (currentLogLevel <= LOG_LEVELS.WARN) {
    console.warn(`[Service Worker][WARN] ${message}`, data || '');
  }
}

export function error(message, error) {
  if (currentLogLevel <= LOG_LEVELS.ERROR) {
    console.error(`[Service Worker][ERROR] ${message}`, error || '');
  }
}

// Set log level
export function setLogLevel(level) {
  if (LOG_LEVELS[level] !== undefined) {
    currentLogLevel = LOG_LEVELS[level];
    info(`Log level set to ${level}`);
  }
}

// Initialize with version info
export function initLogger(version) {
  info(`Initializing service worker v${version || '1.0.0'}`);
}
