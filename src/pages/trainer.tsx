
import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { ProfileSidebar } from "@/components/trainer/ProfileSidebar";
import { ProfileForm } from "@/components/trainer/ProfileForm";
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { TrainerProfile } from "@/types/trainer";
import { useState, useEffect } from "react";

const TrainerProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof TrainerProfile, boolean>>>({});
  
  const [profile, setProfile] = useState<TrainerProfile>({
    image: localStorage.getItem('trainer_image') || '',
    name: localStorage.getItem('trainer_name') || '',
    phone: localStorage.getItem('trainer_phone') || '',
    email: localStorage.getItem('trainer_email') || '',
    specialty: localStorage.getItem('trainer_specialty') || '',
    experience: localStorage.getItem('trainer_experience') || '',
    certificate: localStorage.getItem('trainer_certificate') || '',
    bio: localStorage.getItem('trainer_bio') || '',
    gymName: localStorage.getItem('gym_name') || '',
    gymAddress: localStorage.getItem('gym_address') || '',
    gymPhone: localStorage.getItem('gym_phone') || '',
    gymEmail: localStorage.getItem('gym_email') || '',
    workingHours: localStorage.getItem('gym_working_hours') || '',
    facilities: localStorage.getItem('gym_facilities') || '',
    instagram: localStorage.getItem('trainer_instagram') || '',
    telegram: localStorage.getItem('trainer_telegram') || '',
    whatsapp: localStorage.getItem('trainer_whatsapp') || '',
    youtube: localStorage.getItem('trainer_youtube') || '',
    website: localStorage.getItem('trainer_website') || '',
  });

  const handleUpdate = (key: keyof TrainerProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(`trainer_${key}`, value);
    if (key.startsWith('gym')) {
      localStorage.setItem(key, value);
    }
  };

  const handleImageChange = (image: string) => {
    setProfile(prev => ({ ...prev, image }));
    localStorage.setItem('trainer_image', image);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Save all profile data to localStorage
      Object.entries(profile).forEach(([key, value]) => {
        if (key.startsWith('gym')) {
          localStorage.setItem(key, value);
        } else {
          localStorage.setItem(`trainer_${key}`, value);
        }
      });

      toast({
        title: "موفقیت",
        description: "پروفایل با موفقیت ذخیره شد",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره اطلاعات",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <DashboardLayout>
      <PageContainer withBackground fullHeight>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="min-h-full p-4 lg:p-6 overflow-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar
                profile={profile}
                onImageChange={handleImageChange}
                activeSection={activeSection}
                onTabChange={setActiveSection}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <ProfileForm
                profile={profile}
                onUpdate={handleUpdate}
                onSave={handleSave}
                errors={errors}
                setErrors={setErrors}
                validFields={validFields}
                setValidFields={setValidFields}
                activeSection={activeSection}
                isSaving={isSaving}
              />
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </DashboardLayout>
  );
};

export default TrainerProfilePage;
