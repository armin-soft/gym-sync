
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PageContainer } from "@/components/ui/page-container";
import { useStudents } from "@/hooks/students";
import { StudentLoginBackground } from "./login/StudentLoginBackground";
import { StudentLoginHeader } from "./login/StudentLoginHeader";
import { StudentLoginForm } from "./login/StudentLoginForm";
import { StudentLoginStats } from "./login/StudentLoginStats";

export const StudentLogin = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { students } = useStudents();

  const handleLogin = async (phone: string) => {
    setLoading(true);

    try {
      // Find student by phone only
      const student = students.find(s => s.phone === phone);
      
      if (student) {
        // Store student login info
        localStorage.setItem("studentLoggedIn", "true");
        localStorage.setItem("loggedInStudentId", student.id.toString());
        
        toast({
          title: "ورود موفق",
          description: `${student.name} عزیز، خوش آمدید`,
        });
        
        // Navigate to student dashboard
        navigate(`/Students/dashboard/${student.id}`);
      } else {
        toast({
          title: "خطا در ورود",
          description: "شماره موبایل یافت نشد",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "خطا",
        description: "مشکلی در ورود پیش آمده است",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <PageContainer fullScreen fullHeight withBackground>
      <StudentLoginBackground />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-md"
        >
          <StudentLoginHeader variants={itemVariants} />
          <StudentLoginForm 
            variants={itemVariants} 
            onSubmit={handleLogin} 
            loading={loading} 
          />
          <StudentLoginStats variants={itemVariants} />
        </motion.div>
      </div>
    </PageContainer>
  );
};
