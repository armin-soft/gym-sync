
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatsSummaryProps {
  data: any[];
  growthData?: any;
  isMobile?: boolean;
}

export const StatsSummary = ({ data, growthData, isMobile = false }: StatsSummaryProps) => {
  const latestData = data[data.length - 1];
  
  const gridCols = isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4";
  
  return (
    <div className={`mt-4 md:mt-6 grid ${gridCols} gap-2 md:gap-4`}>
      {growthData?.رشد_شاگردان !== undefined && (
        <Card className={`${isMobile ? 'p-2' : 'p-3 md:p-4'} bg-gradient-to-br from-blue-50 to-blue-100 border-none`}>
          <div className="flex flex-col space-y-1 md:space-y-2">
            <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-blue-700`}>رشد شاگردان در ماه اخیر</span>
            <div className="flex items-baseline">
              <span className={`${isMobile ? 'text-base' : 'text-lg md:text-2xl'} font-bold text-blue-800`}>
                {toPersianNumbers(latestData.رشد_شاگردان || 0)}٪
              </span>
              <ArrowUpRight className={`ml-1 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-blue-700`} />
            </div>
          </div>
        </Card>
      )}
      
      {growthData?.رشد_درآمد !== undefined && (
        <Card className={`${isMobile ? 'p-2' : 'p-3 md:p-4'} bg-gradient-to-br from-green-50 to-green-100 border-none`}>
          <div className="flex flex-col space-y-1 md:space-y-2">
            <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-green-700`}>رشد درآمد در ماه اخیر</span>
            <div className="flex items-baseline">
              <span className={`${isMobile ? 'text-base' : 'text-lg md:text-2xl'} font-bold text-green-800`}>
                {toPersianNumbers(latestData.رشد_درآمد || 0)}٪
              </span>
              <ArrowUpRight className={`ml-1 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-green-700`} />
            </div>
          </div>
        </Card>
      )}
      
      <Card className={`${isMobile ? 'p-2' : 'p-3 md:p-4'} bg-gradient-to-br from-purple-50 to-purple-100 border-none`}>
        <div className="flex flex-col space-y-1 md:space-y-2">
          <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-purple-700`}>میانگین شاگردان ماهانه</span>
          <div className="flex items-baseline">
            <span className={`${isMobile ? 'text-base' : 'text-lg md:text-2xl'} font-bold text-purple-800`}>
              {toPersianNumbers(Math.round(data.reduce((sum, item) => sum + item.شاگردان, 0) / data.length))}
            </span>
            <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-purple-700 mr-1`}>نفر</span>
          </div>
        </div>
      </Card>
      
      <Card className={`${isMobile ? 'p-2' : 'p-3 md:p-4'} bg-gradient-to-br from-orange-50 to-orange-100 border-none`}>
        <div className="flex flex-col space-y-1 md:space-y-2">
          <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-orange-700`}>میانگین درآمد ماهانه</span>
          <div className="flex items-baseline">
            <span className={`${isMobile ? 'text-base' : 'text-lg md:text-2xl'} font-bold text-orange-800`}>
              {toPersianNumbers(Math.round(data.reduce((sum, item) => sum + item.درآمد, 0) / data.length / 1000))}
            </span>
            <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-orange-700 mr-1`}>هزار تومان</span>
          </div>
        </div>
      </Card>
      
      {growthData?.برنامه_غذایی !== undefined && isMobile === false && (
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-none">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-emerald-700">میانگین برنامه‌های غذایی</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-emerald-800">
                {toPersianNumbers(Math.round(data.reduce((sum, item) => sum + (item.برنامه_غذایی || 0), 0) / data.length))}
              </span>
              <span className="text-xs text-emerald-700 mr-1">برنامه</span>
            </div>
          </div>
        </Card>
      )}
      
      {growthData?.مکمل_ها !== undefined && isMobile === false && (
        <Card className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 border-none">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-pink-700">مصرف مکمل و ویتامین</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-pink-800">
                {toPersianNumbers(Math.round(data.reduce((sum, item) => sum + (item.مکمل_ها || 0), 0) / data.length))}
              </span>
              <span className="text-xs text-pink-700 mr-1">مورد</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
