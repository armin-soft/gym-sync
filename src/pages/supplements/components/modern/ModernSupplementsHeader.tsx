
import React from "react";
import { motion } from "framer-motion";
import { Pill, Heart, Shield } from "lucide-react";

export const ModernSupplementsHeader: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white" dir="rtl">
      <div className="px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Pill className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            مدیریت مکمل‌ها و ویتامین‌ها
          </h1>
          <p className="text-xl text-white/80">
            سیستم مدیریت تغذیه تکمیلی ورزشکاران
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Pill className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <h3 className="font-medium mb-1">مکمل‌های غذایی</h3>
              <p className="text-sm text-white/70">مدیریت مکمل‌های ورزشی</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Heart className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <h3 className="font-medium mb-1">ویتامین‌ها</h3>
              <p className="text-sm text-white/70">کنترل ویتامین‌های ضروری</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <h3 className="font-medium mb-1">نظارت کامل</h3>
              <p className="text-sm text-white/70">پایش و کنترل دقیق مصرف</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
