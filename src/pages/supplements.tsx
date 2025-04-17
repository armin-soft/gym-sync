
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SupplementList } from "@/components/supplements/SupplementList";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { CategoryDialog } from "@/components/supplements/CategoryDialog";
import { CategoryTable } from "@/components/supplements/CategoryTable";
import { Separator } from "@/components/ui/separator";
import { Search, Plus, Filter, X, SlidersHorizontal, Pills } from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";
import { Supplement, SupplementCategory } from "@/types/supplement";

const SupplementsVitamins = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("supplements");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<"all" | "supplement" | "vitamin">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSupplementDialogOpen, setIsSupplementDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);
  const [selectedCategoryForEdit, setSelectedCategoryForEdit] = useState<SupplementCategory | null>(null);
  
  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const savedSupplements = localStorage.getItem("supplements");
        const savedCategories = localStorage.getItem("supplementCategories");
        
        console.log("Loading supplements data:", savedSupplements);
        console.log("Loading categories data:", savedCategories);
        
        if (savedSupplements) {
          setSupplements(JSON.parse(savedSupplements));
        } else {
          // Initialize with sample data if empty
          const sampleSupplements = [
            { id: 1, name: "پروتئین وی", category: "پروتئین", dosage: "30 گرم", timing: "بعد از تمرین", type: "supplement", description: "برای بازسازی عضلات" },
            { id: 2, name: "کراتین", category: "قدرت", dosage: "5 گرم", timing: "روزانه", type: "supplement", description: "برای افزایش قدرت و عملکرد" },
            { id: 3, name: "ویتامین D", category: "ویتامین", dosage: "2000 IU", timing: "صبح", type: "vitamin", description: "برای سلامت استخوان‌ها" },
            { id: 4, name: "امگا 3", category: "اسید چرب", dosage: "1000 میلی‌گرم", timing: "با غذا", type: "supplement", description: "برای سلامت قلب" }
          ];
          setSupplements(sampleSupplements);
          localStorage.setItem("supplements", JSON.stringify(sampleSupplements));
        }
        
        if (savedCategories) {
          setCategories(JSON.parse(savedCategories));
        } else {
          // Initialize with sample data if empty
          const sampleCategories = [
            { id: 1, name: "پروتئین", type: "supplement" },
            { id: 2, name: "قدرت", type: "supplement" },
            { id: 3, name: "ویتامین", type: "vitamin" },
            { id: 4, name: "اسید چرب", type: "supplement" }
          ];
          setCategories(sampleCategories);
          localStorage.setItem("supplementCategories", JSON.stringify(sampleCategories));
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "خطا در بارگذاری",
          description: "مشکلی در بارگذاری اطلاعات رخ داد",
          variant: "destructive",
        });
      }
    };

    loadData();
  }, [toast]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (supplements.length > 0) {
      localStorage.setItem("supplements", JSON.stringify(supplements));
    }
  }, [supplements]);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("supplementCategories", JSON.stringify(categories));
    }
  }, [categories]);

  const handleSaveSupplement = (data: Omit<Supplement, "id">) => {
    try {
      if (selectedSupplement) {
        // Edit existing supplement
        const updatedSupplements = supplements.map((item) =>
          item.id === selectedSupplement.id ? { ...item, ...data } : item
        );
        setSupplements(updatedSupplements);
        toast({
          title: "ویرایش موفق",
          description: `${data.name} با موفقیت ویرایش شد`,
        });
      } else {
        // Add new supplement
        const newSupplement: Supplement = {
          id: Date.now(),
          ...data,
        };
        setSupplements([...supplements, newSupplement]);
        toast({
          title: "افزودن موفق",
          description: `${data.name} با موفقیت اضافه شد`,
        });
      }
      return true;
    } catch (error) {
      console.error("Error saving supplement:", error);
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره اطلاعات رخ داد",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDeleteSupplement = (id: number) => {
    try {
      const supplementToDelete = supplements.find((s) => s.id === id);
      if (!supplementToDelete) return;

      setSupplements(supplements.filter((s) => s.id !== id));
      toast({
        title: "حذف موفق",
        description: `${supplementToDelete.name} با موفقیت حذف شد`,
      });
    } catch (error) {
      console.error("Error deleting supplement:", error);
      toast({
        title: "خطا",
        description: "مشکلی در حذف مکمل/ویتامین رخ داد",
        variant: "destructive",
      });
    }
  };

  const handleSaveCategory = (data: Omit<SupplementCategory, "id">) => {
    try {
      if (selectedCategoryForEdit) {
        // Edit existing category
        const updatedCategories = categories.map((category) =>
          category.id === selectedCategoryForEdit.id
            ? { ...category, ...data }
            : category
        );
        setCategories(updatedCategories);
        toast({
          title: "ویرایش موفق",
          description: `دسته‌بندی ${data.name} با موفقیت ویرایش شد`,
        });
      } else {
        // Add new category
        const newCategory: SupplementCategory = {
          id: Date.now(),
          ...data,
        };
        setCategories([...categories, newCategory]);
        toast({
          title: "افزودن موفق",
          description: `دسته‌بندی ${data.name} با موفقیت اضافه شد`,
        });
      }
      return true;
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره اطلاعات رخ داد",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDeleteCategory = (id: number) => {
    try {
      const categoryToDelete = categories.find((c) => c.id === id);
      if (!categoryToDelete) return;

      // Check if category is in use
      const isInUse = supplements.some((s) => s.category === categoryToDelete.name);
      if (isInUse) {
        toast({
          title: "خطا در حذف",
          description: `دسته‌بندی ${categoryToDelete.name} در حال استفاده است و نمی‌تواند حذف شود`,
          variant: "destructive",
        });
        return;
      }

      setCategories(categories.filter((c) => c.id !== id));
      toast({
        title: "حذف موفق",
        description: `دسته‌بندی ${categoryToDelete.name} با موفقیت حذف شد`,
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "خطا",
        description: "مشکلی در حذف دسته‌بندی رخ داد",
        variant: "destructive",
      });
    }
  };

  const filteredSupplements = supplements.filter((supplement) => {
    const matchesSearch =
      supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplement.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (supplement.description && supplement.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === "all" || supplement.type === selectedType;
    const matchesCategory = selectedCategory === "all" || supplement.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  const supplementsList = filteredSupplements.filter(
    (supplement) => supplement.type === "supplement"
  );
  const vitaminsList = filteredSupplements.filter(
    (supplement) => supplement.type === "vitamin"
  );
  
  console.log("Supplements tab:", activeTab);
  console.log("Filtered supplements:", filteredSupplements);
  console.log("Supplements list:", supplementsList);
  console.log("Vitamins list:", vitaminsList);

  return (
    <PageContainer withBackground>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
        >
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              مکمل‌ها و ویتامین‌ها
            </h1>
            <p className="text-muted-foreground">
              مدیریت مکمل‌ها و ویتامین‌های قابل تجویز به شاگردان
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              {showFilters ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  بستن فیلترها
                </>
              ) : (
                <>
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  فیلترها
                </>
              )}
            </Button>

            <Button
              onClick={() => {
                setSelectedSupplement(null);
                setIsSupplementDialogOpen(true);
              }}
              className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
            >
              <Plus className="h-4 w-4" />
              <span>افزودن مکمل/ویتامین</span>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 gap-4 mb-8"
        >
          <div className="bg-background rounded-lg border shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو در مکمل‌ها و ویتامین‌ها..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-3 pr-10"
                />
              </div>

              <div className="hidden lg:flex gap-4">
                <div className="w-40">
                  <select
                    className="w-full px-3 py-2 rounded-md border border-input bg-transparent text-sm shadow-sm"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                  >
                    <option value="all">همه انواع</option>
                    <option value="supplement">مکمل</option>
                    <option value="vitamin">ویتامین</option>
                  </select>
                </div>

                <div className="w-40">
                  <select
                    className="w-full px-3 py-2 rounded-md border border-input bg-transparent text-sm shadow-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">همه دسته‌بندی‌ها</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <label className="text-sm font-medium mb-1 block">نوع</label>
                  <select
                    className="w-full px-3 py-2 rounded-md border border-input bg-transparent text-sm shadow-sm"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                  >
                    <option value="all">همه انواع</option>
                    <option value="supplement">مکمل</option>
                    <option value="vitamin">ویتامین</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    دسته‌بندی
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-md border border-input bg-transparent text-sm shadow-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">همه دسته‌بندی‌ها</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="supplements" className="text-sm md:text-base">
              مکمل‌ها
            </TabsTrigger>
            <TabsTrigger value="vitamins" className="text-sm md:text-base">
              ویتامین‌ها
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-sm md:text-base">
              دسته‌بندی‌ها
            </TabsTrigger>
          </TabsList>

          <TabsContent value="supplements" className="space-y-4">
            <SupplementList
              supplements={supplementsList}
              onEdit={(supplement) => {
                setSelectedSupplement(supplement);
                setIsSupplementDialogOpen(true);
              }}
              onDelete={handleDeleteSupplement}
            />
          </TabsContent>

          <TabsContent value="vitamins" className="space-y-4">
            <SupplementList
              supplements={vitaminsList}
              onEdit={(supplement) => {
                setSelectedSupplement(supplement);
                setIsSupplementDialogOpen(true);
              }}
              onDelete={handleDeleteSupplement}
            />
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">دسته‌بندی‌ها</h2>
              <Button
                onClick={() => {
                  setSelectedCategoryForEdit(null);
                  setIsCategoryDialogOpen(true);
                }}
                variant="default"
              >
                <Plus className="h-4 w-4 mr-2" />
                افزودن دسته‌بندی
              </Button>
            </div>

            <CategoryTable
              categories={categories}
              onEdit={(category) => {
                setSelectedCategoryForEdit(category);
                setIsCategoryDialogOpen(true);
              }}
              onDelete={handleDeleteCategory}
            />
          </TabsContent>
        </Tabs>

        <SupplementDialog
          isOpen={isSupplementDialogOpen}
          onClose={() => setIsSupplementDialogOpen(false)}
          onSave={handleSaveSupplement}
          supplement={selectedSupplement}
          categories={categories}
        />

        <CategoryDialog
          isOpen={isCategoryDialogOpen}
          onClose={() => setIsCategoryDialogOpen(false)}
          onSave={handleSaveCategory}
          category={selectedCategoryForEdit}
        />
      </div>
    </PageContainer>
  );
};

export default SupplementsVitamins;
