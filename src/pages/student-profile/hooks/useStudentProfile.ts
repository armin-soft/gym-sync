
import { useState, useEffect, useCallback } from "react";
import { StudentProfile } from "../types/studentProfile";
import { useToast } from "@/hooks/use-toast";

export const useStudentProfile = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof StudentProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof StudentProfile, boolean>>>({});

  const [profile, setProfile] = useState<StudentProfile>({
    name: "",
    phone: "",
    email: "",
    birthDate: "",
    address: "",
    height: "",
    weight: "",
    goal: "",
    image: "",
    membershipDate: "",
    emergencyContact: "",
    medicalConditions: "",
    fitnessLevel: "مبتدی"
  });

  // بارگذاری داده‌های شاگرد از localStorage
  useEffect(() => {
    try {
      const loggedInStudentId = localStorage.getItem("loggedInStudentId");
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      
      if (loggedInStudentId && students.length > 0) {
        const student = students.find((s: any) => s.id === loggedInStudentId);
        
        if (student) {
          setProfile({
            name: student.name || "",
            phone: student.phone || "",
            email: student.email || "",
            birthDate: student.birthDate || "",
            address: student.address || "",
            height: student.height || "",
            weight: student.weight || "",
            goal: student.goal || "",
            image: student.profileImage || "",
            membershipDate: student.membershipDate || "",
            emergencyContact: student.emergencyContact || "",
            medicalConditions: student.medicalConditions || "",
            fitnessLevel: student.fitnessLevel || "مبتدی"
          });
        }
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل شاگرد:', error);
    }
  }, []);

  const handleUpdate = useCallback((key: keyof StudentProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    
    // حذف خطا در صورت وجود
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
    
    // تنظیم validation
    if (value.trim()) {
      setValidFields(prev => ({ ...prev, [key]: true }));
    }
  }, [errors]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    try {
      const loggedInStudentId = localStorage.getItem("loggedInStudentId");
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      
      if (loggedInStudentId && students.length > 0) {
        const studentIndex = students.findIndex((s: any) => s.id === loggedInStudentId);
        
        if (studentIndex !== -1) {
          // به‌روزرسانی اطلاعات شاگرد
          students[studentIndex] = {
            ...students[studentIndex],
            name: profile.name,
            phone: profile.phone,
            email: profile.email,
            birthDate: profile.birthDate,
            address: profile.address,
            height: profile.height,
            weight: profile.weight,
            goal: profile.goal,
            profileImage: profile.image,
            membershipDate: profile.membershipDate,
            emergencyContact: profile.emergencyContact,
            medicalConditions: profile.medicalConditions,
            fitnessLevel: profile.fitnessLevel
          };
          
          localStorage.setItem("students", JSON.stringify(students));
          
          toast({
            title: "موفقیت",
            description: "اطلاعات پروفایل با موفقیت ذخیره شد",
          });
        }
      }
    } catch (error) {
      console.error('خطا در ذخیره پروفایل:', error);
      toast({
        title: "خطا",
        description: "در ذخیره اطلاعات مشکلی پیش آمد",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }, [profile, toast]);

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
