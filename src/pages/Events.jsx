import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar, Users, MapPin, Camera, Sparkles } from 'lucide-react'

function RevealOnScroll({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating particles for dark sections
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

function Events() {
  return (
    <div className="overflow-hidden bg-[#0a0a0a]">
      {/* Hero - Dark */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <FloatingParticles />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-dark mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Community
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-4"
          >
            Events & <span className="text-brand-purple text-glow">Team Shoots</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-xl mx-auto"
          >
            Connect with like-minded women, celebrate wins together, and capture memories.
          </motion.p>
        </div>
      </section>

      {/* Team Shoots - Dark */}
      <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
        <FloatingParticles />
        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <span className="badge-dark mb-4">
              Capture the Moment
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
              Team <span className="text-brand-purple text-glow">Shoots</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Professional photo and video shoots for Personalised Posing athletes.
            </p>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 gap-6">
            <RevealOnScroll delay={0.1}>
              <div className="glass-card-dark overflow-hidden group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src="/images/team-shoot-1year.jpg" 
                    alt="Personalised Posing 1 Year Celebration Team Shoot 2024" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading text-white mb-2">1 Year Celebration</h3>
                  <p className="text-white/60 text-sm">Our first team shoot celebrating 1 year of Personalised Posing (2024)</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <div className="glass-card-dark overflow-hidden group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src="/images/team-shoot-christmas-1.jpg" 
                    alt="Personalised Posing Christmas Team Shoot" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading text-white mb-2">Christmas Shoot</h3>
                  <p className="text-white/60 text-sm">Festive team shoot with our amazing athletes</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
          
          <RevealOnScroll delay={0.3} className="mt-8 text-center">
            <p className="text-white/60">
              Follow <a href="https://instagram.com/personalisedposing" target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:underline">@personalisedposing</a> for updates on upcoming shoots.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Community Events - Dark */}
      <section className="section-padding bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <span className="badge-dark mb-4">
              Beyond the Stage
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
              Community <span className="text-brand-purple text-glow">Events</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Prep life doesn't mean missing out. Stay connected and build meaningful relationships.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Prep Socials', desc: 'Low-key catch-ups with prep-friendly food and support.' },
              { icon: Calendar, title: 'Wellness Days', desc: 'Self-care featuring mobility, mindfulness, and recovery.' },
              { icon: MapPin, title: 'Comp Support', desc: 'Group trips to cheer each other at competitions!' },
            ].map((item, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="bento-card-dark group">
                  <GlowingIcon icon={item.icon} className="mb-6" />
                  <h3 className="text-xl font-heading text-white mb-3">{item.title}</h3>
                  <p className="text-white/70">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.3} className="mt-12">
            <div className="glass-card-dark p-8 text-center">
              <h3 className="text-xl font-heading text-white mb-4">Stay in the Loop</h3>
              <p className="text-white/70 mb-6 max-w-lg mx-auto">
                Community events are announced to Ongoing Coaching clients first.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://instagram.com/personalisedposing" target="_blank" rel="noopener noreferrer" className="btn-glow">
                  Follow on Instagram
                </a>
                <Link to="/services" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center">
                  Join Ongoing Coaching
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA - Glowing purple gradient */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-purple" />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }} />
        
        <FloatingParticles />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-2xl md:text-3xl font-heading text-white mb-4 text-glow-white">
              Part of the Team
            </h2>
            <p className="text-white/90 mb-6">
              Ongoing Coaching clients get access to all community events and team shoots.
            </p>
            <Link to="/services" className="btn-white group">
              Learn About Ongoing Coaching
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealOnScroll>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/20 blur-3xl rounded-full" />
      </section>
    </div>
  )
}

export default Events
