
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Download, Printer } from "lucide-react";
import { generateOutput } from "@/utils/pdf-export";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export type PrintExportOptions = {
  colorMode?: "color" | "bw";
  paperSize?: "a4" | "letter" | "a5";
  orientation?: "portrait" | "landscape";
};

export type ExportDataOptions = {
  contentId?: string;
  format: "pdf" | "print";
  paperSize: "a4" | "letter" | "a5";
  orientation: "portrait" | "landscape";
  colorMode: "color" | "bw";
  quality: number;
  includeHeader: boolean;
  includeFooter: boolean;
  includeLogo: boolean;
  filename: string;
  includeFull?: boolean;
};

export interface PrintExportButtonProps {
  documentType: "student" | "workout" | "diet" | "supplement" | "all" | "exercise";
  title: string;
  filename: string;
  colorMode?: "color" | "bw";
  paperSize?: "a4" | "letter" | "a5";
  orientation?: "portrait" | "landscape";
  buttonDisplay?: "icon" | "text" | "primary";
  contentId?: string;
  onClick?: () => void;
  className?: string;
}

export function PrintExportButton({
  documentType,
  title,
  filename,
  colorMode = "color",
  paperSize = "a4",
  orientation = "portrait",
  buttonDisplay = "text",
  contentId,
  onClick,
  className
}: PrintExportButtonProps) {
  const { toast } = useToast();

  const handleExport = async () => {
    console.log("Export started for:", documentType);
    
    if (onClick) {
      onClick();
    }
    
    try {
      const options: ExportDataOptions = {
        contentId,
        format: "pdf",
        paperSize,
        orientation,
        colorMode,
        quality: 90,
        includeHeader: true,
        includeFooter: true,
        includeLogo: true,
        filename: filename || `خروجی-${Date.now()}`,
        includeFull: true,
      };

      const result = await generateOutput(options);
      console.log("Export result:", result);
      
      toast({
        title: "خروجی با موفقیت دانلود شد",
        description: "فایل PDF در پوشه دانلود ذخیره شد",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ایجاد خروجی به وجود آمد. لطفاً دوباره تلاش کنید",
      });
    }
  };

  // Icon + Text
  if (buttonDisplay === "primary") {
    return (
      <Button
        onClick={handleExport}
        className={cn("gap-1.5", className)}
      >
        <Download className="h-4 w-4" />
        <span>دریافت PDF</span>
      </Button>
    );
  }

  // Icon only
  if (buttonDisplay === "icon") {
    return (
      <Button
        size="icon"
        variant="ghost"
        onClick={handleExport}
        className={cn("rounded-full", className)}
      >
        <FileDown className="h-4 w-4" />
        <span className="sr-only">دانلود {title}</span>
      </Button>
    );
  }

  // Text button
  return (
    <Button variant="outline" onClick={handleExport} className={cn("gap-1.5", className)}>
      <FileDown className="h-4 w-4" />
      <span>دانلود {title}</span>
    </Button>
  );
}
