
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Phone, 
  Calendar, 
  Ruler, 
  Weight, 
  DollarSign,
  Upload,
  UserCheck,
  Save,
  X
} from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

interface StudentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student;
  onSave: (studentData: Partial<Student>) => void;
}

export const StudentFormDialog: React.FC<StudentFormDialogProps> = ({
  open,
  onOpenChange,
  student,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Student>>({
    name: "",
    phone: "",
    age: "",
    height: "",
    weight: "",
    payment: "",
    gender: undefined,
    image: "/Assets/Image/Place-Holder.svg"
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        phone: student.phone || "",
        age: student.age || "",
        height: student.height || "",
        weight: student.weight || "",
        payment: student.payment || "",
        gender: student.gender,
        image: student.image || "/Assets/Image/Place-Holder.svg"
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        age: "",
        height: "",
        weight: "",
        payment: "",
        gender: undefined,
        image: "/Assets/Image/Place-Holder.svg"
      });
    }
  }, [student, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name?.trim()) {
      toast({
        title: "خطا",
        description: "نام شاگرد الزامی است",
        variant: "destructive"
      });
      return;
    }

    const studentData = {
      ...formData,
      id: student?.id || Date.now(),
      createdAt: student?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(studentData);
    onOpenChange(false);
    
    toast({
      title: student ? "ویرایش موفق" : "افزودن موفق",
      description: student 
        ? "اطلاعات شاگرد با موفقیت ویرایش شد" 
        : "شاگرد جدید با موفقیت اضافه شد"
    });
  };

  const handleChange = (field: keyof Student, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-0 shadow-2xl" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          {/* هدر */}
          <div className="student-gradient-bg p-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center">
                {student ? (
                  <>
                    <UserCheck className="ml-3 h-7 w-7" />
                    ویرایش اطلاعات شاگرد
                  </>
                ) : (
                  <>
                    <User className="ml-3 h-7 w-7" />
                    افزودن شاگرد جدید
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* محتوا */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* اطلاعات اصلی */}
              <Card className="p-6 bg-slate-50 dark:bg-slate-800/50 border-0">
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage src={formData.image} alt={formData.name} />
                    <AvatarFallback className="student-gradient-bg text-white text-2xl font-bold">
                      {formData.name ? formData.name.charAt(0) : "؟"}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" type="button">
                    <Upload className="ml-2 h-4 w-4" />
                    آپلود تصویر
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium flex items-center">
                      <User className="ml-2 h-4 w-4 text-emerald-500" />
                      نام شاگرد *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="نام کامل شاگرد"
                      className="bg-white dark:bg-slate-900"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium flex items-center">
                      <Phone className="ml-2 h-4 w-4 text-sky-500" />
                      شماره تلفن
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="09123456789"
                      className="bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm font-medium flex items-center">
                      <Calendar className="ml-2 h-4 w-4 text-purple-500" />
                      سن
                    </Label>
                    <Input
                      id="age"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      placeholder="25"
                      className="bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">جنسیت</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={formData.gender === "male" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleChange("gender", "male")}
                        className={formData.gender === "male" ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : ""}
                      >
                        آقا
                      </Button>
                      <Button
                        type="button"
                        variant={formData.gender === "female" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleChange("gender", "female")}
                        className={formData.gender === "female" ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white" : ""}
                      >
                        خانم
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-sm font-medium flex items-center">
                      <Ruler className="ml-2 h-4 w-4 text-orange-500" />
                      قد (سانتی‌متر)
                    </Label>
                    <Input
                      id="height"
                      value={formData.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                      placeholder="175"
                      className="bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-sm font-medium flex items-center">
                      <Weight className="ml-2 h-4 w-4 text-red-500" />
                      وزن (کیلوگرم)
                    </Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      placeholder="70"
                      className="bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="payment" className="text-sm font-medium flex items-center">
                      <DollarSign className="ml-2 h-4 w-4 text-green-500" />
                      مبلغ شهریه (تومان)
                    </Label>
                    <Input
                      id="payment"
                      value={formData.payment}
                      onChange={(e) => handleChange("payment", e.target.value)}
                      placeholder="500000"
                      className="bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              </Card>

              {/* دکمه‌های عمل */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 student-gradient-bg text-white hover:opacity-90 transition-all duration-300"
                >
                  <Save className="ml-2 h-4 w-4" />
                  {student ? "ویرایش" : "افزودن"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="bg-white/50 hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800"
                >
                  <X className="ml-2 h-4 w-4" />
                  لغو
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
