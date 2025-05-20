
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddDayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newDayLabel: string;
  setNewDayLabel: (label: string) => void;
  handleAddDay: () => void;
}

const AddDayDialog: React.FC<AddDayDialogProps> = ({
  open,
  onOpenChange,
  newDayLabel,
  setNewDayLabel,
  handleAddDay,
}) => {
  // اضافه کردن Enter key handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newDayLabel.trim()) {
      e.preventDefault(); // جلوگیری از ارسال فرم
      handleAddDay();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">افزودن روز جدید</DialogTitle>
          <DialogDescription id="add-day-description" className="text-center">
            لطفاً نام روز جدید را وارد کنید
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              value={newDayLabel}
              onChange={(e) => setNewDayLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="نام روز (مثال: روز پنجم)"
              className="text-right"
              aria-label="نام روز"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            انصراف
          </Button>
          <Button
            type="button"
            onClick={handleAddDay}
            disabled={!newDayLabel.trim()}
          >
            افزودن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDayDialog;
