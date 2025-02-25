
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TypeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  typeName: string;
  onTypeNameChange: (name: string) => void;
  onSave: () => void;
  isEditing: boolean;
}

export const TypeDialog = ({
  isOpen,
  onOpenChange,
  typeName,
  onTypeNameChange,
  onSave,
  isEditing
}: TypeDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {isEditing ? "ویرایش نوع تمرین" : "افزودن نوع تمرین جدید"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-base">نام نوع تمرین</Label>
            <Input
              value={typeName}
              onChange={(e) => onTypeNameChange(e.target.value)}
              placeholder="نام نوع تمرین را وارد کنید"
              className="h-11 text-base focus-visible:ring-blue-400"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="hover:bg-muted/50 transition-colors"
          >
            انصراف
          </Button>
          <Button 
            onClick={onSave}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all min-w-24"
          >
            ذخیره
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
