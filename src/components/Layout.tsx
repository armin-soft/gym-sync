
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background persian-numbers">
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
            <h1 className="mr-4 text-lg font-semibold">باشگاه بدنسازی فیکس</h1>
          </div>
        </header>
        
        <main className="flex-1">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
