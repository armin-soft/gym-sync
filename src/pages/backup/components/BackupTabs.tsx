
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload, Sparkles } from "lucide-react";
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
        {/* Advanced Tab List */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <motion.div 
            className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Glow effect behind tabs */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-2xl sm:rounded-3xl blur-xl" />
            
            <TabsList className="relative bg-transparent p-0 h-auto gap-2 sm:gap-3" dir="rtl">
              <TabsTrigger 
                value="backup" 
                className="relative group data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:via-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-xl rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 transition-all duration-500 text-sm sm:text-base md:text-lg font-semibold overflow-hidden"
                dir="rtl"
              >
                {/* Background glow for active state */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-data-[state=active]:opacity-30 transition-opacity duration-500" />
                
                {/* Icon and text */}
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>پشتیبان‌گیری</span>
                  
                  {/* Sparkle effect for active tab */}
                  {activeTab === 'backup' && (
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                    </motion.div>
                  )}
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="restore" 
                className="relative group data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:via-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-xl rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 transition-all duration-500 text-sm sm:text-base md:text-lg font-semibold overflow-hidden"
                dir="rtl"
              >
                {/* Background glow for active state */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-pink-600 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-data-[state=active]:opacity-30 transition-opacity duration-500" />
                
                {/* Icon and text */}
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>بازیابی</span>
                  
                  {/* Sparkle effect for active tab */}
                  {activeTab === 'restore' && (
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                    </motion.div>
                  )}
                </div>
              </TabsTrigger>
            </TabsList>
          </motion.div>
        </div>

        {/* Tab Content with advanced animations */}
        <TabsContent value="backup" className="mt-0" dir="rtl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <BackupSection dataKeys={dataKeys} />
          </motion.div>
        </TabsContent>

        <TabsContent value="restore" className="mt-0" dir="rtl">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <RestoreSection dataKeys={dataKeys} />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
