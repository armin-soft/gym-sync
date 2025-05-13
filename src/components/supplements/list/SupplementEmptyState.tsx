
import { Info } from "lucide-react";
import { motion } from "framer-motion";

interface SupplementEmptyStateProps {
  isTable?: boolean;
  deviceInfo: any;
}

export const SupplementEmptyState = ({ isTable, deviceInfo }: SupplementEmptyStateProps) => {
  if (isTable) {
    return (
      <tr>
        <td colSpan={4} className="h-32 text-center">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Info className={`mb-2 opacity-40 ${
              deviceInfo.isMobile ? "h-6 w-6" : deviceInfo.isTablet ? "h-7 w-7" : "h-8 w-8"
            }`} />
            <p className={`font-medium ${
              deviceInfo.isMobile ? "text-sm" : deviceInfo.isTablet ? "text-base" : "text-lg"
            }`}>
              هیچ موردی یافت نشد
            </p>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center mx-auto mb-4">
        <Info className="h-8 w-8 text-purple-500" />
      </div>
      <h3 className="text-lg font-medium mb-2">هیچ موردی یافت نشد</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        در این دسته‌بندی هنوز هیچ موردی ثبت نشده است. برای شروع، روی دکمه "افزودن" کلیک کنید.
      </p>
    </motion.div>
  );
};
