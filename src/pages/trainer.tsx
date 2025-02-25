
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Camera, CreditCard, Eye, EyeOff, KeyRound, Mail, Phone, Save, Trash2, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TrainerProfile {
  name: string;
  bio: string;
  phone: string;
  email: string;
  password: string;
  price: string;
  image: string;
}

const defaultProfile: TrainerProfile = {
  name: "",
  bio: "",
  phone: "",
  email: "",
  password: "",
  price: "",
  image: "/placeholder.svg"
};

const TrainerProfile = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // بارگذاری اطلاعات از localStorage در هنگام اول
  useEffect(() => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error loading profile from localStorage:', error);
        toast({
          variant: "destructive",
          title: "خطا در بارگذاری اطلاعات",
          description: "مشکلی در بارگذاری اطلاعات پیش آمده است"
        });
      }
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem('trainerProfile', JSON.stringify(profile));
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
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً یک فایل تصویری انتخاب کنید",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "حجم تصویر نباید بیشتر از ۲ مگابایت باشد",
      });
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setProfile(prev => ({ ...prev, image: result }));
      localStorage.setItem('trainerProfile', JSON.stringify({ ...profile, image: result }));
      setIsUploading(false);
      toast({
        title: "آپلود موفق",
        description: "تصویر پروفایل با موفقیت بروزرسانی شد",
      });
    };

    reader.onerror = () => {
      setIsUploading(false);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در آپلود تصویر پیش آمد",
      });
    };

    reader.readAsDataURL(file);
  };

  const handleUpdate = (key: keyof TrainerProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5" />
      
      <div className="container mx-auto py-8 relative z-10 space-y-8 px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  پروفایل مربی
                </h2>
                <p className="text-muted-foreground">
                  اطلاعات پروفایل خود را مدیریت کنید
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-6">
            <Card className="relative overflow-hidden p-6 backdrop-blur-xl bg-white/50 border-primary/10">
              <div className="relative mx-auto w-48 h-48 group">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  onClick={(e) => e.stopPropagation()}
                />
                <Button
                  className={cn(
                    "w-48 h-48 p-0 relative rounded-2xl overflow-hidden",
                    "ring-4 ring-background shadow-2xl transition-all duration-500",
                    "hover:ring-primary/20 hover:shadow-primary/20 hover:scale-[1.02]",
                    "disabled:opacity-50",
                    isUploading ? "cursor-wait" : "cursor-pointer"
                  )}
                  variant="ghost"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    "bg-gradient-to-t from-black/60 to-transparent",
                    "opacity-0 group-hover:opacity-100 transition-all duration-300"
                  )}>
                    <Camera className="h-10 w-10 text-white drop-shadow-lg" />
                  </div>
                </Button>
              </div>
            </Card>
          </div>

          <Card className="backdrop-blur-xl bg-white/50 border-primary/10">
            <div className="p-6 space-y-6">
              <div>
                <Label>نام و نام خانوادگی</Label>
                <Input
                  value={profile.name}
                  onChange={(e) => handleUpdate('name', e.target.value)}
                  placeholder="نام خود را وارد کنید"
                />
              </div>

              <div>
                <Label>بیوگرافی</Label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => handleUpdate('bio', e.target.value)}
                  placeholder="درباره خود بنویسید"
                  className="resize-none h-32"
                />
              </div>

              <div>
                <Label>شماره موبایل</Label>
                <Input
                  value={toPersianNumbers(profile.phone)}
                  onChange={(e) => {
                    const persianValue = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    handleUpdate('phone', persianValue);
                  }}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <div>
                <Label>ایمیل</Label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleUpdate('email', e.target.value)}
                  placeholder="example@domain.com"
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <div>
                <Label>رمز عبور</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={profile.password}
                    onChange={(e) => handleUpdate('password', e.target.value)}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="pr-4 pl-10"
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
              </div>

              <div>
                <Label>هزینه هر جلسه (تومان)</Label>
                <Input
                  value={toPersianNumbers(profile.price)}
                  onChange={(e) => {
                    const persianValue = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    handleUpdate('price', persianValue);
                  }}
                  placeholder="۲۰۰,۰۰۰"
                  dir="ltr"
                  className="text-left"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {profile.price && `معادل ${toPersianNumbers(Number(profile.price).toLocaleString())} تومان`}
                </p>
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="ml-2 h-4 w-4" />
                ذخیره تغییرات
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;

