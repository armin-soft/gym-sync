
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Plus } from "lucide-react";

export const EmptyState: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            هیچ تمرینی یافت نشد
          </h3>
          
          <p className="text-gray-600 mb-6">
            هنوز هیچ تمرینی اضافه نشده است. اولین تمرین خود را ایجاد کنید.
          </p>
          
          <Button className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600">
            <Plus className="w-4 h-4 ml-2" />
            افزودن تمرین جدید
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
