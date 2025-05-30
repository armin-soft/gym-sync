
import { Card } from "@/components/ui/card";
import { Tag, FolderTree, Activity } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface ExerciseStatsCardsProps {
  exerciseTypesCount: number;
  categoriesCount: number;
  exercisesCount: number;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export const ExerciseStatsCards = ({ 
  exerciseTypesCount, 
  categoriesCount, 
  exercisesCount 
}: ExerciseStatsCardsProps) => {
  const deviceInfo = useDeviceInfo();

  const getCardSpacing = () => {
    if (deviceInfo.isMobile) {
      return "p-2 gap-2";
    } else if (deviceInfo.isTablet) {
      return "p-3 gap-3";
    } else {
      return "p-4 gap-4";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
      <motion.div variants={itemVariants} className="col-span-1">
        <Card className={`${getCardSpacing()} bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 border-indigo-100 dark:border-indigo-900 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 sm:p-3 rounded-xl">
              <Tag className={`${deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"} text-indigo-600 dark:text-indigo-400`} />
            </div>
            <div className="space-y-0.5">
              <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>انواع حرکات</p>
              <p className={`${deviceInfo.isMobile ? "text-lg" : "text-xl sm:text-2xl"} font-bold text-indigo-600 dark:text-indigo-400`}>
                {toPersianNumbers(exerciseTypesCount)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="col-span-1">
        <Card className={`${getCardSpacing()} bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 sm:p-3 rounded-xl">
              <FolderTree className={`${deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"} text-purple-600 dark:text-purple-400`} />
            </div>
            <div className="space-y-0.5">
              <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>دسته بندی ها</p>
              <p className={`${deviceInfo.isMobile ? "text-lg" : "text-xl sm:text-2xl"} font-bold text-purple-600 dark:text-purple-400`}>
                {toPersianNumbers(categoriesCount)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 lg:col-span-1">
        <Card className={`${getCardSpacing()} bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-gray-900 border-pink-100 dark:border-pink-900 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-pink-100 dark:bg-pink-900 p-2 sm:p-3 rounded-xl">
              <Activity className={`${deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"} text-pink-600 dark:text-pink-400`} />
            </div>
            <div className="space-y-0.5">
              <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>حرکات</p>
              <p className={`${deviceInfo.isMobile ? "text-lg" : "text-xl sm:text-2xl"} font-bold text-pink-600 dark:text-pink-400`}>
                {toPersianNumbers(exercisesCount)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
