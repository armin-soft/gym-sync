import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, SaveIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const trainerFormSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  bio: z.string()
    .min(10, "بیوگرافی باید حداقل ۱۰ کاراکتر باشد")
    .max(500, "بیوگرافی نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"),
  phone: z.string()
    .min(11, "شماره موبایل باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل باید با ۰۹ شروع شود"),
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "رمز عبور باید شامل حروف بزرگ، کوچک و اعداد باشد"),
  price: z.string()
    .min(1, "مبلغ نمی‌تواند خالی باشد")
    .regex(/^\d+$/, "لطفاً مبلغ را به صورت عدد وارد کنید"),
});

type TrainerFormData = z.infer<typeof trainerFormSchema>;

const TrainerProfile = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("/placeholder.svg");

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

  // بازیابی داده‌های ذخیره شده در هنگام بارگذاری کامپوننت
  useEffect(() => {
    const savedTrainer = localStorage.getItem('trainerData');
    const savedAvatar = localStorage.getItem('trainerAvatar');
    
    if (savedTrainer) {
      const data = JSON.parse(savedTrainer);
      form.reset(data);
    }
    
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, [form]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatarUrl = e.target?.result as string;
        setAvatarUrl(newAvatarUrl);
        localStorage.setItem('trainerAvatar', newAvatarUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: TrainerFormData) => {
    localStorage.setItem('trainerData', JSON.stringify(data));
    toast({
      title: "اطلاعات با موفقیت ذخیره شد",
      description: "تغییرات شما با موفقیت اعمال شد.",
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">پروفایل مربی</h1>
        <p className="text-muted-foreground">
          اطلاعات پروفایل خود را مدیریت کنید
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Avatar 
              className="w-32 h-32 cursor-pointer border-2 border-primary/10 hover:border-primary/30 transition-colors"
              onClick={handleImageClick}
            >
              <AvatarImage src={avatarUrl} className="object-cover" />
              <AvatarFallback className="text-2xl">MA</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="w-full" onClick={handleImageClick}>
              <Camera className="ml-2 h-4 w-4" />
              تغییر تصویر
            </Button>
          </div>

          <div className="flex-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام و نام خانوادگی</FormLabel>
                      <FormControl>
                        <Input placeholder="نام خود را وارد کنید" {...field} />
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
                      <FormLabel>بیوگرافی</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="درباره خود بنویسید" 
                          className="resize-none h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        حداکثر ۵۰۰ کاراکتر
                      </FormDescription>
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
                        <FormLabel>شماره موبایل</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                            dir="ltr"
                            className="text-left"
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
                        <FormLabel>ایمیل</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="example@domain.com" 
                            dir="ltr"
                            className="text-left"
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
                        <FormLabel>رمز عبور</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            dir="ltr"
                            className="text-left"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
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
                        <FormLabel>مبلغ برنامه تمرینی (تومان)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="۲۰۰,۰۰۰" 
                            dir="ltr"
                            className="text-left"
                            value={field.value ? toPersianNumbers(field.value) : ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              const numericValue = value.replace(/[^0-9۰-۹]/g, "");
                              const englishValue = numericValue.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                              field.onChange(englishValue);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value && `معادل ${toPersianNumbers(Number(field.value).toLocaleString())} تومان`}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  <SaveIcon className="ml-2 h-4 w-4" />
                  ذخیره تغییرات
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrainerProfile;
