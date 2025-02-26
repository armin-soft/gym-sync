
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatsSummaryProps {
  data: any[];
  growthData?: any;
}

export const StatsSummary = ({ data, growthData }: StatsSummaryProps) => {
  const latestData = data[data.length - 1];
  
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {growthData?.рشد_شاگردان !== undefined && (
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-none">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-blue-700">رشد شاگردان در ماه اخیر</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-800">
                {toPersianNumbers(latestData.رشد_شاگردان || 0)}٪
              </span>
              <ArrowUpRight className="ml-1 h-4 w-4 text-blue-700" />
            </div>
          </div>
        </Card>
      )}
      
      {growthData?.рشد_درآمد !== undefined && (
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-none">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-green-700">رشد درآمد در ماه اخیر</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-green-800">
                {toPersianNumbers(latestData.رشد_درآمد || 0)}٪
              </span>
              <ArrowUpRight className="ml-1 h-4 w-4 text-green-700" />
            </div>
          </div>
        </Card>
      )}
      
      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-none">
        <div className="flex flex-col space-y-2">
          <span className="text-xs text-purple-700">میانگین شاگردان ماهانه</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-purple-800">
              {toPersianNumbers(Math.round(data.reduce((sum, item) => sum + item.شاگردان, 0) / data.length))}
            </span>
            <span className="text-xs text-purple-700 mr-1">نفر</span>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-none">
        <div className="flex flex-col space-y-2">
          <span className="text-xs text-orange-700">میانگین درآمد ماهانه</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-orange-800">
              {toPersianNumbers(Math.round(data.reduce((sum, item) => sum + item.درآمد, 0) / data.length / 1000))}
            </span>
            <span className="text-xs text-orange-700 mr-1">هزار تومان</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
