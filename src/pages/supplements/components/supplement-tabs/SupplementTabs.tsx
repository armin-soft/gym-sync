
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pill, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { SupplementTabContent } from "./SupplementTabContent";
import { Supplement } from "@/types/supplement";
import { SupplementCategory } from "@/types/supplement";

interface SupplementTabsProps {
  activeTab: "supplement" | "vitamin";
  onTabChange: (value: string) => void;
  isLoading: boolean;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (id: number) => void;
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const SupplementTabs: React.FC<SupplementTabsProps> = ({
  activeTab,
  onTabChange,
  isLoading,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="h-full flex flex-col" dir="rtl">
      <Tabs 
        value={activeTab} 
        onValueChange={onTabChange} 
        className="h-full flex flex-col"
        dir="rtl"
      >
        {/* Tabs Header */}
        <div className="flex-shrink-0 mb-4">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-white/80 backdrop-blur-sm border shadow-sm">
            <TabsTrigger 
              value="supplement" 
              className="h-10 flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <Pill className="h-4 w-4" />
              <span className="font-medium">مکمل‌ها</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vitamin" 
              className="h-10 flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              <Heart className="h-4 w-4" />
              <span className="font-medium">ویتامین‌ها</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tabs Content */}
        <div className="flex-1 min-h-0">
          <TabsContent value="supplement" className="h-full m-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full"
            >
              <SupplementTabContent
                type="supplement"
                isLoading={isLoading}
                categories={categories}
                onAddCategory={onAddCategory}
                onEditCategory={onEditCategory}
                onDeleteCategory={onDeleteCategory}
                supplements={supplements}
                onAddSupplement={onAddSupplement}
                onEditSupplement={onEditSupplement}
                onDeleteSupplement={onDeleteSupplement}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="vitamin" className="h-full m-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full"
            >
              <SupplementTabContent
                type="vitamin"
                isLoading={isLoading}
                categories={categories}
                onAddCategory={onAddCategory}
                onEditCategory={onEditCategory}
                onDeleteCategory={onDeleteCategory}
                supplements={supplements}
                onAddSupplement={onAddSupplement}
                onEditSupplement={onEditSupplement}
                onDeleteSupplement={onDeleteSupplement}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </motion.div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
