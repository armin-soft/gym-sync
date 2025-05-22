
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CardFooter } from "@/components/ui/card";

export const ActivityCardFooter = () => {
  return (
    <CardFooter className="mt-4 pt-4 border-t dark:border-slate-800 px-0">
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-colors duration-300" 
        asChild
      >
        <Link to="/Reports">
          <span>مشاهده گزارش کامل</span>
          <motion.div
            animate={{ 
              rotate: [0, 20, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 5
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </Link>
      </Button>
    </CardFooter>
  );
};

export default ActivityCardFooter;
