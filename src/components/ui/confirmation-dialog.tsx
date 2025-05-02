
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, HelpCircle } from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "warning";
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "تأیید",
  cancelText = "انصراف",
  variant = "default",
}) => {
  // Icon and color based on variant
  const getIconAndColor = () => {
    switch (variant) {
      case "destructive":
        return {
          Icon: AlertCircle,
          iconColor: "text-destructive",
          buttonClass:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        };
      case "warning":
        return {
          Icon: AlertTriangle,
          iconColor: "text-yellow-500",
          buttonClass:
            "bg-yellow-500 text-white hover:bg-yellow-600",
        };
      default:
        return {
          Icon: HelpCircle,
          iconColor: "text-primary",
          buttonClass:
            "bg-primary text-primary-foreground hover:bg-primary/90",
        };
    }
  };

  const { Icon, iconColor, buttonClass } = getIconAndColor();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <div
            className={`p-3 rounded-full bg-opacity-10 mb-4 ${
              variant === "destructive" ? "bg-destructive" :
              variant === "warning" ? "bg-yellow-500" :
              "bg-primary"
            }`}
          >
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center mt-4 flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            className={`flex-1 ${buttonClass}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
