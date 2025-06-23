
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Search, Users } from "lucide-react";

interface EmptyStudentsStateProps {
  searchQuery: string;
  onAddStudent: () => void;
}

export const EmptyStudentsState: React.FC<EmptyStudentsStateProps> = ({
  searchQuery,
  onAddStudent
}) => {
  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="max-w-md w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            {hasSearchQuery ? (
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-white" />
              </div>
            ) : (
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {hasSearchQuery ? "نتیجه‌ای یافت نشد" : "شاگردی وجود ندارد"}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {hasSearchQuery 
              ? `هیچ شاگردی با عبارت "${searchQuery}" یافت نشد. لطفاً کلید واژه دیگری امتحان کنید.`
              : "هنوز هیچ شاگردی اضافه نکرده‌اید. اولین شاگرد خود را اضافه کنید تا شروع کنید."
            }
          </p>

          {!hasSearchQuery && (
            <Button
              onClick={onAddStudent}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              <UserPlus className="w-4 h-4 ml-2" />
              افزودن اولین شاگرد
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
