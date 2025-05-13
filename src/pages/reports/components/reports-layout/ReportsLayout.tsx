
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageContainer } from "@/components/ui/page-container";
import { ReactNode } from "react";

interface ReportsLayoutProps {
  children: ReactNode;
}

export const ReportsLayout = ({ children }: ReportsLayoutProps) => {
  return (
    <PageContainer 
      fullWidth 
      fullHeight 
      noPadding
      className="overflow-hidden"
    >
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90">
        {/* Dynamic background elements */}
        <div className="fixed top-0 right-0 w-[40vw] h-[40vh] bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48 opacity-60 animate-pulse" />
        <div className="fixed bottom-0 left-0 w-[35vw] h-[35vh] bg-purple-500/5 rounded-full blur-3xl -ml-40 -mb-40 opacity-70 animate-pulse duration-10000" />
        <div className="fixed top-1/3 left-1/4 w-[25vw] h-[25vh] bg-green-500/5 rounded-full blur-3xl opacity-50 animate-pulse duration-15000" />
        
        <ScrollArea className="h-screen w-full">
          <div className="w-full h-full mx-auto max-w-[1800px] py-4 sm:py-6 md:py-8 space-y-5 sm:space-y-6 md:space-y-8 px-3 sm:px-6 md:px-8 lg:px-10 pb-24">
            {children}
          </div>
        </ScrollArea>
      </div>
    </PageContainer>
  );
};
