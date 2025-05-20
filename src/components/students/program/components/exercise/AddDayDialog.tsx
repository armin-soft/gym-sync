
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">افزودن روز جدید</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              value={newDayLabel}
              onChange={(e) => setNewDayLabel(e.target.value)}
              placeholder="نام روز (مثال: روز پنجم)"
              className="text-right"
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
