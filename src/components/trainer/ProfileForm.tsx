
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { TrainerProfile } from "@/types/trainer";
import { isValidEmail, isValidIranianMobile, isValidPassword, isValidPersianName, isValidPrice } from "@/utils/validation";
import { Eye, EyeOff, UserRound, Phone, Mail, Lock, Tag, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface ProfileFormProps {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  onSave: () => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: (errors: Partial<Record<keyof TrainerProfile, string>>) => void;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: (validFields: Partial<Record<keyof TrainerProfile, boolean>>) => void;
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
      case 'price':
        isValid = isValidPrice(value);
        error = !value ? "هزینه جلسه اجباری است" :
                !isValid ? "لطفاً فقط اعداد وارد کنید" : '';
        break;
      default:
        isValid = true;
    }

    setValidFields(prev => ({ ...prev, [key]: isValid }));
    setErrors(prev => ({ ...prev, [key]: error }));
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

    // Filter input for phone and price fields - only allow numbers
    if (key === 'phone' || key === 'price') {
      let numbersOnly = value.replace(/[^0-9۰-۹]/g, '');
      if (key === 'phone' && !numbersOnly.startsWith('09') && !numbersOnly.startsWith('۰۹')) {
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
    key: keyof Omit<TrainerProfile, 'image' | 'bio'>,
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
          value={key === 'phone' || key === 'price' ? toPersianNumbers(profile[key]) : profile[key]}
          onChange={(e) => handleInputChange(key, e.target.value)}
          placeholder={placeholder}
          dir={['email', 'phone', 'price'].includes(key) ? "ltr" : undefined}
          className={cn(
            "pr-10 pl-10",
            errors[key] ? "border-red-500" : validFields[key] ? "border-green-500" : "",
            ['email', 'phone', 'price'].includes(key) ? "text-left" : ""
          )}
          required
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

        {renderInput('price', 'هزینه هر جلسه (تومان)',
          <Tag className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />,
          'text',
          '۲۰۰,۰۰۰'
        )}

        {profile.price && (
          <p className="text-sm text-muted-foreground mt-1">
            معادل {toPersianNumbers(Number(profile.price).toLocaleString())} تومان
          </p>
        )}

        <Button onClick={handleSave} className="w-full">
          ذخیره تغییرات
        </Button>
      </div>
    </Card>
  );
};
