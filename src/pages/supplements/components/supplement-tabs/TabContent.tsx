
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { SupplementStage } from "./SupplementStage";
import { SupplementCategory } from "@/types/supplement";

interface TabContentProps {
  activeTab: 'supplement' | 'vitamin';
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: any[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: any) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <>
      <TabsContent value="supplement" className="mt-0 h-full" dir="rtl">
        <SupplementStage
          type="supplement"
          categories={categories}
          onAddCategory={onAddCategory}
          onEditCategory={onEditCategory}
          onDeleteCategory={onDeleteCategory}
          supplements={supplements}
          onAddSupplement={onAddSupplement}
          onEditSupplement={onEditSupplement}
          onDeleteSupplement={onDeleteSupplement}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </TabsContent>
      
      <TabsContent value="vitamin" className="mt-0 h-full" dir="rtl">
        <SupplementStage
          type="vitamin"
          categories={categories}
          onAddCategory={onAddCategory}
          onEditCategory={onEditCategory}
          onDeleteCategory={onDeleteCategory}
          supplements={supplements}
          onAddSupplement={onAddSupplement}
          onEditSupplement={onEditSupplement}
          onDeleteSupplement={onDeleteSupplement}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </TabsContent>
    </>
  );
};
