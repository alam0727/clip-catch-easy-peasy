
import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const VideoInput: React.FC<VideoInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic URL validation
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    try {
      new URL(url); // Will throw if not a valid URL
      setError('');
      onSubmit(url);
    } catch (err) {
      setError('Please enter a valid URL');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative mb-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Link2 className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className={`w-full pl-10 pr-16 py-3 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } input-focus shadow-sm`}
          placeholder="Paste your video URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
    </form>
  );
};

export default VideoInput;
