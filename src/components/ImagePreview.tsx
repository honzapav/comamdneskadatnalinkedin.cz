import React from 'react';
import { X, Download } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  onClose: () => void;
  onDownload: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  onClose,
  onDownload,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Náhled obrázku</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <img
            src={imageUrl}
            alt="LinkedIn post preview"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Zavřít
          </button>
          <button
            onClick={onDownload}
            className="flex items-center px-4 py-2 bg-linkedin-primary text-white rounded-lg hover:bg-linkedin-secondary transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Stáhnout obrázek
          </button>
        </div>
      </div>
    </div>
  );
}; 