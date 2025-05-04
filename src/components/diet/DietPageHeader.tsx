
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Utensils } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { motion } from "framer-motion";

interface DietPageHeaderProps {
  onAddMeal: () => void;
}

export const DietPageHeader = ({ onAddMeal }: DietPageHeaderProps) => {
  return (
    <PageHeader
      title="برنامه های غذایی هفتگی"
      icon={Utensils}
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
