
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSupplementManagement } from "./hooks/useSupplementManagement";
import { SupplementsHeader } from "./components/SupplementsHeader";
import { SupplementsNavigation } from "./components/SupplementsNavigation";
import { SupplementsContent } from "./components/SupplementsContent";
import { SupplementFormDialog } from "./components/SupplementFormDialog";
import { CategoryFormDialog } from "./components/CategoryFormDialog";
import { PageContainer } from "@/components/ui/page-container";

export const ModernSupplementsPage: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    supplements,
    categories,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    addSupplement,
    updateSupplement,
    deleteSupplement,
    addCategory,
    updateCategory,
    deleteCategory
  } = useSupplementManagement();

  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddSupplement = () => {
    setEditingSupplement(null);
    setSupplementDialogOpen(true);
  };

  const handleEditSupplement = (supplement: any) => {
    setEditingSupplement(supplement);
    setSupplementDialogOpen(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleSupplementSave = (dataOrId: any, supplementData?: any) => {
    if (editingSupplement && supplementData) {
      // Edit mode: first param is id, second is data
      updateSupplement(dataOrId, supplementData);
    } else {
      // Add mode: first param is data
      addSupplement(dataOrId);
    }
  };

  const handleCategorySave = (dataOrId: any, categoryData?: any) => {
    if (editingCategory && categoryData) {
      // Edit mode: first param is id, second is data
      updateCategory(dataOrId, categoryData);
    } else {
      // Add mode: first param is data
      addCategory(dataOrId);
    }
  };

  return (
    <PageContainer fullHeight fullWidth noPadding className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div dir="rtl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex flex-col"
        >
          <SupplementsHeader />
          
          <div className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <SupplementsNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              
              <SupplementsContent
                activeTab={activeTab}
                supplements={supplements}
                categories={categories}
                isLoading={isLoading}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onAddSupplement={handleAddSupplement}
                onEditSupplement={handleEditSupplement}
                onDeleteSupplement={deleteSupplement}
                onAddCategory={handleAddCategory}
                onEditCategory={handleEditCategory}
                onDeleteCategory={deleteCategory}
              />
            </div>
          </div>

          <SupplementFormDialog
            open={supplementDialogOpen}
            onOpenChange={setSupplementDialogOpen}
            supplement={editingSupplement}
            categories={categories.filter(c => c.type === activeTab)}
            type={activeTab}
            onSave={handleSupplementSave}
          />

          <CategoryFormDialog
            open={categoryDialogOpen}
            onOpenChange={setCategoryDialogOpen}
            category={editingCategory}
            type={activeTab}
            onSave={handleCategorySave}
          />
        </motion.div>
      </div>
    </PageContainer>
  );
};
