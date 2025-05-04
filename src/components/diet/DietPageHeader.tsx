
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, UtensilsCrossed } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

interface DietPageHeaderProps {
  onAddMeal: () => void;
}

export const DietPageHeader = ({ onAddMeal }: DietPageHeaderProps) => {
  return (
    <PageHeader
      title="برنامه های غذایی هفتگی"
      icon={UtensilsCrossed}
      actions={
        <Button 
          onClick={onAddMeal} 
          size="sm"
          className="bg-gradient-to-l from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-primary/25 group"
        >
          <Plus className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110 group-hover:rotate-180 duration-300" />
          افزودن وعده غذایی
        </Button>
      }
    />
  );
};
