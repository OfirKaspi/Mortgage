/* eslint-disable @next/next/no-img-element */
// components/OptimizedImage.tsx
import { ImgHTMLAttributes } from 'react';

// Cloudinary optimization helper
function getOptimizedImageUrl(
  src: string, 
  width: number, 
  height: number, 
  options: {
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    gravity?: 'auto' | 'center' | 'face' | 'north' | 'south' | 'east' | 'west';
    effects?: string[]; // For custom effects like 'e_grayscale', 'e_blur:300'
  } = {}
): string {
  if (!src.includes('cloudinary.com')) return src;
  
  // Extract public ID from Cloudinary URL
  const publicIdMatch = src.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]*)?$/);
  if (!publicIdMatch) return src;
  
  const publicId = publicIdMatch[1];
  const { 
    crop = 'fill', 
    quality = 90, 
    format = 'auto', 
    gravity = 'center',
    effects = []
  } = options;
  
  // Build transformation parameters
  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `f_${format}`,
    `q_${quality}`,
    ...(crop === 'fill' || crop === 'crop' || crop === 'thumb' ? [`g_${gravity}`] : []),
    ...effects, // Custom effects
    'fl_progressive', // Progressive loading
    'fl_immutable_cache' // Better caching
  ];
  
  return `https://res.cloudinary.com/dudwjf2pu/image/upload/${transformations.join(',')}/${publicId}`;
}

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: number;  // Optional when using fill
  height?: number; // Optional when using fill
  fill?: boolean;  // Like Next.js Image fill prop
  // Cloudinary-specific props
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  gravity?: 'auto' | 'center' | 'face' | 'north' | 'south' | 'east' | 'west';
  priority?: boolean;
  // Effects
  grayscale?: boolean;
  blur?: boolean;
  brightness?: number;
  contrast?: number;
  saturation?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  crop = 'fill',
  quality = 90,
  format = 'auto',
  gravity = 'center',
  priority = false,
  grayscale = false,
  blur = false,
  brightness,
  contrast,
  saturation,
  className = '',
  loading,
  style,
  ...imgProps
}) => {
  // Validate props
  if (!fill && (!width || !height)) {
    console.warn('OptimizedImage: Either fill=true or both width and height must be provided');
    return null;
  }

  // Build effects array
  const effects: string[] = [];
  if (grayscale) effects.push('e_grayscale');
  if (blur) effects.push('e_blur:300');
  if (brightness) effects.push(`e_brightness:${brightness}`);
  if (contrast) effects.push(`e_contrast:${contrast}`);
  if (saturation) effects.push(`e_saturation:${saturation}`);

  // Generate optimized URL (use default dimensions for fill mode)
  const optimizedSrc = getOptimizedImageUrl(
    src, 
    width || 800,  // Default width for fill mode
    height || 600, // Default height for fill mode
    { crop, quality, format, gravity, effects }
  );

  // Handle fill mode styling
  const fillStyles: React.CSSProperties = fill ? {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  } : {};

  const combinedStyle = { ...fillStyles, ...style };
  const combinedClassName = fill 
    ? `${className}` 
    : className;

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={combinedClassName}
      loading={priority ? 'eager' : loading || 'lazy'}
      style={combinedStyle}
      {...imgProps}
    />
  );
};

export default OptimizedImage;

