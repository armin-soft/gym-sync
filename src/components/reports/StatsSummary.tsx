
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface StatsSummaryProps {
  data: any[];
  growthData?: any;
  isMobile?: boolean;
}

export const StatsSummary = ({ data, growthData, isMobile = false }: StatsSummaryProps) => {
  const latestData = data[data.length - 1];
  
  const gridCols = isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4";
  
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className={`grid ${gridCols} gap-3`}
    >
      {growthData?.رشد_شاگردان !== undefined && (
        <motion.div variants={item}>
          <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-br from-blue-50/90 to-blue-100/80 backdrop-blur-sm border-blue-200/40 hover:border-blue-300/50 transition-all duration-300 hover:shadow-md group overflow-hidden relative`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex flex-col space-y-1 md:space-y-2 relative z-10">
              <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-blue-700`}>رشد شاگردان در ماه اخیر</span>
              <div className="flex items-baseline">
                <span className={`${isMobile ? 'text-base' : 'text-lg md:text-2xl'} font-bold text-blue-800`}>
                  {toPersianNumbers(latestData.رشد_شاگردان || 0)}٪
                </span>
                <ArrowUpRight className={`ml-1 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-blue-700`} />
              </div>
              
              <div className="mt-1 w-full h-1 bg-blue-200/60 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(Math.abs(latestData.رشد_شاگردان || 0) * 2, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-blue-500/50 rounded-full"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      
      {growthData?.رشد_درآمد !== undefined && (
        <motion.div variants={item}>
          <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-br from-green-50/90 to-green-100/80 backdrop-blur-sm border-green-200/40 hover:border-green-300/50 transition-all duration-300 hover:shadow-md group overflow-hidden relative`}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex flex-col space-y-1 md:space-y-2 relative z-10">
              <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-green-700`}>رشد درآمد در ماه اخیر</span>
              <div className="flex items-baseline">
                <span className={`${isMobile ? 'text-base' : 'text-lg md:text-2xl'} font-bold text-green-800`}>
                  {toPersianNumbers(latestData.رشد_درآمد || 0)}٪
                </span>
                <ArrowUpRight className={`ml-1 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-green-700`} />
              </div>
              
              <div className="mt-1 w-full h-1 bg-green-200/60 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(Math.abs(latestData.رشد_درآمد || 0) * 2, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-green-500/50 rounded-full"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      
      <motion.div variants={item}>
        <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-br from-purple-50/90 to-purple-100/80 backdrop-blur-sm border-purple-200/40 hover:border-purple-300/50 transition-all duration-300 hover:shadow-md group overflow-hidden relative`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex flex-col space-y-1 md:space-y-2 relative z-10">
            <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-purple-700`}>میانگین شاگردان ماهانه</span>
            <div className="flex items-baseline">
              <span className={`${isMobile ? 'text-base' : 'text-lg md:text-2xl'} font-bold text-purple-800`}>
                {toPersianNumbers(Math.round(data.reduce((sum, item) => sum + item.شاگردان, 0) / data.length))}
              </span>
              <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-purple-700 mr-1`}>نفر</span>
            </div>
            
            <div className="mt-1 w-full h-1 bg-purple-200/60 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-purple-500/50 rounded-full"
              />
            </div>
          </div>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-br from-orange-50/90 to-orange-100/80 backdrop-blur-sm border-orange-200/40 hover:border-orange-300/50 transition-all duration-300 hover:shadow-md group overflow-hidden relative`}>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex flex-col space-y-1 md:space-y-2 relative z-10">
            <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-orange-700`}>میانگین درآمد ماهانه</span>
            <div className="flex items-baseline">
              <span className={`${isMobile ? 'text-base' : 'text-lg md:text-2xl'} font-bold text-orange-800`}>
                {toPersianNumbers(Math.round(data.reduce((sum, item) => sum + item.درآمد, 0) / data.length / 1000))}
              </span>
              <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-orange-700 mr-1`}>هزار تومان</span>
            </div>
            
            <div className="mt-1 w-full h-1 bg-orange-200/60 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-orange-500/50 rounded-full"
              />
            </div>
          </div>
        </Card>
      </motion.div>
      
      {growthData?.برنامه_غذایی !== undefined && !isMobile && (
        <motion.div variants={item} className="col-span-2">
          <Card className="p-4 bg-gradient-to-br from-emerald-50/90 to-emerald-100/80 backdrop-blur-sm border-emerald-200/40 hover:border-emerald-300/50 transition-all duration-300 hover:shadow-md group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex flex-col space-y-2 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-emerald-700">تحلیل عملکرد تغذیه و مکمل‌ها</span>
                <span className="text-xs text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                  {toPersianNumbers(data.length)} دوره آخر
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <span className="text-xs text-emerald-700">میانگین برنامه‌های غذایی</span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-xl font-bold text-emerald-800">
                      {toPersianNumbers(Math.round(data.reduce((sum, item) => sum + (item.برنامه_غذایی || 0), 0) / data.length))}
                    </span>
                    <span className="text-xs text-emerald-700 mr-1">برنامه</span>
                  </div>
                  
                  <div className="mt-2 w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-emerald-500/50 rounded-full"
                    />
                  </div>
                </div>
                
                <div>
                  <span className="text-xs text-emerald-700">میانگین مکمل‌ها</span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-xl font-bold text-emerald-800">
                      {toPersianNumbers(Math.round(data.reduce((sum, item) => sum + (item.مکمل || 0), 0) / data.length))}
                    </span>
                    <span className="text-xs text-emerald-700 mr-1">مورد</span>
                  </div>
                  
                  <div className="mt-2 w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "55%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-emerald-500/50 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};
