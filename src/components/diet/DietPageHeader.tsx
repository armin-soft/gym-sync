
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { motion } from "framer-motion";

interface DietPageHeaderProps {
  onAddMeal: () => void;
}

export const DietPageHeader = ({ onAddMeal }: DietPageHeaderProps) => {
  return (
    <PageHeader
      title="برنامه های غذایی هفتگی"
      icon={() => (
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary h-6 w-6">
            <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"/>
            <path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83"/>
            <path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z"/>
            <path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z"/>
          </svg>
        </motion.div>
      )}
      description="تنظیم و مدیریت برنامه‌های غذایی روزانه"
      actions={
        <Button 
          onClick={onAddMeal} 
          className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-500"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          <Plus className="ml-2 h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
          افزودن وعده غذایی
        </Button>
      }
    />
  );
};
