
import React from "react";
import { ModernStudentForm } from "./form-components/ModernStudentForm";
import { Student } from "./StudentTypes";
import { StudentFormValues } from "@/lib/validations/student";

interface StudentFormProps {
  student?: Student;
  onSave: (data: StudentFormValues) => void;
  onCancel: () => void;
  isDialog?: boolean;
}

export const StudentForm = (props: StudentFormProps) => {
  return <ModernStudentForm {...props} />;
};
