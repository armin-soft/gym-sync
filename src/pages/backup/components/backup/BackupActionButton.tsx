
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface BackupActionButtonProps {
  onBackup: () => void;
  isLoading: boolean;
  backupSuccess: boolean;
}

const BackupActionButton: React.FC<BackupActionButtonProps> = ({
  onBackup,
  isLoading,
  backupSuccess
}) => {
  return (
    <Button 
      onClick={onBackup}
      disabled={isLoading}
      className="w-full"
      variant={backupSuccess ? "default" : "outline"}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          در حال پشتیبان‌گیری...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          شروع پشتیبان‌گیری
        </>
      )}
    </Button>
  );
};

export default BackupActionButton;
