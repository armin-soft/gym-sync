
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Camera, UserRound, Phone, Ruler, Weight, Save, X, Coins } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { isValidPrice } from "@/utils/validation";

interface StudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StudentFormData) => void;
  student?: Student;
}

interface StudentFormData {
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment?: string;
}

interface Student extends StudentFormData {
  id: number;
}

export const StudentDialog = ({
  isOpen,
  onClose,
  onSave,
  student,
}: StudentDialogProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    name: student?.name || "",
    phone: student?.phone || "",
    height: student?.height || "",
    weight: student?.weight || "",
    image: student?.image || "/placeholder.svg",
    payment: student?.payment || "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        phone: student.phone,
        height: student.height,
        weight: student.weight,
        image: student.image,
        payment: student.payment || "",
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        height: "",
        weight: "",
        image: "/placeholder.svg",
        payment: "",
      });
    }
  }, [student]);

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
        setFormData({ ...formData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateField = (key: keyof StudentFormData, value: string) => {
    let error = "";
    switch (key) {
      case "name":
        if (!value) error = "نام و نام خانوادگی الزامی است";
        break;
      case "phone":
        if (!value) error = "شماره موبایل الزامی است";
        else if (!/^09\d{9}$/.test(value)) error = "شماره موبایل معتبر نیست";
        break;
      case "height":
        if (!value) error = "قد الزامی است";
        else if (!/^\d+$/.test(value)) error = "قد باید عدد باشد";
        break;
      case "weight":
        if (!value) error = "وزن الزامی است";
        else if (!/^\d+$/.test(value)) error = "وزن باید عدد باشد";
        break;
      case "image":
        // This is now optional
        break;
      case "payment":
        // Payment is optional but if provided, must be a valid number
        if (value && !/^\d+$/.test(value)) error = "مبلغ باید عدد باشد";
        break;
    }
    setErrors(prev => ({ ...prev, [key]: error }));
    return !error;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "payment") return; // Skip validation for payment as it's optional
      if (!validateField(key as keyof StudentFormData, value)) {
        isValid = false;
      }
    });

    // Validate payment separately since it's optional
    if (formData.payment && !validateField("payment", formData.payment)) {
      isValid = false;
    }

    if (!isValid) {
      toast({
        title: "خطا",
        description: "لطفاً همه فیلدها را به درستی پر کنید",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
  };

  // Format payment input with thousand separators for display
  const formatPayment = (value: string) => {
    // Remove non-digit characters
    const numericValue = value.replace(/\D/g, '');
    // Format with commas for thousands
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {student ? (
              <>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserRound className="h-4 w-4 text-blue-600" />
                </div>
                <span>ویرایش شاگرد</span>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <UserRound className="h-4 w-4 text-green-600" />
                </div>
                <span>افزودن شاگرد جدید</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            اطلاعات شاگرد را وارد کنید
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="relative">
                <img
                  src={formData.image}
                  alt="تصویر پروفایل"
                  className={`w-24 h-24 rounded-full object-cover ring-4 ${
                    errors.image 
                      ? "ring-red-200 border-red-500" 
                      : "ring-white"
                  } shadow-xl transition-transform duration-300 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={handleImageClick}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          {errors.image && (
            <p className="text-sm text-red-500 text-center">{errors.image}</p>
          )}

          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-muted-foreground" />
                نام و نام خانوادگی
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  validateField("name", e.target.value);
                }}
                className={errors.name ? "border-red-500" : ""}
                placeholder="نام و نام خانوادگی را وارد کنید"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                شماره موبایل
              </Label>
              <Input
                dir="ltr"
                className={`text-left ${errors.phone ? "border-red-500" : ""}`}
                value={toPersianNumbers(formData.phone)}
                onChange={(e) => {
                  const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                  setFormData({ ...formData, phone: value });
                  validateField("phone", value);
                }}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  قد (سانتی متر)
                </Label>
                <Input
                  dir="ltr"
                  className={`text-left ${errors.height ? "border-red-500" : ""}`}
                  value={toPersianNumbers(formData.height)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    setFormData({ ...formData, height: value });
                    validateField("height", value);
                  }}
                  placeholder="۱۷۵"
                />
                {errors.height && (
                  <p className="text-sm text-red-500 mt-1">{errors.height}</p>
                )}
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-muted-foreground" />
                  وزن (کیلوگرم)
                </Label>
                <Input
                  dir="ltr"
                  className={`text-left ${errors.weight ? "border-red-500" : ""}`}
                  value={toPersianNumbers(formData.weight)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    setFormData({ ...formData, weight: value });
                    validateField("weight", value);
                  }}
                  placeholder="۷۵"
                />
                {errors.weight && (
                  <p className="text-sm text-red-500 mt-1">{errors.weight}</p>
                )}
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-muted-foreground" />
                مبلغ (تومان)
              </Label>
              <Input
                dir="ltr"
                className={`text-left ${errors.payment ? "border-red-500" : ""}`}
                value={toPersianNumbers(formatPayment(formData.payment || ''))}
                onChange={(e) => {
                  // Remove non-numeric characters including Persian digits
                  const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, '');
                  setFormData({ ...formData, payment: value });
                  validateField("payment", value);
                }}
                placeholder="۵۰۰,۰۰۰"
              />
              {errors.payment && (
                <p className="text-sm text-red-500 mt-1">{errors.payment}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">مبلغ صدور برنامه‌ها به تومان</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="gap-2">
              <X className="h-4 w-4" />
              انصراف
            </Button>
            <Button type="submit" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Save className="h-4 w-4" />
              ذخیره
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
