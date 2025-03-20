
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, CheckCircle, XCircle, Pill, Loader2, Filter } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Supplement } from "@/types/supplement";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface StudentSupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (data: { supplements: number[]; vitamins: number[] }) => boolean;
  initialSupplements?: number[];
  initialVitamins?: number[];
}

export const StudentSupplementDialog: React.FC<StudentSupplementDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialSupplements = [],
  initialVitamins = [],
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("supplements");
  
  const { data: allSupplements = [], isLoading } = useQuery({
    queryKey: ["supplements"],
    queryFn: () => {
      const supplementsData = localStorage.getItem("supplements");
      return supplementsData ? JSON.parse(supplementsData) : [];
    },
  });

  useEffect(() => {
    if (open) {
      setSelectedSupplements(initialSupplements);
      setSelectedVitamins(initialVitamins);
    }
  }, [open, initialSupplements, initialVitamins]);

  const supplements = allSupplements.filter((item: Supplement) => item.type === "supplement");
  const vitamins = allSupplements.filter((item: Supplement) => item.type === "vitamin");

  const filteredSupplements = supplements.filter((item: Supplement) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVitamins = vitamins.filter((item: Supplement) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSupplement = (id: number) => {
    setSelectedSupplements((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleVitamin = (id: number) => {
    setSelectedVitamins((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const success = onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins,
    });

    if (success) {
      toast({
        title: "ذخیره موفق",
        description: "مکمل‌ها و ویتامین‌ها با موفقیت اضافه شدند",
      });
      onOpenChange(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const renderSupplementCard = (item: Supplement, isSelected: boolean, onClick: () => void) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`relative group p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 
        ${isSelected 
          ? "bg-indigo-50/90 dark:bg-indigo-900/40 border-indigo-200 dark:border-indigo-700 shadow-md" 
          : "bg-white/70 dark:bg-gray-900/40 border-gray-100 dark:border-gray-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 hover:border-indigo-100"
        }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-1 size-10 rounded-full flex items-center justify-center shrink-0
          ${isSelected 
            ? "bg-indigo-500 text-white" 
            : "bg-indigo-100/70 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-300"
          }`}>
          <Pill className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className={`font-medium ${isSelected ? "text-indigo-700 dark:text-indigo-300" : "text-gray-800 dark:text-gray-200"}`}>
              {item.name}
            </h3>
            {isSelected && (
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/50">
                انتخاب شده
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span className="inline-block px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full text-[10px] ml-1">
              {item.category}
            </span>
            <span>دوز: {item.dosage}</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            زمان مصرف: {item.timing}
          </p>
          {item.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>
      <div className="absolute top-2 left-2">
        {isSelected ? (
          <div className="size-5 rounded-full bg-indigo-500 flex items-center justify-center ring-4 ring-indigo-50 dark:ring-indigo-900/50">
            <CheckCircle className="size-3.5 text-white" />
          </div>
        ) : (
          <div className="size-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <XCircle className="size-3.5 text-gray-400 dark:text-gray-500" />
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderEmptyState = (type: string) => (
    <div className="flex flex-col items-center justify-center h-64 p-6">
      <div className="size-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Pill className="size-6 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
        هیچ {type === "supplements" ? "مکملی" : "ویتامینی"} یافت نشد
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
        {searchQuery ? 
          `هیچ ${type === "supplements" ? "مکملی" : "ویتامینی"} با این معیار یافت نشد. معیار جستجو را تغییر دهید.` : 
          `هیچ ${type === "supplements" ? "مکملی" : "ویتامینی"} در سیستم ثبت نشده است.`
        }
      </p>
      {searchQuery && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleClearSearch} 
          className="mt-4"
        >
          پاک کردن جستجو
        </Button>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.100/20%),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.900/20%),transparent_70%)]" />
        
        <DialogHeader className="px-6 pt-6 pb-0 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="size-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <Pill className="size-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            <DialogTitle className="text-xl">مدیریت مکمل‌ها و ویتامین‌ها</DialogTitle>
          </div>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            انتخاب مکمل‌ها و ویتامین‌ها برای {studentName}
          </DialogDescription>
          
          <div className="flex items-center gap-4 mt-6 mb-2">
            <div className="flex-1 relative">
              <Input
                placeholder="جستجو بر اساس نام یا دسته‌بندی..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 py-5 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border-indigo-100 dark:border-indigo-900/50 focus-visible:ring-indigo-500/20"
              />
              <Search className="absolute top-1/2 -translate-y-1/2 right-3 size-4 text-gray-400" />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
              <TabsList className="grid grid-cols-2 bg-indigo-50/50 dark:bg-indigo-950/50 p-1 h-auto border border-indigo-100/50 dark:border-indigo-900/50">
                <TabsTrigger 
                  value="supplements" 
                  className="py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 data-[state=active]:shadow-sm relative"
                >
                  مکمل‌ها
                  {selectedSupplements.length > 0 && (
                    <Badge className="absolute -top-1.5 -left-1.5 size-5 p-0 flex items-center justify-center bg-indigo-500 text-white text-[10px]">
                      {selectedSupplements.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="vitamins" 
                  className="py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 data-[state=active]:shadow-sm relative"
                >
                  ویتامین‌ها
                  {selectedVitamins.length > 0 && (
                    <Badge className="absolute -top-1.5 -left-1.5 size-5 p-0 flex items-center justify-center bg-indigo-500 text-white text-[10px]">
                      {selectedVitamins.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </DialogHeader>

        <div className="p-6 relative">
          <AnimatePresence mode="wait">
            <TabsContent value="supplements" className="mt-0 relative">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="size-8 text-indigo-500 animate-spin" />
                </div>
              ) : filteredSupplements.length > 0 ? (
                <ScrollArea className="pr-4 h-[400px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSupplements.map((supplement) => (
                      renderSupplementCard(
                        supplement,
                        selectedSupplements.includes(supplement.id),
                        () => toggleSupplement(supplement.id)
                      )
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                renderEmptyState("supplements")
              )}
            </TabsContent>

            <TabsContent value="vitamins" className="mt-0 relative">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="size-8 text-indigo-500 animate-spin" />
                </div>
              ) : filteredVitamins.length > 0 ? (
                <ScrollArea className="pr-4 h-[400px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredVitamins.map((vitamin) => (
                      renderSupplementCard(
                        vitamin,
                        selectedVitamins.includes(vitamin.id),
                        () => toggleVitamin(vitamin.id)
                      )
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                renderEmptyState("vitamins")
              )}
            </TabsContent>
          </AnimatePresence>
        </div>

        <DialogFooter className="px-6 py-4 bg-gray-50/80 dark:bg-gray-900/40 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="size-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                      <Pill className="size-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>تعداد آیتم‌های انتخاب شده</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {activeTab === "supplements" 
                  ? `${selectedSupplements.length} مکمل انتخاب شده` 
                  : `${selectedVitamins.length} ویتامین انتخاب شده`}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                انصراف
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
              >
                ذخیره تغییرات
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
