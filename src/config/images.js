/**
 * SITE IMAGES CONFIGURATION
 * ========================
 * 
 * Edit the paths below to change images across the site.
 * All images should be placed in the /public/images/ folder.
 * 
 * To add your own images:
 * 1. Add your image files to /public/images/
 * 2. Update the path below (e.g., '/images/your-photo.jpg')
 * 
 * Use 'placeholder' to show a placeholder instead of an image.
 */

const images = {
  // ============================================
  // HOME PAGE
  // ============================================
  home: {
    hero: '/images/marketing-shoot/05102025_GeorgiaVoice_High-755.jpg',
    // Hero section - main image on homepage
    // Recommended size: 1200x800px or larger
    
    about: '/images/marketing-shoot/05102025_GeorgiaVoice_High-347.jpg',
    // "Hi there, I'm Georgia" section
    
    story: '/images/marketing-shoot/05102025_GeorgiaVoice_High-683.jpg',
    // Story/background section
    
    transform: '/images/marketing-shoot/05102025_GeorgiaVoice_High-931.jpg',
    // Transformation section
    
    cta: '/images/marketing-shoot/05102025_GeorgiaVoice_High-949.jpg',
    // Call-to-action section
    
    commitment: '/images/marketing-shoot/05102025_GeorgiaVoice_High-805.jpg',
    // Commitment section
  },

  // ============================================
  // ABOUT PAGE
  // ============================================
  about: {
    hero: '/images/marketing-shoot/05102025_GeorgiaVoice_High-755.jpg',
    // About page hero
    
    story: '/images/marketing-shoot/05102025_GeorgiaVoice_High-347.jpg',
    // Story section
    
    performingArts: '/images/marketing-shoot/05102025_GeorgiaVoice_High-683.jpg',
    // Performing arts background
    
    coaching: '/images/marketing-shoot/05102025_GeorgiaVoice_High-931.jpg',
    // Coaching approach
    
    approach: '/images/marketing-shoot/05102025_GeorgiaVoice_High-805.jpg',
    // Educational approach
  },

  // ============================================
  // SERVICES PAGE
  // ============================================
  services: {
    hero: '/images/marketing-shoot/05102025_GeorgiaVoice_High-599.jpg',
    // Services page hero
    
    ongoing: '/images/marketing-shoot/05102025_GeorgiaVoice_High-243.jpg',
    // Ongoing coaching card
    
    casual: '/images/marketing-shoot/05102025_GeorgiaVoice_High-122.jpg',
    // Casual coaching card
    
    workshops: '/images/marketing-shoot/05102025_GeorgiaVoice_High-467.jpg',
    // Workshops section
  },

  // ============================================
  // RESULTS PAGE
  // ============================================
  results: {
    hero: '/images/marketing-shoot/05102025_GeorgiaVoice_High-768.jpg',
    // Results page hero
  },

  // ============================================
  // TESTIMONIALS PAGE
  // ============================================
  testimonials: {
    hero: '/images/marketing-shoot/05102025_GeorgiaVoice_High-805.jpg',
    // Testimonials page hero
  },

  // ============================================
  // CONTACT PAGE
  // ============================================
  contact: {
    hero: '/images/marketing-shoot/05102025_GeorgiaVoice_High-744.jpg',
    // Contact page hero
  },

  // ============================================
  // QUIZ PAGE
  // ============================================
  quiz: {
    hero: '/images/marketing-shoot/05102025_GeorgiaVoice_High-755.jpg',
    // Quiz page hero
  },
}

// Helper function to get image or placeholder
export const getImage = (page, key) => {
  const path = images[page]?.[key]
  if (!path || path === 'placeholder') {
    return null // Will trigger placeholder display
  }
  return path
}

// Placeholder component styles
export const placeholderStyle = {
  backgroundColor: '#E8E0F0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#9500ff',
  fontSize: '14px',
  fontWeight: '500',
}

export default images
