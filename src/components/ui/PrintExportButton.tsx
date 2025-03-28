
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { PrintExportModal, PrintExportOptions } from "@/components/ui/PrintExportModal";
import { Download, Printer, FileDown, Share2, FileText } from "lucide-react";
import { generateOutput } from "@/utils/pdf-export";
import { cn } from "@/lib/utils";

interface PrintExportButtonProps extends Omit<ButtonProps, "onClick"> {
  contentId?: string;
  title: string;
  description?: string;
  previewImageUrl?: string;
  documentType: "student" | "workout" | "diet" | "supplement";
  filename?: string;
  buttonDisplay?: "primary" | "minimal" | "icon-only";
  showPrintOnly?: boolean;
  includeFull?: boolean;  // New prop to include full trainer profile and student management data
}

export const PrintExportButton = ({
  contentId,
  title,
  description,
  previewImageUrl,
  documentType,
  filename = "export",
  buttonDisplay = "primary",
  showPrintOnly = false,
  includeFull = true,  // Default to true to include comprehensive data
  className,
  variant,
  ...buttonProps
}: PrintExportButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExport = async (format: string, options: PrintExportOptions) => {
    return generateOutput({
      ...options,
      contentId,
      filename,
      includeFull
    });
  };

  // Get appropriate variant based on buttonDisplay
  const getButtonVariant = (): ButtonProps["variant"] => {
    if (variant) return variant;
    
    switch (buttonDisplay) {
      case "primary": return "default";
      case "minimal": return "outline";
      case "icon-only": return "ghost";
      default: return "outline";
    }
  };

  // Render button based on display type
  const renderButton = () => {
    const buttonVariant = getButtonVariant();
    
    switch (buttonDisplay) {
      case "icon-only":
        return (
          <Button
            size="icon"
            variant={buttonVariant}
            onClick={() => setIsModalOpen(true)}
            className={cn("rounded-full transition-all duration-300 hover:shadow-md", className)}
            {...buttonProps}
          >
            {showPrintOnly ? <Printer className="h-4 w-4" /> : <FileDown className="h-4 w-4" />}
          </Button>
        );
        
      case "minimal":
        return (
          <Button
            variant={buttonVariant}
            onClick={() => setIsModalOpen(true)}
            className={cn("h-9 px-3 rounded-lg transition-all duration-300", className)}
            {...buttonProps}
          >
            {showPrintOnly ? (
              <Printer className="h-3.5 w-3.5 ml-1" />
            ) : (
              <FileDown className="h-3.5 w-3.5 ml-1" />
            )}
            <span className="text-xs font-medium">
              {showPrintOnly ? "پرینت" : "خروجی"}
            </span>
          </Button>
        );
        
      case "primary":
      default:
        return (
          <Button
            variant={buttonVariant}
            onClick={() => setIsModalOpen(true)}
            className={cn(
              "group flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm border border-primary/10",
              "bg-gradient-to-r from-purple-500/90 to-blue-500/90 text-white hover:from-purple-600/90 hover:to-blue-600/90",
              "transition-all duration-300 hover:shadow-md hover:shadow-primary/10", 
              className
            )}
            {...buttonProps}
          >
            <div className="rounded-full bg-white/20 p-1 backdrop-blur-sm">
              {showPrintOnly ? (
                <Printer className="h-4 w-4 transition-transform group-hover:scale-110" />
              ) : (
                <Share2 className="h-4 w-4 transition-transform group-hover:scale-110" />
              )}
            </div>
            <span className="transition-transform group-hover:translate-x-0.5 font-medium">
              {showPrintOnly ? "پرینت کامل" : "خروجی و پرینت"}
            </span>
          </Button>
        );
    }
  };

  return (
    <>
      {renderButton()}
      
      <PrintExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExport={handleExport}
        title={title}
        description={description}
        previewImageUrl={previewImageUrl}
        documentType={documentType}
        includeFull={includeFull}
      />
    </>
  );
};
