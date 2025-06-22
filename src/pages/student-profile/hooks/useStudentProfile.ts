
import { useState, useEffect } from "react";
import { StudentProfile } from "../types/studentProfile";
import { useToast } from "@/hooks/use-toast";

export const useStudentProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudentProfile>({
    id: "",
    name: "",
    phone: "",
    age: "",
    gender: "male",
    height: "",
    weight: "",
    grade: "",
    group: "",
    image: "/Assets/Images/Place-Holder.svg",
    payment: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StudentProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof StudentProfile, boolean>>>({});
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);

  // بارگذاری داده‌ها از localStorage فقط برای شاگرد لاگین شده
  useEffect(() => {
    const loadStudentData = () => {
      try {
        const loggedInStudentId = localStorage.getItem("loggedInStudentId");
        const students = JSON.parse(localStorage.getItem("students") || "[]");
        
        if (loggedInStudentId && students.length > 0) {
          const student = students.find((s: any) => s.id === parseInt(loggedInStudentId));
          
          if (student) {
            console.log('Loading student profile from localStorage:', student);
            
            setProfile({
              id: student.id?.toString() || "",
              name: student.name || "",
              phone: student.phone || "",
              age: student.age?.toString() || "",
              gender: student.gender || "male",
              height: student.height?.toString() || "",
              weight: student.weight?.toString() || "",
              grade: student.grade || "",
              group: student.group || "",
              image: student.image || student.profileImage || "/Assets/Images/Place-Holder.svg",
              payment: student.payment || ""
            });
            
            console.log('Student profile loaded successfully');
          } else {
            console.log('No student found with the logged-in ID');
          }
        } else {
          console.log('No logged-in student ID or no students data found');
        }
      } catch (error) {
        console.error('خطا در بارگذاری پروفایل شاگرد:', error);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در بارگذاری اطلاعات پروفایل"
        });
      }
    };

    loadStudentData();

    // گوش دادن به تغییرات localStorage
    const handleStorageChange = () => {
      loadStudentData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleStorageChange);
    };
  }, [toast]);

  // اعتبارسنجی فیلدها
  const validateField = (key: keyof StudentProfile, value: string): string => {
    switch (key) {
      case 'name':
        return value.length < 2 ? 'نام باید حداقل ۲ کاراکتر باشد' : '';
      case 'phone':
        const phoneRegex = /^09\d{9}$/;
        return value && !phoneRegex.test(value) ? 'شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد' : '';
      case 'age':
        const age = parseInt(value);
        return value && (age < 10 || age > 100) ? 'سن باید بین ۱۰ تا ۱۰۰ سال باشد' : '';
      case 'height':
        const height = parseInt(value);
        return value && (height < 100 || height > 250) ? 'قد باید بین ۱۰۰ تا ۲۵۰ سانتی‌متر باشد' : '';
      case 'weight':
        const weight = parseInt(value);
        return value && (weight < 30 || weight > 200) ? 'وزن باید بین ۳۰ تا ۲۰۰ کیلوگرم باشد' : '';
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
      // اعتبارسنجی فیلدهای ضروری
      const newErrors: Partial<Record<keyof StudentProfile, string>> = {};
      const requiredFields: (keyof StudentProfile)[] = ['name'];
      
      requiredFields.forEach(key => {
        const error = validateField(key, profile[key]);
        if (error) newErrors[key] = error;
      });

      // اعتبارسنجی سایر فیلدها که مقدار دارند
      Object.keys(profile).forEach(key => {
        const profileKey = key as keyof StudentProfile;
        if (profile[profileKey]) {
          const error = validateField(profileKey, profile[profileKey]);
          if (error) newErrors[profileKey] = error;
        }
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
      
      // ذخیره در localStorage - بروزرسانی اطلاعات شاگرد در آرایه students
      const loggedInStudentId = localStorage.getItem("loggedInStudentId");
      if (loggedInStudentId) {
        const students = JSON.parse(localStorage.getItem("students") || "[]");
        const studentIndex = students.findIndex((s: any) => s.id === parseInt(loggedInStudentId));
        
        if (studentIndex >= 0) {
          // بروزرسانی اطلاعات شاگرد
          students[studentIndex] = {
            ...students[studentIndex],
            ...profile,
            id: parseInt(loggedInStudentId), // حفظ ID اصلی
            profileImage: profile.image // همگام‌سازی تصویر
          };
          
          localStorage.setItem('students', JSON.stringify(students));
          
          // اطلاع‌رسانی به سایر کامپوننت‌ها
          window.dispatchEvent(new CustomEvent('studentsUpdated'));
          window.dispatchEvent(new Event('storage'));
        }
      }
      
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
