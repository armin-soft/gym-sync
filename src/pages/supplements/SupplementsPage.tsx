
import { useState } from "react";
import { motion } from "framer-motion";
import { useSupplementsManager } from "@/hooks/useSupplementsManager";
import { PageContainer } from "@/components/ui/page-container";
import { SupplementsHeader } from "./components/SupplementsHeader";
import { SupplementTabs } from "./components/SupplementTabs";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { CategoryDialog } from "@/components/supplements/CategoryDialog";
import { useToast } from "@/hooks/use-toast";
import { useDeviceInfo } from "@/hooks/use-mobile";

const SupplementsPage = () => {
  const { toast } = useToast();
  const deviceInfo = useDeviceInfo();
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Use the custom hook for supplements management
  const {
    supplements,
    categories,
    filteredSupplements,
    relevantCategories,
    activeTab,
    selectedCategory,
    isLoading,
    
    // Tab actions
    setActiveTab,
    setSelectedCategory,
    
    // Category actions
    addCategory,
    updateCategory,
    deleteCategory,
    
    // Supplement actions
    addSupplement,
    updateSupplement,
    deleteSupplement
  } = useSupplementsManager();

  // Category dialog handlers
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  // Supplement dialog handlers
  const handleAddSupplement = () => {
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

  const handleEditSupplement = (supplement) => {
    setEditingSupplement(supplement);
    setSupplementDialogOpen(true);
  };

  // Process category form
  const handleSubmitCategory = (name) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, name);
      toast({
        title: "دسته بندی با موفقیت ویرایش شد",
        variant: "default",
      });
    } else {
      addCategory(name);
      toast({
        title: "دسته بندی جدید با موفقیت ایجاد شد",
        variant: "default",
      });
    }
    setCategoryDialogOpen(false);
  };

  // Process supplement form
  const handleSubmitSupplement = (data) => {
    if (editingSupplement) {
      updateSupplement(editingSupplement.id, data);
      toast({
        title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} با موفقیت ویرایش شد`,
        variant: "default",
      });
    } else {
      addSupplement(data);
      toast({
        title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید با موفقیت اضافه شد`,
        variant: "default",
      });
    }
    setSupplementDialogOpen(false);
  };

  return (
    <PageContainer 
      className="mx-auto py-0 px-0 space-y-0 max-w-none min-h-screen"
      fullWidth={true}
      fullHeight={true}
      withBackground={true}
      noPadding={true}
    >
      <div className="relative w-full h-full flex flex-col overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed top-0 right-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-[80vh] h-[80vh] bg-violet-500/5 rounded-full blur-3xl -mr-40 -mt-40 animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 left-0 w-[90vh] h-[90vh] bg-blue-500/5 rounded-full blur-3xl -ml-60 -mb-60 animate-[pulse_10s_ease-in-out_infinite_1s]" />
          <div className="absolute top-1/2 left-1/4 w-[50vh] h-[50vh] bg-indigo-500/5 rounded-full blur-3xl animate-[pulse_7s_ease-in-out_infinite_0.5s]" />
          
          {/* Animated small orbs */}
          <motion.div 
            className="absolute top-[15%] right-[15%] w-16 h-16 rounded-full bg-gradient-to-r from-violet-400/10 to-pink-400/10"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div 
            className="absolute bottom-[25%] left-[10%] w-24 h-24 rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10"
            animate={{
              y: [0, 30, 0],
              x: [0, -15, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute top-[60%] right-[25%] w-20 h-20 rounded-full bg-gradient-to-r from-amber-400/10 to-orange-400/10"
            animate={{
              y: [0, -25, 0],
              x: [0, -10, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          />
        </div>
        
        <div className="flex-1 flex flex-col h-full overflow-hidden p-2 sm:p-3 md:p-4 lg:p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            className="space-y-3 sm:space-y-4 md:space-y-6 h-full flex flex-col"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <SupplementsHeader />
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: { opacity: 1, scale: 1 }
              }}
              className="flex-1 overflow-hidden"
            >
              <SupplementTabs 
                activeTab={activeTab}
                onTabChange={(value) => {
                  setActiveTab(value as 'supplement' | 'vitamin');
                  // Reset selected category when changing tabs
                  setSelectedCategory('all');
                }}
                isLoading={isLoading}
                categories={relevantCategories}
                onAddCategory={handleAddCategory}
                onEditCategory={handleEditCategory}
                onDeleteCategory={deleteCategory}
                supplements={filteredSupplements}
                onAddSupplement={handleAddSupplement}
                onEditSupplement={handleEditSupplement}
                onDeleteSupplement={deleteSupplement}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Dialogs */}
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
    </PageContainer>
  );
};

export default SupplementsPage;
