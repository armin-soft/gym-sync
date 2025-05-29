
import React from "react";
import { motion } from "framer-motion";
import { User, Phone, Lock } from "lucide-react";
import { StudentFormField } from "./StudentFormField";

interface PersonalInfoSectionProps {
  control: any;
  itemVariants: any;
}

export const PersonalInfoSection = ({ control, itemVariants }: PersonalInfoSectionProps) => {
  return (
    <>
      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="name"
          label="نام و نام خانوادگی"
          placeholder="نام و نام خانوادگی شاگرد را وارد کنید"
          icon={User}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="phone"
          label="شماره موبایل"
          placeholder="09123456789"
          icon={Phone}
          direction="ltr"
          numberOnly
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="password"
          label="گذرواژه"
          placeholder="حداقل ۸ کاراکتر شامل حروف و اعداد"
          icon={Lock}
          direction="ltr"
          description="گذرواژه برای ورود شاگرد به پنل شخصی"
        />
      </motion.div>
    </>
  );
};
