import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { getAppVersion } from '@/utils/service-worker/helpers';

const ServiceWorkerTestPage = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [swRegistered, setSwRegistered] = useState<boolean>(false);
  const [swController, setSwController] = useState<boolean>(false);
  const [swVersion, setSwVersion] = useState<string>('نامشخص');
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);
  const [cacheItems, setCacheItems] = useState<number>(0);
  
  // Setup event listeners for online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(true);
      toast({
        title: "اتصال برقرار شد",
        description: "شما مجدداً به اینترنت متصل شدید.",
        variant: "default"
      });
    };

    const handleOfflineStatus = () => {
      setIsOnline(false);
      toast({
        title: "حالت آفلاین",
        description: "شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.",
        variant: "warning"
      });
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, []);

  // Check service worker status
  useEffect(() => {
    const checkServiceWorker = async () => {
      try {
        // App version
        const version = getAppVersion();
        setSwVersion(version);
        
        // Check if service worker is registered
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.getRegistration();
          setSwRegistered(registration !== undefined);
          setSwController(navigator.serviceWorker.controller !== null);
          
          // Listen for messages from service worker
          navigator.serviceWorker.addEventListener('message', (event) => {
            console.log('Message from service worker:', event.data);
            if (event.data.type === 'SW_VERSION') {
              setSwVersion(event.data.version);
            }
          });
        }

        // Check caches
        if ('caches' in window) {
          const keys = await caches.keys();
          setCacheKeys(keys);
          
          // Count cached items
          let totalItems = 0;
          for (const key of keys) {
            const cache = await caches.open(key);
            const requests = await cache.keys();
            totalItems += requests.length;
          }
          setCacheItems(totalItems);
        }
      } catch (error) {
        console.error('Error checking service worker:', error);
      }
    };

    checkServiceWorker();
  }, []);

  const refreshServiceWorkerStatus = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        setSwRegistered(registration !== undefined);
        setSwController(navigator.serviceWorker.controller !== null);
        
        if (registration) {
          toast({
            title: "بررسی سرویس ورکر",
            description: "وضعتیت سرویس ورکر بروزرسانی شد.",
            variant: "default"
          });
        }
      }

      // Refresh caches info
      if ('caches' in window) {
        const keys = await caches.keys();
        setCacheKeys(keys);
        
        let totalItems = 0;
        for (const key of keys) {
          const cache = await caches.open(key);
          const requests = await cache.keys();
          totalItems += requests.length;
        }
        setCacheItems(totalItems);
      }
    } catch (error) {
      console.error('Error refreshing service worker status:', error);
    }
  };

  const clearAllCaches = async () => {
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
        setCacheKeys([]);
        setCacheItems(0);
        toast({
          title: "پاکسازی کش",
          description: "تمام کش‌های برنامه با موفقیت پاکسازی شدند.",
          variant: "success"
        });
      }
    } catch (error) {
      console.error('Error clearing caches:', error);
      toast({
        title: "خطا",
        description: "پاکسازی کش با مشکل مواجه شد.",
        variant: "destructive"
      });
    }
  };

  const updateServiceWorker = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SKIP_WAITING'
      });
      
      toast({
        title: "بروزرسانی",
        description: "درخواست بروزرسانی سرویس ورکر ارسال شد.",
        variant: "default"
      });
    }
  };

  const refreshCache = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'REFRESH_CACHE'
      });
      
      toast({
        title: "بروزرسانی کش",
        description: "درخواست بروزرسانی کش ارسال شد.",
        variant: "default"
      });
    }
  };

  const simulateOffline = () => {
    // This doesn't actually turn off the network, just simulates the event
    window.dispatchEvent(new Event('offline'));
  };

  const simulateOnline = () => {
    // This doesn't actually turn on the network, just simulates the event
    window.dispatchEvent(new Event('online'));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ابزار تست سرویس ورکر و حالت آفلاین</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>وضعیت اتصال و سرویس ورکر</CardTitle>
            <CardDescription>اطلاعات وضعیت فعلی سیستم</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <span>وضعیت اتصال:</span>
              <Badge variant={isOnline ? "default" : "destructive"}>
                {isOnline ? "آنلاین" : "آفلاین"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span>سرویس ورکر نصب شده:</span>
              <Badge variant={swRegistered ? "default" : "destructive"}>
                {swRegistered ? "فعال" : "غیرفعال"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span>کنترل صفحه توسط سرویس ورکر:</span>
              <Badge variant={swController ? "default" : "destructive"}>
                {swController ? "فعال" : "غیرفعال"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span>نسخه برنامه:</span>
              <Badge variant="outline">{swVersion}</Badge>
            </div>

            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">کش‌های موجود:</h3>
              <div className="bg-gray-50 p-3 rounded-md text-sm">
                {cacheKeys.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {cacheKeys.map((key, index) => (
                      <li key={index}>{key}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">هیچ کشی یافت نشد</p>
                )}
              </div>
              <p className="mt-2 text-sm">تعداد آیتم‌های کش شده: {cacheItems}</p>
            </div>
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>عملیات‌های تست</CardTitle>
            <CardDescription>آزمایش قابلیت‌های آفلاین و سرویس ورکر</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium">تست وضعیت اتصال</h3>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button onClick={simulateOffline} variant="destructive">شبیه‌سازی حالت آفلاین</Button>
                <Button onClick={simulateOnline} variant="secondary">شبیه‌سازی حالت آنلاین</Button>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col space-y-2">
              <h3 className="font-medium">مدیریت سرویس ورکر</h3>
              <div className="flex flex-wrap gap-2">
                <Button onClick={refreshServiceWorkerStatus}>بررسی وضعیت</Button>
                <Button onClick={updateServiceWorker}>بروزرسانی سرویس ورکر</Button>
                <Button onClick={clearAllCaches} variant="destructive">حذف تمام کش‌ها</Button>
                <Button onClick={refreshCache}>بروزرسانی کش</Button>
              </div>
            </div>

            <Alert className="mt-4">
              <AlertTitle>راهنمای تست آفلاین</AlertTitle>
              <AlertDescription>
                <p className="mb-2">برای تست واقعی حالت آفلاین، می‌توانید:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>از بخش DevTools مرورگر، قسمت Network، گزینه "Offline" را فعال کنید.</li>
                  <li>اتصال اینترنت دستگاه خود را قطع کنید.</li>
                  <li>در حالت آفلاین، صفحه را رفرش کنید تا محتوای کش شده را ببینید.</li>
                </ol>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceWorkerTestPage;
