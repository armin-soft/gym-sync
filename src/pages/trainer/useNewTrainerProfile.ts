
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";

interface TrainerProfileData {
  personalInfo: {
    fullName: string;
    displayName: string;
    bio: string;
    phone: string;
    email: string;
    profileImage: string;
    birthDate: string;
    nationalId: string;
    specialization: string;
    experience: number;
    education: string;
  };
  gymInfo: {
    gymName: string;
    gymDescription: string;
    gymAddress: string;
    gymPhone: string;
    gymWebsite: string;
    workingHours: string;
    facilities: string[];
    capacity: number;
  };
  socialMedia: {
    instagram: string;
    telegram: string;
    whatsapp: string;
    website: string;
    youtube: string;
    linkedin: string;
  };
  certifications: {
    id: string;
    title: string;
    issuer: string;
    date: string;
    certificateId: string;
    validUntil: string;
  }[];
  achievements: {
    totalStudents: number;
    successfulPrograms: number;
    yearsExperience: number;
    satisfaction: number;
    monthlyIncome: number;
    completedCourses: number;
  };
  workSchedule: {
    saturday: { start: string; end: string; active: boolean };
    sunday: { start: string; end: string; active: boolean };
    monday: { start: string; end: string; active: boolean };
    tuesday: { start: string; end: string; active: boolean };
    wednesday: { start: string; end: string; active: boolean };
    thursday: { start: string; end: string; active: boolean };
    friday: { start: string; end: string; active: boolean };
  };
}

// داده‌های خالی به عنوان پیش‌فرض
const emptyProfileData: TrainerProfileData = {
  personalInfo: {
    fullName: "",
    displayName: "",
    bio: "",
    phone: "",
    email: "",
    profileImage: "/Assets/Image/Place-Holder.svg",
    birthDate: "",
    nationalId: "",
    specialization: "",
    experience: 0,
    education: ""
  },
  gymInfo: {
    gymName: "",
    gymDescription: "",
    gymAddress: "",
    gymPhone: "",
    gymWebsite: "",
    workingHours: "",
    facilities: [],
    capacity: 0
  },
  socialMedia: {
    instagram: "",
    telegram: "",
    whatsapp: "",
    website: "",
    youtube: "",
    linkedin: ""
  },
  certifications: [],
  achievements: {
    totalStudents: 0,
    successfulPrograms: 0,
    yearsExperience: 0,
    satisfaction: 0,
    monthlyIncome: 0,
    completedCourses: 0
  },
  workSchedule: {
    saturday: { start: "", end: "", active: false },
    sunday: { start: "", end: "", active: false },
    monday: { start: "", end: "", active: false },
    tuesday: { start: "", end: "", active: false },
    wednesday: { start: "", end: "", active: false },
    thursday: { start: "", end: "", active: false },
    friday: { start: "", end: "", active: false }
  }
};

export const useNewTrainerProfile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<TrainerProfileData>(emptyProfileData);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);

  // بارگذاری داده‌ها از localStorage
  useEffect(() => {
    try {
      const savedProfile = getLocalStorageItem('trainerProfile', null);
      if (savedProfile) {
        // ادغام داده‌های ذخیره شده با ساختار خالی
        const mergedData = {
          ...emptyProfileData,
          ...savedProfile,
          personalInfo: { ...emptyProfileData.personalInfo, ...savedProfile.personalInfo },
          gymInfo: { ...emptyProfileData.gymInfo, ...savedProfile.gymInfo },
          socialMedia: { ...emptyProfileData.socialMedia, ...savedProfile.socialMedia },
          achievements: { ...emptyProfileData.achievements, ...savedProfile.achievements },
          workSchedule: { ...emptyProfileData.workSchedule, ...savedProfile.workSchedule }
        };
        setProfileData(mergedData);
      } else {
        // اگر هیچ داده‌ای موجود نیست، داده‌های خالی را ذخیره کن
        setLocalStorageItem('trainerProfile', emptyProfileData);
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل:', error);
      toast({
        variant: "destructive",
        title: "⚠️ خطا در بارگذاری",
        description: "مشکلی در بارگذاری اطلاعات پروفایل پیش آمده است"
      });
      setProfileData(emptyProfileData);
    }
  }, [toast]);

  // محاسبه درصد تکمیل پروفایل
  useEffect(() => {
    const calculateCompletion = () => {
      let completedFields = 0;
      let totalFields = 0;

      // شمارش فیلدهای اطلاعات شخصی
      Object.entries(profileData.personalInfo).forEach(([key, value]) => {
        if (key !== 'profileImage') { // تصویر پروفایل اختیاری است
          totalFields++;
          if (value && value.toString().trim() !== '' && value !== 0) {
            completedFields++;
          }
        }
      });

      // شمارش فیلدهای اطلاعات باشگاه
      Object.entries(profileData.gymInfo).forEach(([key, value]) => {
        if (key !== 'facilities' && key !== 'capacity') {
          totalFields++;
          if (value && value.toString().trim() !== '') {
            completedFields++;
          }
        }
      });

      // امکانات باشگاه
      totalFields++;
      if (profileData.gymInfo.facilities.length > 0) {
        completedFields++;
      }

      // شبکه‌های اجتماعی (اختیاری - وزن کمتر)
      const socialCount = Object.values(profileData.socialMedia).filter(v => v && v.trim() !== '').length;
      if (socialCount > 0) {
        completedFields += 0.5; // وزن کمتر برای شبکه‌های اجتماعی
        totalFields += 0.5;
      }

      const percentage = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
      setCompletionPercentage(Math.min(percentage, 100));
    };

    calculateCompletion();
  }, [profileData]);

  const updateProfileData = (section: keyof TrainerProfileData, data: any) => {
    setProfileData(prev => {
      const updated = {
        ...prev,
        [section]: { ...prev[section], ...data }
      };
      
      // ذخیره خودکار در localStorage
      setLocalStorageItem('trainerProfile', updated);
      return updated;
    });
  };

  const saveProfile = async () => {
    setIsSaving(true);
    try {
      // شبیه‌سازی ذخیره در سرور
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // ذخیره در localStorage
      setLocalStorageItem('trainerProfile', profileData);
      
      toast({
        title: "✅ ذخیره موفق",
        description: `اطلاعات پروفایل با موفقیت به‌روزرسانی شد - تکمیل: ${toPersianNumbers(completionPercentage.toString())}%`,
      });
    } catch (error) {
      console.error('خطا در ذخیره پروفایل:', error);
      toast({
        variant: "destructive",
        title: "❌ خطا در ذخیره",
        description: "مشکلی در ذخیره اطلاعات پیش آمده است. لطفاً مجدداً تلاش کنید",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetProfile = () => {
    setProfileData(emptyProfileData);
    setLocalStorageItem('trainerProfile', emptyProfileData);
    toast({
      title: "🔄 بازنشانی انجام شد",
      description: "اطلاعات پروفایل به حالت اولیه بازگردانده شد",
    });
  };

  return {
    profileData,
    updateProfileData,
    saveProfile,
    resetProfile,
    activeSection,
    setActiveSection,
    isSaving,
    completionPercentage
  };
};
