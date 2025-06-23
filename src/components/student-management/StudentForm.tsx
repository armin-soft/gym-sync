
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Phone, Calendar, Weight, Ruler, Save, X, Upload, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Student } from '@/components/students/StudentTypes';
import { useToast } from '@/hooks/use-toast';

const studentSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  phone: z.string().min(11, 'شماره تماس باید حداقل ۱۱ رقم باشد'),
  age: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  payment: z.string().optional(),
  image: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  student?: Student;
  onSave: (student: Student) => void;
  onCancel: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onSave,
  onCancel
}) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string>(student?.image || '');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: student?.name || '',
      phone: student?.phone || '',
      age: student?.age?.toString() || '',
      gender: student?.gender || undefined,
      height: student?.height?.toString() || '',
      weight: student?.weight?.toString() || '',
      payment: student?.payment?.toString() || '',
      image: student?.image || '',
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        setValue('image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: StudentFormData) => {
    try {
      const studentData: Student = {
        id: student?.id || Date.now(),
        name: data.name,
        phone: data.phone,
        age: data.age ? parseInt(data.age) : undefined,
        gender: data.gender,
        height: data.height ? parseInt(data.height) : undefined,
        weight: data.weight ? parseInt(data.weight) : undefined,
        payment: data.payment ? parseInt(data.payment) : undefined,
        image: selectedImage,
        createdAt: student?.createdAt || new Date().toISOString(),
      };

      onSave(studentData);
      
      toast({
        title: student ? 'ویرایش موفق' : 'افزودن موفق',
        description: student ? 'اطلاعات شاگرد با موفقیت ویرایش شد' : 'شاگرد جدید با موفقیت اضافه شد',
      });
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'مشکلی در ذخیره اطلاعات پیش آمد',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <Card className="student-glass-effect border-0 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Header */}
        <div className="student-gradient-primary p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {student ? 'ویرایش اطلاعات شاگرد' : 'افزودن شاگرد جدید'}
              </h2>
              <p className="text-white/80 mt-1">
                {student ? `ویرایش اطلاعات ${student.name}` : 'لطفاً اطلاعات کامل شاگرد را وارد کنید'}
              </p>
            </div>
            <Button
              onClick={onCancel}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-xl"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
          
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={selectedImage} alt="تصویر شاگرد" />
                <AvatarFallback className="student-gradient-secondary text-white text-xl font-bold">
                  {watch('name')?.charAt(0) || 'ش'}
                </AvatarFallback>
              </Avatar>
              
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors">
                <Upload className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              برای تغییر تصویر کلیک کنید
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <User className="w-4 h-4" />
                نام و نام خانوادگی
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="نام و نام خانوادگی"
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 p-3"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-4 h-4" />
                شماره تماس
              </Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="09123456789"
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 p-3"
                dir="ltr"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Calendar className="w-4 h-4" />
                سن
              </Label>
              <Input
                id="age"
                {...register('age')}
                placeholder="25"
                type="number"
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 p-3"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <User className="w-4 h-4" />
                جنسیت
              </Label>
              <Select onValueChange={(value) => setValue('gender', value as 'male' | 'female')}>
                <SelectTrigger className="rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 p-3">
                  <SelectValue placeholder="انتخاب جنسیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">آقا</SelectItem>
                  <SelectItem value="female">خانم</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label htmlFor="height" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Ruler className="w-4 h-4" />
                قد (سانتی‌متر)
              </Label>
              <Input
                id="height"
                {...register('height')}
                placeholder="170"
                type="number"
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 p-3"
              />
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Weight className="w-4 h-4" />
                وزن (کیلوگرم)
              </Label>
              <Input
                id="weight"
                {...register('weight')}
                placeholder="70"
                type="number"
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 p-3"
              />
            </div>

            {/* Payment */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="payment" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <DollarSign className="w-4 h-4" />
                مبلغ پرداختی (تومان)
              </Label>
              <Input
                id="payment"
                {...register('payment')}
                placeholder="1000000"
                type="number"
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 p-3"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="flex-1 gap-2 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl py-3"
            >
              <X className="w-4 h-4" />
              انصراف
            </Button>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 student-gradient-primary hover:opacity-90 text-white border-0 shadow-lg gap-2 rounded-xl py-3"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'در حال ذخیره...' : (student ? 'ذخیره تغییرات' : 'افزودن شاگرد')}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};
