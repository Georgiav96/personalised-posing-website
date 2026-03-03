import { useState } from 'react'
import images from '../config/images'

/**
 * SiteImage Component
 * 
 * Displays an image from the central config, with placeholder fallback.
 * 
 * Usage:
 *   <SiteImage page="home" imageKey="hero" alt="Hero image" className="w-full" />
 * 
 * Or with direct src:
 *   <SiteImage src="/images/my-photo.jpg" alt="Photo" className="w-full" />
 */
const SiteImage = ({ 
  page, 
  imageKey, 
  src: directSrc, 
  alt = '', 
  className = '', 
  placeholderText,
  style = {},
  ...props 
}) => {
  const [hasError, setHasError] = useState(false)
  
  // Get image path from config or use direct src
  const imagePath = directSrc || images[page]?.[imageKey]
  
  // Determine placeholder text
  const displayText = placeholderText || `${page ? `${page} / ${imageKey}` : 'Image'}`
  
  // Show placeholder if no path, path is 'placeholder', or image failed to load
  if (!imagePath || imagePath === 'placeholder' || hasError) {
    return (
      <div 
        className={`bg-brand-lavender flex items-center justify-center ${className}`}
        style={{ minHeight: '200px', ...style }}
        {...props}
      >
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-brand-purple/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-brand-purple text-sm font-medium">{displayText}</p>
          <p className="text-brand-purple/60 text-xs mt-1">Add image in config/images.js</p>
        </div>
      </div>
    )
  }
  
  return (
    <img 
      src={imagePath} 
      alt={alt}
      className={className}
      style={style}
      onError={() => setHasError(true)}
      {...props}
    />
  )
}

export default SiteImage
