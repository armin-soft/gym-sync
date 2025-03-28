
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { PrintExportModal, PrintExportOptions } from "@/components/ui/PrintExportModal";
import { Download, Printer } from "lucide-react";
import { generateOutput } from "@/utils/pdf-export";

interface PrintExportButtonProps extends Omit<ButtonProps, "onClick"> {
  contentId?: string;
  title: string;
  description?: string;
  previewImageUrl?: string;
  documentType: "student" | "workout" | "diet" | "supplement";
  filename?: string;
  variant?: "icon" | "text" | "icon-text";
  showPrintOnly?: boolean;
}

export const PrintExportButton = ({
  contentId,
  title,
  description,
  previewImageUrl,
  documentType,
  filename = "export",
  variant = "icon-text",
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
    switch (variant) {
      case "icon":
        return (
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className={className}
            {...buttonProps}
          >
            {showPrintOnly ? <Printer className="h-4 w-4" /> : <Download className="h-4 w-4" />}
          </Button>
        );
      case "text":
        return (
          <Button
            variant="outline"
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
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-2 ${className}`}
            {...buttonProps}
          >
            {showPrintOnly ? <Printer className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            {showPrintOnly ? "پرینت" : "خروجی و پرینت"}
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
