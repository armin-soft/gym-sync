
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import HierarchicalViewContainer from "./components/HierarchicalViewContainer";
import { PageContainer } from "@/components/ui/page-container";

const HierarchicalExercisesView = () => {
  return (
    <PageContainer>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full relative"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-500/10 to-teal-500/5 blur-3xl rounded-full" />
          
          {/* Animated sparkles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.5
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1, 0.8],
                y: [0, Math.random() > 0.5 ? 10 : -10, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              <Sparkles className="w-3 h-3 text-indigo-400/30" />
            </motion.div>
          ))}
        </div>
        
        {/* Main content */}
        <div className="relative z-10 h-full">
          <HierarchicalViewContainer />
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default HierarchicalExercisesView;
