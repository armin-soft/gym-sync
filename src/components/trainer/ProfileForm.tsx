
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
import { Eye, EyeOff, UserRound, Phone, Mail, Lock, Building, MapPin, FileText, Check, Save, Instagram, Globe } from "lucide-react";
import { useState, useEffect } from "react";

interface ProfileFormProps {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  onSave: () => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
}

export const ProfileForm = ({ 
  profile, 
  onUpdate, 
  onSave, 
  errors, 
  setErrors,
  validFields,
  setValidFields 
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
    <div>
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
            "pr-10 pl-10",
            errors[key] ? "border-red-500" : validFields[key] ? "border-green-500" : "",
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
          <Check className="absolute left-3 top-3 h-4 w-4 text-green-500" />
        )}
      </div>
      {errors[key] && <p className="mt-1 text-sm text-red-500">{errors[key]}</p>}
    </div>
  );

  return (
    <Card className="backdrop-blur-xl bg-white/50 border-primary/10">
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium border-b pb-2 mb-4">اطلاعات شخصی</h3>
        
        {renderInput('name', 'نام و نام خانوادگی', 
          <UserRound className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
          'text',
          'نام خود را به فارسی وارد کنید'
        )}

        <div>
          <Label>بیوگرافی</Label>
          <Textarea
            value={profile.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="درباره خود بنویسید"
            className={cn(
              "resize-none h-32",
              errors.bio ? "border-red-500" : validFields.bio ? "border-green-500" : ""
            )}
            required
          />
          {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
          {validFields.bio && <Check className="h-4 w-4 text-green-500 mt-1" />}
        </div>

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

        <h3 className="text-lg font-medium border-b pb-2 mb-4 mt-8">اطلاعات ارتباطی و شبکه‌های اجتماعی</h3>

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

        <h3 className="text-lg font-medium border-b pb-2 mb-4 mt-8">اطلاعات باشگاه</h3>

        {renderInput('gymName', 'نام باشگاه',
          <Building className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
          'text',
          'باشگاه بدنسازی فیکس'
        )}

        <div>
          <Label>توضیحات باشگاه</Label>
          <Textarea
            value={profile.gymDescription}
            onChange={(e) => handleInputChange('gymDescription', e.target.value)}
            placeholder="توضیحات باشگاه را وارد کنید"
            className={cn(
              "resize-none h-32",
              errors.gymDescription ? "border-red-500" : validFields.gymDescription ? "border-green-500" : ""
            )}
            required
          />
          {errors.gymDescription && <p className="mt-1 text-sm text-red-500">{errors.gymDescription}</p>}
          {validFields.gymDescription && <Check className="h-4 w-4 text-green-500 mt-1" />}
        </div>

        {renderInput('gymAddress', 'آدرس باشگاه',
          <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
          'text',
          'تهران، خیابان ولیعصر، پلاک ۱۲۸'
        )}

        <Button onClick={handleSave} className="w-full">
          <Save className="ml-2 h-4 w-4" />
          ذخیره تغییرات
        </Button>
      </div>
    </Card>
  );
};
