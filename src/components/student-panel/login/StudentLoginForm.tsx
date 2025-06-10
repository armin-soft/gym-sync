
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, LogIn } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentLoginFormProps {
  variants: any;
  onSubmit: (phone: string) => void;
  loading: boolean;
}

export const StudentLoginForm = ({ variants, onSubmit, loading }: StudentLoginFormProps) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(phone);
  };

  return (
    <motion.div variants={variants} className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl blur-xl opacity-20"></div>
      <div className="relative backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-slate-700/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
          {/* Phone Number Field */}
          <motion.div variants={variants} className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
              <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
                <Phone className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
              شماره موبایل
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={toPersianNumbers("09123456789")}
                className="h-12 bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl pr-4 text-right backdrop-blur-sm"
                dir="ltr"
                required
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Login Button */}
          <motion.div variants={variants} className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  در حال ورود به پنل شاگرد...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="h-5 w-5" />
                  ورود به پنل شاگرد
                </div>
              )}
            </Button>
          </motion.div>
        </form>

        {/* Footer */}
        <motion.div variants={variants} className="mt-6 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            شماره موبایل خود را که توسط مربی ثبت شده، وارد کنید
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
