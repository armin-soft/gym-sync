
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const trainerFormSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  bio: z.string().min(10, "بیوگرافی باید حداقل ۱۰ کاراکتر باشد"),
  phone: z.string().min(11, "شماره موبایل باید ۱۱ رقم باشد"),
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  price: z.string().min(1, "مبلغ نمی‌تواند خالی باشد"),
});

const TrainerProfile = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof trainerFormSchema>>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      name: "محمد عباسی",
      bio: "مربی با ۵ سال سابقه در زمینه بدنسازی و تناسب اندام",
      phone: "09123456789",
      email: "mohammad@example.com",
      password: "",
      price: "۲۰۰,۰۰۰",
    },
  });

  const onSubmit = (data: z.infer<typeof trainerFormSchema>) => {
    console.log(data);
    toast({
      title: "اطلاعات با موفقیت ذخیره شد",
      description: "تغییرات شما با موفقیت اعمال شد.",
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
            <Avatar className="w-32 h-32">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
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
                        <Input placeholder="درباره خود بنویسید" {...field} />
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
                        <FormLabel>شماره موبایل</FormLabel>
                        <FormControl>
                          <Input placeholder="09123456789" {...field} />
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
                          <Input placeholder="example@domain.com" {...field} />
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
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>
                          حداقل ۸ کاراکتر شامل حروف و اعداد
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
                          <Input placeholder="200,000" {...field} />
                        </FormControl>
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
