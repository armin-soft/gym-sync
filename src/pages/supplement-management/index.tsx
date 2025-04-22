
import React from "react";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { SupplementList } from "@/components/SupplementList";
import { motion } from "framer-motion";

const SupplementManagement = () => {
  return (
    <PageContainer withBackground>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-6"
      >
        <h1 className="text-2xl font-bold mb-6">مدیریت مکمل‌ها و ویتامین‌ها</h1>
        <Card className="p-4">
          <SupplementList />
        </Card>
      </motion.div>
    </PageContainer>
  );
};

export default SupplementManagement;
