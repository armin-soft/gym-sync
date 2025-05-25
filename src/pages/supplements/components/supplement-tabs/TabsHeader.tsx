
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { FlaskConical, Pill, Package2, Sparkles } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface TabsHeaderProps {
  activeTab: 'supplement' | 'vitamin';
}

export const TabsHeader: React.FC<TabsHeaderProps> = ({ activeTab }) => {
  return (
    <div className="mb-6 sm:mb-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-blue-50/30 to-indigo-100/50 rounded-3xl blur-xl -z-10" />
        
        <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl rounded-2xl p-2 h-auto relative overflow-hidden">
          {/* Background gradient animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl"
            animate={{
              background: [
                "linear-gradient(90deg, rgb(168 85 247 / 0.1) 0%, rgb(59 130 246 / 0.1) 50%, rgb(99 102 241 / 0.1) 100%)",
                "linear-gradient(90deg, rgb(99 102 241 / 0.1) 0%, rgb(168 85 247 / 0.1) 50%, rgb(59 130 246 / 0.1) 100%)",
                "linear-gradient(90deg, rgb(59 130 246 / 0.1) 0%, rgb(99 102 241 / 0.1) 50%, rgb(168 85 247 / 0.1) 100%)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <TabsTrigger 
            value="supplement" 
            className="relative group flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-purple-500/30 hover:bg-purple-50 hover:scale-[1.02] z-10"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <FlaskConical className="h-5 w-5 sm:h-6 sm:w-6" />
              {activeTab === 'supplement' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                >
                  <Sparkles className="h-2 w-2 text-white m-0.5" />
                </motion.div>
              )}
            </motion.div>
            <span className="font-extrabold tracking-wide">مکمل‌های ورزشی</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="vitamin" 
            className="relative group flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/30 hover:bg-blue-50 hover:scale-[1.02] z-10"
          >
            <motion.div
              whileHover={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Pill className="h-5 w-5 sm:h-6 sm:w-6" />
              {activeTab === 'vitamin' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                >
                  <Sparkles className="h-2 w-2 text-white m-0.5" />
                </motion.div>
              )}
            </motion.div>
            <span className="font-extrabold tracking-wide">ویتامین‌ها</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Floating decorative elements */}
        <motion.div 
          className="absolute -top-2 right-8 opacity-20"
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Package2 size={24} className="text-purple-500" />
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-2 left-8 opacity-20"
          animate={{ 
            y: [0, 5, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
        >
          <Sparkles size={20} className="text-blue-500" />
        </motion.div>
      </motion.div>
    </div>
  );
};
