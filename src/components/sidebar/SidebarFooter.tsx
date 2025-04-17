
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Dumbbell } from "lucide-react";
import manifestData from "@/Manifest.json";

interface SidebarFooterProps {
  gymName: string;
}

export function SidebarFooter({ gymName }: SidebarFooterProps) {
  return (
    <div className="p-4 border-t">
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
        <div className="flex-shrink-0 rounded-full bg-primary/10 p-2.5">
          <Dumbbell className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{gymName}</span>
          <div className="text-xs text-muted-foreground">
            <span>نسخه {toPersianNumbers(manifestData.version || "1.0.0")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
