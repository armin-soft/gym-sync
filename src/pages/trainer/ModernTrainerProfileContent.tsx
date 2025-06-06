
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, MapPin, Phone, Mail, Calendar, Star, Trophy, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { cn } from '@/lib/utils';

export const ModernTrainerProfileContent = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  
  const [trainerData, setTrainerData] = useState({
    name: 'احمد رضا محمدی',
    title: 'مربی حرفه‌ای بدنسازی و فیتنس',
    bio: 'با بیش از ۱۰ سال تجربه در زمینه تمرینات بدنسازی و آمادگی جسمانی، به ارائه برنامه‌های تخصصی و مشاوره‌های حرفه‌ای می‌پردازم.',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'ahmad.rezaei@example.com',
    gymName: 'باشگاه ورزشی اولیمپیا',
    gymAddress: 'تهران، خیابان ولیعصر، نرسیده به پارک وی، پلاک ۱۲۳',
    experience: '۱۰',
    clients: '۸۵',
    specializations: ['بدنسازی', 'کراس فیت', 'آمادگی جسمانی', 'تغذیه ورزشی'],
    achievements: ['مدرک مربیگری درجه یک', 'قهرمان مسابقات استانی', 'مدرک تغذیه ورزشی'],
    workingHours: 'شنبه تا پنج‌شنبه: ۶:۰۰ تا ۲۲:۰۰'
  });

  const tabs = [
    { id: 'personal', label: 'اطلاعات شخصی', icon: User },
    { id: 'professional', label: 'اطلاعات حرفه‌ای', icon: Trophy },
    { id: 'contact', label: 'اطلاعات تماس', icon: Phone }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full"
      >
        {/* Sidebar */}
        <motion.div 
          variants={itemVariants}
          className="xl:col-span-4"
        >
          <Card className="h-fit bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <motion.div 
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Camera className="w-4 h-4 ml-2" />
                    تغییر عکس
                  </Button>
                </motion.div>
                
                <h2 className="text-2xl font-bold mt-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {trainerData.name}
                </h2>
                <p className="text-gray-600 mt-1">{trainerData.title}</p>
                
                <div className="flex justify-center gap-2 mt-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    فعال
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    تایید شده
                  </Badge>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="text-2xl font-bold text-blue-600">{toPersianNumbers(trainerData.experience)}</div>
                  <div className="text-sm text-gray-600">سال تجربه</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="text-2xl font-bold text-purple-600">{toPersianNumbers(trainerData.clients)}</div>
                  <div className="text-sm text-gray-600">مشتری</div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start text-right",
                        activeTab === tab.id 
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                          : "hover:bg-gray-100"
                      )}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className="w-4 h-4 ml-2" />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          variants={itemVariants}
          className="xl:col-span-8"
        >
          <Card className="h-fit bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">
                  {tabs.find(t => t.id === activeTab)?.label}
                </CardTitle>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  {isEditing ? 'ذخیره' : 'ویرایش'}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {activeTab === 'personal' && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">نام و نام خانوادگی</Label>
                      <Input
                        id="name"
                        value={trainerData.name}
                        disabled={!isEditing}
                        onChange={(e) => setTrainerData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 bg-gray-50 border-gray-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title" className="text-sm font-medium text-gray-700">عنوان شغلی</Label>
                      <Input
                        id="title"
                        value={trainerData.title}
                        disabled={!isEditing}
                        onChange={(e) => setTrainerData(prev => ({ ...prev, title: e.target.value }))}
                        className="mt-1 bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio" className="text-sm font-medium text-gray-700">بیوگرافی</Label>
                    <Textarea
                      id="bio"
                      value={trainerData.bio}
                      disabled={!isEditing}
                      onChange={(e) => setTrainerData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      className="mt-1 bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">تخصص‌ها</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {trainerData.specializations.map((spec, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'professional' && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="gymName" className="text-sm font-medium text-gray-700">نام باشگاه</Label>
                      <Input
                        id="gymName"
                        value={trainerData.gymName}
                        disabled={!isEditing}
                        onChange={(e) => setTrainerData(prev => ({ ...prev, gymName: e.target.value }))}
                        className="mt-1 bg-gray-50 border-gray-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience" className="text-sm font-medium text-gray-700">سال‌های تجربه</Label>
                      <Input
                        id="experience"
                        value={toPersianNumbers(trainerData.experience)}
                        disabled={!isEditing}
                        className="mt-1 bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gymAddress" className="text-sm font-medium text-gray-700">آدرس باشگاه</Label>
                    <Input
                      id="gymAddress"
                      value={trainerData.gymAddress}
                      disabled={!isEditing}
                      onChange={(e) => setTrainerData(prev => ({ ...prev, gymAddress: e.target.value }))}
                      className="mt-1 bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="workingHours" className="text-sm font-medium text-gray-700">ساعات کاری</Label>
                    <Input
                      id="workingHours"
                      value={trainerData.workingHours}
                      disabled={!isEditing}
                      onChange={(e) => setTrainerData(prev => ({ ...prev, workingHours: e.target.value }))}
                      className="mt-1 bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">دستاوردها و مدارک</Label>
                    <div className="space-y-2 mt-2">
                      {trainerData.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                          <Star className="w-4 h-4 text-green-600" />
                          <span className="text-green-800">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'contact' && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">شماره موبایل</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="phone"
                          value={trainerData.phone}
                          disabled={!isEditing}
                          onChange={(e) => setTrainerData(prev => ({ ...prev, phone: e.target.value }))}
                          className="pr-10 bg-gray-50 border-gray-200"
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">ایمیل</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          value={trainerData.email}
                          disabled={!isEditing}
                          onChange={(e) => setTrainerData(prev => ({ ...prev, email: e.target.value }))}
                          className="pr-10 bg-gray-50 border-gray-200"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-800">آدرس باشگاه</h3>
                        <p className="text-blue-700 mt-1">{trainerData.gymAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-green-800">ساعات کاری</h3>
                        <p className="text-green-700 mt-1">{trainerData.workingHours}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
