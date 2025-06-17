
import React from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { StudentProfileContainer } from "./components/StudentProfileContainer";
import { StudentProfileBackground } from "./components/StudentProfileBackground";
import { useStudentProfile } from "./hooks/useStudentProfile";

const StudentProfile = () => {
  const profileData = useStudentProfile();

  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen relative overflow-hidden">
      <StudentProfileBackground />
      
      <motion.div 
        className="relative z-10 min-h-screen flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <StudentProfileContainer {...profileData} />
      </motion.div>
    </PageContainer>
  );
};

export default StudentProfile;
