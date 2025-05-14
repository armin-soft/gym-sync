
import { Supplement } from "@/types/supplement";
import { SupplementList } from "@/components/supplements/list/SupplementList";
import { SupplementEmptyState } from "@/components/nutrition/supplements/SupplementEmptyState";
import { useDeviceInfo } from "@/hooks/use-mobile";

export interface SupplementContentProps {
  supplements: Supplement[];
  onAdd: () => void;
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  type?: "supplement" | "vitamin";
}

export const SupplementContent = ({
  supplements,
  onAdd,
  onEdit,
  onDelete,
  type = "supplements" 
}: SupplementContentProps) => {
  const deviceInfo = useDeviceInfo();
  
  if (supplements.length === 0) {
    return <SupplementEmptyState activeTab={type === "vitamin" ? "vitamins" : "supplements"} />;
  }

  return (
    <div className="p-4 sm:p-6">
      <SupplementList
        supplements={supplements}
        onEdit={onEdit}
        onDelete={onDelete}
        viewMode={deviceInfo.isMobile ? "grid" : "list"}
      />
    </div>
  );
};
