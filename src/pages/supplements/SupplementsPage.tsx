import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";
import { SupplementsHeader } from "./components/SupplementsHeader";
import { SupplementTabs } from "./components/SupplementTabs";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { CategoryDialog } from "@/components/supplements/CategoryDialog";
import type { Supplement, SupplementCategory } from "@/types/supplement";

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

  // Load data from localStorage
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

  // Save changes to localStorage
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

  // Filter supplements by type and selected category
  const filteredSupplements = supplements.filter((s) => {
    const typeMatch = s.type === activeTab;
    
    // If no category is selected, show all supplements of the active tab
    if (!selectedCategory) {
      return typeMatch;
    }
    
    // Otherwise, show only supplements of the selected category
    return typeMatch && s.category === selectedCategory;
  });

  // Categories related to the active tab
  const relevantCategories = categories.filter(c => c.type === activeTab);

  return (
    <PageContainer className="container mx-auto py-2 sm:py-4 md:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8 max-w-7xl">
      <SupplementsHeader />
      
      <SupplementTabs 
        activeTab={activeTab}
        onTabChange={(value) => {
          setActiveTab(value as 'supplement' | 'vitamin');
          setSelectedCategory("");
        }}
        isLoading={isLoading}
        categories={relevantCategories}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
        supplements={filteredSupplements}
        onAddSupplement={handleAddSupplement}
        onEditSupplement={handleEditSupplement}
        onDeleteSupplement={handleDeleteSupplement}
        selectedCategory={selectedCategory}
      />

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
