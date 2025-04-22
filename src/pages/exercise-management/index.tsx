
import React from "react";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { ExerciseTable } from "@/components/exercises/ExerciseTable";
import { motion } from "framer-motion";

const ExerciseManagement = () => {
  return (
    <PageContainer withBackground>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-6"
      >
        <h1 className="text-2xl font-bold mb-6">مدیریت تمرین‌ها</h1>
        <Card className="p-4">
          <ExerciseTable />
        </Card>
      </motion.div>
    </PageContainer>
  );
};

export default ExerciseManagement;
