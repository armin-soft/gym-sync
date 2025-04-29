
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Filter, FlaskConical, Loader2, Beaker, Pill } from "lucide-react";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { SupplementList } from "@/components/supplements/SupplementList";
import { CategoryDialog } from "@/components/supplements/CategoryDialog";
import { CategoryTable } from "@/components/supplements/CategoryTable";
import type { Supplement, SupplementCategory } from "@/types/supplement";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";

const SupplementsPage = () => {
  const { toast } = useToast();
  const deviceInfo = useDeviceInfo();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<Supplement | null>(null);
  const [editingCategory, setEditingCategory] = useState<SupplementCategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: SupplementCategory) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (category: SupplementCategory) => {
    setCategories(categories.filter((c) => c.id !== category.id));
    setSupplements(supplements.filter((s) => s.category !== category.name));
    
    toast({
      title: "حذف دسته بندی",
      description: "دسته بندی مورد نظر با موفقیت حذف شد",
    });
  };

  const handleEditSupplement = (supplement: Supplement) => {
    setEditingSupplement(supplement);
    setSupplementDialogOpen(true);
  };

  const handleDeleteSupplement = (id: number) => {
    setSupplements(supplements.filter((s) => s.id !== id));
    toast({
      title: `حذف ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
      description: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} مورد نظر با موفقیت حذف شد`,
    });
  };

  // بارگذاری اطلاعات از localStorage
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const savedSupplements = localStorage.getItem('supplements');
        const savedCategories = localStorage.getItem('supplementCategories');

        if (savedSupplements) {
          const parsedSupplements = JSON.parse(savedSupplements);
          setSupplements(parsedSupplements);
        }

        if (savedCategories) {
          const parsedCategories = JSON.parse(savedCategories);
          setCategories(parsedCategories);
          
          const relevantCategories = parsedCategories.filter((c: SupplementCategory) => c.type === activeTab);
          if (relevantCategories.length > 0) {
            setSelectedCategory(relevantCategories[0].name);
          } else {
            setSelectedCategory("");
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          variant: "destructive",
          title: "خطا در بارگذاری اطلاعات",
          description: "مشکلی در بارگذاری اطلاعات پیش آمده است"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [activeTab, toast]);

  // ذخیره تغییرات در localStorage
  useEffect(() => {
    localStorage.setItem('supplements', JSON.stringify(supplements));
    localStorage.setItem('supplementCategories', JSON.stringify(categories));
  }, [supplements, categories]);

  const handleAddSupplement = () => {
    const relevantCategories = categories.filter(c => c.type === activeTab);
    if (relevantCategories.length === 0) {
      toast({
        title: `خطا در افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
        description: "لطفاً ابتدا یک دسته بندی ایجاد کنید",
        variant: "destructive",
      });
      return;
    }
    setEditingSupplement(null);
    setSupplementDialogOpen(true);
  };

  const handleSubmitSupplement = (data: Omit<Supplement, "id" | "type">) => {
    if (editingSupplement) {
      setSupplements(
        supplements.map((supplement) =>
          supplement.id === editingSupplement.id
            ? { ...data, id: supplement.id, type: activeTab }
            : supplement
        )
      );
      toast({
        title: `ویرایش ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
        description: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} مورد نظر با موفقیت ویرایش شد`,
      });
    } else {
      const newSupplement: Supplement = {
        ...data,
        id: Math.max(0, ...supplements.map((s) => s.id)) + 1,
        type: activeTab,
      };
      setSupplements([...supplements, newSupplement]);
      toast({
        title: `افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
        description: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید با موفقیت اضافه شد`,
      });
    }
    setSupplementDialogOpen(false);
  };

  const handleSubmitCategory = (name: string) => {
    if (editingCategory) {
      const updatedCategories = categories.map((category) =>
        category.id === editingCategory.id
          ? { ...category, name }
          : category
      );
      setCategories(updatedCategories);
      
      const updatedSupplements = supplements.map((supplement) =>
        supplement.category === editingCategory.name
          ? { ...supplement, category: name }
          : supplement
      );
      setSupplements(updatedSupplements);

      toast({
        title: "ویرایش دسته بندی",
        description: "دسته بندی مورد نظر با موفقیت ویرایش شد",
      });
    } else {
      const newCategory: SupplementCategory = {
        id: Math.max(0, ...categories.map((c) => c.id)) + 1,
        name,
        type: activeTab,
      };
      setCategories([...categories, newCategory]);
      setSelectedCategory(name);
      toast({
        title: "افزودن دسته بندی",
        description: "دسته بندی جدید با موفقیت اضافه شد",
      });
    }
    setCategoryDialogOpen(false);
  };

  // فیلتر کردن مکمل‌ها بر اساس نوع (مکمل یا ویتامین) و دسته‌بندی انتخاب شده
  const filteredSupplements = supplements.filter((s) => {
    const typeMatch = s.type === activeTab;
    
    // اگر هیچ دسته‌بندی انتخاب نشده، همه مکمل‌های مربوط به تب فعال را نمایش بده
    if (!selectedCategory) {
      return typeMatch;
    }
    
    // در غیر این صورت، فقط مکمل‌های مربوط به دسته‌بندی انتخاب شده را نمایش بده
    return typeMatch && s.category === selectedCategory;
  });

  // دسته‌بندی‌های مرتبط با تب فعال (مکمل یا ویتامین)
  const relevantCategories = categories.filter(c => c.type === activeTab);

  // محاسبه ارتفاع ریسپانسیو برای ScrollArea
  const getScrollAreaHeight = () => {
    if (deviceInfo.isMobile) {
      return "500px";
    } else if (deviceInfo.isTablet) {
      return "550px";  
    } else if (deviceInfo.isSmallLaptop) {
      return "600px";
    } else {
      return "650px";
    }
  };

  // سایز عناوین متناسب با دستگاه
  const getHeaderSize = () => {
    if (deviceInfo.isMobile) {
      return "text-xl";
    } else if (deviceInfo.isTablet) {
      return "text-2xl";
    } else {
      return "text-3xl";
    }
  };

  return (
    <PageContainer className="container mx-auto py-2 sm:py-4 md:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8 max-w-7xl">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10 rounded-xl sm:rounded-2xl lg:rounded-3xl" />
        <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl border shadow-sm p-3 sm:p-5 lg:p-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl">
              <FlaskConical className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white`} />
            </div>
            <div>
              <h2 className={`${getHeaderSize()} font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}>
                مکمل ها و ویتامین ها
              </h2>
              <p className={`text-xs sm:text-sm lg:text-base text-muted-foreground mt-1 lg:mt-2`}>
                در این بخش می توانید مکمل های ورزشی و ویتامین های خود را مدیریت کنید
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="supplement" className="space-y-4 sm:space-y-6" onValueChange={(value) => {
        setActiveTab(value as 'supplement' | 'vitamin');
        setSelectedCategory("");
      }}>
        <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10 md:h-12">
          <TabsTrigger value="supplement" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
            <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
            مکمل ها
          </TabsTrigger>
          <TabsTrigger value="vitamin" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            <Pill className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
            ویتامین ها
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8 sm:py-10 md:py-12"
            >
              <Loader2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 animate-spin text-purple-500" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 sm:space-y-6"
            >
              <TabsContent value="supplement" className="space-y-4 sm:space-y-6">
                <CategoryTable 
                  categories={relevantCategories}
                  onAdd={handleAddCategory}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
                {relevantCategories.length > 0 && (
                  <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border shadow-md hover:shadow-lg transition-all p-3 sm:p-5 lg:p-8 space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-100 to-blue-50 rounded-lg sm:rounded-xl">
                          <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold text-gray-800`}>مکمل ها</h3>
                          <p className="text-xs sm:text-sm text-gray-500">
                            تعداد کل: {toPersianNumbers(supplements.filter(s => s.type === 'supplement').length)}
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleAddSupplement}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-purple-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-lg sm:rounded-xl text-xs sm:text-sm h-8 sm:h-10"
                      >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                        افزودن مکمل
                      </Button>
                    </div>

                    <ScrollArea className="w-full" style={{ height: getScrollAreaHeight() }}>
                      <SupplementList 
                        supplements={filteredSupplements}
                        onEdit={handleEditSupplement}
                        onDelete={handleDeleteSupplement}
                      />
                    </ScrollArea>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="vitamin" className="space-y-4 sm:space-y-6">
                <CategoryTable 
                  categories={relevantCategories}
                  onAdd={handleAddCategory}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
                {relevantCategories.length > 0 && (
                  <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border shadow-md hover:shadow-lg transition-all p-3 sm:p-5 lg:p-8 space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-100 to-purple-50 rounded-lg sm:rounded-xl">
                          <Pill className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold text-gray-800`}>ویتامین ها</h3>
                          <p className="text-xs sm:text-sm text-gray-500">
                            تعداد کل: {toPersianNumbers(supplements.filter(s => s.type === 'vitamin').length)}
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleAddSupplement}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-lg sm:rounded-xl text-xs sm:text-sm h-8 sm:h-10"
                      >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                        افزودن ویتامین
                      </Button>
                    </div>

                    <ScrollArea className="w-full" style={{ height: getScrollAreaHeight() }}>
                      <SupplementList 
                        supplements={filteredSupplements}
                        onEdit={handleEditSupplement}
                        onDelete={handleDeleteSupplement}
                      />
                    </ScrollArea>
                  </div>
                )}
              </TabsContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>

      <SupplementDialog
        open={supplementDialogOpen}
        onOpenChange={setSupplementDialogOpen}
        onSubmit={handleSubmitSupplement}
        defaultValues={editingSupplement || undefined}
        mode={editingSupplement ? "edit" : "add"}
        categories={categories.filter(c => c.type === activeTab)}
        type={activeTab}
      />

      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        onSubmit={handleSubmitCategory}
        defaultValue={editingCategory?.name}
        mode={editingCategory ? "edit" : "add"}
      />
    </PageContainer>
  );
};

export default SupplementsPage;
