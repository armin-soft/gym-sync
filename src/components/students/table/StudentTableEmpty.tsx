
import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { UserRound, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentTableEmptyProps {
  columnsCount: number;
  searchQuery?: string;
  onAddStudent?: () => void;
  onClearSearch?: () => void;
}

export const StudentTableEmpty: React.FC<StudentTableEmptyProps> = ({
  columnsCount,
  searchQuery = "",
  onAddStudent,
  onClearSearch
}) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={columnsCount} className="h-64 text-center p-0">
          <motion.div 
            className="flex flex-col items-center justify-center h-full py-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl opacity-60"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-800/30 shadow-inner">
                <UserRound className="h-10 w-10 text-blue-500 dark:text-blue-400" />
              </div>
            </div>

            <h3 className="text-xl font-medium mb-2 text-slate-800 dark:text-slate-200">
              {searchQuery ? "هیچ شاگردی پیدا نشد" : "هنوز هیچ شاگردی ثبت نشده است"}
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md">
              {searchQuery 
                ? "جستجوی شما با هیچ شاگردی مطابقت ندارد. لطفا عبارت دیگری را جستجو کنید یا فیلترها را پاک کنید." 
                : "برای شروع، شاگرد جدیدی اضافه کنید. اطلاعات شاگردان شما در اینجا نمایش داده خواهد شد."}
            </p>

            {searchQuery ? (
              <Button 
                variant="outline" 
                onClick={onClearSearch} 
                className="rounded-full px-6 py-5 h-10 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                پاک کردن جستجو
              </Button>
            ) : (
              <Button 
                onClick={onAddStudent}
                className="rounded-full px-6 py-5 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                افزودن شاگرد جدید
              </Button>
            )}
          </motion.div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
