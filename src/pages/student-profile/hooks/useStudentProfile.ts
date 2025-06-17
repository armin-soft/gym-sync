
import { useState, useEffect } from "react";
import { StudentProfile } from "../types/studentProfile";
import { useToast } from "@/hooks/use-toast";

export const useStudentProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudentProfile>({
    id: "1",
    name: "احمد محمدی",
    email: "ahmad.mohammadi@example.com",
    phone: "09123456789",
    age: "25",
    gender: "male",
    birthDate: "1378/05/15",
    address: "تهران، خیابان ولی‌عصر، پلاک ۱۲۳",
    height: "175",
    weight: "70",
    grade: "مبتدی",
    group: "گروه صبح",
    emergencyContactName: "علی محمدی",
    emergencyContactPhone: "09187654321",
    paymentStatus: "paid",
    goal: "کاهش وزن و تناسب اندام",
    image: "/Assets/Image/Place-Holder.svg",
    medicalConditions: "",
    allergies: "",
    fitnessLevel: "beginner",
    preferredWorkoutTime: "صبح",
    notes: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StudentProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof StudentProfile, boolean>>>({});
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);

  // بارگذاری داده‌ها از localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('studentProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(prev => ({ ...prev, ...parsedProfile }));
      } catch (error) {
        console.error('خطا در بارگذاری پروفایل:', error);
      }
    }
  }, []);

  // اعتبارسنجی فیلدها
  const validateField = (key: keyof StudentProfile, value: string): string => {
    switch (key) {
      case 'name':
        return value.length < 2 ? 'نام باید حداقل ۲ کاراکتر باشد' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'فرمت ایمیل صحیح نیست' : '';
      case 'phone':
        const phoneRegex = /^09\d{9}$/;
        return !phoneRegex.test(value) ? 'شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد' : '';
      case 'emergencyContactPhone':
        const emergencyPhoneRegex = /^09\d{9}$/;
        return value && !emergencyPhoneRegex.test(value) ? 'شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد' : '';
      case 'age':
        const age = parseInt(value);
        return age < 10 || age > 100 ? 'سن باید بین ۱۰ تا ۱۰۰ سال باشد' : '';
      case 'height':
        const height = parseInt(value);
        return height < 100 || height > 250 ? 'قد باید بین ۱۰۰ تا ۲۵۰ سانتی‌متر باشد' : '';
      case 'weight':
        const weight = parseInt(value);
        return weight < 30 || weight > 200 ? 'وزن باید بین ۳۰ تا ۲۰۰ کیلوگرم باشد' : '';
      default:
        return '';
    }
  };

  const handleUpdate = (key: keyof StudentProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    
    const error = validateField(key, value);
    setErrors(prev => ({ ...prev, [key]: error }));
    setValidFields(prev => ({ ...prev, [key]: !error }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // اعتبارسنجی تمام فیلدها
      const newErrors: Partial<Record<keyof StudentProfile, string>> = {};
      Object.keys(profile).forEach(key => {
        const error = validateField(key as keyof StudentProfile, profile[key as keyof StudentProfile]);
        if (error) newErrors[key as keyof StudentProfile] = error;
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast({
          variant: "destructive",
          title: "خطا در اعتبارسنجی",
          description: "لطفاً اطلاعات وارد شده را بررسی کنید"
        });
        return;
      }

      // شبیه‌سازی ذخیره‌سازی
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('studentProfile', JSON.stringify(profile));
      
      toast({
        title: "موفق",
        description: "اطلاعات پروفایل با موفقیت ذخیره شد"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی اطلاعات"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profile,
    errors,
    setErrors,
    validFields,
    setValidFields,
    activeSection,
    setActiveSection,
    isSaving,
    handleUpdate,
    handleSave
  };
};
