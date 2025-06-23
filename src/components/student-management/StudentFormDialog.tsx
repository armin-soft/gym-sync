
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save, User, Phone, Ruler, Weight, DollarSign, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

interface StudentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
  onSave: (studentData: any, existingStudent?: Student | null) => void;
}

export const StudentFormDialog: React.FC<StudentFormDialogProps> = ({
  open,
  onOpenChange,
  student,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "male",
    age: "",
    height: "",
    weight: "",
    payment: "",
    image: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        phone: student.phone || "",
        gender: student.gender || "male",
        age: student.age?.toString() || "",
        height: student.height || "",
        weight: student.weight || "",
        payment: student.payment || "",
        image: student.image || ""
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        gender: "male",
        age: "",
        height: "",
        weight: "",
        payment: "",
        image: ""
      });
    }
    setErrors({});
  }, [student, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "نام الزامی است";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "شماره موبایل الزامی است";
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست";
    }

    if (!formData.height.trim()) {
      newErrors.height = "قد الزامی است";
    }

    if (!formData.weight.trim()) {
      newErrors.weight = "وزن الزامی است";
    }

    if (!formData.payment.trim()) {
      newErrors.payment = "مبلغ شهریه الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "خطا در اطلاعات",
        description: "لطفاً تمام فیلدهای الزامی را تکمیل کنید",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const studentData = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined
      };

      onSave(studentData, student);
      onOpenChange(false);
      
      toast({
        title: student ? "ویرایش موفق" : "ثبت موفق",
        description: student ? "اطلاعات شاگرد با موفقیت ویرایش شد" : "شاگرد جدید با موفقیت ثبت شد"
      });
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره اطلاعات پیش آمد",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            {student ? "ویرایش اطلاعات شاگرد" : "ثبت شاگرد جدید"}
          </DialogTitle>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <Avatar className="w-24 h-24 border-4 border-blue-200">
              <AvatarImage src={formData.image} alt="تصویر پروفایل" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-base font-semibold">
                <User className="w-4 h-4 text-blue-600" />
                نام و نام خانوادگی *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="نام کامل شاگرد"
                className={`text-lg p-3 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-base font-semibold">
                <Phone className="w-4 h-4 text-green-600" />
                شماره موبایل *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="09123456789"
                className={`text-lg p-3 ltr ${errors.phone ? "border-red-500" : ""}`}
                dir="ltr"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">جنسیت</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">آقا</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">خانم</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Physical Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2 text-base font-semibold">
                <Calendar className="w-4 h-4 text-purple-600" />
                سن
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="25"
                className="text-lg p-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="flex items-center gap-2 text-base font-semibold">
                <Ruler className="w-4 h-4 text-orange-600" />
                قد (سانتی‌متر) *
              </Label>
              <Input
                id="height"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                placeholder="175"
                className={`text-lg p-3 ${errors.height ? "border-red-500" : ""}`}
              />
              {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2 text-base font-semibold">
                <Weight className="w-4 h-4 text-red-600" />
                وزن (کیلوگرم) *
              </Label>
              <Input
                id="weight"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                placeholder="70"
                className={`text-lg p-3 ${errors.weight ? "border-red-500" : ""}`}
              />
              {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-2">
            <Label htmlFor="payment" className="flex items-center gap-2 text-base font-semibold">
              <DollarSign className="w-4 h-4 text-green-600" />
              مبلغ شهریه (تومان) *
            </Label>
            <Input
              id="payment"
              value={formData.payment}
              onChange={(e) => handleInputChange("payment", e.target.value)}
              placeholder="500000"
              className={`text-lg p-3 ${errors.payment ? "border-red-500" : ""}`}
            />
            {errors.payment && <p className="text-red-500 text-sm">{errors.payment}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 py-3 text-lg"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5 ml-2" />
              انصراف
            </Button>
            
            <Button
              type="submit"
              className="flex-1 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isSubmitting}
            >
              <Save className="w-5 h-5 ml-2" />
              {isSubmitting ? "در حال ذخیره..." : (student ? "ویرایش" : "ثبت")}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};
