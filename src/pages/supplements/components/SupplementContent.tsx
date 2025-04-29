
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SupplementList } from "@/components/supplements/SupplementList";
import { FlaskConical, Pill, Plus } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { Supplement } from "@/types/supplement";

interface SupplementContentProps {
  type: 'supplement' | 'vitamin';
  supplements: Supplement[];
  onAdd: () => void;
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
}

export const SupplementContent = ({
  type,
  supplements,
  onAdd,
  onEdit,
  onDelete
}: SupplementContentProps) => {
  const deviceInfo = useDeviceInfo();
  
  // Calculate responsive height for ScrollArea
  const getScrollAreaHeight = () => {
    if (deviceInfo.isMobile) {
      return "500px";
    } else if (deviceInfo.isTablet) {
      return "550px";  
    } else if (deviceInfo.isSmallLaptop) {
      return "600px";
    } else {
      return "650px";
    }
  };

  const Icon = type === 'supplement' ? FlaskConical : Pill;
  const count = supplements.length;
  const gradientClasses = type === 'supplement' 
    ? "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    : "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700";
  const bgClasses = type === 'supplement'
    ? "from-purple-100 to-blue-50"
    : "from-blue-100 to-purple-50";
  const textColor = type === 'supplement' ? "text-purple-600" : "text-blue-600";

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border shadow-md hover:shadow-lg transition-all p-3 sm:p-5 lg:p-8 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`p-2 sm:p-3 bg-gradient-to-br ${bgClasses} rounded-lg sm:rounded-xl`}>
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${textColor}`} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
              {type === 'supplement' ? 'مکمل ها' : 'ویتامین ها'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              تعداد کل: {toPersianNumbers(count)}
            </p>
          </div>
        </div>
        <Button 
          onClick={onAdd}
          className={`bg-gradient-to-r ${gradientClasses} text-white shadow-${type === 'supplement' ? 'purple' : 'blue'}-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-lg sm:rounded-xl text-xs sm:text-sm h-8 sm:h-10`}
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
          {`افزودن ${type === 'supplement' ? 'مکمل' : 'ویتامین'}`}
        </Button>
      </div>

      <ScrollArea className="w-full" style={{ height: getScrollAreaHeight() }}>
        <SupplementList 
          supplements={supplements}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </ScrollArea>
    </div>
  );
};
