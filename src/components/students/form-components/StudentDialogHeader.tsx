
import React from "react";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface StudentDialogHeaderProps {
  isEdit: boolean;
  itemVariants: any;
}

export const StudentDialogHeader = ({ isEdit, itemVariants }: StudentDialogHeaderProps) => {
  return (
    <DialogHeader className="pt-8 pb-4 px-6 text-white">
      <motion.div variants={itemVariants} className="mb-10">
        <DialogTitle className="flex items-center gap-2 text-xl font-bold">
          {isEdit ? (
            <>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <UserRound className="h-4 w-4 text-white" />
              </div>
              <span>ویرایش شاگرد</span>
            </>
          ) : (
            <>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <UserRound className="h-4 w-4 text-white" />
              </div>
              <span>افزودن شاگرد جدید</span>
            </>
          )}
        </DialogTitle>
        <DialogDescription className="text-white/80 mt-2">
          اطلاعات شاگرد را وارد کنید
        </DialogDescription>
      </motion.div>
    </DialogHeader>
  );
};
