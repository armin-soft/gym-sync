
import React from "react";
import { motion } from "framer-motion";
import { UserPlus, UserRound } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBrandTheme } from "@/hooks/use-brand-theme";

interface StudentDialogHeaderProps {
  isEdit: boolean;
  itemVariants: any;
}

export const StudentDialogHeader: React.FC<StudentDialogHeaderProps> = ({ isEdit, itemVariants }) => {
  const { colors } = useBrandTheme();
  
  return (
    <motion.div variants={itemVariants} className="p-6 pb-0">
      <DialogHeader>
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2"
        >
          {isEdit ? (
            <UserRound className="h-7 w-7 text-brand-primary" />
          ) : (
            <UserPlus className="h-7 w-7 text-brand-primary" />
          )}
          <DialogTitle className={`text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent`}>
            {isEdit ? "ویرایش اطلاعات شاگرد" : "افزودن شاگرد جدید"}
          </DialogTitle>
        </motion.div>
        <motion.p variants={itemVariants} className="mt-2 text-brand-dark/60 dark:text-muted-foreground text-sm">
          {isEdit 
            ? "اطلاعات شاگرد را ویرایش کنید" 
            : "برای افزودن شاگرد جدید، فرم زیر را تکمیل کنید"}
        </motion.p>
      </DialogHeader>
    </motion.div>
  );
};
