
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { DialogHeader } from "./AddEditDialog/DialogHeader";
import { FormFields } from "./AddEditDialog/FormFields";
import { FormActions } from "./AddEditDialog/FormActions";

interface AddEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Supplement, 'id'>) => void;
  defaultValues?: Supplement;
  mode: "add" | "edit";
  categories: SupplementCategory[];
  type: "supplement" | "vitamin";
}

export const AddEditDialog: React.FC<AddEditDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode,
  categories,
  type,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dosage: "",
    timing: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        name: defaultValues.name || "",
        category: defaultValues.category || "",
        dosage: defaultValues.dosage || "",
        timing: defaultValues.timing || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        dosage: "",
        timing: "",
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type,
    });
    onOpenChange(false);
  };

  const handleFormDataChange = (newData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        <DialogHeader
          type={type}
          mode={mode}
          onClose={() => onOpenChange(false)}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormFields
            formData={formData}
            onFormDataChange={handleFormDataChange}
            categories={categories}
            type={type}
          />

          <FormActions
            mode={mode}
            type={type}
            onCancel={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
