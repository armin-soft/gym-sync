
import {
  LayoutDashboard,
  User2,
  Users,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  Database,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SidebarContainer } from "./sidebar/SidebarContainer";
import { SidebarContent } from "./sidebar/SidebarContent";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems = [
  {
    title: "داشبورد",
    description: "نمای کلی باشگاه و آمار",
    href: "/Management",
    icon: LayoutDashboard,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "پروفایل مربی",
    description: "مدیریت اطلاعات شخصی",
    href: "/Management/Coach-Profile",
    icon: User2,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "شاگردان",
    description: "مدیریت ورزشکاران",
    href: "/Management/Students",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "حرکات تمرینی",
    description: "مدیریت حرکات و تمرینات",
    href: "/Management/Exercise-Movements",
    icon: Dumbbell,
    gradient: "from-orange-500 to-amber-600",
  },
  {
    title: "برنامه های غذایی",
    description: "مدیریت رژیم غذایی",
    href: "/Management/Diet-Plan",
    icon: UtensilsCrossed,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    title: "مکمل و ویتامین",
    description: "مدیریت مکمل‌های ورزشی",
    href: "/Management/Supplements-Vitamins",
    icon: Pill,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "پشتیبان‌گیری و بازیابی",
    description: "مدیریت داده‌ها",
    href: "/Management/Backup-Restore",
    icon: Database,
    gradient: "from-slate-500 to-gray-600",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [gymName, setGymName] = useState("");
  const [trainerProfile, setTrainerProfile] = useState({
    name: "مربی",
    image: "",
    phone: ""
  });
  
  const loadProfile = () => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setTrainerProfile({
          name: profile.name || "مربی",
          image: profile.image || "",
          phone: profile.phone || ""
        });
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
      } catch (error) {
        console.error('Error loading profile from localStorage:', error);
      }
    }
  };
  
  useEffect(() => {
    loadProfile();
    
    const handleStorageChange = () => {
      loadProfile();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return (
    <SidebarContainer isOpen={isOpen} onClose={onClose}>
      <SidebarContent
        trainerProfile={trainerProfile}
        gymName={gymName}
        sidebarItems={sidebarItems}
        onClose={onClose}
      />
    </SidebarContainer>
  );
}
