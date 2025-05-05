
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, Tag, Info } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCategory: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  onAddCategory,
}) => {
  const deviceInfo = useDeviceInfo();
  
  const handleAddCategory = () => {
    onOpenChange(false);
    onAddCategory();
  };
  
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[500px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader className="px-6 py-4 -mx-6 -mt-6 mb-6 rounded-t-lg bg-amber-50 dark:bg-amber-900/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <DialogTitle>
                      نیاز به دسته‌بندی
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      برای افزودن مکمل یا ویتامین، ابتدا باید یک دسته‌بندی ایجاد کنید
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <p className="text-sm text-muted-foreground">
                  پیش از افزودن مکمل یا ویتامین، باید حداقل یک دسته‌بندی داشته باشید. دسته‌بندی‌ها به شما کمک می‌کنند تا مکمل‌ها و ویتامین‌ها را بهتر سازماندهی کنید.
                </p>
                
                <Card className="p-4 bg-muted/30 border-dashed">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <Tag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">افزودن دسته‌بندی جدید</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        برای افزودن دسته‌بندی جدید کلیک کنید
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddCategory} 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-600/20"
                  >
                    افزودن دسته‌بندی
                  </Button>
                </Card>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  بستن
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
