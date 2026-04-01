import React from 'react';
import { X, Upload, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

interface UploadExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function UploadExcelModal({ isOpen, onClose, onUpload }: UploadExcelModalProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-[#001F3F]">Upload File</h3>
            <p className="text-sm text-gray-400 font-bold mt-1">Please upload the batch file in Excel format (CSV or XLSX).</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-8">
          <div 
            className={cn(
              "relative border-4 border-dashed rounded-[24px] p-12 transition-all flex flex-col items-center justify-center gap-6",
              dragActive ? "border-[#0052CC] bg-blue-50/50" : "border-gray-100 bg-gray-50/30",
              selectedFile ? "border-green-200 bg-green-50/20" : ""
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".csv, .xlsx, .xls"
              onChange={handleChange}
            />

            {selectedFile ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-10 h-10 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-[#001F3F]">{selectedFile.name}</p>
                  <p className="text-xs text-gray-400 font-bold mt-1">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="text-xs text-red-500 font-bold hover:underline"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <>
                <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-50">
                  <Upload className="w-10 h-10 text-gray-300" />
                </div>
                <div className="text-center">
                  <button 
                    onClick={onButtonClick}
                    className="text-sm font-black text-[#0052CC] hover:underline"
                  >
                    Click to upload
                  </button>
                  <span className="text-sm text-gray-400 font-bold"> or drag and drop</span>
                  <p className="text-xs text-gray-300 font-bold mt-2">Maximum file size 10MB</p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={onClose}
              className="px-12 py-4 rounded-xl text-sm font-black text-white bg-[#FF5C5C] hover:bg-[#FF4545] transition-all active:scale-95 shadow-lg shadow-red-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className={cn(
                "px-12 py-4 rounded-xl text-sm font-black text-white transition-all active:scale-95 shadow-lg",
                selectedFile ? "bg-[#007BFF] hover:bg-[#0069D9] shadow-blue-100" : "bg-gray-200 cursor-not-allowed"
              )}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
