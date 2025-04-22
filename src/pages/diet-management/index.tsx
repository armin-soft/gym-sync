
import React from "react";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { MealList } from "@/components/diet/MealList";
import { motion } from "framer-motion";

const DietManagement = () => {
  return (
    <PageContainer withBackground>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-6"
      >
        <h1 className="text-2xl font-bold mb-6">مدیریت برنامه غذایی</h1>
        <Card className="p-4">
          <MealList />
        </Card>
      </motion.div>
    </PageContainer>
  );
};

export default DietManagement;
