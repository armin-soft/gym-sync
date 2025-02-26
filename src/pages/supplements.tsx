
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Filter, FlaskConical } from "lucide-react";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { SupplementList } from "@/components/supplements/SupplementList";
import { CategoryDialog } from "@/components/supplements/CategoryDialog";
import { CategoryTable } from "@/components/supplements/CategoryTable";
import type { Supplement, SupplementCategory } from "@/types/supplement";
import { motion, AnimatePresence } from "framer-motion";

const SupplementsPage = () => {
  const { toast } = useToast();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<Supplement | null>(null);
  const [editingCategory, setEditingCategory] = useState<SupplementCategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedSupplements = localStorage.getItem('supplements');
        const savedCategories = localStorage.getItem('supplementCategories');

        if (savedSupplements) {
          setSupplements(JSON.parse(savedSupplements));
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
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('supplements', JSON.stringify(supplements));
    localStorage.setItem('supplementCategories', JSON.stringify(categories));
  }, [supplements, categories]);

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

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: SupplementCategory) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (category: SupplementCategory) => {
    if (supplements.some((s) => s.category === category.name)) {
      toast({
        title: "خطا در حذف دسته بندی",
        description: "این دسته بندی دارای مکمل است و نمی توان آن را حذف کرد.",
        variant: "destructive",
      });
      return;
    }
    setCategories(categories.filter((c) => c.id !== category.id));
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
      setSelectedCategory(name);
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-500/5 to-purple-500/5 rounded-3xl" />
        <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl border shadow-sm p-8">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-8 w-8 text-purple-500" />
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                مکمل‌های ورزشی
              </h2>
              <p className="text-muted-foreground mt-2">
                در این بخش می‌توانید مکمل‌های ورزشی و ویتامین‌های خود را مدیریت کنید
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <CategoryTable 
          categories={categories}
          onAdd={handleAddCategory}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />

        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border shadow-sm p-8 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <FlaskConical className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">مدیریت مکمل‌ها</h3>
                  <p className="text-sm text-gray-500 mt-1">افزودن و ویرایش مکمل‌های ورزشی</p>
                </div>
              </div>
              <Button 
                onClick={handleAddSupplement}
                className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white shadow-purple-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <Plus className="ml-2 h-4 w-4" />
                افزودن مکمل
              </Button>
            </div>

            <SupplementList 
              supplements={supplements.filter(s => !selectedCategory || s.category === selectedCategory)}
              onEdit={handleEditSupplement}
              onDelete={handleDeleteSupplement}
            />
          </motion.div>
        )}
      </div>

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
