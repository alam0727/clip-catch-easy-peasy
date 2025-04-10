
// This is a placeholder service - in a real application, you would need a backend API
// to handle the actual downloading of videos from social media platforms

/**
 * Detect which social media platform the URL is from
 */
export const detectPlatform = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    if (hostname.includes('instagram')) return 'Instagram';
    if (hostname.includes('facebook') || hostname.includes('fb.')) return 'Facebook';
    if (hostname.includes('twitter') || hostname.includes('x.com')) return 'Twitter';
    if (hostname.includes('tiktok')) return 'TikTok';
    if (hostname.includes('youtube') || hostname.includes('youtu.be')) return 'YouTube';
    
    return null;
  } catch (e) {
    return null;
  }
};

// In a real application, this would call your backend API
export const processVideoUrl = async (url: string): Promise<{ videoUrl: string | null; error: string | null }> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      const platform = detectPlatform(url);
      
      if (!platform) {
        resolve({ 
          videoUrl: null, 
          error: 'Unsupported platform. We currently support Instagram, Facebook, Twitter, TikTok and YouTube.'
        });
        return;
      }
      
      // This is just a sample video for demonstration.
      // In a real app, this would be the processed video from the backend.
      const demoVideoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      resolve({ videoUrl: demoVideoUrl, error: null });
    }, 2000); // Simulate loading time
  });
};

export const downloadVideo = (videoUrl: string, filename: string = 'video.mp4'): void => {
  // Create an invisible anchor element
  const a = document.createElement('a');
  a.href = videoUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
  }, 100);
};
