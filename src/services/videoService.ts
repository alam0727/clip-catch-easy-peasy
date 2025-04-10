
// This service handles video URL processing and downloading

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

/**
 * Get an appropriate video URL based on the platform and input URL
 */
const getVideoUrlByPlatform = (url: string, platform: string): string => {
  // In a real app, this would call your backend API to fetch the actual video
  // For now, we'll return different sample videos based on the platform
  
  // Sample videos from public sources
  const sampleVideos = {
    Instagram: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    Facebook: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    Twitter: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    TikTok: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    YouTube: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    Default: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
  };
  
  // Return the corresponding sample video or the default one
  return sampleVideos[platform as keyof typeof sampleVideos] || sampleVideos.Default;
};

// Process video URL to get downloadable content
export const processVideoUrl = async (url: string): Promise<{ videoUrl: string | null; error: string | null }> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      try {
        // Basic URL validation
        new URL(url);
        
        const platform = detectPlatform(url);
        
        if (!platform) {
          resolve({ 
            videoUrl: null, 
            error: 'Unsupported platform. We currently support Instagram, Facebook, Twitter, TikTok and YouTube.'
          });
          return;
        }
        
        // Get video URL based on the platform
        const videoUrl = getVideoUrlByPlatform(url, platform);
        
        // Include platform info in the console for debugging
        console.log(`Processing ${platform} URL: ${url}`);
        console.log(`Returning video URL: ${videoUrl}`);
        
        resolve({ videoUrl, error: null });
      } catch (err) {
        resolve({ videoUrl: null, error: 'Invalid URL format. Please enter a valid URL.' });
      }
    }, 1500); // Simulate loading time
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
