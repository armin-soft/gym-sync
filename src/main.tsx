
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Spinner } from './components/ui/spinner'

// نمایش اسپینر قبل از بارگذاری کامل برنامه
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background">
    <Spinner size="lg" />
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container!);

// رندر کردن اسپینر اولیه و سپس جایگزینی با برنامه اصلی
root.render(<LoadingFallback />);

// تأخیر کوتاه برای نمایش اسپینر قبل از بارگذاری برنامه اصلی
setTimeout(() => {
  root.render(<App />);
}, 300);
