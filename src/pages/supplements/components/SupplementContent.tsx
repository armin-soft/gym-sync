
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { SupplementList } from "@/components/supplements/SupplementList";
import type { Supplement } from "@/types/supplement";
import { useEffect } from "react";

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
  onDelete,
}: SupplementContentProps) => {
  // اضافه کردن یک log برای نمایش مکمل‌هایی که به کامپوننت رسیده‌اند
  useEffect(() => {
    console.log(`SupplementContent received ${type}s:`, supplements);
  }, [supplements, type]);
  
  return (
    <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-blue-50/30 rounded-2xl h-full">
      <div className="p-6 sm:p-8 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className={`p-3 bg-gradient-to-br ${
              type === 'supplement' 
                ? 'from-purple-100 to-blue-50' 
                : 'from-blue-100 to-purple-50'
            } rounded-xl`}>
              <div className={`w-6 h-6 ${
                type === 'supplement' 
                  ? 'text-purple-600' 
                  : 'text-blue-600'
              }`}>
                {type === 'supplement' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 2v7.31" />
                    <path d="M14 9.3V1.99" />
                    <path d="M8.5 2h7" />
                    <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
                    <path d="M5.58 16.5h12.85" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 2 8 5v10l-8 5-8-5V7l8-5Z" />
                  </svg>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {type === 'supplement' ? 'مکمل های ورزشی' : 'ویتامین ها'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {type === 'supplement' 
                  ? 'لیست تمام مکمل های ورزشی شما' 
                  : 'لیست تمام ویتامین های شما'}
              </p>
            </div>
          </div>
          <Button 
            onClick={onAdd}
            className={`bg-gradient-to-r ${
              type === 'supplement' 
                ? 'from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                : 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            } text-white shadow-lg transition-all duration-300 hover:scale-105 rounded-xl`}
            size="sm"
          >
            <Plus className="w-5 h-5 ml-2" />
            افزودن {type === 'supplement' ? 'مکمل' : 'ویتامین'}
          </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-auto"
        >
          <SupplementList
            supplements={supplements}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      </div>
    </Card>
  );
};
