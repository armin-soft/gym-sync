
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/ui/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Folder, Trash2, RefreshCw, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileInfo {
  path: string;
  name: string;
  type: 'component' | 'page' | 'hook' | 'util' | 'style' | 'config';
  isNew: boolean;
  size?: string;
  lastModified?: string;
}

const FileManagementNew: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // شبیه‌سازی فایل‌های پروژه
  const [projectFiles] = useState<FileInfo[]>([
    // Components
    { path: 'src/components/ui/button.tsx', name: 'button.tsx', type: 'component', isNew: false },
    { path: 'src/components/ui/card.tsx', name: 'card.tsx', type: 'component', isNew: false },
    { path: 'src/components/exercises/ExerciseCard.tsx', name: 'ExerciseCard.tsx', type: 'component', isNew: false },
    { path: 'src/components/students/StudentCard.tsx', name: 'StudentCard.tsx', type: 'component', isNew: false },
    
    // Pages
    { path: 'src/pages/Index.tsx', name: 'Index.tsx', type: 'page', isNew: false },
    { path: 'src/pages/exercises.tsx', name: 'exercises.tsx', type: 'page', isNew: false },
    { path: 'src/pages/students.tsx', name: 'students.tsx', type: 'page', isNew: false },
    { path: 'src/pages/diet/index.tsx', name: 'index.tsx', type: 'page', isNew: false },
    
    // Hooks
    { path: 'src/hooks/useStudents.ts', name: 'useStudents.ts', type: 'hook', isNew: false },
    { path: 'src/hooks/useExercises.ts', name: 'useExercises.ts', type: 'hook', isNew: false },
    
    // Utils
    { path: 'src/lib/utils.ts', name: 'utils.ts', type: 'util', isNew: false },
    { path: 'src/utils/validation.ts', name: 'validation.ts', type: 'util', isNew: false },
  ]);

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
      case 'component': return 'bg-blue-100 text-blue-800';
      case 'page': return 'bg-green-100 text-green-800';
      case 'hook': return 'bg-purple-100 text-purple-800';
      case 'util': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFiles = projectFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                     (activeTab === 'old' && !file.isNew) ||
                     (activeTab === 'new' && file.isNew) ||
                     (activeTab === file.type);
    return matchesSearch && matchesTab;
  });

  const handleSelectFile = (filePath: string) => {
    setSelectedFiles(prev => 
      prev.includes(filePath) 
        ? prev.filter(p => p !== filePath)
        : [...prev, filePath]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(f => f.path));
    }
  };

  const handleCreateNewVersions = () => {
    console.log('ایجاد نسخه‌های جدید برای فایل‌های انتخاب شده:', selectedFiles);
    // اینجا می‌توانید منطق ایجاد فایل‌های جدید را پیاده‌سازی کنید
  };

  const handleDeleteOldFiles = () => {
    console.log('حذف فایل‌های قدیمی انتخاب شده:', selectedFiles);
    // اینجا می‌توانید منطق حذف فایل‌های قدیمی را پیاده‌سازی کنید
  };

  return (
    <PageContainer className="p-6" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            مدیریت فایل‌های پروژه
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            شناسایی و مدیریت فایل‌های قدیمی و جدید در پروژه
          </p>
        </div>

        {/* Search and Actions */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجوی فایل‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSelectAll} 
                variant="outline" 
                size="sm"
              >
                {selectedFiles.length === filteredFiles.length ? 'لغو انتخاب همه' : 'انتخاب همه'}
              </Button>
              
              {selectedFiles.length > 0 && (
                <>
                  <Button 
                    onClick={handleCreateNewVersions}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    ایجاد نسخه جدید ({selectedFiles.length})
                  </Button>
                  <Button 
                    onClick={handleDeleteOldFiles}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 ml-1" />
                    حذف انتخاب شده
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">همه ({projectFiles.length})</TabsTrigger>
            <TabsTrigger value="old">قدیمی ({projectFiles.filter(f => !f.isNew).length})</TabsTrigger>
            <TabsTrigger value="new">جدید ({projectFiles.filter(f => f.isNew).length})</TabsTrigger>
            <TabsTrigger value="component">کامپوننت</TabsTrigger>
            <TabsTrigger value="page">صفحات</TabsTrigger>
            <TabsTrigger value="hook">هوک‌ها</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid gap-3">
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={file.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedFiles.includes(file.path) 
                        ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
                        : ''
                    }`}
                    onClick={() => handleSelectFile(file.path)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(file.type)}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{file.name}</span>
                            {file.isNew && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                جدید
                              </Badge>
                            )}
                            {!file.isNew && (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                قدیمی
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{file.path}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(file.type)}>
                          {file.type}
                        </Badge>
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.path)}
                          onChange={() => handleSelectFile(file.path)}
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredFiles.length === 0 && (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">هیچ فایلی یافت نشد</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {projectFiles.length}
            </div>
            <div className="text-sm text-gray-600">کل فایل‌ها</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {projectFiles.filter(f => !f.isNew).length}
            </div>
            <div className="text-sm text-gray-600">فایل‌های قدیمی</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {projectFiles.filter(f => f.isNew).length}
            </div>
            <div className="text-sm text-gray-600">فایل‌های جدید</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {selectedFiles.length}
            </div>
            <div className="text-sm text-gray-600">انتخاب شده</div>
          </Card>
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default FileManagementNew;
