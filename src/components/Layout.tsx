
import { useState, Suspense } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, Weight } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";

const LoadingFallback = () => (
  <div className="flex h-[50vh] items-center justify-center">
    <div className="text-center space-y-4">
      <Spinner size="lg" className="mx-auto" />
      <p className="text-muted-foreground animate-pulse">در حال بارگذاری...</p>
    </div>
  </div>
);

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background persian-numbers" dir="rtl">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mr-2 rounded-md p-2 hover:bg-accent"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <Weight className={cn(
                "h-6 w-6",
                "text-primary animate-pulse"
              )} />
              <h1 className="text-lg font-semibold">مدیریت برنامه تمرینی فیکس</h1>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          <div className="container py-6">
            <Suspense fallback={<LoadingFallback />}>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
