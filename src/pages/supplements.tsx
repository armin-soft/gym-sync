
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Filter, Pill, Beaker, FlaskConical, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { SupplementList } from "@/components/supplements/SupplementList";
import { CategoryDialog } from "@/components/supplements/CategoryDialog";
import type { Supplement, SupplementCategory } from "@/types/supplement";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

const SupplementsPage = () => {
  const { toast } = useToast();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<Supplement | null>(null);
  const [editingCategory, setEditingCategory] = useState<SupplementCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          const loadedCategories = JSON.parse(savedCategories);
          setCategories(loadedCategories);
          if (loadedCategories.length > 0) {
            setSelectedCategory(loadedCategories[0].name);
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
  }, []);

  useEffect(() => {
    localStorage.setItem('supplements', JSON.stringify(supplements));
    localStorage.setItem('supplementCategories', JSON.stringify(categories));
  }, [supplements, categories]);

  const filteredSupplements = supplements.filter(
    (supplement) => supplement.category === selectedCategory
  );

  const handleDeleteSupplement = (id: number) => {
    setSupplements(supplements.filter((supplement) => supplement.id !== id));
    toast({
      title: "حذف مکمل",
      description: "مکمل مورد نظر با موفقیت حذف شد.",
    });
  };

  const handleEditSupplement = (supplement: Supplement) => {
    setEditingSupplement(supplement);
    setSupplementDialogOpen(true);
  };

  const handleAddSupplement = () => {
    if (categories.length === 0) {
      toast({
        title: "خطا در افزودن مکمل",
        description: "لطفاً ابتدا یک دسته‌بندی ایجاد کنید.",
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
            ? { ...data, id: supplement.id }
            : supplement
        )
      );
      toast({
        title: "ویرایش مکمل",
        description: "مکمل مورد نظر با موفقیت ویرایش شد.",
      });
    } else {
      const newSupplement: Supplement = {
        ...data,
        id: Math.max(0, ...supplements.map((s) => s.id)) + 1,
      };
      setSupplements([...supplements, newSupplement]);
      toast({
        title: "افزودن مکمل",
        description: "مکمل جدید با موفقیت اضافه شد.",
      });
    }
    setSupplementDialogOpen(false);
  };

  const handleEditCategory = (category: SupplementCategory) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category && supplements.some((s) => s.category === category.name)) {
      toast({
        title: "خطا در حذف دسته بندی",
        description: "این دسته بندی دارای مکمل است و نمی توان آن را حذف کرد.",
        variant: "destructive",
      });
      return;
    }
    setCategories(categories.filter((c) => c.id !== categoryId));
    toast({
      title: "حذف دسته بندی",
      description: "دسته بندی مورد نظر با موفقیت حذف شد.",
    });
  };

  const handleSubmitCategory = (name: string) => {
    if (editingCategory) {
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name }
            : category
        )
      );
      setSupplements(
        supplements.map((supplement) =>
          supplement.category === editingCategory.name
            ? { ...supplement, category: name }
            : supplement
        )
      );
      toast({
        title: "ویرایش دسته بندی",
        description: "دسته بندی مورد نظر با موفقیت ویرایش شد.",
      });
    } else {
      const newCategory: SupplementCategory = {
        id: Math.max(0, ...categories.map((c) => c.id)) + 1,
        name,
      };
      setCategories([...categories, newCategory]);
      if (categories.length === 0) {
        setSelectedCategory(name);
      }
      toast({
        title: "افزودن دسته بندی",
        description: "دسته بندی جدید با موفقیت اضافه شد.",
      });
    }
    setCategoryDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-7xl">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
        <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl border shadow-sm p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-8 w-8 text-purple-500" />
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  مکمل‌های ورزشی
                </h2>
              </div>
              <p className="text-muted-foreground max-w-md">
                در این بخش می‌توانید مکمل‌های ورزشی و ویتامین‌های خود را مدیریت کنید
              </p>
            </div>
            <div className="flex gap-3 self-end md:self-auto">
              <Button 
                variant="outline" 
                onClick={handleAddCategory}
                className="group transition-all hover:border-purple-500/50 hover:bg-purple-50"
              >
                <Plus className="ml-2 h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" />
                افزودن دسته‌بندی
              </Button>
              <Button 
                onClick={handleAddSupplement}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all"
              >
                <Plus className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                افزودن مکمل
              </Button>
            </div>
          </div>
        </div>
      </div>

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
            exit={{ opacity: 0, y: 20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold">فیلتر بر اساس دسته‌بندی</h3>
                </div>
                {categories.length > 0 ? (
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[200px] border-purple-200 hover:border-purple-300 transition-colors">
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem 
                          key={category.id} 
                          value={category.name}
                          className="focus:bg-purple-50"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    هنوز دسته‌بندی‌ای ایجاد نشده است
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 backdrop-blur-sm rounded-3xl border p-6">
                <SupplementList 
                  supplements={supplements.filter(s => s.category === selectedCategory)}
                  onEdit={handleEditSupplement}
                  onDelete={handleDeleteSupplement}
                />
              </div>
            </div>

            <div>
              <div className="sticky top-6">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl border p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Beaker className="h-5 w-5 text-purple-500" />
                    <h3 className="text-lg font-semibold">مدیریت دسته‌بندی‌ها</h3>
                  </div>
                  <ScrollArea className="h-[calc(100vh-20rem)]">
                    <div className="space-y-2 pr-4">
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-all border border-transparent hover:border-purple-200 hover:shadow-sm group"
                          >
                            <div className="flex items-center gap-2">
                              <Pill className="h-4 w-4 text-purple-500" />
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditCategory(category)}
                                className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteCategory(category.id)}
                                className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Beaker className="h-12 w-12 text-purple-200 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">
                            هنوز هیچ دسته‌بندی‌ای ایجاد نشده است
                          </p>
                          <Button
                            variant="link"
                            onClick={handleAddCategory}
                            className="mt-2 text-purple-500 hover:text-purple-600"
                          >
                            اولین دسته‌بندی را ایجاد کنید
                          </Button>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SupplementDialog
        open={supplementDialogOpen}
        onOpenChange={setSupplementDialogOpen}
        onSubmit={handleSubmitSupplement}
        defaultValues={editingSupplement || undefined}
        mode={editingSupplement ? "edit" : "add"}
        categories={categories}
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
