import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

// Floating particles
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, rgba(149,0,255,${0.2 + Math.random() * 0.3}), rgba(191,95,255,${0.1 + Math.random() * 0.2}))`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Large gradient orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-brand-purple/30 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tr from-brand-lavender/50 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )
}

function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={`${import.meta.env.BASE_URL}videos/action-video-web.mp4`} type="video/mp4" />
        </video>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>
      
      <FloatingParticles />
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center lg:items-start justify-center px-6 lg:px-20">
        <div className="text-center lg:text-left max-w-2xl">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <img 
              src={`${import.meta.env.BASE_URL}images/logos/logo-main.png`} 
              alt="Personalised Posing" 
              className="h-16 md:h-20 mx-auto lg:mx-0 brightness-0 invert"
            />
          </motion.div>
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Posing & Performance Coaching
            </span>
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <span className="block text-4xl md:text-6xl lg:text-7xl font-heading text-white leading-none">
              FROM <span className="italic text-red-500">STAGNANT</span>
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl font-heading leading-none mt-2">
              TO <span className="text-brand-purple">STAGE READY</span>
            </span>
          </motion.h1>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed"
          >
            Empowering hundreds of women to own their stage presence and present their physiques with confidence, clarity, and purpose.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link 
              to="/home" 
              className="group inline-flex items-center gap-3 bg-brand-purple text-white px-10 py-5 rounded-full font-semibold text-lg
                         shadow-[0_10px_40px_rgba(149,0,255,0.5)] hover:shadow-[0_15px_50px_rgba(149,0,255,0.6)]
                         hover:scale-105 transition-all duration-300"
            >
              <span>Enter The Experience</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          {/* Subtle hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 text-white/50 text-sm"
          >
            Your transformation begins here
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export default Landing
