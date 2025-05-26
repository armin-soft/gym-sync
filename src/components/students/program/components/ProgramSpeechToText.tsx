
import React, { useState } from "react";
import { SpeechToText } from "@/components/ui/speech-to-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProgramSpeechToTextProps {
  onSave: (text: string) => void;
  placeholder?: string;
  title?: string;
  className?: string;
  autoSave?: boolean;
}

const ProgramSpeechToText: React.FC<ProgramSpeechToTextProps> = ({
  onSave,
  placeholder = "برای شروع ضبط صدا، روی آیکون میکروفون کلیک کنید",
  title = "گفتار به نوشتار",
  className,
  autoSave = false
}) => {
  const [transcript, setTranscript] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTranscriptChange = (newTranscript: string) => {
    setTranscript(newTranscript);
    if (autoSave && newTranscript.trim()) {
      onSave(newTranscript);
    }
  };

  const handleSave = () => {
    if (transcript.trim()) {
      onSave(transcript);
      setTranscript("");
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setTranscript("");
    setIsExpanded(false);
  };

  return (
    <div className={cn("w-full", className)} dir="rtl">
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center"
          >
            <Button
              onClick={() => setIsExpanded(true)}
              variant="outline"
              className="w-full h-12 text-primary border-primary/20 hover:bg-primary/5"
            >
              <span className="font-medium">{title}</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-primary">{title}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <SpeechToText
                    onTranscriptChange={handleTranscriptChange}
                    value={transcript}
                    placeholder={placeholder}
                    multiLine={true}
                    className="compact-speech"
                  />
                  
                  {transcript.trim() && (
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        انصراف
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-primary text-primary-foreground"
                      >
                        <Save className="h-4 w-4 ml-1" />
                        ذخیره
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgramSpeechToText;
