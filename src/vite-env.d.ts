
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

