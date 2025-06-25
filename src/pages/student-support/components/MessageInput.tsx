
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Send, Mic, MicOff, Image, Paperclip, 
  Volume2, Play, Pause, X, Upload 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { toast } from "@/hooks/use-toast";

interface MessageInputProps {
  onSendMessage: (content: string, type: 'text' | 'voice' | 'image' | 'file', fileName?: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(blob);
        setRecordedAudio(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        variant: "default",
        title: "ضبط صدا شروع شد",
        description: "در حال ضبط پیام صوتی..."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "دسترسی به میکروفون امکان‌پذیر نیست"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (recordedAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const sendVoiceMessage = () => {
    if (recordedAudio) {
      onSendMessage(recordedAudio, 'voice', 'voice_message.wav');
      setRecordedAudio(null);
      setIsPlaying(false);
    }
  };

  const sendTextMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim(), 'text');
      setMessage('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a file URL for preview/storage
      const fileUrl = URL.createObjectURL(file);
      onSendMessage(fileUrl, type, file.name);
      
      toast({
        variant: "success",
        title: "فایل ارسال شد",
        description: `${file.name} با موفقیت ارسال شد`
      });
    }
    
    // Reset input
    if (event.target) {
      event.target.value = '';
    }
    setShowAttachments(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  return (
    <div className="space-y-3">
      {/* Voice Recording UI */}
      {recordedAudio && (
        <Card className="p-4 bg-emerald-50 border-emerald-200">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={playAudio}
              className="w-10 h-10 rounded-full"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-700">پیام صوتی ضبط شده</span>
              </div>
              <audio
                ref={audioRef}
                src={recordedAudio}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={sendVoiceMessage}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setRecordedAudio(null);
                setIsPlaying(false);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Main Input Area */}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            placeholder="پیام خود را تایپ کنید..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled || isRecording}
            className="min-h-[44px] resize-none border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
          />
        </div>
        
        {/* Attachment Button */}
        <Popover open={showAttachments} onOpenChange={setShowAttachments}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="default"
              className="h-[44px] w-[44px] border-gray-200 hover:bg-gray-50"
              disabled={disabled}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="end">
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => imageInputRef.current?.click()}
              >
                <Image className="w-4 h-4 ml-2" />
                ارسال تصویر
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 ml-2" />
                ارسال فایل
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Voice Recording Button */}
        <Button
          variant="outline"
          size="default"
          className={cn(
            "h-[44px] w-[44px] transition-all duration-200",
            isRecording 
              ? "bg-red-500 text-white hover:bg-red-600 animate-pulse" 
              : "border-gray-200 hover:bg-gray-50"
          )}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={disabled || !!recordedAudio}
        >
          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </Button>

        {/* Send Button */}
        <Button
          onClick={sendTextMessage}
          disabled={disabled || !message.trim()}
          className="h-[44px] w-[44px] bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileUpload(e, 'image')}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => handleFileUpload(e, 'file')}
        className="hidden"
      />

      {/* Recording Status */}
      {isRecording && (
        <div className="flex items-center justify-center gap-2 text-red-600 text-sm animate-pulse">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          <span>در حال ضبط... کلیک کنید تا متوقف شود</span>
        </div>
      )}
    </div>
  );
};
