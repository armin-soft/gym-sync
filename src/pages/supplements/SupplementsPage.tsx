
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Pill, Beaker, Search, Plus } from "lucide-react";
import { SupplementTabs } from "./components/supplement-tabs";
import { SupplementContent } from "./components/supplement-content";
import { useSupplementsManager } from "@/hooks/supplements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SupplementsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Use the supplements manager hook
  const {
    supplements,
    categories,
    activeTab,
    selectedCategory,
    isLoading,
    filteredSupplements,
    relevantCategories,
    setActiveTab,
    setSelectedCategory,
    addCategory,
    editCategory,
    deleteCategory,
    addSupplement,
    editSupplement,
    deleteSupplement,
  } = useSupplementsManager();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getFilteredSupplements = () => {
    if (!searchTerm) return filteredSupplements;
    
    return filteredSupplements.filter(supp => 
      supp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supp.description && supp.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'supplement' | 'vitamin');
    setSelectedCategory("");
  };

  return (
    <PageContainer>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col"
      >
        <PageHeader
          title="مدیریت مکمل‌ها و ویتامین‌ها"
          subtitle="در این بخش می‌توانید مکمل‌ها و ویتامین‌های موجود را مدیریت کنید"
          icon={<Pill className="w-5 h-5 md:w-6 md:h-6" />}
        />

        <div className="mt-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="جستجوی مکمل یا ویتامین..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => addCategory()}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">افزودن دسته</span>
            </Button>
            
            <Button 
              variant="default"
              size="sm"
              onClick={() => addSupplement()}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}</span>
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <SupplementTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isLoading={isLoading}
            categories={categories}
            onAddCategory={addCategory}
            onEditCategory={editCategory}
            onDeleteCategory={deleteCategory}
            supplements={getFilteredSupplements()}
            onAddSupplement={addSupplement}
            onEditSupplement={editSupplement}
            onDeleteSupplement={deleteSupplement}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default SupplementsPage;
