
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Play, Pause, Volume2, Download, 
  FileText, Image as ImageIcon, User 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ChatMessage {
  id: string;
  sender: 'student' | 'trainer';
  senderName: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  type: 'text' | 'voice' | 'image' | 'file';
  fileName?: string;
  studentId?: number;
}

interface MessageDisplayProps {
  message: ChatMessage;
  isOwn: boolean;
  trainerProfile?: any;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ 
  message, 
  isOwn, 
  trainerProfile 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef] = useState<HTMLAudioElement | null>(null);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'همین الان';
    } else if (diffInHours < 24) {
      return `${toPersianNumbers(Math.floor(diffInHours).toString())} ساعت پیش`;
    } else {
      return `${toPersianNumbers(Math.floor(diffInHours / 24).toString())} روز پیش`;
    }
  };

  const playVoiceMessage = () => {
    if (message.type === 'voice' && message.message) {
      const audio = new Audio(message.message);
      
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
        
        audio.onended = () => {
          setIsPlaying(false);
        };
      }
    }
  };

  const downloadFile = () => {
    if (message.message && message.fileName) {
      const link = document.createElement('a');
      link.href = message.message;
      link.download = message.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'voice':
        return (
          <div className="flex items-center gap-3 min-w-[200px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={playVoiceMessage}
              className={cn(
                "w-10 h-10 rounded-full",
                isOwn ? "hover:bg-white/20" : "hover:bg-gray-100"
              )}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <div className="flex-1 h-1 bg-white/30 rounded-full">
                  <div className="w-2/3 h-full bg-current rounded-full"></div>
                </div>
              </div>
              <p className="text-xs opacity-80 mt-1">پیام صوتی</p>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <div className="relative max-w-xs">
              <img
                src={message.message}
                alt="تصویر ارسالی"
                className="rounded-lg max-h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={downloadFile}
                  className="bg-white/90 text-gray-800"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {message.fileName && (
              <p className="text-xs opacity-80">{message.fileName}</p>
            )}
          </div>
        );

      case 'file':
        return (
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg min-w-[200px]">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{message.fileName || 'فایل'}</p>
              <p className="text-xs opacity-80">کلیک برای دانلود</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={downloadFile}
              className={cn(
                "w-8 h-8",
                isOwn ? "hover:bg-white/20" : "hover:bg-gray-100"
              )}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        );

      default:
        return <p className="text-sm leading-relaxed">{message.message}</p>;
    }
  };

  return (
    <div className={cn("flex gap-3 max-w-[85%]", isOwn ? 'justify-end' : 'justify-start')}>
      {!isOwn && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          {trainerProfile?.image && trainerProfile.image !== "/Assets/Image/Place-Holder.svg" ? (
            <AvatarImage src={trainerProfile.image} alt="مربی" />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-500 text-white text-xs">
              {trainerProfile?.name ? trainerProfile.name.charAt(0) : 'م'}
            </AvatarFallback>
          )}
        </Avatar>
      )}
      
      <div className={cn("space-y-1", isOwn && "items-end")}>
        {!isOwn && (
          <p className="text-xs text-gray-500 px-2">{message.senderName}</p>
        )}
        
        <div
          className={cn(
            "rounded-2xl p-4 shadow-sm max-w-md cursor-pointer",
            isOwn
              ? 'bg-gradient-to-l from-emerald-500 to-sky-500 text-white rounded-br-md'
              : 'bg-white text-gray-900 border rounded-bl-md',
            message.type === 'file' && "cursor-pointer hover:shadow-md transition-shadow"
          )}
          onClick={message.type === 'file' ? downloadFile : undefined}
        >
          {renderMessageContent()}
          
          <div className="flex items-center justify-between mt-2">
            <p className={cn(
              "text-xs",
              isOwn ? 'text-white/80' : 'text-gray-500'
            )}>
              {formatTime(message.timestamp)}
            </p>
            
            {message.type !== 'text' && (
              <div className="flex items-center gap-1">
                {message.type === 'voice' && <Volume2 className="w-3 h-3" />}
                {message.type === 'image' && <ImageIcon className="w-3 h-3" />}
                {message.type === 'file' && <FileText className="w-3 h-3" />}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {isOwn && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
            {message.senderName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
