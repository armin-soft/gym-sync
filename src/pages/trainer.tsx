
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { TrainerProfile } from "@/types/trainer";
import { defaultProfile } from "@/types/trainer";
import { PageContainer } from "@/components/ui/page-container";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { User, Building, Globe, Save, Camera, Phone, MapPin, Instagram, Edit, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const TrainerProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("personal");

  // Load saved profile from localStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
      }
    } catch (error) {
      console.error('Error loading profile from localStorage:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگذاری اطلاعات",
        description: "مشکلی در بارگذاری اطلاعات پیش آمده است"
      });
    }
  }, []);

  const handleUpdate = (key: keyof TrainerProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      localStorage.setItem('trainerProfile', JSON.stringify(profile));
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "ذخیره موفق",
        description: "اطلاعات پروفایل با موفقیت ذخیره شد"
      });
    } catch (error) {
      console.error('Error saving profile to localStorage:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره اطلاعات",
        description: "مشکلی در ذخیره اطلاعات پیش آمده است"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (image: string) => {
    handleUpdate('image', image);
  };

  const sections = [
    { id: "personal", label: "اطلاعات شخصی", icon: User },
    { id: "gym", label: "اطلاعات باشگاه", icon: Building },
    { id: "social", label: "شبکه‌های اجتماعی", icon: Globe }
  ];

  const renderPersonalSection = () => (
    <div className="space-y-۶" dir="rtl">
      <div>
        <Label htmlFor="name" className="text-right block mb-۲">نام و نام خانوادگی</Label>
        <Input
          id="name"
          value={profile.name}
          onChange={(e) => handleUpdate('name', e.target.value)}
          placeholder="نام خود را وارد کنید"
          className="text-right"
          dir="rtl"
        />
      </div>
      
      <div>
        <Label htmlFor="bio" className="text-right block mb-۲">درباره من</Label>
        <Textarea
          id="bio"
          value={profile.bio}
          onChange={(e) => handleUpdate('bio', e.target.value)}
          placeholder="درباره خود بنویسید..."
          className="text-right min-h-[۱۲۰px]"
          dir="rtl"
        />
      </div>
      
      <div>
        <Label htmlFor="phone" className="text-right block mb-۲">شماره موبایل</Label>
        <Input
          id="phone"
          value={toPersianNumbers(profile.phone)}
          onChange={(e) => handleUpdate('phone', e.target.value)}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          className="text-left"
          dir="ltr"
        />
      </div>
    </div>
  );

  const renderGymSection = () => (
    <div className="space-y-۶" dir="rtl">
      <div>
        <Label htmlFor="gymName" className="text-right block mb-۲">نام باشگاه</Label>
        <Input
          id="gymName"
          value={profile.gymName}
          onChange={(e) => handleUpdate('gymName', e.target.value)}
          placeholder="نام باشگاه را وارد کنید"
          className="text-right"
          dir="rtl"
        />
      </div>
      
      <div>
        <Label htmlFor="gymDescription" className="text-right block mb-۲">توضیحات باشگاه</Label>
        <Textarea
          id="gymDescription"
          value={profile.gymDescription}
          onChange={(e) => handleUpdate('gymDescription', e.target.value)}
          placeholder="توضیحاتی درباره باشگاه بنویسید..."
          className="text-right min-h-[۱۲۰px]"
          dir="rtl"
        />
      </div>
      
      <div>
        <Label htmlFor="gymAddress" className="text-right block mb-۲">آدرس باشگاه</Label>
        <Input
          id="gymAddress"
          value={profile.gymAddress}
          onChange={(e) => handleUpdate('gymAddress', e.target.value)}
          placeholder="آدرس کامل باشگاه را وارد کنید"
          className="text-right"
          dir="rtl"
        />
      </div>
    </div>
  );

  const renderSocialSection = () => (
    <div className="space-y-۶" dir="rtl">
      <div>
        <Label htmlFor="instagram" className="text-right block mb-۲">اینستاگرام</Label>
        <Input
          id="instagram"
          value={profile.instagram}
          onChange={(e) => handleUpdate('instagram', e.target.value)}
          placeholder="نام کاربری اینستاگرام"
          className="text-left"
          dir="ltr"
        />
      </div>
      
      <div>
        <Label htmlFor="website" className="text-right block mb-۲">وب‌سایت</Label>
        <Input
          id="website"
          value={profile.website}
          onChange={(e) => handleUpdate('website', e.target.value)}
          placeholder="https://example.com"
          className="text-left"
          dir="ltr"
        />
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "personal":
        return renderPersonalSection();
      case "gym":
        return renderGymSection();
      case "social":
        return renderSocialSection();
      default:
        return renderPersonalSection();
    }
  };

  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />
      
      <div className="relative z-10 container mx-auto p-۴ md:p-۶ max-w-۷xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-۸"
        >
          <h1 className="text-۴xl md:text-۵xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-۴">
            پروفایل مربی
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            اطلاعات خود را مدیریت کنید
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-۸">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-۶ text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <div className="relative mb-۶">
                <div className="w-۳۲ h-۳۲ mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <User className="w-۱۶ h-۱۶ text-white hidden" />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute bottom-0 right-1/2 translate-x-1/2 rounded-full w-۸ h-۸ p-0"
                  onClick={() => {/* Add image upload logic */}}
                >
                  <Camera className="w-۴ h-۴" />
                </Button>
              </div>
              
              <h3 className="text-xl font-bold mb-۲">
                {profile.name || "نام مربی"}
              </h3>
              
              {profile.phone && (
                <div className="flex items-center justify-center gap-۲ mb-۴" dir="ltr">
                  <Phone className="w-۴ h-۴ text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {toPersianNumbers(profile.phone)}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-۲">
                <CheckCircle2 className="w-۴ h-۴ text-green-500" />
                <span className="text-sm text-green-600">پروفایل فعال</span>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-۶">
                <div className="flex flex-wrap gap-۴ justify-center lg:justify-start">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <Button
                        key={section.id}
                        variant={isActive ? "default" : "outline"}
                        className={`flex items-center gap-۲ ${
                          isActive 
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <Icon className="w-۴ h-۴" />
                        {section.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-۶">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderActiveSection()}
                </motion.div>
              </div>

              {/* Save Button */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-۶">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium"
                >
                  {isSaving ? (
                    <div className="flex items-center gap-۲">
                      <div className="w-۴ h-۴ border-۲ border-white/30 border-t-white rounded-full animate-spin" />
                      در حال ذخیره...
                    </div>
                  ) : (
                    <div className="flex items-center gap-۲">
                      <Save className="w-۴ h-۴" />
                      ذخیره اطلاعات
                    </div>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};

export default TrainerProfile;
