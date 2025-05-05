
import React from "react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlaskConical, Pill, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface SupplementsHeaderProps {
  activeTab: 'supplement' | 'vitamin';
  setActiveTab: (tab: 'supplement' | 'vitamin') => void;
}

export const SupplementsHeader: React.FC<SupplementsHeaderProps> = ({
  activeTab,
  setActiveTab
}) => {
  const deviceInfo = useDeviceInfo();
  
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10 rounded-3xl blur-sm" />
      
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-card/50 to-card shadow-lg">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(138,116,249,0.3),transparent_30%),radial-gradient(circle_at_70%_65%,rgba(100,153,233,0.3),transparent_40%)]"></div>
        
        <div className="p-6 md:p-8 relative grid md:grid-cols-[1fr_auto] gap-4 md:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-xl">
                <FlaskConical className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent tracking-tight">
                مدیریت مکمل‌ها و ویتامین‌ها
              </h1>
            </div>
            <p className="mt-2 text-muted-foreground">
              در این بخش می‌توانید مکمل‌های ورزشی و ویتامین‌های مورد نیاز ورزشکاران را مدیریت کنید
            </p>
            
            <div className="mt-4">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'supplement' | 'vitamin')}>
                <TabsList className="h-11 p-1 bg-muted/40 backdrop-blur-sm">
                  <TabsTrigger 
                    value="supplement" 
                    className="relative py-2.5 px-4 h-9 rounded-lg data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-300 transition-all duration-200"
                  >
                    <FlaskConical className="w-4 h-4 ml-2" />
                    <span>مکمل‌ها</span>
                    {activeTab === 'supplement' && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-purple-100 dark:bg-purple-900/30 rounded-lg -z-10" 
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="vitamin" 
                    className="relative py-2.5 px-4 h-9 rounded-lg data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-300 transition-all duration-200"
                  >
                    <Pill className="w-4 h-4 ml-2" />
                    <span>ویتامین‌ها</span>
                    {activeTab === 'vitamin' && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg -z-10" 
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="flex items-start justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                <DropdownMenuLabel>تنظیمات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  افزودن دسته‌بندی جدید
                </DropdownMenuItem>
                <DropdownMenuItem>
                  مدیریت دسته‌بندی‌ها
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  صدور مکمل‌ها و ویتامین‌ها
                </DropdownMenuItem>
                <DropdownMenuItem>
                  ورود اطلاعات از فایل
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
