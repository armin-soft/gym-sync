
import { Button } from "@/components/ui/button";
import { Grid2X2, LayoutList } from "lucide-react";
import { useState } from "react";
import type { Supplement } from "@/types/supplement";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { SupplementGridView } from "./SupplementGridView";
import { SupplementListView } from "./SupplementListView";
import { SupplementEmptyState } from "./SupplementEmptyState";

interface SupplementListProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  viewMode?: "grid" | "list";
}

export const SupplementList = ({
  supplements,
  onEdit,
  onDelete,
  viewMode = "list",
}: SupplementListProps) => {
  const deviceInfo = useDeviceInfo();
  const [localViewMode, setLocalViewMode] = useState<"grid" | "list">(viewMode);
  
  // Force grid view on small devices
  const effectiveViewMode = deviceInfo.isMobile ? "grid" : localViewMode;
  
  const toggleViewMode = () => {
    setLocalViewMode(prevMode => prevMode === "grid" ? "list" : "grid");
  };

  if (supplements.length === 0) {
    return <SupplementEmptyState deviceInfo={deviceInfo} />;
  }

  return (
    <div className="flex flex-col space-y-4">
      {!deviceInfo.isMobile && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={toggleViewMode}
          >
            {effectiveViewMode === "list" ? (
              <>
                <Grid2X2 className="h-4 w-4" />
                <span className="text-xs">نمایش شبکه‌ای</span>
              </>
            ) : (
              <>
                <LayoutList className="h-4 w-4" />
                <span className="text-xs">نمایش لیستی</span>
              </>
            )}
          </Button>
        </div>
      )}
      
      {effectiveViewMode === "grid" ? (
        <SupplementGridView 
          supplements={supplements} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ) : (
        <SupplementListView 
          supplements={supplements} 
          onEdit={onEdit} 
          onDelete={onDelete}
          deviceInfo={deviceInfo}
        />
      )}
    </div>
  );
};
