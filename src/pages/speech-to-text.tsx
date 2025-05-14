
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SpeechToText } from "@/components/ui/speech-to-text";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Copy, Save, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SpeechToTextPage = () => {
  const [transcript, setTranscript] = useState("");
  const [activeTab, setActiveTab] = useState("text-editor");
  const { toast } = useToast();
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    toast({
      title: "کپی شد",
      description: "متن با موفقیت در کلیپ‌بورد کپی شد.",
      duration: 3000,
    });
  };
  
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `گفتار_به_نوشتار_${new Date().toLocaleDateString('fa-IR').replace(/\//g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "دانلود شد",
      description: "فایل متنی با موفقیت دانلود شد.",
      duration: 3000,
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'متن تبدیل شده از گفتار',
        text: transcript,
      }).catch(err => {
        console.error('خطا در اشتراک‌گذاری:', err);
      });
    } else {
      toast({
        title: "اشتراک‌گذاری پشتیبانی نمی‌شود",
        description: "مرورگر شما از API اشتراک‌گذاری پشتیبانی نمی‌کند.",
        duration: 3000,
        variant: "destructive",
      });
    }
  };
  
  const handleSave = () => {
    localStorage.setItem('saved_transcript', transcript);
    toast({
      title: "ذخیره شد",
      description: "متن با موفقیت ذخیره شد.",
      duration: 3000,
    });
  };
  
  return (
    <PageContainer>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title="گفتار به نوشتار"
          description="با استفاده از تکنولوژی پیشرفته تشخیص گفتار، صدای خود را به متن فارسی تبدیل کنید"
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="text-editor" className="text-base">
              ویرایشگر متن
            </TabsTrigger>
            <TabsTrigger value="speech-engine" className="text-base">
              موتور تشخیص گفتار
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="speech-engine">
            <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 shadow-md">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-right mb-4">افزودن متن با صدای شما</h3>
                
                <SpeechToText
                  value={transcript}
                  onTranscriptChange={setTranscript}
                  placeholder="برای شروع ضبط صدا، روی دکمه میکروفون کلیک کنید. متن شما در اینجا نمایش داده خواهد شد..."
                  multiLine={true}
                  className="min-h-[300px]"
                />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="text-editor">
            <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 shadow-md">
              <div className="flex flex-col space-y-4">
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="w-full min-h-[300px] p-4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  dir="rtl"
                  placeholder="متن خود را اینجا وارد کنید یا از ابزار تشخیص گفتار استفاده نمایید..."
                />
                
                <div className="text-left text-sm text-muted-foreground">
                  {transcript.length} کاراکتر | {transcript.split(/\s+/).filter(Boolean).length} کلمه
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <motion.div 
          className="flex flex-wrap gap-3 justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            variant="outline"
            onClick={handleCopyToClipboard}
            disabled={!transcript}
            className="flex items-center gap-2"
          >
            <Copy size={16} />
            <span>کپی متن</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={!transcript}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            <span>دانلود فایل متنی</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={!transcript}
            className="flex items-center gap-2"
          >
            <Save size={16} />
            <span>ذخیره متن</span>
          </Button>
          
          <Button
            variant="default"
            onClick={handleShare}
            disabled={!transcript}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
          >
            <Share2 size={16} />
            <span>اشتراک‌گذاری</span>
          </Button>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default SpeechToTextPage;
