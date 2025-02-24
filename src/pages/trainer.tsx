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

  const handleImageDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      if (!file.type.startsWith('image/')) {
        toast({
          title: "خطا",
          description: "لطفاً یک فایل تصویری انتخاب کنید",
          variant: "destructive",
        });
        return;
      }

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
            setCompletionPercentage(calculateProfileCompletion(currentData));
            
            toast({
              description: "تصویر پروفایل با موفقیت به‌روزرسانی شد.",
            });
          }
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "خطا",
          description: "مشکلی در آپلود تصویر پیش آمد. لطفاً مجدداً تلاش کنید.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
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
    <div className="relative min-h-screen w-full bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto py-8 relative z-10">
        <div className="relative flex flex-col items-start gap-4 mb-8 p-6 rounded-lg 
                      bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/10
                      animate-in fade-in slide-in-from-top duration-1000">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground/90 to-foreground/60 bg-clip-text text-transparent">
            پروفایل مربی
          </h1>
          <p className="text-lg text-muted-foreground">
            مشخصات و اطلاعات خود را به‌روزرسانی کنید
          </p>
          <div className="h-1.5 w-32 bg-gradient-to-r from-primary/80 to-primary/40 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-6">
            <Card className="relative overflow-hidden p-6 backdrop-blur-xl bg-white/50 border-primary/10">
              <div className="relative group mx-auto w-48 h-48">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  onChange={handleImageChange}
                  disabled={isUploading}
                />
                <Avatar 
                  className={cn(
                    "w-48 h-48 rounded-2xl ring-4 ring-background shadow-2xl transition-all duration-500",
                    "group-hover:ring-primary/20 group-hover:shadow-primary/20 group-hover:scale-[1.02]",
                    isUploading ? "opacity-50 cursor-wait" : "cursor-pointer"
                  )}
                  onClick={handleImageClick}
                >
                  <AvatarImage src={avatarUrl} className="object-cover" />
                  <AvatarFallback className="text-6xl bg-primary/5">
                    {form.getValues("name")?.slice(0, 2).toUpperCase() || "MA"}
                  </AvatarFallback>
                </Avatar>

                <div className={cn(
                  "absolute inset-0 flex items-center justify-center rounded-2xl",
                  "bg-gradient-to-t from-black/60 to-transparent",
                  "opacity-0 group-hover:opacity-100 transition-all duration-300"
                )}>
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
                      <span className="text-white text-sm">در حال آپلود...</span>
                    </div>
                  ) : (
                    <Camera className="h-10 w-10 text-white drop-shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                  )}
                </div>

                {avatarUrl !== "/placeholder.svg" && !isUploading && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 
                             transition-all duration-300 hover:scale-110 shadow-lg"
                    onClick={handleImageDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground/70">تکمیل پروفایل</span>
                  <span className="text-sm font-bold">{toPersianNumbers(completionPercentage)}٪</span>
                </div>
                <div className="h-2 w-full bg-primary/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary/80 to-primary/60 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-xl bg-white/50 border-primary/10 space-y-4">
              <h3 className="text-lg font-semibold">راهنمای تکمیل پروفایل</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary/60" />
                  تصویر پروفایل خود را آپلود کنید
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary/60" />
                  اطلاعات تماس را کامل وارد کنید
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary/60" />
                  بیوگرافی خود را بنویسید
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary/60" />
                  مبلغ برنامه تمرینی را مشخص کنید
                </li>
              </ul>
            </Card>
          </div>

          <Card className="backdrop-blur-xl bg-white/50 border-primary/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary/80 to-primary/40" />
                    <h2 className="text-xl font-semibold">اطلاعات شخصی</h2>
                  </div>
                  
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-foreground/70">
                            <User className="h-4 w-4" />
                            نام و نام خانوادگی
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="نام خود را وارد کنید"
                              className="transition-all duration-300 border-primary/10 focus-visible:border-primary/30
                                       hover:border-primary/20 focus-visible:ring-2 focus-visible:ring-primary/20
                                       bg-white/50"
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
                          <FormLabel className="flex items-center gap-2 text-foreground/70">
                            <User className="h-4 w-4" />
                            بیوگرافی
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="درباره خود بنویسید" 
                              className="resize-none h-32 transition-all duration-300 border-primary/10 
                                       focus-visible:border-primary/30 hover:border-primary/20
                                       focus-visible:ring-2 focus-visible:ring-primary/20
                                       bg-white/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary/80 to-primary/40" />
                    <h2 className="text-xl font-semibold">اطلاعات تماس</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-foreground/70">
                            <Phone className="h-4 w-4" />
                            شماره موبایل
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                              dir="ltr"
                              className="text-left transition-all duration-300 border-primary/10 
                                       focus-visible:border-primary/30 hover:border-primary/20
                                       focus-visible:ring-2 focus-visible:ring-primary/20
                                       bg-white/50"
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
                          <FormLabel className="flex items-center gap-2 text-foreground/70">
                            <Mail className="h-4 w-4" />
                            ایمیل
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="example@domain.com" 
                              dir="ltr"
                              className="text-left transition-all duration-300 border-primary/10 
                                       focus-visible:border-primary/30 hover:border-primary/20
                                       focus-visible:ring-2 focus-visible:ring-primary/20
                                       bg-white/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary/80 to-primary/40" />
                    <h2 className="text-xl font-semibold">امنیت و کسب‌وکار</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-foreground/70">
                            <KeyRound className="h-4 w-4" />
                            گذرواژه
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••" 
                                dir="ltr"
                                className="text-left transition-all duration-300 border-primary/10 
                                         focus-visible:border-primary/30 hover:border-primary/20
                                         focus-visible:ring-2 focus-visible:ring-primary/20 pr-10
                                         bg-white/50"
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
                          <FormLabel className="flex items-center gap-2 text-foreground/70">
                            <CreditCard className="h-4 w-4" />
                            مبلغ برنامه تمرینی (تومان)
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="۲۰۰,۰۰۰" 
                              dir="ltr"
                              className="text-left transition-all duration-300 border-primary/10 
                                       focus-visible:border-primary/30 hover:border-primary/20
                                       focus-visible:ring-2 focus-visible:ring-primary/20
                                       bg-white/50"
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
                </div>

                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-gradient-to-r from-primary/90 to-primary/80 hover:to-primary
                           transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                           shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  <Save className="ml-2 h-4 w-4" />
                  ذخیره تغییرات
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
