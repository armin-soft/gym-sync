
import React from "react";
import { motion } from "framer-motion";
import { StudentFormField } from "./StudentFormField";
import { UserRound, Phone } from "lucide-react";

interface PersonalInfoSectionProps {
  control: any; // Using any as the control type is complex
  itemVariants: any;
}

export const PersonalInfoSection = ({ 
  control, 
  itemVariants 
}: PersonalInfoSectionProps) => {
  return (
    <>
      {/* Name Field */}
      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="name"
          label="نام و نام خانوادگی"
          placeholder="نام و نام خانوادگی را وارد کنید"
          icon={UserRound}
        />
      </motion.div>
      
      {/* Phone Field */}
      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="phone"
          label="شماره موبایل"
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          icon={Phone}
          direction="ltr"
          persianNumbers={true}
          numberOnly={true}
        />
      </motion.div>
    </>
  );
};
