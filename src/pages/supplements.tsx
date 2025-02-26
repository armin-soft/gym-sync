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

const SupplementsPage = () => {
  const { toast } = useToast();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<Supplement | null>(null);
  const [editingCategory, setEditingCategory] = useState<SupplementCategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');

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
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('supplements', JSON.stringify(supplements));
    localStorage.setItem('supplementCategories', JSON.stringify(categories));
  }, [supplements, categories]);

  const handleAddSupplement = () => {
    const relevantCategories = categories.filter(c => c.type === activeTab);
    if (relevantCategories.length === 0) {
      toast({
        title: `خطا در افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
        description: "لطفاً ابتدا یک دسته‌بندی ایجاد کنید",
        variant: "destructive",
      });
      return;
    }
    setEditingSupplement(null);
    setSupplementDialogOpen(true);
  };

  const handleSubmitSupplement = (data: Omit<Supplement, "id">) => {
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

  const filteredSupplements = supplements.filter((s) => {
    const typeMatch = s.type === activeTab;
    const categoryMatch = !selectedCategory || s.category === selectedCategory;
    return typeMatch && categoryMatch;
  });

  const relevantCategories = categories.filter(c => c.type === activeTab);

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-7xl">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10 rounded-3xl" />
        <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl border shadow-sm p-8">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-xl">
              <FlaskConical className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                مکمل‌ها و ویتامین‌ها
              </h2>
              <p className="text-muted-foreground mt-2">
                در این بخش می‌توانید مکمل‌های ورزشی و ویتامین‌های خود را مدیریت کنید
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="supplement" className="space-y-6" onValueChange={(value) => {
        setActiveTab(value as 'supplement' | 'vitamin');
        setSelectedCategory("");
      }}>
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="supplement" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
            <FlaskConical className="w-5 h-5 ml-2" />
            مکمل‌ها
          </TabsTrigger>
          <TabsTrigger value="vitamin" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            <Pill className="w-5 h-5 ml-2" />
            ویتامین‌ها
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <TabsContent value="supplement" className="space-y-6">
                <CategoryTable 
                  categories={relevantCategories}
                  onAdd={handleAddCategory}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
                {relevantCategories.length > 0 && (
                  <div className="bg-white rounded-3xl border shadow-lg p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-50 rounded-xl">
                          <FlaskConical className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">مکمل‌ها</h3>
                          <p className="text-sm text-gray-500">
                            تعداد کل: {toPersianNumbers(supplements.filter(s => s.type === 'supplement').length)}
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleAddSupplement}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-purple-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
                      >
                        <Plus className="h-4 w-4 ml-2" />
                        افزودن مکمل
                      </Button>
                    </div>

                    <ScrollArea className="h-[600px] pr-4">
                      <SupplementList 
                        supplements={filteredSupplements}
                        onEdit={handleEditSupplement}
                        onDelete={handleDeleteSupplement}
                      />
                    </ScrollArea>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="vitamin" className="space-y-6">
                <CategoryTable 
                  categories={relevantCategories}
                  onAdd={handleAddCategory}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
                {relevantCategories.length > 0 && (
                  <div className="bg-white rounded-3xl border shadow-lg p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-50 rounded-xl">
                          <Pill className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">ویتامین‌ها</h3>
                          <p className="text-sm text-gray-500">
                            تعداد کل: {toPersianNumbers(supplements.filter(s => s.type === 'vitamin').length)}
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleAddSupplement}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
                      >
                        <Plus className="h-4 w-4 ml-2" />
                        افزودن ویتامین
                      </Button>
                    </div>

                    <ScrollArea className="h-[600px] pr-4">
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
    </div>
  );
};

export default SupplementsPage;
