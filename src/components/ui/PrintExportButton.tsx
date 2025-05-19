
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { generateOutput } from "@/utils/pdf-export";
import { FileText, Printer, Download, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export interface PrintExportOptions {
  format: "pdf" | "print";
  paperSize: "a4" | "a5" | "letter";
  orientation: "portrait" | "landscape";
  colorMode: "color" | "bw";
  quality: number;
  includeHeader: boolean;
  includeFooter: boolean;
  includeLogo: boolean;
}

export interface ExportDataOptions extends PrintExportOptions {
  contentId?: string;
  filename: string;
  includeFull: boolean;
}

interface PrintExportButtonProps extends Omit<ButtonProps, "onClick"> {
  contentId?: string;
  title: string;
  description?: string;
  previewImageUrl?: string;
  documentType: "student" | "workout" | "diet" | "supplement" | "all" | "exercise";
  filename?: string;
  buttonDisplay?: "primary" | "minimal" | "icon-only";
  includeFull?: boolean;
  className?: string;
}

export const PrintExportButton = ({
  contentId,
  title,
  description,
  previewImageUrl,
  documentType,
  filename = "export",
  buttonDisplay = "primary",
  includeFull = true,
  className,
  variant,
  ...buttonProps
}: PrintExportButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"pdf" | "print">("pdf");
  const [exportOptions, setExportOptions] = useState<PrintExportOptions>({
    format: "pdf",
    paperSize: "a4",
    orientation: "portrait",
    colorMode: "color",
    quality: 90,
    includeHeader: true,
    includeFooter: true,
    includeLogo: true
  });
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      await generateOutput({
        ...exportOptions,
        contentId,
        filename,
        includeFull
      });
      
      toast({
        title: "خروجی با موفقیت ایجاد شد",
        description: `فایل ${filename} با موفقیت ایجاد شد`,
        variant: "default",
      });
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error generating output:", error);
      toast({
        title: "خطا در ایجاد خروجی",
        description: "مشکلی در ایجاد خروجی رخ داد. لطفا مجددا تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  const buttonVariant = variant || (buttonDisplay === "primary" ? "default" : buttonDisplay === "minimal" ? "outline" : "ghost");

  // Render button based on display type
  const renderButton = () => {
    switch (buttonDisplay) {
      case "icon-only":
        return (
          <Button
            size="icon"
            variant={buttonVariant}
            onClick={() => setIsModalOpen(true)}
            className={cn("rounded-full", className)}
            {...buttonProps}
          >
            <Download className="h-4 w-4" />
          </Button>
        );
        
      case "minimal":
        return (
          <Button
            variant={buttonVariant}
            onClick={() => setIsModalOpen(true)}
            className={cn("h-9 px-3 rounded-lg", className)}
            {...buttonProps}
          >
            <Download className="h-3.5 w-3.5 ml-1.5" />
            <span className="text-xs font-medium">خروجی</span>
          </Button>
        );
        
      case "primary":
      default:
        return (
          <Button
            variant={buttonVariant}
            onClick={() => setIsModalOpen(true)}
            className={cn("flex items-center gap-2 px-4 py-2", className)}
            {...buttonProps}
          >
            <Download className="h-4 w-4" />
            <span className="font-medium">دانلود و چاپ</span>
          </Button>
        );
    }
  };

  const handleOptionChange = (key: keyof PrintExportOptions, value: any) => {
    setExportOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {renderButton()}
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl p-0 gap-0 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
            <DialogTitle className="text-2xl font-bold mb-2">{title || "دانلود و چاپ"}</DialogTitle>
            <DialogDescription className="text-white/80 text-sm">
              {description || "می‌توانید فایل مورد نظر را با فرمت دلخواه دانلود کنید"}
            </DialogDescription>
          </div>
          
          <div className="p-6">
            <Tabs defaultValue="pdf" value={activeTab} onValueChange={setActiveTab as any} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="pdf" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>PDF</span>
                </TabsTrigger>
                <TabsTrigger value="print" className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  <span>چاپ مستقیم</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-md font-medium mb-3">اندازه کاغذ</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant={exportOptions.paperSize === "a4" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleOptionChange("paperSize", "a4")}
                          className="flex-1"
                        >
                          A4
                        </Button>
                        <Button
                          type="button"
                          variant={exportOptions.paperSize === "a5" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleOptionChange("paperSize", "a5")}
                          className="flex-1"
                        >
                          A5
                        </Button>
                        <Button
                          type="button"
                          variant={exportOptions.paperSize === "letter" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleOptionChange("paperSize", "letter")}
                          className="flex-1"
                        >
                          Letter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-md font-medium mb-3">جهت صفحه</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant={exportOptions.orientation === "portrait" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleOptionChange("orientation", "portrait")}
                          className="flex-1"
                        >
                          عمودی
                        </Button>
                        <Button
                          type="button"
                          variant={exportOptions.orientation === "landscape" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleOptionChange("orientation", "landscape")}
                          className="flex-1"
                        >
                          افقی
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-md font-medium mb-3">محتوای خروجی</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={exportOptions.includeHeader ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleOptionChange("includeHeader", !exportOptions.includeHeader)}
                      >
                        {exportOptions.includeHeader ? "با سربرگ" : "بدون سربرگ"}
                      </Button>
                      <Button
                        type="button"
                        variant={exportOptions.includeFooter ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleOptionChange("includeFooter", !exportOptions.includeFooter)}
                      >
                        {exportOptions.includeFooter ? "با پاورقی" : "بدون پاورقی"}
                      </Button>
                      <Button
                        type="button"
                        variant={exportOptions.includeLogo ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleOptionChange("includeLogo", !exportOptions.includeLogo)}
                      >
                        {exportOptions.includeLogo ? "با لوگو" : "بدون لوگو"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-md font-medium mb-3">نمایش</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={exportOptions.colorMode === "color" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleOptionChange("colorMode", "color")}
                      >
                        رنگی
                      </Button>
                      <Button
                        type="button"
                        variant={exportOptions.colorMode === "bw" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleOptionChange("colorMode", "bw")}
                      >
                        سیاه و سفید
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {previewImageUrl && (
                  <div className="mt-4">
                    <h3 className="text-md font-medium mb-2">پیش‌نمایش</h3>
                    <div className="border rounded-md overflow-hidden">
                      <img src={previewImageUrl} alt="Preview" className="w-full h-auto max-h-40 object-contain" />
                    </div>
                  </div>
                )}
              </div>
            </Tabs>
            
            <div className="flex justify-end mt-8 gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                انصراف
              </Button>
              <Button 
                onClick={handleExport}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
              >
                {activeTab === "pdf" ? "دانلود PDF" : "ارسال به چاپگر"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
