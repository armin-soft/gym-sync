
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Database, ArrowRight, Cloud, Shield } from "lucide-react";
import { SupabaseAuthWrapper } from "@/components/auth/SupabaseAuthWrapper";
import { SupabaseMigrationTool } from "@/components/backup/SupabaseMigrationTool";

export function SupabaseMigrationSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-6xl mx-auto mb-16"
      dir="rtl"
    >
      <Card className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 p-8">
          <div className="flex items-center gap-6" dir="rtl">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Database className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-3xl font-black text-white mb-2">
                انتقال به پایگاه داده ابری
              </h2>
              <p className="text-sky-100 text-lg">
                انتقال تمام داده‌های محلی به Supabase برای دسترسی از همه‌جا
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* مزایای انتقال */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-emerald-600" />
                مزایای انتقال به Supabase
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-sky-50 rounded-xl">
                  <Cloud className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-emerald-800">دسترسی از همه‌جا</h4>
                    <p className="text-emerald-700 text-sm">از هر مرورگر و دستگاهی به داده‌هایتان دسترسی داشته باشید</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-sky-50 to-slate-50 rounded-xl">
                  <Shield className="w-6 h-6 text-sky-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-sky-800">امنیت بالا</h4>
                    <p className="text-sky-700 text-sm">داده‌های شما با بالاترین استانداردهای امنیتی محافظت می‌شوند</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl">
                  <Database className="w-6 h-6 text-slate-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-800">پشتیبان‌گیری خودکار</h4>
                    <p className="text-slate-700 text-sm">دیگر نگران از دست دادن داده‌ها نباشید</p>
                  </div>
                </div>
              </div>
            </div>

            {/* فرآیند انتقال */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <ArrowRight className="w-6 h-6 text-sky-600" />
                فرآیند انتقال
              </h3>

              <div className="space-y-3">
                {[
                  'خواندن داده‌های محلی از localStorage',
                  'تبدیل داده‌ها به فرمت مناسب',
                  'انتقال پروفایل مربی',
                  'انتقال اطلاعات شاگردان',
                  'انتقال تمرینات و دسته‌بندی‌ها',
                  'انتقال وعده‌های غذایی',
                  'انتقال مکمل‌ها و ویتامین‌ها'
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-sky-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-slate-700 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ابزار انتقال با احراز هویت */}
          <SupabaseAuthWrapper>
            <SupabaseMigrationTool />
          </SupabaseAuthWrapper>
        </div>
      </Card>
    </motion.div>
  );
}
