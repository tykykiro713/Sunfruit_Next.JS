'use client';

import Image from 'next/image';

type OptimizedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
};

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) {
  // Remove loading states and animations that delay LCP
  // Let Next.js Image handle loading optimally
  
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      // Remove onLoad to avoid delays
    />
  );
}