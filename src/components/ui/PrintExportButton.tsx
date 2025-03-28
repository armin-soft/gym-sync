
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { PrintExportModal, PrintExportOptions } from "@/components/ui/PrintExportModal";
import { Download, Printer, FileDown } from "lucide-react";
import { generateOutput } from "@/utils/pdf-export";

interface PrintExportButtonProps extends Omit<ButtonProps, "onClick"> {
  contentId?: string;
  title: string;
  description?: string;
  previewImageUrl?: string;
  documentType: "student" | "workout" | "diet" | "supplement";
  filename?: string;
  buttonVariant?: "icon" | "text" | "icon-text";
  showPrintOnly?: boolean;
  variant?: ButtonProps["variant"]; // Standard button variants from shadcn/ui
}

export const PrintExportButton = ({
  contentId,
  title,
  description,
  previewImageUrl,
  documentType,
  filename = "export",
  buttonVariant = "icon-text",
  variant = "outline",
  showPrintOnly = false,
  className,
  ...buttonProps
}: PrintExportButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExport = async (format: string, options: PrintExportOptions) => {
    return generateOutput({
      ...options,
      contentId,
      filename
    });
  };

  // Render button based on variant
  const renderButton = () => {
    switch (buttonVariant) {
      case "icon":
        return (
          <Button
            size="icon"
            variant={variant}
            onClick={() => setIsModalOpen(true)}
            className={className}
            {...buttonProps}
          >
            {showPrintOnly ? <Printer className="h-4 w-4" /> : <FileDown className="h-4 w-4" />}
          </Button>
        );
      case "text":
        return (
          <Button
            variant={variant}
            onClick={() => setIsModalOpen(true)}
            className={className}
            {...buttonProps}
          >
            {showPrintOnly ? "پرینت" : "خروجی"}
          </Button>
        );
      case "icon-text":
      default:
        return (
          <Button
            variant={variant}
            onClick={() => setIsModalOpen(true)}
            className={`group flex items-center gap-2 transition-all duration-300 ${className}`}
            {...buttonProps}
          >
            {showPrintOnly ? (
              <Printer className="h-4 w-4 transition-transform group-hover:scale-110" />
            ) : (
              <FileDown className="h-4 w-4 transition-transform group-hover:scale-110" />
            )}
            <span className="transition-transform group-hover:translate-x-0.5">
              {showPrintOnly ? "پرینت" : "خروجی و پرینت"}
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
      />
    </>
  );
};
