
import React, { useState } from 'react';
import Header from '@/components/Header';
import SocialMediaIcons from '@/components/SocialMediaIcons';
import VideoInput from '@/components/VideoInput';
import VideoPreview from '@/components/VideoPreview';
import DownloadButton from '@/components/DownloadButton';
import Footer from '@/components/Footer';
import { processVideoUrl, downloadVideo } from '@/services/videoService';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { videoUrl, error } = await processVideoUrl(url);
      
      if (error) {
        setError(error);
        toast({
          variant: "destructive",
          title: "Error processing video",
          description: error,
        });
      } else if (videoUrl) {
        setVideoUrl(videoUrl);
        toast({
          title: "Video processed successfully",
          description: "You can now download your video!",
        });
      }
    } catch (err) {
      setError('Failed to process the video. Please try again.');
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to process the video. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (videoUrl) {
      downloadVideo(videoUrl);
      toast({
        title: "Download started",
        description: "Your video is being downloaded.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="gradient-bg py-2"></div>
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <Header />
        
        <main className="mt-8">
          <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto card-shadow">
            <SocialMediaIcons />
            
            <VideoInput onSubmit={handleSubmit} isLoading={isLoading} />
            
            <div className="mt-8">
              <VideoPreview videoUrl={videoUrl} isLoading={isLoading} error={error} />
              <DownloadButton videoUrl={videoUrl} isLoading={isLoading} onClick={handleDownload} />
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <h2 className="text-xl font-semibold mb-4">How to download videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-white p-4 rounded-lg card-shadow">
                <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Copy video link</h3>
                <p className="text-sm text-gray-600">Copy the URL of the video from your favorite social media platform</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg card-shadow">
                <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Paste URL above</h3>
                <p className="text-sm text-gray-600">Paste the video link in the input field and hit Download</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg card-shadow">
                <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Save your video</h3>
                <p className="text-sm text-gray-600">Preview your video and click the download button to save it</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
