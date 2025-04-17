
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface SidebarProfileProps {
  name: string;
  email: string;
  image: string;
  onClose: () => void;
}

export function SidebarProfile({ name, email, image, onClose }: SidebarProfileProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative px-5 py-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white"
    >
      <Button 
        size="icon" 
        variant="ghost" 
        onClick={onClose} 
        className="absolute top-4 left-4 rounded-full text-white hover:bg-white/20 h-8 w-8 p-0"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-2">
          <div className="absolute inset-0 rounded-full bg-white/20 blur-lg"></div>
          <Avatar className="h-16 w-16 border-2 border-white/50 relative">
            {image ? (
              <AvatarImage src={image} alt={name} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
                {name.slice(0, 2)}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-xs text-white/70">{email}</p>
        
        <div className="flex mt-4 space-x-2 space-x-reverse">
          <Button 
            size="sm" 
            variant="outline"
            asChild
            className="rounded-full text-xs bg-white/10 border-white/20 hover:bg-white/20 text-white"
          >
            <Link to="/Coach-Profile">
              <Settings className="h-3.5 w-3.5 ml-1.5" />
              پروفایل
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
