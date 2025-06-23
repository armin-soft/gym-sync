
import React from "react";
import { motion } from "framer-motion";
import { Ruler, Weight, GraduationCap, Users } from "lucide-react";
import { StudentFormField } from "./StudentFormField";

interface MeasurementsSectionProps {
  control: any;
  itemVariants: any;
}

export const MeasurementsSection = ({ control, itemVariants }: MeasurementsSectionProps) => {
  return (
    <div className="space-y-4">
      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="height"
          label="قد (سانتی‌متر)"
          placeholder="175"
          icon={Ruler}
          direction="ltr"
          numberOnly
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="weight"
          label="وزن (کیلوگرم)"
          placeholder="80"
          icon={Weight}
          direction="ltr"
          numberOnly
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="grade"
          label="مقطع تحصیلی"
          placeholder="کارشناسی"
          icon={GraduationCap}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="group"
          label="گروه"
          placeholder="گروه A"
          icon={Users}
        />
      </motion.div>
    </div>
  );
};
