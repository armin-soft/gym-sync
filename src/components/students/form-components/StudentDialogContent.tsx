
import React from "react";
import { motion } from "framer-motion";
import { StudentImageUpload } from "./StudentImageUpload";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { MeasurementsSection } from "./MeasurementsSection";
import { PaymentField } from "./PaymentField";
import { StudentDialogHeader } from "./StudentDialogHeader";
import { FormActions } from "./FormActions";
import { FormContainer, dialogVariants, itemVariants } from "./FormContainer";
import { Student } from "@/components/students/StudentTypes";
import { useStudentForm, StudentFormData } from "./hooks/useStudentForm";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { formatPayment } from "@/utils/studentUtils";

interface StudentDialogContentProps {
  student?: Student;
  onSave: (data: StudentFormData) => void;
  onCancel: () => void;
}

export const StudentDialogContent: React.FC<StudentDialogContentProps> = ({
  student,
  onSave,
  onCancel
}) => {
  const { formData, errors, handleFieldChange, handleSubmit } = useStudentForm(
    student, 
    onSave
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dialogVariants}
      className="relative"
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-500 to-violet-600 -z-10" />
      
      <StudentDialogHeader isEdit={Boolean(student)} itemVariants={itemVariants} />
      
      <FormContainer onSubmit={handleSubmit}>
        <StudentImageUpload 
          image={formData.image}
          onImageChange={(imageUrl) => handleFieldChange("image", imageUrl)}
          error={errors.image}
          itemVariants={itemVariants}
        />
        
        <motion.div variants={itemVariants} className="space-y-4">
          <PersonalInfoSection 
            value={{
              name: formData.name,
              phone: formData.phone
            }}
            onChange={handleFieldChange}
            errors={errors}
            itemVariants={itemVariants}
          />

          <MeasurementsSection 
            value={{
              height: formData.height,
              weight: formData.weight
            }}
            onChange={handleFieldChange}
            errors={errors}
            itemVariants={itemVariants}
          />

          <PaymentField
            value={toPersianNumbers(formatPayment(formData.payment || ''))}
            onChange={(value) => handleFieldChange("payment", value)}
            error={errors.payment}
            itemVariants={itemVariants}
          />
        </motion.div>

        <FormActions isEdit={Boolean(student)} onCancel={onCancel} />
      </FormContainer>
    </motion.div>
  );
};
