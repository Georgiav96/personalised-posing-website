import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Clock, Video, MessageCircle, Sparkles } from 'lucide-react'

// Scroll reveal wrapper
function RevealOnScroll({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const variants = {
    up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
  }
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating particles
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, rgba(149,0,255,${0.3 + Math.random() * 0.4}), rgba(191,95,255,${0.2 + Math.random() * 0.3}))`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-br from-brand-purple/40 to-transparent" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl animate-pulse bg-gradient-to-tr from-brand-purple/30 to-transparent" style={{ animationDelay: '2s' }} />
    </div>
  )
}

// Glowing icon component
function GlowingIcon({ icon: Icon, className = '' }) {
  return (
    <motion.div 
      className={`icon-container-glow ${className}`}
      whileHover={{ scale: 1.1 }}
    >
      <Icon className="w-6 h-6 text-brand-purple" />
    </motion.div>
  )
}

const benefits = [
  {
    icon: Clock,
    title: '15 Minutes',
    description: 'Quick, focused call to understand your goals',
  },
  {
    icon: Video,
    title: 'Video Call',
    description: 'Face-to-face connection via Google Meet',
  },
  {
    icon: MessageCircle,
    title: 'No Pressure',
    description: 'Just a conversation to see if we\'re the right fit',
  },
]

function DiscoveryCall() {
  return (
    <div className="overflow-hidden bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-[#0a0a0a] overflow-hidden">
        <FloatingParticles />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-white/60 hover:text-brand-purple transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
          </motion.div>

          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="badge-dark mb-4 inline-flex"
            >
              <Sparkles className="w-4 h-4" />
              Free 15-Minute Call
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6"
            >
              Book a <span className="text-brand-purple text-glow">Discovery Call</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              A free 15-minute call to chat about your competition goals, ask questions, 
              and see if we're the right fit. No pressure, no commitment — just a chance 
              to connect and get clarity on your posing journey.
            </motion.p>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-card-dark p-6 text-center">
                <GlowingIcon icon={benefit.icon} className="mx-auto mb-4" />
                <h3 className="font-heading text-white mb-2">{benefit.title}</h3>
                <p className="text-white/60 text-sm">{benefit.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Info Note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-white/50 text-sm mb-8 max-w-xl mx-auto"
          >
            Please complete the short information form as part of your booking — 
            it helps me prepare so we can make the most of our time together.
          </motion.p>

          {/* Acuity Scheduling Embed */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="glass-card-dark p-4 md:p-6 rounded-2xl"
          >
            <iframe 
              src="https://app.acuityscheduling.com/schedule.php?owner=30497349&appointmentType=89946196&ref=embedded_csp" 
              title="Schedule Appointment" 
              width="100%" 
              height="1100" 
              frameBorder="0"
              className="rounded-xl"
              style={{ minHeight: '1100px' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Alternative CTA */}
      <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RevealOnScroll>
            <h2 className="text-2xl md:text-3xl font-heading text-white mb-4">
              Prefer to Send a Message Instead?
            </h2>
            <p className="text-white/60 mb-8">
              No worries — reach out via the contact form and I'll get back to you within 24-48 hours.
            </p>
            <Link to="/contact" className="btn-glow">
              Go to Contact Page
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}

export default DiscoveryCall
