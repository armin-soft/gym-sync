
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Folder, RefreshCw, Download, Trash2, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { FileInfo } from '@/hooks/useFileManagement-New';

interface FileCardNewProps {
  file: FileInfo;
  isSelected: boolean;
  onSelect: (filePath: string) => void;
  onCreateNew?: (filePath: string) => void;
  onDelete?: (filePath: string) => void;
}

export const FileCardNew: React.FC<FileCardNewProps> = ({
  file,
  isSelected,
  onSelect,
  onCreateNew,
  onDelete
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'component': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'page': return <Folder className="w-4 h-4 text-green-500" />;
      case 'hook': return <RefreshCw className="w-4 h-4 text-purple-500" />;
      case 'util': return <Download className="w-4 h-4 text-orange-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'component': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'page': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'hook': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'util': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
          isSelected 
            ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/30' 
            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
        }`}
        onClick={() => onSelect(file.path)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {getTypeIcon(file.type)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium truncate">{file.name}</span>
                {file.isNew && (
                  <Badge className="bg-green-100 text-green-800 text-xs dark:bg-green-900 dark:text-green-200">
                    جدید
                  </Badge>
                )}
                {!file.isNew && (
                  <Badge className="bg-red-100 text-red-800 text-xs dark:bg-red-900 dark:text-red-200">
                    قدیمی
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">{file.path}</p>
              {file.lastModified && (
                <p className="text-xs text-gray-400 mt-1">
                  آخرین تغییر: {file.lastModified}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={getTypeColor(file.type)}>
              {file.type}
            </Badge>
            
            {/* Action Buttons */}
            <div className="flex gap-1">
              {!file.isNew && onCreateNew && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateNew(file.path);
                  }}
                  className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              )}
              
              {onDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(file.path);
                  }}
                  className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
            
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(file.path)}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
