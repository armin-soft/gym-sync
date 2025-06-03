
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Heart } from "lucide-react";

interface SupplementsNavigationProps {
  activeTab: 'supplement' | 'vitamin';
  onTabChange: (tab: 'supplement' | 'vitamin') => void;
}

export const SupplementsNavigation: React.FC<SupplementsNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      dir="rtl"
    >
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full" dir="rtl">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-3">
          <TabsList className="grid w-full grid-cols-2 h-16 bg-transparent gap-3">
            <TabsTrigger 
              value="supplement" 
              className="h-12 rounded-xl flex items-center gap-3 data-[state=active]:bg-gradient-to-l data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-lg font-bold hover:bg-green-50"
            >
              <Pill className="h-6 w-6" />
              <span>مکمل‌های غذایی</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vitamin" 
              className="h-12 rounded-xl flex items-center gap-3 data-[state=active]:bg-gradient-to-l data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-lg font-bold hover:bg-purple-50"
            >
              <Heart className="h-6 w-6" />
              <span>ویتامین‌ها</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </motion.div>
  );
};
