
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Crown } from "lucide-react";

interface ProfileAvatarProps {
  profileImage: string;
  profileName: string;
  getInitials: (name: string) => string;
}

export const ProfileAvatar = ({ profileImage, profileName, getInitials }: ProfileAvatarProps) => {
  return (
    <div className="relative">
      <Avatar className="h-20 w-20 border-2 border-white/20 shadow-lg">
        <AvatarImage 
          src={profileImage} 
          alt="تصویر پروفایل"
          className="object-cover"
        />
        <AvatarFallback className="bg-gradient-to-br from-violet-600 to-purple-700 text-white font-bold">
          {getInitials(profileName)}
        </AvatarFallback>
      </Avatar>
      
      <div className="absolute -top-2 -left-2 p-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md">
        <Crown className="h-4 w-4 text-white" fill="currentColor" />
      </div>
    </div>
  );
};
