
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernTrainerProfile {
  personalInfo: {
    fullName: string;
    displayName: string;
    bio: string;
    phone: string;
    email: string;
    profileImage: string;
    birthDate: string;
    nationalId: string;
  };
  gymInfo: {
    gymName: string;
    gymDescription: string;
    gymAddress: string;
    gymPhone: string;
    gymWebsite: string;
    workingHours: string;
    specialties: string[];
  };
  socialMedia: {
    instagram: string;
    telegram: string;
    whatsapp: string;
    website: string;
    youtube: string;
  };
  certifications: {
    title: string;
    issuer: string;
    date: string;
    certificateId: string;
  }[];
  statistics: {
    totalStudents: number;
    yearsExperience: number;
    completedPrograms: number;
    successRate: number;
  };
}

const defaultProfile: ModernTrainerProfile = {
  personalInfo: {
    fullName: "احمد محمدی",
    displayName: "استاد احمد",
    bio: "مربی حرفه‌ای بدنسازی با بیش از ۱۰ سال تجربه در زمینه تناسب اندام و تغذیه ورزشی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "ahmad.mohammadi@gym.ir",
    profileImage: "/Assets/Image/Place-Holder.svg",
    birthDate: "۱۳۶۵/۰۳/۱۵",
    nationalId: "۱۲۳۴۵۶۷۸۹۰"
  },
  gymInfo: {
    gymName: "باشگاه بدنسازی اطلس",
    gymDescription: "باشگاه مجهز با جدیدترین تجهیزات ورزشی و امکانات رفاهی برای تمامی سنین",
    gymAddress: "تهران، منطقه ۲، خیابان ولیعصر، پلاک ۱۲۳",
    gymPhone: "۰۲۱-۸۸۷۷۶۶۵۵",
    gymWebsite: "https://atlas-gym.ir",
    workingHours: "شنبه تا پنج‌شنبه: ۶:۰۰ تا ۲۳:۰۰ - جمعه: ۸:۰۰ تا ۲۲:۰۰",
    specialties: ["بدنسازی", "کراس فیت", "تناسب اندام", "تغذیه ورزشی"]
  },
  socialMedia: {
    instagram: "ahmad_trainer_official",
    telegram: "ahmad_fitness_coach",
    whatsapp: "۰۹۱۲۳۴۵۶۷۸۹",
    website: "https://ahmad-trainer.ir",
    youtube: "احمد محمدی - مربی تناسب اندام"
  },
  certifications: [
    {
      title: "مربیگری درجه یک بدنسازی",
      issuer: "فدراسیون پرورش اندام ایران",
      date: "۱۴۰۰/۰۶/۱۵",
      certificateId: "BB-۱۴۰۰-۰۰۱۲۳"
    },
    {
      title: "کارشناس تغذیه ورزشی",
      issuer: "انجمن متخصصان تغذیه",
      date: "۱۳۹۹/۰۹/۲۰",
      certificateId: "NT-۱۳۹۹-۰۰۴۵۶"
    }
  ],
  statistics: {
    totalStudents: 248,
    yearsExperience: 12,
    completedPrograms: 185,
    successRate: 94
  }
};

export const useModernTrainerProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<ModernTrainerProfile>(defaultProfile);
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('modernTrainerProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile({ ...defaultProfile, ...parsed });
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل:', error);
    }
  }, []);

  const updateProfile = (section: keyof ModernTrainerProfile, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const saveProfile = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('modernTrainerProfile', JSON.stringify(profile));
      
      toast({
        title: "ذخیره موفق",
        description: "اطلاعات پروفایل با موفقیت به‌روزرسانی شد",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا در ذخیره",
        description: "مشکلی در ذخیره اطلاعات پیش آمده است",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profile,
    updateProfile,
    saveProfile,
    activeSection,
    setActiveSection,
    isSaving,
    errors,
    setErrors,
    validFields,
    setValidFields
  };
};
