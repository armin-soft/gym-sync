
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { TrainerProfile } from "@/types/trainer";
import { isValidEmail, isValidIranianMobile, isValidPassword, isValidPersianName } from "@/utils/validation";
import { Eye, EyeOff, UserRound, Phone, Mail, Lock, Building, MapPin, FileText, Check, Save, Instagram, Globe, Award, Briefcase, BookOpen, Dumbbell, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileFormProps {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  onSave: () => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export const ProfileForm = ({ 
  profile, 
  onUpdate, 
  onSave, 
  errors, 
  setErrors,
  validFields,
  setValidFields,
  activeSection,
  setActiveSection 
}: ProfileFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const validateField = (key: keyof TrainerProfile, value: string) => {
    let isValid = false;
    let error = '';

    switch (key) {
      case 'name':
        isValid = isValidPersianName(value);
        error = !value ? "نام و نام خانوادگی اجباری است" : 
                !isValid ? "لطفاً نام را به فارسی وارد کنید" : '';
        break;
      case 'bio':
        isValid = !!value;
        error = !isValid ? "بیوگرافی اجباری است" : '';
        break;
      case 'phone':
        isValid = isValidIranianMobile(value);
        error = !value ? "شماره موبایل اجباری است" :
                !isValid ? "شماره موبایل معتبر نیست" : '';
        break;
      case 'email':
        isValid = isValidEmail(value);
        error = !value ? "ایمیل اجباری است" :
                !isValid ? "ایمیل معتبر نیست" : '';
        break;
      case 'password':
        isValid = isValidPassword(value);
        error = !value ? "گذرواژه اجباری است" :
                !isValid ? "گذرواژه باید شامل حروف انگلیسی و اعداد باشد (حداقل ۸ کاراکتر)" : '';
        break;
      case 'gymName':
        isValid = !!value;
        error = !isValid ? "نام باشگاه اجباری است" : '';
        break;
      case 'gymDescription':
        isValid = !!value;
        error = !isValid ? "توضیحات باشگاه اجباری است" : '';
        break;
      case 'gymAddress':
        isValid = !!value;
        error = !isValid ? "آدرس باشگاه اجباری است" : '';
        break;
      case 'instagram':
        // اینستاگرام اختیاری است
        isValid = true;
        break;
      case 'website':
        // وب‌سایت اختیاری است
        isValid = true;
        break;
      default:
        isValid = true;
    }

    setValidFields((prev) => ({ ...prev, [key]: isValid }));
    setErrors((prev) => ({ ...prev, [key]: error }));
  };

  // Validate initial values
  useEffect(() => {
    Object.entries(profile).forEach(([key, value]) => {
      if (key !== 'image' && value) {
        validateField(key as keyof TrainerProfile, value);
      }
    });
  }, []);

  const handleInputChange = (key: keyof TrainerProfile, value: string) => {
    // Filter input for name field - only allow Persian characters
    if (key === 'name') {
      const persianOnly = value.replace(/[^[\u0600-\u06FF\s]]/g, '');
      onUpdate(key, persianOnly);
      validateField(key, persianOnly);
      return;
    }

    // Filter input for phone field - only allow numbers
    if (key === 'phone') {
      let numbersOnly = value.replace(/[^0-9۰-۹]/g, '');
      if (!numbersOnly.startsWith('09') && !numbersOnly.startsWith('۰۹')) {
        numbersOnly = '09' + numbersOnly.slice(2);
      }
      onUpdate(key, numbersOnly);
      validateField(key, numbersOnly);
      return;
    }

    onUpdate(key, value);
    validateField(key, value);
  };

  const handleSave = () => {
    let hasErrors = false;
    Object.entries(profile).forEach(([key, value]) => {
      if (key !== 'image') {
        validateField(key as keyof TrainerProfile, value);
        if (!value || errors[key as keyof TrainerProfile]) {
          hasErrors = true;
        }
      }
    });

    if (hasErrors) {
      toast({
        variant: "destructive",
        title: "خطا در اطلاعات",
        description: "لطفاً خطاهای فرم را برطرف کنید"
      });
      return;
    }
    onSave();
  };

  const renderInput = (
    key: keyof Omit<TrainerProfile, 'image' | 'bio' | 'gymDescription'>,
    label: string,
    icon: React.ReactNode,
    type: string = 'text',
    placeholder: string
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Label>{label}</Label>
      <div className="relative">
        {icon}
        <Input
          type={key === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={key === 'phone' ? toPersianNumbers(profile[key]) : profile[key]}
          onChange={(e) => handleInputChange(key, e.target.value)}
          placeholder={placeholder}
          dir={['email', 'phone', 'instagram', 'website'].includes(key) ? "ltr" : undefined}
          className={cn(
            "pr-10 pl-10 transition-all duration-200",
            errors[key] ? "border-red-500 focus-visible:ring-red-500" : 
                      validFields[key] ? "border-green-500 focus-visible:ring-green-500" : "",
            ['email', 'phone', 'instagram', 'website'].includes(key) ? "text-left" : ""
          )}
          required={!['instagram', 'website'].includes(key)}
        />
        {key === 'password' && (
          <Button
            type="button"
            variant="ghost"
            className="absolute left-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground/70" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground/70" />
            )}
          </Button>
        )}
        {validFields[key] && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-3 top-3"
          >
            <Check className="h-4 w-4 text-green-500" />
          </motion.div>
        )}
      </div>
      {errors[key] && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {errors[key]}
        </motion.p>
      )}
    </motion.div>
  );

  // Tab navigation
  const sections = [
    { id: "personal", label: "اطلاعات شخصی", icon: <UserRound className="h-5 w-5" /> },
    { id: "gym", label: "اطلاعات باشگاه", icon: <Dumbbell className="h-5 w-5" /> },
    { id: "social", label: "شبکه‌های اجتماعی", icon: <Globe className="h-5 w-5" /> }
  ];

  const tabVariants = {
    active: { 
      backgroundColor: "hsl(var(--primary))", 
      color: "hsl(var(--primary-foreground))",
      scale: 1.05,
      boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", duration: 0.5 }
    },
    inactive: { 
      backgroundColor: "hsl(var(--muted) / 0.5)", 
      color: "hsl(var(--muted-foreground))",
      scale: 1,
      boxShadow: "none",
      transition: { type: "spring", duration: 0.5 }
    }
  };

  const renderTabContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderInput('name', 'نام و نام خانوادگی', 
              <UserRound className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
              'text',
              'نام خود را به فارسی وارد کنید'
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Label>بیوگرافی</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="درباره خود بنویسید"
                className={cn(
                  "resize-none h-32 transition-all duration-200",
                  errors.bio ? "border-red-500 focus-visible:ring-red-500" : 
                           validFields.bio ? "border-green-500 focus-visible:ring-green-500" : ""
                )}
                required
              />
              {errors.bio && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.bio}
                </motion.p>
              )}
            </motion.div>

            {renderInput('phone', 'شماره موبایل',
              <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
              'text',
              '۰۹۱۲۳۴۵۶۷۸۹'
            )}

            {renderInput('email', 'ایمیل',
              <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
              'email',
              'example@domain.com'
            )}

            {renderInput('password', 'گذرواژه',
              <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
              'password',
              'حداقل ۸ کاراکتر شامل حروف انگلیسی و اعداد'
            )}
          </motion.div>
        );
      case 'gym':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderInput('gymName', 'نام باشگاه',
              <Building className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
              'text',
              'باشگاه بدنسازی فیکس'
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Label>توضیحات باشگاه</Label>
              <Textarea
                value={profile.gymDescription}
                onChange={(e) => handleInputChange('gymDescription', e.target.value)}
                placeholder="توضیحات باشگاه را وارد کنید"
                className={cn(
                  "resize-none h-32 transition-all duration-200",
                  errors.gymDescription ? "border-red-500 focus-visible:ring-red-500" : 
                                validFields.gymDescription ? "border-green-500 focus-visible:ring-green-500" : ""
                )}
                required
              />
              {errors.gymDescription && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.gymDescription}
                </motion.p>
              )}
            </motion.div>

            {renderInput('gymAddress', 'آدرس باشگاه',
              <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
              'text',
              'تهران، خیابان ولیعصر، پلاک ۱۲۸'
            )}
          </motion.div>
        );
      case 'social':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderInput('instagram', 'اینستاگرام',
              <Instagram className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
              'text',
              'username'
            )}

            {renderInput('website', 'وب‌سایت',
              <Globe className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
              'text',
              'https://example.com'
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-white/50 border-primary/10 shadow-xl">
      <div className="p-6 space-y-6">
        {/* Desktop Tabs */}
        <div className="hidden lg:flex mb-6 gap-4">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm"
              variants={tabVariants}
              animate={activeSection === section.id ? "active" : "inactive"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {section.icon}
              {section.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-6 mt-6 border-t"
        >
          <Button 
            onClick={handleSave} 
            className="w-full group relative overflow-hidden"
            size="lg"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center">
              <Save className="ml-2 h-4 w-4 transition-transform group-hover:rotate-[-10deg]" />
              ذخیره تغییرات
            </span>
          </Button>
        </motion.div>
      </div>
    </Card>
  );
};
