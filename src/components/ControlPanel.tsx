import React from 'react';
import { RefreshCw, Copy, Share2, Download } from 'lucide-react';

interface ControlPanelProps {
  onGenerate: () => void;
  onCopy: () => void;
  onShare: () => void;
  onGenerateImage: () => void;
  isEnhancing?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onGenerate,
  onCopy,
  onShare,
  onGenerateImage,
  isEnhancing = false,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onGenerate}
          disabled={isEnhancing}
          className={`flex items-center justify-center px-6 py-3 bg-linkedin-primary text-white rounded-lg transition-all transform hover:scale-105 font-medium ${
            isEnhancing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-linkedin-secondary'
          }`}
        >
          <RefreshCw className={`w-5 h-5 mr-2 ${isEnhancing ? 'animate-spin' : ''}`} />
          {isEnhancing ? 'Vylepšuji text...' : 'Generovat nový'}
        </button>

        <button
          onClick={onCopy}
          disabled={isEnhancing}
          className="flex items-center justify-center px-6 py-3 bg-white text-linkedin-primary border-2 border-linkedin-primary rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Copy className="w-5 h-5 mr-2" />
          Kopírovat text
        </button>

        <button
          onClick={onShare}
          disabled={isEnhancing}
          className="flex items-center justify-center px-6 py-3 bg-white text-linkedin-primary border-2 border-linkedin-primary rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Připravit ke sdílení
        </button>

        <button
          onClick={onGenerateImage}
          disabled={isEnhancing}
          className="flex items-center justify-center px-6 py-3 bg-white text-linkedin-primary border-2 border-linkedin-primary rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5 mr-2" />
          Stáhnout obrázek
        </button>
      </div>
    </div>
  );
}; 