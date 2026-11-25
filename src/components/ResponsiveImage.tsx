import { useState } from 'react';

interface ResponsiveImageProps {
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  objectPosition?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export function ResponsiveImage({
  webpSrc,
  fallbackSrc,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  objectPosition = 'center center',
  priority = false,
  width = 1670,
  height = 941,
}: ResponsiveImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#8A4A10] via-[#C97A1E] to-[#1A3527] text-[#F7F3EA] p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="text-center max-w-xs">
          <p className="font-editorial text-xl text-[#FBE8C7]">Chalo Walk Par</p>
          <p className="mt-1 text-xs text-[#F7F3EA]/75">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <picture className={`block overflow-hidden ${className}`}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        style={{ objectPosition }}
        className={imgClassName}
      />
    </picture>
  );
}
