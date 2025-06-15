
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, Mail, Phone, Calendar, MapPin, Edit3, 
  Save, X, Camera, Award, Target, Activity
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "علی احمدی",
    email: "ali.ahmadi@example.com",
    phone: "09123456789",
    birthDate: "1378/05/15",
    address: "تهران، خیابان ولی‌عصر",
    height: "175",
    weight: "70",
    goal: "کاهش وزن و تناسب اندام"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const stats = [
    {
      title: "روزهای عضویت",
      value: toPersianNumbers("45"),
      icon: Calendar,
      color: "emerald"
    },
    {
      title: "تمرینات تکمیل شده",
      value: toPersianNumbers("128"),
      icon: Activity,
      color: "sky"
    },
    {
      title: "اهداف رسیده",
      value: toPersianNumbers("8"),
      icon: Target,
      color: "purple"
    },
    {
      title: "جوایز کسب شده",
      value: toPersianNumbers("12"),
      icon: Award,
      color: "orange"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-2">
              پروفایل شخصی
            </h1>
            <p className="text-lg text-muted-foreground">
              مدیریت اطلاعات شخصی و تنظیمات حساب کاربری
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={`${isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-l from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700'} text-white`}
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4 ml-2" />
                انصراف
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 ml-2" />
                ویرایش
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                اطلاعات شخصی
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-12"
                    />
                  ) : (
                    <div className="h-12 px-3 flex items-center bg-gray-50 dark:bg-gray-800 rounded-md">
                      {formData.name}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12"
                    />
                  ) : (
                    <div className="h-12 px-3 flex items-center bg-gray-50 dark:bg-gray-800 rounded-md">
                      {formData.email}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">شماره موبایل</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="h-12"
                      dir="ltr"
                    />
                  ) : (
                    <div className="h-12 px-3 flex items-center bg-gray-50 dark:bg-gray-800 rounded-md">
                      {toPersianNumbers(formData.phone)}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">تاریخ تولد</Label>
                  {isEditing ? (
                    <Input
                      id="birthDate"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="h-12"
                    />
                  ) : (
                    <div className="h-12 px-3 flex items-center bg-gray-50 dark:bg-gray-800 rounded-md">
                      {toPersianNumbers(formData.birthDate)}
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">آدرس</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="h-12"
                    />
                  ) : (
                    <div className="h-12 px-3 flex items-center bg-gray-50 dark:bg-gray-800 rounded-md">
                      {formData.address}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">قد (سانتی‌متر)</Label>
                  {isEditing ? (
                    <Input
                      id="height"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      className="h-12"
                    />
                  ) : (
                    <div className="h-12 px-3 flex items-center bg-gray-50 dark:bg-gray-800 rounded-md">
                      {toPersianNumbers(formData.height)} سانتی‌متر
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">وزن (کیلوگرم)</Label>
                  {isEditing ? (
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className="h-12"
                    />
                  ) : (
                    <div className="h-12 px-3 flex items-center bg-gray-50 dark:bg-gray-800 rounded-md">
                      {toPersianNumbers(formData.weight)} کیلوگرم
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="goal">هدف تمرینی</Label>
                  {isEditing ? (
                    <Input
                      id="goal"
                      value={formData.goal}
                      onChange={(e) => handleInputChange('goal', e.target.value)}
                      className="h-12"
                    />
                  ) : (
                    <div className="h-12 px-3 flex items-center bg-gray-50 dark:bg-gray-800 rounded-md">
                      {formData.goal}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    انصراف
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-l from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white"
                  >
                    <Save className="w-4 h-4 ml-2" />
                    ذخیره تغییرات
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Profile Picture & Achievements */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center">تصویر پروفایل</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white">
                    {formData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -left-2 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
                >
                  <Camera className="h-4 w-4 text-white" />
                </Button>
              </div>
              <div className="text-center">
                <h3 className="font-semibold">{formData.name}</h3>
                <Badge className="mt-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  عضو فعال
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-500" />
                آخرین دستاوردها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <Award className="h-6 w-6 text-orange-500" />
                <div>
                  <h4 className="font-medium text-orange-900 dark:text-orange-100">
                    هفته طلایی
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    تکمیل ۱۰۰% برنامه هفتگی
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                <Target className="h-6 w-6 text-emerald-500" />
                <div>
                  <h4 className="font-medium text-emerald-900 dark:text-emerald-100">
                    رسیدن به هدف
                  </h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    تکمیل ۵۰ تمرین
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentProfile;
