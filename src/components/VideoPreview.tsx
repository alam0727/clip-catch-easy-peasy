
import React from 'react';
import { Loader2 } from 'lucide-react';

interface VideoPreviewProps {
  videoUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mx-auto mb-2" />
          <p className="text-gray-500">Fetching video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (videoUrl) {
    return (
      <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
        <video 
          className="w-full h-auto" 
          controls
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto aspect-video bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
      <div className="text-center p-4">
        <p className="text-gray-500">Video preview will appear here</p>
      </div>
    </div>
  );
};

export default VideoPreview;
