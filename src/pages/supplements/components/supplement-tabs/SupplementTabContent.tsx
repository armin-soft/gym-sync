
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SupplementList } from "@/components/supplements/SupplementList";
import { CategoryTable } from "@/components/supplements/CategoryTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Supplement } from "@/types/supplement";
import { SupplementCategory } from "@/types/supplement";

interface SupplementTabContentProps {
  type: "supplement" | "vitamin";
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

export const SupplementTabContent: React.FC<SupplementTabContentProps> = ({
  type,
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
      <Tabs defaultValue="items" className="h-full flex flex-col" dir="rtl">
        {/* Sub-tabs */}
        <div className="flex-shrink-0 mb-3">
          <TabsList className="grid w-full grid-cols-2 h-10 bg-muted/50">
            <TabsTrigger value="items" className="h-8 flex items-center gap-2 text-sm">
              <Package className="h-3 w-3" />
              <span>{type === "supplement" ? "مکمل‌ها" : "ویتامین‌ها"}</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="h-8 flex items-center gap-2 text-sm">
              <FolderOpen className="h-3 w-3" />
              <span>دسته‌بندی‌ها</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Sub-tabs Content */}
        <div className="flex-1 min-h-0">
          <TabsContent value="items" className="h-full m-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full"
            >
              <ScrollArea className="h-full w-full">
                <div className="p-1">
                  <SupplementList
                    supplements={supplements}
                    onAddSupplement={onAddSupplement}
                    onEditSupplement={onEditSupplement}
                    onDeleteSupplement={onDeleteSupplement}
                    activeTab={type}
                  />
                </div>
              </ScrollArea>
            </motion.div>
          </TabsContent>

          <TabsContent value="categories" className="h-full m-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full"
            >
              <ScrollArea className="h-full w-full">
                <div className="p-1">
                  <CategoryTable
                    categories={categories}
                    onAdd={onAddCategory}
                    onEdit={onEditCategory}
                    onDelete={(category) => onDeleteCategory(category.id)}
                    selectedCategory={selectedCategory || ''}
                    onSelectCategory={setSelectedCategory}
                  />
                </div>
              </ScrollArea>
            </motion.div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
