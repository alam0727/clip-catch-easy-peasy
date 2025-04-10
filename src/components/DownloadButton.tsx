
import React from 'react';
import { Download, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { detectPlatform } from '@/services/videoService';

interface DownloadButtonProps {
  videoUrl: string | null;
  originalUrl?: string;
  isLoading: boolean;
  onClick: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  videoUrl, 
  originalUrl, 
  isLoading, 
  onClick 
}) => {
  if (!videoUrl || isLoading) return null;
  
  // Determine platform from original URL if available
  const platform = originalUrl ? detectPlatform(originalUrl) : null;
  
  return (
    <div className="mt-6 text-center">
      <Button
        onClick={onClick}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <FileDown className="h-5 w-5" />
        Download {platform ? `${platform} ` : ''}Video
      </Button>
      <p className="text-xs text-gray-500 mt-2">
        Right-click on the video and select "Save video as..." if the download button doesn't work
      </p>
    </div>
  );
};

export default DownloadButton;
