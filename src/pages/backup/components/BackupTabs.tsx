
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { BackupSection } from "@/components/backup/BackupSection";
import { RestoreSection } from "@/components/backup/RestoreSection";

interface BackupTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  dataKeys: string[];
}

export function BackupTabs({ activeTab, setActiveTab, dataKeys }: BackupTabsProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
        {/* Custom Tab List */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20">
            <TabsList className="bg-transparent p-0 h-auto gap-1 sm:gap-2" dir="rtl">
              <TabsTrigger 
                value="backup" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300 text-xs sm:text-sm md:text-base"
                dir="rtl"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                پشتیبان‌گیری
              </TabsTrigger>
              <TabsTrigger 
                value="restore" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300 text-xs sm:text-sm md:text-base"
                dir="rtl"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                بازیابی
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab Content */}
        <TabsContent value="backup" className="mt-0" dir="rtl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BackupSection dataKeys={dataKeys} />
          </motion.div>
        </TabsContent>

        <TabsContent value="restore" className="mt-0" dir="rtl">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RestoreSection dataKeys={dataKeys} />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
