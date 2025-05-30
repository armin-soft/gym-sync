
import React from 'react';
import { PageContainer } from '@/components/ui/page-container';
import { BackupSection } from '@/components/backup/BackupSection';
import { RestoreSection } from '@/components/backup/RestoreSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Upload, Download, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const BackupPage = () => {
  return (
    <PageContainer withBackground fullHeight className="w-full">
      <div className="container mx-auto p-4 h-full" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              پشتیبان‌گیری و بازیابی
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              مدیریت پشتیبان‌گیری از اطلاعات سیستم
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">امنیت داده</span>
                </div>
                <p className="text-sm text-blue-600">محافظت کامل</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Download className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">پشتیبان‌گیری</span>
                </div>
                <p className="text-sm text-green-600">دانلود فوری</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Upload className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800 dark:text-purple-200">بازیابی</span>
                </div>
                <p className="text-sm text-purple-600">بارگذاری آسان</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800 dark:text-orange-200">حفاظت</span>
                </div>
                <p className="text-sm text-orange-600">رمزگذاری شده</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="backup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-gray-800/50">
              <TabsTrigger value="backup" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                پشتیبان‌گیری
              </TabsTrigger>
              <TabsTrigger value="restore" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                بازیابی
              </TabsTrigger>
            </TabsList>

            <TabsContent value="backup" className="mt-6">
              <BackupSection />
            </TabsContent>

            <TabsContent value="restore" className="mt-6">
              <RestoreSection />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default BackupPage;
