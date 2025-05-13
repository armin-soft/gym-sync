
import React from "react";
import { motion } from "framer-motion";
import { StudentFormField } from "./StudentFormField";
import { Ruler, Weight } from "lucide-react";

interface MeasurementsSectionProps {
  control: any; // Using any as the control type is complex
  itemVariants: any;
}

export const MeasurementsSection = ({ 
  control, 
  itemVariants 
}: MeasurementsSectionProps) => {
  return (
    <>
      {/* Height Field */}
      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="height"
          label="قد (سانتی متر)"
          placeholder="۱۷۵"
          icon={Ruler}
          direction="ltr"
          persianNumbers={true}
          numberOnly={true}
        />
      </motion.div>
      
      {/* Weight Field */}
      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="weight"
          label="وزن (کیلوگرم)"
          placeholder="۷۵"
          icon={Weight}
          direction="ltr"
          persianNumbers={true}
          numberOnly={true}
        />
      </motion.div>
    </>
  );
};
