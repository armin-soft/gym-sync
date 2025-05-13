
import { useToast } from "@/hooks/use-toast";
import type { Supplement } from "@/types/supplement";
import type { SupplementType } from "./types";

export const useSupplementManagement = (
  supplements: Supplement[],
  setSupplements: React.Dispatch<React.SetStateAction<Supplement[]>>,
  activeTab: SupplementType
) => {
  const { toast } = useToast();

  // Supplement operations
  const handleAddSupplement = (data: Omit<Supplement, "id" | "type">) => {
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
    return newSupplement;
  };

  const handleUpdateSupplement = (supplementId: number, data: Omit<Supplement, "id" | "type">) => {
    setSupplements(
      supplements.map((supplement) =>
        supplement.id === supplementId
          ? { ...data, id: supplement.id, type: supplement.type }
          : supplement
      )
    );
    toast({
      title: `ویرایش ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
      description: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} مورد نظر با موفقیت ویرایش شد`,
    });
  };

  const handleDeleteSupplement = (id: number) => {
    setSupplements(supplements.filter((s) => s.id !== id));
    toast({
      title: `حذف ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
      description: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} مورد نظر با موفقیت حذف شد`,
    });
  };

  return {
    addSupplement: handleAddSupplement,
    updateSupplement: handleUpdateSupplement,
    deleteSupplement: handleDeleteSupplement,
  };
};
