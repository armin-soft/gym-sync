
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pill, Clock, Check, Plus, Calendar, Target, 
  Zap, Shield, Heart, Dumbbell, Apple, AlertCircle
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

const supplementTypes = [
  { id: 'protein', name: 'پروتئین', icon: Dumbbell, color: 'emerald' },
  { id: 'vitamin', name: 'ویتامین', icon: Apple, color: 'orange' },
  { id: 'mineral', name: 'مواد معدنی', icon: Shield, color: 'blue' },
  { id: 'energy', name: 'انرژی‌زا', icon: Zap, color: 'yellow' },
  { id: 'health', name: 'سلامت عمومی', icon: Heart, color: 'red' }
];

const supplements = [
  {
    id: 1,
    name: "پروتئین وی",
    type: "protein",
    dosage: "۳۰ گرم",
    times: ["بعد از تمرین", "شب قبل خواب"],
    frequency: "روزانه ۲ بار",
    completed: [true, false],
    description: "برای رشد و ترمیم عضلات",
    benefits: ["افزایش توده عضلانی", "بهبود بازیابی"],
    sideEffects: "در صورت مصرف بیش از حد ممکن است باعث ناراحتی معده شود",
    instructions: "با آب یا شیر مصرف کنید",
    color: "emerald"
  },
  {
    id: 2,
    name: "مولتی ویتامین",
    type: "vitamin",
    dosage: "۱ کپسول",
    times: ["صبح با صبحانه"],
    frequency: "روزانه ۱ بار",
    completed: [true],
    description: "تأمین ویتامین‌های ضروری بدن",
    benefits: ["تقویت سیستم ایمنی", "افزایش انرژی"],
    sideEffects: "عوارض جانبی خاصی ندارد",
    instructions: "با غذا مصرف کنید",
    color: "orange"
  },
  {
    id: 3,
    name: "امگا ۳",
    type: "health",
    dosage: "۱۰۰۰ میلی‌گرم",
    times: ["ظهر با ناهار", "شب با شام"],
    frequency: "روزانه ۲ بار",
    completed: [true, false],
    description: "برای سلامت قلب و مغز",
    benefits: ["بهبود عملکرد مغز", "کاهش التهاب"],
    sideEffects: "ممکن است باعث بوی دهان شود",
    instructions: "در یخچال نگهداری کنید",
    color: "red"
  },
  {
    id: 4,
    name: "کراتین",
    type: "energy",
    dosage: "۵ گرم",
    times: ["قبل از تمرین"],
    frequency: "روزانه ۱ بار",
    completed: [false],
    description: "افزایش قدرت و انرژی",
    benefits: ["افزایش قدرت عضلانی", "بهبود عملکرد"],
    sideEffects: "ممکن است باعث احتباس آب شود",
    instructions: "با آب فراوان مصرف کنید",
    color: "yellow"
  }
];

const StudentSupplements = () => {
  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('today');
  
  const completedDoses = supplements.reduce((total, supp) => 
    total + supp.completed.filter(Boolean).length, 0
  );
  const totalDoses = supplements.reduce((total, supp) => 
    total + supp.completed.length, 0
  );
  const progressPercentage = totalDoses > 0 ? (completedDoses / totalDoses) * 100 : 0;

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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-2">
              مکمل‌ها و ویتامین‌ها
            </h1>
            <p className="text-lg text-muted-foreground">
              مکمل‌های غذایی و ویتامین‌های تجویزی
            </p>
          </div>
          <div className="text-left">
            <div className="text-3xl font-bold text-emerald-600">
              {toPersianNumbers(completedDoses.toString())}/{toPersianNumbers(totalDoses.toString())}
            </div>
            <p className="text-sm text-muted-foreground">دوز امروز</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>پیشرفت مصرف</span>
            <span>{toPersianNumbers(Math.round(progressPercentage).toString())}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {supplementTypes.map((type, index) => {
          const Icon = type.icon;
          const typeSupplements = supplements.filter(s => s.type === type.id);
          const typeCount = typeSupplements.length;
          
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${type.color}-500 to-${type.color}-600 flex items-center justify-center shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {toPersianNumbers(typeCount.toString())}
                      </p>
                      <p className="text-sm text-muted-foreground">{type.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs for Today/Schedule */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="today">امروز</TabsTrigger>
          <TabsTrigger value="schedule">برنامه هفتگی</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {/* Today's Supplements */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Pill className="h-4 w-4 text-white" />
                  </div>
                  مکمل‌های امروز
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {toPersianNumbers(supplements.length.toString())} مکمل
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplements.map((supplement, index) => {
                  const isSelected = selectedSupplement === supplement.id;
                  const completedCount = supplement.completed.filter(Boolean).length;
                  const totalCount = supplement.completed.length;
                  const supplementProgress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
                  
                  return (
                    <motion.div
                      key={supplement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-emerald-200 hover:bg-emerald-50/50'
                      }`}
                      onClick={() => setSelectedSupplement(isSelected ? null : supplement.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${supplement.color}-500 to-${supplement.color}-600 flex items-center justify-center shadow-lg`}>
                            <Pill className="h-7 w-7 text-white" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                {supplement.name}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {supplement.frequency}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              {supplement.description}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-medium">دوز: {supplement.dosage}</span>
                              <span className="text-muted-foreground">
                                {toPersianNumbers(completedCount.toString())} از {toPersianNumbers(totalCount.toString())} دوز
                              </span>
                            </div>
                            
                            <div className="space-y-1">
                              <Progress value={supplementProgress} className="h-2 w-48" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          {supplement.times.map((time, timeIndex) => (
                            <div key={timeIndex} className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground min-w-[100px]">
                                {time}
                              </span>
                              {supplement.completed[timeIndex] ? (
                                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                  <Check className="w-3 h-3 ml-1" />
                                  مصرف شده
                                </Badge>
                              ) : (
                                <Button 
                                  size="sm"
                                  className="bg-gradient-to-l from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white"
                                >
                                  <Plus className="w-4 h-4 ml-2" />
                                  ثبت مصرف
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
                        >
                          <div>
                            <h4 className="font-medium mb-2 text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              فواید
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {supplement.benefits.map((benefit, benefitIndex) => (
                                <div 
                                  key={benefitIndex}
                                  className="flex items-center gap-2 p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg"
                                >
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                  <span className="text-sm text-emerald-700 dark:text-emerald-300">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2 text-orange-900 dark:text-orange-100 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              نکات مهم
                            </h4>
                            <div className="space-y-2">
                              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                                <p className="text-sm text-orange-700 dark:text-orange-300">
                                  <strong>دستورالعمل:</strong> {supplement.instructions}
                                </p>
                              </div>
                              <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                                <p className="text-sm text-red-700 dark:text-red-300">
                                  <strong>عوارض جانبی:</strong> {supplement.sideEffects}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                برنامه هفتگی مکمل‌ها
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>برنامه هفتگی مکمل‌ها در حال توسعه است...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default StudentSupplements;
