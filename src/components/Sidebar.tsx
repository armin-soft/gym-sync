
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  User2,
  Users,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  Database,
} from "lucide-react";
import { ModernSidebar } from "./modern-sidebar/ModernSidebar";
import { SidebarItem, TrainerProfile, SidebarStats } from "./modern-sidebar/types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    title: "داشبورد مدیریت",
    subtitle: "نمای کلی و آمار جامع باشگاه",
    href: "/Management",
    icon: LayoutDashboard,
    gradient: "from-violet-500 to-purple-600",
    isNew: false,
  },
  {
    id: "coach-profile",
    title: "پروفایل مربی",
    subtitle: "مدیریت اطلاعات شخصی و حرفه‌ای",
    href: "/Management/Coach-Profile",
    icon: User2,
    gradient: "from-blue-500 to-cyan-600",
    isNew: false,
  },
  {
    id: "students",
    title: "مدیریت شاگردان",
    subtitle: "ثبت، ویرایش و پیگیری ورزشکاران",
    href: "/Management/Students",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
    badge: "فعال",
    badgeColor: "bg-emerald-500",
  },
  {
    id: "exercises",
    title: "حرکات تمرینی",
    subtitle: "مدیریت کتابخانه تمرینات ورزشی",
    href: "/Management/Exercise-Movements",
    icon: Dumbbell,
    gradient: "from-orange-500 to-amber-600",
    isNew: false,
  },
  {
    id: "diet",
    title: "برنامه‌های غذایی",
    subtitle: "طراحی و مدیریت رژیم‌های تغذیه‌ای",
    href: "/Management/Diet-Plan",
    icon: UtensilsCrossed,
    gradient: "from-rose-500 to-pink-600",
    isNew: false,
  },
  {
    id: "supplements",
    title: "مکمل و ویتامین",
    subtitle: "مدیریت مکمل‌های ورزشی و تغذیه‌ای",
    href: "/Management/Supplements-Vitamins",
    icon: Pill,
    gradient: "from-indigo-500 to-purple-600",
    isNew: false,
  },
  {
    id: "backup",
    title: "پشتیبان‌گیری داده‌ها",
    subtitle: "بکاپ و بازیابی اطلاعات سیستم",
    href: "/Management/Backup-Restore",
    icon: Database,
    gradient: "from-slate-500 to-gray-600",
    isNew: false,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile>({
    name: "مربی حرفه‌ای",
    phone: "",
    image: "",
    gymName: "",
    status: 'active',
    membersSince: "۱۴۰۲"
  });

  const [stats, setStats] = useState<SidebarStats>({
    totalStudents: 0,
    activePrograms: 0,
    completedSessions: 0,
    rating: 5
  });
  
  const loadProfile = () => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setTrainerProfile({
          name: profile.name || "مربی حرفه‌ای",
          phone: profile.phone || "",
          image: profile.image || "",
          gymName: profile.gymName || "",
          status: 'active',
          membersSince: "۱۴۰۲"
        });
      }
    } catch (error) {
      console.error('Error loading profile from localStorage:', error);
    }
  };

  const loadStats = () => {
    try {
      // Load students count
      const savedStudents = localStorage.getItem('students');
      let studentsCount = 0;
      if (savedStudents) {
        const students = JSON.parse(savedStudents);
        studentsCount = Array.isArray(students) ? students.length : 0;
      }

      // Load other stats (you can expand this based on your data)
      setStats({
        totalStudents: studentsCount,
        activePrograms: Math.max(1, Math.floor(studentsCount * 0.8)), // 80% of students have active programs
        completedSessions: studentsCount * 12, // Average 12 sessions per student
        rating: 5 // Perfect rating
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };
  
  useEffect(() => {
    loadProfile();
    loadStats();
    
    const handleStorageChange = () => {
      loadProfile();
      loadStats();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return (
    <ModernSidebar
      isOpen={isOpen}
      onClose={onClose}
      items={sidebarItems}
      profile={trainerProfile}
      stats={stats}
    />
  );
}
