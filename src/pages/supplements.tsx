import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
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

const initialSupplements: Supplement[] = [
  {
    id: 1,
    name: "کراتین مونوهیدرات",
    category: "عضله ساز",
    dosage: "۵ گرم",
    timing: "بعد از تمرین",
    description: "برای افزایش قدرت و حجم عضلانی",
  },
  {
    id: 2,
    name: "ال کارنیتین",
    category: "چربی سوز",
    dosage: "۲ گرم",
    timing: "قبل از تمرین",
    description: "کمک به چربی سوزی و افزایش انرژی",
  },
];

const initialCategories: SupplementCategory[] = [
  { id: 1, name: "عضله ساز" },
  { id: 2, name: "چربی سوز" },
  { id: 3, name: "افزایش انرژی" },
];

const Supplements = () => {
  const { toast } = useToast();
  const [supplements, setSupplements] = useState<Supplement[]>(initialSupplements);
  const [categories, setCategories] = useState<SupplementCategory[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("عضله ساز");
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<Supplement | null>(null);
  const [editingCategory, setEditingCategory] = useState<SupplementCategory | null>(null);

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
      // به‌روزرسانی نام دسته‌بندی در مکمل‌ها
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
      toast({
        title: "افزودن دسته بندی",
        description: "دسته بندی جدید با موفقیت اضافه شد.",
      });
    }
    setCategoryDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">مکمل های ورزشی</h2>
          <p className="text-muted-foreground">
            در این بخش می توانید مکمل های ورزشی را مدیریت کنید
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddCategory}>
            <Plus className="ml-2 h-4 w-4" /> افزودن دسته بندی
          </Button>
          <Button onClick={handleAddSupplement}>
            <Plus className="ml-2 h-4 w-4" /> افزودن مکمل
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">فیلتر بر اساس دسته بندی</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="انتخاب دسته بندی" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SupplementList 
            supplements={filteredSupplements} 
            onEdit={handleEditSupplement} 
            onDelete={handleDeleteSupplement} 
          />
        </div>
        <div>
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">مدیریت دسته بندی ها</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                >
                  <span>{category.name}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditCategory(category)}
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
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
                </div>
              ))}
            </div>
          </div>
        </div>
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

export default Supplements;
