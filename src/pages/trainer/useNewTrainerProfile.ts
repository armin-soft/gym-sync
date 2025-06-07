
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

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

const defaultProfileData: TrainerProfileData = {
  personalInfo: {
    fullName: "دکتر علی رضایی نژاد",
    displayName: "مربی علی",
    bio: "مربی حرفه‌ای بدنسازی و تناسب اندام با ۱۵ سال تجربه مفید. متخصص در طراحی برنامه‌های تمرینی اختصاصی، تغذیه ورزشی و توانبخشی. دارای مدرک کارشناسی ارشد علوم ورزشی و چندین گواهینامه بین‌المللی در حوزه فیتنس و بدنسازی.",
    phone: "۰۹۱۲۱۲۳۴۵۶۷",
    email: "ali.rezaei@gymsync.ir",
    profileImage: "/Assets/Image/Place-Holder.svg",
    birthDate: "۱۳۶۰/۰۵/۲۰",
    nationalId: "۰۰۱۲۳۴۵۶۷۸",
    specialization: "تناسب اندام، بدنسازی و توانبخشی",
    experience: 15,
    education: "کارشناسی ارشد علوم ورزشی - دانشگاه تهران"
  },
  gymInfo: {
    gymName: "مجموعه ورزشی پارس فیت پریمیوم",
    gymDescription: "مجموعه‌ای مدرن و مجهز با جدیدترین تجهیزات ورزشی، استخر نیم‌المپیک، سونا، جکوزی، کلاس‌های گروهی متنوع و محیطی دلنشین برای تمامی سنین",
    gymAddress: "تهران، منطقه ۱، خیابان کریمخان زند، نرسیده به میدان حر، پلاک ۴۵۶، طبقه منفی ۲",
    gymPhone: "۰۲۱-۸۸۹۹۷۷۵۵",
    gymWebsite: "https://parsfit.ir",
    workingHours: "شنبه تا چهارشنبه: ۶:۰۰ تا ۲۳:۰۰ | پنج‌شنبه: ۶:۰۰ تا ۲۲:۰۰ | جمعه: ۸:۰۰ تا ۲۰:۰۰",
    facilities: ["تجهیزات کاردیو", "وزنه آزاد", "دستگاه‌های بدنسازی", "استخر نیم‌المپیک", "سونا و جکوزی", "کلاس‌های گروهی", "رختکن VIP", "کافی‌شاپ"],
    capacity: 250
  },
  socialMedia: {
    instagram: "@ali_trainer_official",
    telegram: "@ali_fitness_coach",
    whatsapp: "۰۹۱۲۱۲۳۴۵۶۷",
    website: "https://ali-trainer.com",
    youtube: "علی رضایی - کانال تناسب اندام",
    linkedin: "Ali Rezaei - Fitness Coach"
  },
  certifications: [
    {
      id: "cert-1",
      title: "مربیگری درجه یک بدنسازی و پرورش اندام",
      issuer: "فدراسیون پرورش اندام جمهوری اسلامی ایران",
      date: "۱۴۰۱/۰۸/۱۵",
      certificateId: "BB-۱۴۰۱-۰۰۸۹۴",
      validUntil: "۱۴۰۶/۰۸/۱۵"
    },
    {
      id: "cert-2",
      title: "کارشناس تغذیه ورزشی و مکمل‌یاری",
      issuer: "انجمن متخصصان تغذیه ورزشی ایران",
      date: "۱۴۰۰/۱۱/۲۵",
      certificateId: "NT-۱۴۰۰-۰۱۲۳۴",
      validUntil: "۱۴۰۵/۱۱/۲۵"
    },
    {
      id: "cert-3",
      title: "مربی کراس فیت سطح ۲ (CrossFit Level 2)",
      issuer: "CrossFit International",
      date: "۱۴۰۲/۰۴/۱۰",
      certificateId: "CF-L2-۲۰۲۳-۰۵۶۷",
      validUntil: "۱۴۰۵/۰۴/۱۰"
    },
    {
      id: "cert-4",
      title: "متخصص توانبخشی و ورزش درمانی",
      issuer: "انجمن فیزیوتراپی ایران",
      date: "۱۴۰۱/۰۲/۱۸",
      certificateId: "PT-۱۴۰۱-۰۰۳۴۵",
      validUntil: "۱۴۰۶/۰۲/۱۸"
    }
  ],
  achievements: {
    totalStudents: 342,
    successfulPrograms: 287,
    yearsExperience: 15,
    satisfaction: 97,
    monthlyIncome: 25000000,
    completedCourses: 23
  },
  workSchedule: {
    saturday: { start: "۰۸:۰۰", end: "۲۰:۰۰", active: true },
    sunday: { start: "۰۸:۰۰", end: "۲۰:۰۰", active: true },
    monday: { start: "۰۸:۰۰", end: "۲۰:۰۰", active: true },
    tuesday: { start: "۰۸:۰۰", end: "۲۰:۰۰", active: true },
    wednesday: { start: "۰۸:۰۰", end: "۲۰:۰۰", active: true },
    thursday: { start: "۰۸:۰۰", end: "۱۸:۰۰", active: true },
    friday: { start: "۱۰:۰۰", end: "۱۶:۰۰", active: false }
  }
};

export const useNewTrainerProfile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<TrainerProfileData>(defaultProfileData);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [completionPercentage, setCompletionPercentage] = useState<number>(85);

  // بارگذاری داده‌ها از localStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('newTrainerProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfileData({ ...defaultProfileData, ...parsed });
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل:', error);
      toast({
        variant: "destructive",
        title: "⚠️ خطا در بارگذاری",
        description: "مشکلی در بارگذاری اطلاعات پروفایل پیش آمده است"
      });
    }
  }, [toast]);

  // محاسبه درصد تکمیل پروفایل
  useEffect(() => {
    const calculateCompletion = () => {
      let completedFields = 0;
      let totalFields = 0;

      // شمارش فیلدهای تکمیل شده
      Object.entries(profileData.personalInfo).forEach(([_, value]) => {
        totalFields++;
        if (value && value.toString().trim() !== '') completedFields++;
      });

      Object.entries(profileData.gymInfo).forEach(([key, value]) => {
        if (key !== 'facilities') {
          totalFields++;
          if (value && value.toString().trim() !== '') completedFields++;
        }
      });

      totalFields += profileData.gymInfo.facilities.length > 0 ? 1 : 0;
      completedFields += profileData.gymInfo.facilities.length > 0 ? 1 : 0;

      const percentage = Math.round((completedFields / totalFields) * 100);
      setCompletionPercentage(percentage);
    };

    calculateCompletion();
  }, [profileData]);

  const updateProfileData = (section: keyof TrainerProfileData, data: any) => {
    setProfileData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const saveProfile = async () => {
    setIsSaving(true);
    try {
      // شبیه‌سازی ذخیره در سرور
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.setItem('newTrainerProfile', JSON.stringify(profileData));
      
      toast({
        title: "✅ ذخیره موفق",
        description: `اطلاعات پروفایل با موفقیت به‌روزرسانی شد - تکمیل: ${toPersianNumbers(completionPercentage.toString())}%`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ خطا در ذخیره",
        description: "مشکلی در ذخیره اطلاعات پیش آمده است. لطفاً مجدداً تلاش کنید",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profileData,
    updateProfileData,
    saveProfile,
    activeSection,
    setActiveSection,
    isSaving,
    completionPercentage
  };
};
