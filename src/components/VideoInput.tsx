
import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { detectPlatform } from '@/services/videoService';

interface VideoInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const VideoInput: React.FC<VideoInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [platform, setPlatform] = useState<string | null>(null);

  const validateUrl = (inputUrl: string): boolean => {
    try {
      new URL(inputUrl);
      const detectedPlatform = detectPlatform(inputUrl);
      setPlatform(detectedPlatform);
      
      if (!detectedPlatform) {
        setError('Unsupported platform. We currently support Instagram, Facebook, Twitter, TikTok, and YouTube.');
        return false;
      }
      
      setError('');
      return true;
    } catch (err) {
      setPlatform(null);
      setError('Please enter a valid URL');
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    
    if (inputUrl.trim()) {
      validateUrl(inputUrl);
    } else {
      setPlatform(null);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    if (validateUrl(url)) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative mb-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Link2 className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          className={`w-full pl-10 pr-16 py-3 rounded-lg ${
            error ? 'border-red-500' : platform ? 'border-green-500' : 'border-gray-300'
          } shadow-sm`}
          placeholder="Paste your video URL here"
          value={url}
          onChange={handleChange}
          disabled={isLoading}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Button 
            type="submit"
            size="sm"
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Download'}
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {platform && !error && (
        <p className="text-green-600 text-sm mt-1">
          Detected platform: <span className="font-semibold">{platform}</span>
        </p>
      )}
    </form>
  );
};

export default VideoInput;
