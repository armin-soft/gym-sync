import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, CreditCard, Eye, EyeOff, KeyRound, Mail, Phone, Save, Trash2, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const persianCharRegex = /^[\u0600-\u06FF\s]+$/;
const persianNumberRegex = /^[۰-۹]+$/;
const iranianPhoneRegex = /^09[0-9]{9}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const trainerFormSchema = z.object({
  name: z.string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .regex(persianCharRegex, "فقط حروف فارسی مجاز است"),
  bio: z.string()
    .min(10, "بیوگرافی باید حداقل ۱۰ کاراکتر باشد")
    .max(500, "بیوگرافی نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد")
    .regex(persianCharRegex, "فقط حروف فارسی مجاز است"),
  phone: z.string()
    .regex(iranianPhoneRegex, "شماره موبایل معتبر نیست. مثال: ۰۹۱۲۳۴۵۶۷۸۹"),
  email: z.string()
    .regex(emailRegex, "ایمیل معتبر نیست"),
  password: z.string()
    .min(8, "گذرواژه باید حداقل ۸ کاراکتر باشد")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "گذرواژه باید شامل حروف بزرگ، کوچک و اعداد باشد"),
  price: z.string()
    .min(1, "مبلغ نمی‌تواند خالی باشد")
    .regex(/^\d+$/, "لطفاً مبلغ را به صورت عدد وارد کنید"),
});

type TrainerFormData = z.infer<typeof trainerFormSchema>;

const TrainerProfile = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("/placeholder.svg");
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TrainerFormData>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      name: "",
      bio: "",
      phone: "",
      email: "",
      password: "",
      price: "",
    },
  });

  const calculateProfileCompletion = (data: Partial<TrainerFormData>): number => {
    const fields = ['name', 'bio', 'phone', 'email', 'password', 'price'] as const;
    const hasAvatar = avatarUrl !== "/placeholder.svg";
    const completedFields = fields.filter(field => Boolean(data[field])).length;
    return Math.round(((completedFields + (hasAvatar ? 1 : 0)) / (fields.length + 1)) * 100);
  };

  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const savedTrainer = localStorage.getItem('trainerData');
    const savedAvatar = localStorage.getItem('trainerAvatar');
    
    if (savedTrainer) {
      const data = JSON.parse(savedTrainer);
      form.reset(data);
      setCompletionPercentage(calculateProfileCompletion(data));
    }
    
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, [form]);

  const handleImageClick = () => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageDelete = () => {
    setAvatarUrl("/placeholder.svg");
    localStorage.removeItem('trainerAvatar');
    const currentData = form.getValues();
    setCompletionPercentage(calculateProfileCompletion(currentData));
    
    toast({
      description: "تصویر پروفایل با موفقیت حذف شد.",
    });
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "خطا",
          description: "حجم تصویر نباید بیشتر از ۲ مگابایت باشد",
          variant: "destructive",
        });
        return;
      }

      try {
        setIsUploading(true);
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const newAvatarUrl = e.target?.result as string;
          if (newAvatarUrl) {
            setAvatarUrl(newAvatarUrl);
            localStorage.setItem('trainerAvatar', newAvatarUrl);
            
            const currentData = form.getValues();
            setCompletionPercentage(calculateProfileCompletion({
              ...currentData,
            }));
            
            toast({
              description: "تصویر پروفایل با موفقیت به‌روزرسانی شد.",
            });
          }
        };

        reader.readAsDataURL(file);
      } catch (error) {
        toast({
          title: "خطا",
          description: "مشکلی در آپلود تصویر پیش آمد. لطفاً مجدداً تلاش کنید.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onSubmit = (data: TrainerFormData) => {
    localStorage.setItem('trainerData', JSON.stringify(data));
    setCompletionPercentage(calculateProfileCompletion(data));
    
    toast({
      title: "اطلاعات با موفقیت ذخیره شد",
      description: "تغییرات شما با موفقیت اعمال شد.",
      duration: 3000,
    });
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      setCompletionPercentage(calculateProfileCompletion(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary/90 to-primary/60 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-2 duration-1000">
          پروفایل مربی
        </h1>
        <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-150">
          اطلاعات پروفایل خود را مدیریت کنید
        </p>
      </div>

      <Card className="overflow-hidden border-2 border-primary/10 shadow-lg shadow-primary/5 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
        <div className="relative h-40 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
          <div className="absolute -bottom-16 right-6">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUploading}
            />
            <div className="relative group">
              <Avatar 
                className={cn(
                  "h-32 w-32 border-4 border-background transition-all duration-300 ease-out",
                  "group-hover:border-primary/20 group-hover:shadow-2xl group-hover:scale-105",
                  isUploading ? "opacity-50 cursor-wait" : "cursor-pointer"
                )}
                onClick={handleImageClick}
              >
                <AvatarImage src={avatarUrl} className="object-cover" />
                <AvatarFallback className="text-4xl bg-primary/5">
                  {form.getValues("name")?.slice(0, 2).toUpperCase() || "MA"}
                </AvatarFallback>
              </Avatar>
              <div className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 transition-all duration-300 ease-out",
                "group-hover:opacity-100",
                isUploading && "opacity-100"
              )}>
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            {avatarUrl !== "/placeholder.svg" && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute -left-4 top-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleImageDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="absolute bottom-4 right-44 left-6">
            <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              تکمیل پروفایل: {toPersianNumbers(completionPercentage)}٪
            </p>
          </div>
        </div>

        <div className="p-6 pt-20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      نام و نام خانوادگی
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="نام خود را وارد کنید"
                        className="transition-all duration-300 border-primary/20 focus-visible:border-primary/40
                                 hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      بیوگرافی
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="درباره خود بنویسید" 
                        className="resize-none h-32 transition-all duration-300 border-primary/20 
                                 focus-visible:border-primary/40 hover:border-primary/30
                                 focus-visible:ring-2 focus-visible:ring-primary/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        شماره موبایل
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                          dir="ltr"
                          className="text-left transition-all duration-300 border-primary/20 
                                   focus-visible:border-primary/40 hover:border-primary/30
                                   focus-visible:ring-2 focus-visible:ring-primary/20"
                          {...field}
                          value={toPersianNumbers(field.value)}
                          onChange={(e) => {
                            const persianValue = e.target.value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                            field.onChange(persianValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        ایمیل
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="example@domain.com" 
                          dir="ltr"
                          className="text-left transition-all duration-300 border-primary/20 
                                   focus-visible:border-primary/40 hover:border-primary/30
                                   focus-visible:ring-2 focus-visible:ring-primary/20"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4" />
                        گذرواژه
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••" 
                            dir="ltr"
                            className="text-left transition-all duration-300 border-primary/20 
                                     focus-visible:border-primary/40 hover:border-primary/30
                                     focus-visible:ring-2 focus-visible:ring-primary/20 pr-10"
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
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
                      </FormControl>
                      <FormDescription className="text-xs">
                        حداقل ۸ کاراکتر شامل حروف بزرگ، کوچک و اعداد
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        مبلغ برنامه تمرینی (تومان)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="۲۰۰,۰۰۰" 
                          dir="ltr"
                          className="text-left transition-all duration-300 border-primary/20 
                                   focus-visible:border-primary/40 hover:border-primary/30
                                   focus-visible:ring-2 focus-visible:ring-primary/20"
                          value={field.value ? toPersianNumbers(field.value) : ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            const numericValue = value.replace(/[^0-9۰-۹]/g, "");
                            const englishValue = numericValue.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                            field.onChange(englishValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        {field.value && `معادل ${toPersianNumbers(Number(field.value).toLocaleString())} تومان`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full md:w-auto bg-gradient-to-r from-primary/90 to-primary/80 hover:to-primary
                         transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Save className="ml-2 h-4 w-4" />
                ذخیره تغییرات
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default TrainerProfile;
