
/**
 * سرویس تشخیص وضعیت شبکه کاربر
 */

// نوع وضعیت اتصال برای استفاده در سراسر برنامه
export type NetworkStatus = 'online' | 'offline' | 'unknown';

// رابط توابع callback برای تغییرات وضعیت شبکه
export interface NetworkStatusChangeCallback {
  (status: NetworkStatus): void;
}

// کلاس مدیریت وضعیت شبکه
export class NetworkStatusService {
  private static instance: NetworkStatusService;
  private status: NetworkStatus = 'unknown';
  private listeners: NetworkStatusChangeCallback[] = [];
  private initialized = false;

  // الگوی Singleton برای داشتن تنها یک نمونه
  public static getInstance(): NetworkStatusService {
    if (!this.instance) {
      this.instance = new NetworkStatusService();
    }
    return this.instance;
  }

  private constructor() {
    this.initialize();
  }

  // راه‌اندازی سرویس و اتصال به رویدادهای مرورگر
  private initialize(): void {
    if (this.initialized || typeof window === 'undefined') return;

    // تنظیم وضعیت اولیه
    this.status = navigator.onLine ? 'online' : 'offline';

    // اتصال به رویدادهای تغییر وضعیت شبکه
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // افزودن تشخیص پیشرفته با استفاده از Fetch API
    this.setupPeriodicCheck();

    this.initialized = true;
  }

  // رسیدگی به رویداد آنلاین شدن
  private handleOnline = () => {
    this.updateStatus('online');
    console.log('وضعیت شبکه: آنلاین');
  };

  // رسیدگی به رویداد آفلاین شدن
  private handleOffline = () => {
    this.updateStatus('offline');
    console.log('وضعیت شبکه: آفلاین');
  };

  // بررسی دوره‌ای اتصال واقعی با ارسال درخواست به سرور
  private setupPeriodicCheck(): void {
    // بررسی فعال هر یک دقیقه
    setInterval(async () => {
      try {
        const response = await fetch('/ping.txt', {
          method: 'HEAD',
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });
        
        if (response.ok && this.status !== 'online') {
          this.updateStatus('online');
        }
      } catch (error) {
        if (this.status !== 'offline') {
          this.updateStatus('offline');
        }
      }
    }, 60000);
  }

  // به‌روزرسانی وضعیت و اطلاع به شنوندگان
  private updateStatus(newStatus: NetworkStatus): void {
    if (this.status !== newStatus) {
      this.status = newStatus;
      this.notifyListeners();
    }
  }

  // اطلاع به تمام شنوندگان در مورد تغییر وضعیت
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.status));
  }

  // وضعیت فعلی شبکه
  public getStatus(): NetworkStatus {
    return this.status;
  }

  // بررسی آنلاین بودن
  public isOnline(): boolean {
    return this.status === 'online';
  }

  // بررسی آفلاین بودن
  public isOffline(): boolean {
    return this.status === 'offline';
  }

  // افزودن یک شنونده برای تغییرات وضعیت
  public addListener(callback: NetworkStatusChangeCallback): () => void {
    this.listeners.push(callback);
    
    // فراخوانی اولیه با وضعیت فعلی
    callback(this.status);
    
    // بازگرداندن تابع حذف شنونده
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // پاکسازی منابع
  public cleanup(): void {
    if (!this.initialized) return;
    
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    this.listeners = [];
    this.initialized = false;
  }

  // بررسی فوری وضعیت شبکه
  public async checkConnection(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('/ping.txt', {
        method: 'HEAD',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const isOnline = response.ok;
      this.updateStatus(isOnline ? 'online' : 'offline');
      return isOnline;
    } catch (error) {
      this.updateStatus('offline');
      return false;
    }
  }
}

// صادر کردن یک نمونه singleton
export const networkStatus = NetworkStatusService.getInstance();
