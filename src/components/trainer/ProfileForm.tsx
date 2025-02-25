
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
import { Eye, EyeOff, UserRound, Phone, Mail, Lock, Tag } from "lucide-react";
import { useState } from "react";

interface ProfileFormProps {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  onSave: () => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: (errors: Partial<Record<keyof TrainerProfile, string>>) => void;
}

export const ProfileForm = ({ profile, onUpdate, onSave, errors, setErrors }: ProfileFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Partial<Record<keyof TrainerProfile, string>> = {};

    if (!profile.name) {
      newErrors.name = "نام و نام خانوادگی اجباری است";
    } else if (!isValidPersianName(profile.name)) {
      newErrors.name = "لطفاً نام را به فارسی وارد کنید";
    }

    if (!profile.bio) {
      newErrors.bio = "بیوگرافی اجباری است";
    }

    if (!profile.phone) {
      newErrors.phone = "شماره موبایل اجباری است";
    } else if (!isValidIranianMobile(profile.phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست";
    }

    if (!profile.email) {
      newErrors.email = "ایمیل اجباری است";
    } else if (!isValidEmail(profile.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }

    if (!profile.password) {
      newErrors.password = "گذرواژه اجباری است";
    } else if (!isValidPassword(profile.password)) {
      newErrors.password = "گذرواژه باید شامل حروف انگلیسی و اعداد باشد (حداقل ۸ کاراکتر)";
    }

    if (!profile.price) {
      newErrors.price = "هزینه جلسه اجباری است";
    } else if (!isValidPrice(profile.price)) {
      newErrors.price = "لطفاً فقط اعداد وارد کنید";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "خطا در اطلاعات",
        description: "لطفاً خطاهای فرم را برطرف کنید"
      });
      return;
    }
    onSave();
  };

  return (
    <Card className="backdrop-blur-xl bg-white/50 border-primary/10">
      <div className="p-6 space-y-6">
        <div>
          <Label>نام و نام خانوادگی</Label>
          <div className="relative">
            <UserRound className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />
            <Input
              value={profile.name}
              onChange={(e) => onUpdate('name', e.target.value)}
              placeholder="نام خود را به فارسی وارد کنید"
              className={cn("pr-10", errors.name ? "border-red-500" : "")}
              required
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <Label>بیوگرافی</Label>
          <Textarea
            value={profile.bio}
            onChange={(e) => onUpdate('bio', e.target.value)}
            placeholder="درباره خود بنویسید"
            className={cn("resize-none h-32", errors.bio ? "border-red-500" : "")}
            required
          />
          {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
        </div>

        <div>
          <Label>شماره موبایل</Label>
          <div className="relative">
            <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />
            <Input
              value={toPersianNumbers(profile.phone)}
              onChange={(e) => {
                const persianValue = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                onUpdate('phone', persianValue);
              }}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              dir="ltr"
              className={cn("text-left pr-10", errors.phone ? "border-red-500" : "")}
              required
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <Label>ایمیل</Label>
          <div className="relative">
            <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              placeholder="example@domain.com"
              dir="ltr"
              className={cn("text-left pr-10", errors.email ? "border-red-500" : "")}
              required
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <Label>گذرواژه</Label>
          <div className="relative">
            <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />
            <Input
              type={showPassword ? "text" : "password"}
              value={profile.password}
              onChange={(e) => onUpdate('password', e.target.value)}
              placeholder="حداقل ۸ کاراکتر شامل حروف انگلیسی و اعداد"
              className={cn("pr-10 pl-10", errors.password ? "border-red-500" : "")}
              required
            />
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
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div>
          <Label>هزینه هر جلسه (تومان)</Label>
          <div className="relative">
            <Tag className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/70" />
            <Input
              value={toPersianNumbers(profile.price)}
              onChange={(e) => {
                const persianValue = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                onUpdate('price', persianValue);
              }}
              placeholder="۲۰۰,۰۰۰"
              dir="ltr"
              className={cn("text-left pr-10", errors.price ? "border-red-500" : "")}
              required
            />
          </div>
          {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
          <p className="text-sm text-muted-foreground mt-1">
            {profile.price && `معادل ${toPersianNumbers(Number(profile.price).toLocaleString())} تومان`}
          </p>
        </div>

        <Button onClick={handleSave} className="w-full">
          ذخیره تغییرات
        </Button>
      </div>
    </Card>
  );
};
