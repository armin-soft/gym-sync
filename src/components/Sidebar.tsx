
import { X, LayoutDashboard, Users, Dumbbell, Utensils, Pills, FileText, Info, User } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "داشبورد", href: "/" },
    { icon: User, label: "پروفایل مربی", href: "/trainer" },
    { icon: Users, label: "شاگردان", href: "/students" },
    { icon: Dumbbell, label: "حرکات تمرینی", href: "/exercises" },
    { icon: Utensils, label: "برنامه غذایی", href: "/diet" },
    { icon: Pills, label: "مکمل‌ها", href: "/supplements" },
    { icon: FileText, label: "گزارشات", href: "/reports" },
    { icon: Info, label: "درباره ما", href: "/about" },
  ];

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-64 transform overflow-y-auto bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">منو</h2>
        <button onClick={onClose} className="rounded-md p-2 hover:bg-accent">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-8 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2 space-x-reverse rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <item.icon className="h-4 w-4 ml-2" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};
