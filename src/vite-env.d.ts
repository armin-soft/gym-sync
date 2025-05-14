
/// <reference types="vite/client" />

// Allow importing JSON files
declare module "*.json" {
  const value: any;
  export default value;
}

// Service Worker types
interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Promise<Response> | Response): void;
}

interface ExtendableMessageEvent extends ExtendableEvent {
  data: any;
  source: Client | ServiceWorker | MessagePort | null;
}

interface ServiceWorkerGlobalScope {
  __WB_MANIFEST: Array<{
    url: string;
    revision: string | null;
  }>;
  skipWaiting(): Promise<void>;
  clients: Clients;
  registration: ServiceWorkerRegistration;
  caches: CacheStorage;
  location: Location;
  addEventListener(type: string, callback: EventListenerOrEventListenerObject): void;
}

// Define 'self' for service worker scripts
declare const self: ServiceWorkerGlobalScope;

// Define toast variants to be consistent across the app
type ToastVariant = "default" | "destructive" | "success" | "warning";

// Extended window interface to include service worker registration
interface Window {
  showToast?: (options: {
    title: string;
    description: string;
    variant?: ToastVariant;
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
  }) => void;
  swRegistration?: ServiceWorkerRegistration;
}
