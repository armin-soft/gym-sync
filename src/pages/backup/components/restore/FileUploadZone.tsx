
import { useRef, useState } from "react";
import { Upload, FileText } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export function FileUploadZone({ onFileSelect, selectedFile }: FileUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith('.json')) {
      onFileSelect(files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
        className="hidden"
      />

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 cursor-pointer ${
          dragOver 
            ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20" 
            : "border-slate-300 dark:border-slate-600 hover:border-sky-400 hover:bg-sky-50/50"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-emerald-600 rounded-3xl flex items-center justify-center">
            <Upload className="w-10 h-10 text-white" />
          </div>
          
          {selectedFile ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <FileText className="w-6 h-6 text-sky-600" />
                <span className="font-semibold text-slate-800 dark:text-white">
                  {selectedFile.name}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {toPersianNumbers((selectedFile.size / 1024).toFixed(1))} کیلوبایت
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                فایل JSON را انتخاب کنید
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                یا فایل را اینجا بکشید و رها کنید
              </p>
              <p className="text-sm text-slate-500">
                فرمت مجاز: .json
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
