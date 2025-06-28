
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DatabaseRecordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tableName: string;
  record: any;
  mode: "view" | "edit" | "create";
  columns: string[];
  onSave: () => void;
}

export const DatabaseRecordDialog: React.FC<DatabaseRecordDialogProps> = ({
  isOpen,
  onClose,
  tableName,
  record,
  mode,
  columns,
  onSave,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (mode === "create") {
      setFormData({});
    } else if (record) {
      setFormData(record);
    }
  }, [record, mode]);

  const handleInputChange = (column: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (mode === "create") {
        const { error } = await supabase
          .from(tableName)
          .insert([formData]);
        
        if (error) throw error;
        
        toast({
          title: "ایجاد موفق",
          description: "رکورد جدید با موفقیت ایجاد شد"
        });
      } else if (mode === "edit") {
        const { error } = await supabase
          .from(tableName)
          .update(formData)
          .eq('id', record.id);
        
        if (error) throw error;
        
        toast({
          title: "بروزرسانی موفق",
          description: "رکورد با موفقیت بروزرسانی شد"
        });
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving record:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره",
        description: "مشکلی در ذخیره اطلاعات پیش آمده است"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDialogTitle = () => {
    switch (mode) {
      case "view":
        return `مشاهده رکورد - ${tableName}`;
      case "edit":
        return `ویرایش رکورد - ${tableName}`;
      case "create":
        return `ایجاد رکورد جدید - ${tableName}`;
      default:
        return tableName;
    }
  };

  const renderInput = (column: string) => {
    const value = formData[column] || "";
    const isReadOnly = mode === "view" || column === "id" || column.includes("created_at") || column.includes("updated_at");

    if (typeof value === "string" && value.length > 100) {
      return (
        <Textarea
          value={value}
          onChange={(e) => handleInputChange(column, e.target.value)}
          readOnly={isReadOnly}
          className="min-h-20"
        />
      );
    }

    return (
      <Input
        type={typeof value === "number" ? "number" : "text"}
        value={value}
        onChange={(e) => handleInputChange(column, e.target.value)}
        readOnly={isReadOnly}
      />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {columns.map((column) => (
            <div key={column} className="space-y-2">
              <Label htmlFor={column} className="text-right">
                {column}
              </Label>
              {renderInput(column)}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            بستن
          </Button>
          {mode !== "view" && (
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
