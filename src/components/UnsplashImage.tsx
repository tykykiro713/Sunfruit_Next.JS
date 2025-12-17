import Image from 'next/image';
import { useEffect } from 'react';

interface AttributionData {
  html: string;
  text: string;
  photographer: {
    name: string;
    username: string;
    profile_url: string;
  };
  unsplash_url: string;
  photo_url: string;
}

interface UnsplashImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  attribution: AttributionData;
  downloadLocation?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  showAttribution?: boolean;
  onLoad?: () => void;
}

export default function UnsplashImage({
  src,
  alt,
  width,
  height,
  attribution,
  downloadLocation,
  className = '',
  sizes,
  priority = false,
  fill = false,
  showAttribution = true,
  onLoad
}: UnsplashImageProps) {
  
  // Track download when image is actually used/displayed
  useEffect(() => {
    if (downloadLocation && onLoad) {
      // This would normally call the download tracking endpoint
      // For now, we'll just log it
      console.log('Image displayed, tracking download:', downloadLocation);
    }
  }, [downloadLocation, onLoad]);

  const handleImageLoad = () => {
    // Call download tracking when image loads (simulates "download" event)
    if (downloadLocation) {
      fetch('/api/vine/track-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ downloadLocation })
      }).catch(error => {
        console.error('Failed to track download:', error);
      });
    }
    
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <div className="relative">
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          sizes={sizes}
          priority={priority}
          onLoad={handleImageLoad}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          sizes={sizes}
          priority={priority}
          onLoad={handleImageLoad}
        />
      )}
      
      {showAttribution && (
        <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-tl-md">
          <div 
            dangerouslySetInnerHTML={{ __html: attribution.html }}
            className="text-xs"
          />
        </div>
      )}
    </div>
  );
}

// Component for inline attribution (for use below images)
export function UnsplashAttribution({ attribution }: { attribution: AttributionData }) {
  return (
    <div className="text-xs text-gray-500 mt-2">
      <div dangerouslySetInnerHTML={{ __html: attribution.html }} />
    </div>
  );
}

// Component for photographer info
export function PhotographerInfo({ 
  photographer, 
  className = '' 
}: { 
  photographer: AttributionData['photographer'];
  className?: string;
}) {
  return (
    <div className={`text-sm text-gray-600 ${className}`}>
      <span>by </span>
      <a 
        href={photographer.profile_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-600 hover:text-emerald-800 font-medium"
      >
        {photographer.name}
      </a>
    </div>
  );
}