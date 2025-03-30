
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
import { Student } from "@/components/students/StudentTypes";
import { motion, AnimatePresence } from "framer-motion";

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
  payment: string;
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
        break;
      case "payment":
        if (!value) error = "مبلغ الزامی است";
        else if (!/^\d+$/.test(value)) error = "مبلغ باید عدد باشد";
        break;
    }
    setErrors(prev => ({ ...prev, [key]: error }));
    return !error;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    Object.entries(formData).forEach(([key, value]) => {
      if (!validateField(key as keyof StudentFormData, value)) {
        isValid = false;
      }
    });

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

  const formatPayment = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dialogVariants}
            className="relative"
          >
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-500 to-violet-600 -z-10" />
            
            <DialogHeader className="pt-8 pb-4 px-6 text-white">
              <motion.div variants={itemVariants} className="mb-10">
                <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                  {student ? (
                    <>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <UserRound className="h-4 w-4 text-white" />
                      </div>
                      <span>ویرایش شاگرد</span>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <UserRound className="h-4 w-4 text-white" />
                      </div>
                      <span>افزودن شاگرد جدید</span>
                    </>
                  )}
                </DialogTitle>
                <DialogDescription className="text-white/80 mt-2">
                  اطلاعات شاگرد را وارد کنید
                </DialogDescription>
              </motion.div>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-t-3xl px-6 pt-6 pb-6 shadow-[0_-40px_80px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_-40px_80px_-15px_rgba(0,0,0,0.5)] space-y-6">
              <div className="flex justify-center -mt-16 mb-6">
                <motion.div 
                  variants={itemVariants} 
                  className="relative group"
                >
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="تصویر پروفایل"
                      className={`w-24 h-24 rounded-full object-cover ring-4 ${
                        errors.image 
                          ? "ring-red-200 border-red-500" 
                          : "ring-white dark:ring-slate-800"
                      } bg-white dark:bg-slate-800 shadow-xl transition-transform duration-300 group-hover:scale-105 z-10`}
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
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
                  
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-lg scale-90 -z-10" />
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <UserRound className="h-4 w-4 text-indigo-500" />
                    نام و نام خانوادگی
                  </Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      validateField("name", e.target.value);
                    }}
                    className={`${errors.name ? "border-red-500 focus-visible:ring-red-400" : "focus-visible:ring-indigo-400"} bg-slate-50 dark:bg-slate-800/50`}
                    placeholder="نام و نام خانوادگی را وارد کنید"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-indigo-500" />
                    شماره موبایل
                  </Label>
                  <Input
                    dir="ltr"
                    className={`text-left ${errors.phone ? "border-red-500 focus-visible:ring-red-400" : "focus-visible:ring-indigo-400"} bg-slate-50 dark:bg-slate-800/50`}
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
                    <Label className="flex items-center gap-2 mb-2">
                      <Ruler className="h-4 w-4 text-indigo-500" />
                      قد (سانتی متر)
                    </Label>
                    <Input
                      dir="ltr"
                      className={`text-left ${errors.height ? "border-red-500 focus-visible:ring-red-400" : "focus-visible:ring-indigo-400"} bg-slate-50 dark:bg-slate-800/50`}
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
                    <Label className="flex items-center gap-2 mb-2">
                      <Weight className="h-4 w-4 text-indigo-500" />
                      وزن (کیلوگرم)
                    </Label>
                    <Input
                      dir="ltr"
                      className={`text-left ${errors.weight ? "border-red-500 focus-visible:ring-red-400" : "focus-visible:ring-indigo-400"} bg-slate-50 dark:bg-slate-800/50`}
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
                  <Label className="flex items-center gap-2 mb-2">
                    <Coins className="h-4 w-4 text-indigo-500" />
                    <span>مبلغ (تومان)</span>
                  </Label>
                  <Input
                    dir="ltr"
                    className={`text-left ${errors.payment ? "border-red-500 focus-visible:ring-red-400" : "focus-visible:ring-indigo-400"} bg-slate-50 dark:bg-slate-800/50`}
                    value={toPersianNumbers(formatPayment(formData.payment || ''))}
                    onChange={(e) => {
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
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose} className="gap-2">
                  <X className="h-4 w-4" />
                  انصراف
                </Button>
                <Button 
                  type="submit" 
                  className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
                >
                  <Save className="h-4 w-4" />
                  ذخیره
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
