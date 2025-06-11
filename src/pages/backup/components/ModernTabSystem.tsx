
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload, Sparkles, Shield } from "lucide-react";
import { BackupSection } from "./BackupSection";
import { RestoreSection } from "./RestoreSection";

interface ModernTabSystemProps {
  dataKeys: string[];
}

export function ModernTabSystem({ dataKeys }: ModernTabSystemProps) {
  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 lg:py-16" dir="rtl">
      <Tabs defaultValue="backup" className="w-full">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-1.5 sm:p-2 rounded-2xl lg:rounded-3xl shadow-2xl border border-white/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-slate-500/10 rounded-2xl lg:rounded-3xl blur-xl" />
            
            <TabsList className="relative bg-transparent p-0 h-auto gap-2 lg:gap-3" dir="rtl">
              <TabsTrigger
                value="backup"
                className="relative group data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:via-sky-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-xl rounded-xl lg:rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 transition-all duration-500 text-sm sm:text-base lg:text-lg font-bold overflow-hidden"
                dir="rtl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-sky-600 rounded-xl lg:rounded-2xl blur-lg opacity-0 group-data-[state=active]:opacity-30 transition-opacity duration-500" />
                
                <div className="relative flex items-center gap-2 lg:gap-3">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  <span>پشتیبان‌گیری</span>
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 opacity-70" />
                </div>
              </TabsTrigger>
              
              <TabsTrigger
                value="restore"
                className="relative group data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:via-emerald-500 data-[state=active]:to-sky-600 data-[state=active]:text-white data-[state=active]:shadow-xl rounded-xl lg:rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 transition-all duration-500 text-sm sm:text-base lg:text-lg font-bold overflow-hidden"
                dir="rtl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-emerald-600 rounded-xl lg:rounded-2xl blur-lg opacity-0 group-data-[state=active]:opacity-30 transition-opacity duration-500" />
                
                <div className="relative flex items-center gap-2 lg:gap-3">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  <span>بازیابی</span>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 opacity-70" />
                </div>
              </TabsTrigger>
            </TabsList>
          </motion.div>
        </div>

        {/* Tab Content */}
        <TabsContent value="backup" className="mt-0" dir="rtl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.5 }}
          >
            <BackupSection dataKeys={dataKeys} />
          </motion.div>
        </TabsContent>

        <TabsContent value="restore" className="mt-0" dir="rtl">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            <RestoreSection dataKeys={dataKeys} />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
