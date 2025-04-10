
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
 * Process the URL to extract the direct video URL
 * In a real application, this would call a backend API
 * For demo purposes, we're using the original URL for YouTube videos
 * and sample videos for other platforms
 */
const extractDirectVideoUrl = (url: string, platform: string): string => {
  // In a real application, this would call your backend to extract the actual video URL
  if (platform === 'YouTube') {
    // For YouTube, we'll use the video ID to construct an embed URL
    try {
      const urlObj = new URL(url);
      let videoId = '';
      
      if (urlObj.hostname.includes('youtu.be')) {
        // Handle youtu.be shortened links
        videoId = urlObj.pathname.slice(1);
      } else {
        // Handle youtube.com links
        videoId = urlObj.searchParams.get('v') || '';
      }
      
      if (videoId) {
        // Return the direct video URL from a public source
        return `https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4`;
        // In a real app with proper API, you would return something like:
        // return `https://your-backend-api.com/extract?platform=youtube&videoId=${videoId}`;
      }
    } catch (err) {
      console.error('Error extracting YouTube video ID:', err);
    }
  }
  
  // For other platforms or if YouTube extraction fails, return sample videos
  // In a real app, each platform would have its own extraction logic
  const sampleVideos = {
    Instagram: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    Facebook: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    Twitter: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    TikTok: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    YouTube: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    Default: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
  };
  
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
        
        // Extract direct video URL based on the platform
        const videoUrl = extractDirectVideoUrl(url, platform);
        
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
