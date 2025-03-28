
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Printer, FileText, Image, Check, ArrowLeft, Sparkles, Globe, FileDown, Settings, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string, options: PrintExportOptions) => Promise<void>;
  title: string;
  description?: string;
  previewImageUrl?: string;
  documentType: "student" | "workout" | "diet" | "supplement";
}

export interface PrintExportOptions {
  format: "pdf" | "print";
  paperSize: "a4" | "a5" | "letter";
  colorMode: "color" | "bw";
  quality: number;
  includeHeader: boolean;
  includeFooter: boolean;
  includeLogo: boolean;
  orientation: "portrait" | "landscape";
}

export const PrintExportModal = ({
  isOpen,
  onClose,
  onExport,
  title,
  description,
  previewImageUrl,
  documentType
}: PrintExportModalProps) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "print">("pdf");
  const [currentTab, setCurrentTab] = useState("preview");
  
  const [exportOptions, setExportOptions] = useState<PrintExportOptions>({
    format: "pdf",
    paperSize: "a4",
    colorMode: "color",
    quality: 100,
    includeHeader: true,
    includeFooter: true,
    includeLogo: true,
    orientation: "portrait"
  });

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await onExport(exportFormat, { ...exportOptions, format: exportFormat });
      toast({
        title: exportFormat === "pdf" ? "خروجی PDF با موفقیت ایجاد شد" : "ارسال به پرینتر انجام شد",
        description: exportFormat === "pdf" 
          ? "فایل PDF با موفقیت ایجاد و دانلود شد" 
          : "اطلاعات با موفقیت به پرینتر ارسال شد",
        variant: "default",
      });
      onClose();
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "خطا در ایجاد خروجی",
        description: "متأسفانه مشکلی در روند ایجاد خروجی رخ داد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getDocumentIcon = () => {
    switch(documentType) {
      case "student": return <Globe className="h-5 w-5 text-blue-500" />;
      case "workout": return <Sparkles className="h-5 w-5 text-amber-500" />;
      case "diet": return <Image className="h-5 w-5 text-emerald-500" />;
      case "supplement": return <FileText className="h-5 w-5 text-purple-500" />;
      default: return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  const getOptionTitle = () => {
    switch(documentType) {
      case "student": return "تنظیمات خروجی اطلاعات شاگرد";
      case "workout": return "تنظیمات خروجی برنامه تمرینی";
      case "diet": return "تنظیمات خروجی برنامه غذایی";
      case "supplement": return "تنظیمات خروجی برنامه مکمل";
      default: return "تنظیمات خروجی";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg"
        >
          <DialogHeader className="space-y-3">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
                {getDocumentIcon()}
              </div>
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          <Tabs defaultValue="preview" value={currentTab} onValueChange={setCurrentTab} className="mt-4">
            <TabsList className="grid grid-cols-2 p-1 bg-muted/80 rounded-lg">
              <TabsTrigger value="preview" className="flex items-center gap-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 transition-all duration-300">
                <Image className="h-4 w-4" />
                <span>پیش‌نمایش</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 transition-all duration-300">
                <Settings className="h-4 w-4" />
                <span>تنظیمات خروجی</span>
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="preview" className="py-6">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative w-full aspect-[1/1.414] max-h-[350px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 border shadow-md group transition-all duration-300 hover:shadow-lg">
                      {previewImageUrl ? (
                        <img 
                          src={previewImageUrl} 
                          alt="پیش‌نمایش خروجی" 
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.01]" 
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,white_70%,transparent)] dark:bg-grid-slate-800/30">
                          <div className="text-center px-6 py-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                            <FileText className="w-16 h-16 text-blue-500/60 mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground max-w-[200px]">پیش‌نمایش در حال آماده‌سازی است...</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute right-3 top-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-medium border shadow-sm transition-all group-hover:shadow-md">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            exportOptions.paperSize === "a4" ? "bg-blue-500" :
                            exportOptions.paperSize === "a5" ? "bg-emerald-500" : "bg-amber-500"
                          )}></div>
                          {exportOptions.paperSize === "a4" ? "A4" : 
                           exportOptions.paperSize === "a5" ? "A5" : 
                           "Letter"}
                        </div>
                      </div>
                      
                      <div className="absolute left-3 top-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-medium border shadow-sm transition-all group-hover:shadow-md">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${exportOptions.orientation === "portrait" ? "bg-blue-500" : "bg-purple-500"}`}></div>
                          {exportOptions.orientation === "portrait" ? "عمودی" : "افقی"}
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 right-0 left-0 h-20 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center">
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-t-xl px-6 py-3 flex items-center gap-8 transition-all group-hover:translate-y-1">
                          <div className={cn(
                            "flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all",
                            exportFormat === "pdf" 
                              ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800" 
                              : "text-gray-500 border-gray-200"
                          )} 
                          onClick={() => {
                            setExportFormat("pdf");
                            setExportOptions({...exportOptions, format: "pdf"});
                          }}
                          style={{ cursor: 'pointer' }}>
                            <FileDown className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </div>
                          <div className={cn(
                            "flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all",
                            exportFormat === "print" 
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800" 
                              : "text-gray-500 border-gray-200"
                          )}
                          onClick={() => {
                            setExportFormat("print");
                            setExportOptions({...exportOptions, format: "print"});
                          }}
                          style={{ cursor: 'pointer' }}>
                            <Printer className="w-3.5 h-3.5" />
                            <span>پرینت</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full pt-6 pb-2 border-t">
                      <p className="text-center text-sm text-muted-foreground mb-4">{getOptionTitle()}</p>
                      
                      <RadioGroup
                        value={exportFormat}
                        onValueChange={(value) => {
                          setExportFormat(value as "pdf" | "print");
                          setExportOptions({
                            ...exportOptions,
                            format: value as "pdf" | "print"
                          });
                        }}
                        className="flex justify-center gap-6"
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="pdf" id="pdf" className="text-primary" />
                          <Label htmlFor="pdf" className="cursor-pointer flex items-center gap-1.5">
                            <FileDown className="w-4 h-4 text-blue-500" />
                            <span>خروجی PDF</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="print" id="print" className="text-primary" />
                          <Label htmlFor="print" className="cursor-pointer flex items-center gap-1.5">
                            <Printer className="w-4 h-4 text-emerald-500" />
                            <span>ارسال به پرینتر</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="w-full flex justify-end mt-4 gap-3 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentTab("settings")} 
                        className="gap-2 group"
                      >
                        <Settings className="w-4 h-4 transition-transform group-hover:rotate-45" />
                        <span>تنظیمات بیشتر</span>
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button 
                        onClick={handleExport} 
                        disabled={isExporting}
                        className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        {isExporting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>در حال پردازش...</span>
                          </>
                        ) : exportFormat === "pdf" ? (
                          <>
                            <FileDown className="w-4 h-4" />
                            <span>دانلود PDF</span>
                          </>
                        ) : (
                          <>
                            <Printer className="w-4 h-4" />
                            <span>ارسال به پرینتر</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="py-6">
                  <div className="space-y-6">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span>اندازه کاغذ</span>
                        </h3>
                        <div className="flex items-center gap-3">
                          <Button
                            variant={exportOptions.paperSize === "a4" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setExportOptions({...exportOptions, paperSize: "a4"})}
                            className={cn(
                              "text-xs h-8 px-4",
                              exportOptions.paperSize === "a4" 
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" 
                                : ""
                            )}
                          >
                            {exportOptions.paperSize === "a4" && <Check className="w-3 h-3 mr-1" />}
                            A4
                          </Button>
                          <Button
                            variant={exportOptions.paperSize === "a5" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setExportOptions({...exportOptions, paperSize: "a5"})}
                            className={cn(
                              "text-xs h-8 px-4",
                              exportOptions.paperSize === "a5" 
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" 
                                : ""
                            )}
                          >
                            {exportOptions.paperSize === "a5" && <Check className="w-3 h-3 mr-1" />}
                            A5
                          </Button>
                          <Button
                            variant={exportOptions.paperSize === "letter" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setExportOptions({...exportOptions, paperSize: "letter"})}
                            className={cn(
                              "text-xs h-8 px-4",
                              exportOptions.paperSize === "letter" 
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" 
                                : ""
                            )}
                          >
                            {exportOptions.paperSize === "letter" && <Check className="w-3 h-3 mr-1" />}
                            Letter
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-500" />
                          <span>جهت صفحه</span>
                        </h3>
                        <div className="flex items-center gap-3">
                          <Button
                            variant={exportOptions.orientation === "portrait" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setExportOptions({...exportOptions, orientation: "portrait"})}
                            className={cn(
                              "text-xs h-8 px-4",
                              exportOptions.orientation === "portrait" 
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" 
                                : ""
                            )}
                          >
                            {exportOptions.orientation === "portrait" && <Check className="w-3 h-3 mr-1" />}
                            عمودی
                          </Button>
                          <Button
                            variant={exportOptions.orientation === "landscape" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setExportOptions({...exportOptions, orientation: "landscape"})}
                            className={cn(
                              "text-xs h-8 px-4",
                              exportOptions.orientation === "landscape" 
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" 
                                : ""
                            )}
                          >
                            {exportOptions.orientation === "landscape" && <Check className="w-3 h-3 mr-1" />}
                            افقی
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <FileText className="w-4 h-4 text-amber-500" />
                          <span>حالت رنگ</span>
                        </h3>
                        <div className="flex items-center gap-3">
                          <Button
                            variant={exportOptions.colorMode === "color" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setExportOptions({...exportOptions, colorMode: "color"})}
                            className={cn(
                              "text-xs h-8 px-4",
                              exportOptions.colorMode === "color" 
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" 
                                : ""
                            )}
                          >
                            {exportOptions.colorMode === "color" && <Check className="w-3 h-3 mr-1" />}
                            رنگی
                          </Button>
                          <Button
                            variant={exportOptions.colorMode === "bw" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setExportOptions({...exportOptions, colorMode: "bw"})}
                            className={cn(
                              "text-xs h-8 px-4",
                              exportOptions.colorMode === "bw" 
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" 
                                : ""
                            )}
                          >
                            {exportOptions.colorMode === "bw" && <Check className="w-3 h-3 mr-1" />}
                            سیاه و سفید
                          </Button>
                        </div>
                      </div>
                      
                      {exportFormat === "pdf" && (
                        <div className="space-y-2 bg-gray-50 dark:bg-gray-900/40 rounded-lg p-4 border">
                          <h3 className="text-sm font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <span>کیفیت ({toPersianNumbers(exportOptions.quality)}٪)</span>
                          </h3>
                          <div className="mt-4 px-2">
                            <Slider
                              value={[exportOptions.quality]}
                              min={50}
                              max={100}
                              step={5}
                              onValueChange={(value) => setExportOptions({...exportOptions, quality: value[0]})}
                              className="w-full"
                            />
                            <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                              <span>۵۰٪</span>
                              <span>۷۵٪</span>
                              <span>۱۰۰٪</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4 pb-2 pt-4 border-t">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Settings className="w-4 h-4 text-indigo-500" />
                        <span>گزینه‌های متفرقه</span>
                      </h3>
                      
                      <div className="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-4 border space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="includeHeader" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                            <span>شامل سربرگ</span>
                            <span className="text-xs text-muted-foreground">(لوگو، عنوان و ...</span>
                          </Label>
                          <Switch
                            id="includeHeader"
                            checked={exportOptions.includeHeader}
                            onCheckedChange={(checked) => setExportOptions({...exportOptions, includeHeader: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="includeFooter" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                            <span>شامل پاورقی</span>
                            <span className="text-xs text-muted-foreground">(اطلاعات تماس و ...)</span>
                          </Label>
                          <Switch
                            id="includeFooter"
                            checked={exportOptions.includeFooter}
                            onCheckedChange={(checked) => setExportOptions({...exportOptions, includeFooter: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="includeLogo" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                            <span>نمایش لوگو</span>
                            <span className="text-xs text-muted-foreground">(لوگوی باشگاه)</span>
                          </Label>
                          <Switch
                            id="includeLogo"
                            checked={exportOptions.includeLogo}
                            onCheckedChange={(checked) => setExportOptions({...exportOptions, includeLogo: checked})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full flex justify-between mt-4 gap-3 pt-4 border-t">
                      <Button variant="outline" onClick={() => setCurrentTab("preview")} className="gap-2 group">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        <span>بازگشت به پیش‌نمایش</span>
                      </Button>
                      <Button 
                        onClick={handleExport} 
                        disabled={isExporting}
                        className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        {isExporting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>در حال پردازش...</span>
                          </>
                        ) : exportFormat === "pdf" ? (
                          <>
                            <FileDown className="w-4 h-4" />
                            <span>دانلود PDF</span>
                          </>
                        ) : (
                          <>
                            <Printer className="w-4 h-4" />
                            <span>ارسال به پرینتر</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
