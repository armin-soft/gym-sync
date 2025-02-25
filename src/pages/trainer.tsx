
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  Users, 
  Star, 
  Medal, 
  Timer, 
  Mail, 
  Phone, 
  Instagram,
  MessageCircle,
  User
} from "lucide-react";
import { useEffect, useState } from "react";

// تعریف تایپ داده های مربی
interface TrainerData {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  telegram: string;
  experience: string;
  students: string;
  specialties: string;
  certifications: string;
}

// داده های پیش فرض
const defaultTrainerData: TrainerData = {
  name: "علی محمدی",
  email: "ali@example.com",
  phone: "09123456789",
  instagram: "ali_mohammadi",
  telegram: "@ali_mohammadi",
  experience: "5",
  students: "25",
  specialties: "بدنسازی، TRX، فیتنس",
  certifications: "مربی گری درجه 1 فدراسیون بدنسازی",
};

const LOCAL_STORAGE_KEY = "trainerData";

const Trainer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<TrainerData>(defaultTrainerData);
  
  // خواندن اطلاعات از localStorage در هنگام بارگذاری
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing trainer data from localStorage:", error);
        // در صورت خطا در خواندن داده، از داده های پیش فرض استفاده می کنیم
        setFormData(defaultTrainerData);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // ذخیره اطلاعات در localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
      
      toast({
        variant: "success",
        title: "اطلاعات با موفقیت ذخیره شد",
        description: "پروفایل شما بروز رسانی شد",
      });
    } catch (error) {
      console.error("Error saving trainer data to localStorage:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره اطلاعات",
        description: "متاسفانه مشکلی در ذخیره اطلاعات پیش آمده است",
      });
    }
  };

  const handleInputChange = (key: keyof TrainerData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">پروفایل مربی</h2>
          <p className="text-muted-foreground mt-2">
            مدیریت اطلاعات و تنظیمات پروفایل
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* اطلاعات آماری */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">تعداد شاگردان</h3>
                  <p className="text-2xl font-bold">{toPersianNumbers(formData.students)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">تخصص ها</h3>
                  <p className="text-sm">{formData.specialties}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <Medal className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">مدارک</h3>
                  <p className="text-sm">{formData.certifications}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                  <Timer className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">سابقه کار</h3>
                  <p className="text-2xl font-bold">{toPersianNumbers(formData.experience)} سال</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* فرم ویرایش اطلاعات */}
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    نام و نام خانوادگی
                  </Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    آدرس ایمیل
                  </Label>
                  <Input
                    type="email"
                    dir="ltr"
                    className="text-left"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@domain.com"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    شماره موبایل
                  </Label>
                  <Input
                    dir="ltr"
                    className="text-left"
                    value={toPersianNumbers(formData.phone)}
                    onChange={(e) => {
                      const persianValue = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                      handleInputChange("phone", persianValue);
                    }}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      اینستاگرام
                    </Label>
                    <Input
                      dir="ltr"
                      className="text-left"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                      placeholder="نام کاربری اینستاگرام"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      تلگرام
                    </Label>
                    <Input
                      dir="ltr"
                      className="text-left"
                      value={formData.telegram}
                      onChange={(e) => handleInputChange("telegram", e.target.value)}
                      placeholder="نام کاربری تلگرام"
                    />
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    تخصص ها
                  </Label>
                  <Input
                    value={formData.specialties}
                    onChange={(e) => handleInputChange("specialties", e.target.value)}
                    placeholder="تخصص های خود را وارد کنید"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Medal className="w-4 h-4" />
                    مدارک
                  </Label>
                  <Input
                    value={formData.certifications}
                    onChange={(e) => handleInputChange("certifications", e.target.value)}
                    placeholder="مدارک خود را وارد کنید"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Timer className="w-4 h-4" />
                      سابقه کار (سال)
                    </Label>
                    <Input
                      value={toPersianNumbers(formData.experience)}
                      onChange={(e) => {
                        const persianValue = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                        handleInputChange("experience", persianValue);
                      }}
                      placeholder="مثال: ۵"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      تعداد شاگردان
                    </Label>
                    <Input
                      value={toPersianNumbers(formData.students)}
                      onChange={(e) => {
                        const persianValue = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                        handleInputChange("students", persianValue);
                      }}
                      placeholder="مثال: ۲۵"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                ذخیره تغییرات
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Trainer;
