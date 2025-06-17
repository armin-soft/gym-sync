
import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { ModernFormField } from "./ModernFormField";

interface NotesFormProps {
  profile: StudentProfile;
  errors: Partial<Record<keyof StudentProfile, string>>;
  validFields: Partial<Record<keyof StudentProfile, boolean>>;
  handleUpdate: (key: keyof StudentProfile, value: string) => void;
}

export const NotesForm: React.FC<NotesFormProps> = ({
  profile,
  errors,
  validFields,
  handleUpdate
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          یادداشت‌ها
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          یادداشت‌های شخصی و توضیحات اضافی
        </p>
      </div>

      <div className="space-y-6">
        <ModernFormField
          label="یادداشت‌های شخصی"
          value={profile.notes}
          onChange={(value) => handleUpdate('notes', value)}
          placeholder="یادداشت‌های شخصی، نکات مهم یا توضیحات اضافی خود را اینجا بنویسید..."
          icon={FileText}
          error={errors.notes || ''}
          isValid={validFields.notes}
          type="textarea"
          rows={8}
        />
      </div>
    </motion.div>
  );
};
