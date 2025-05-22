
import React from "react";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock } from "lucide-react";
import { getActionIcon, getActionBadge } from "../utils/historyHelpers";
import { formatDate } from "../utils/formatDate";

interface HistoryCardProps {
  entry: HistoryEntry;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ entry }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
          {getActionIcon(entry.type)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={entry.studentImage} alt={entry.studentName} />
                <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700">{entry.studentName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-800 dark:text-gray-200">{entry.studentName}</span>
              {getActionBadge(entry.type)}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3" />
              <span>{formatDate(entry.timestamp)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{entry.description}</p>
        </div>
      </div>
    </div>
  );
};
