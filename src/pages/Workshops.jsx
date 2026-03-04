import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar, Sparkles } from 'lucide-react'

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

function Workshops() {
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
            Group Learning
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-4"
          >
            Posing <span className="text-brand-purple text-glow">Workshops</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-xl mx-auto"
          >
            Hands-on guidance, expert feedback, and a chance to connect with fellow competitors.
          </motion.p>
        </div>
      </section>

      {/* Workshop Video - Full Width Dark */}
      <section className="bg-[#0a0a0a] relative overflow-hidden">
        <div className="relative z-10 w-full">
          <div className="aspect-video w-full overflow-hidden">
            <iframe
              src="https://drive.google.com/file/d/1w2-haLBPXeIMghcf-6HnASygJkg5t3ri/preview?autoplay=1"
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Workshop Video"
            />
          </div>
        </div>
      </section>

      {/* Workshop Info - Dark */}
      <section className="section-padding bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <RevealOnScroll>
              <h2 className="text-2xl md:text-3xl font-heading text-white mb-4">
                Federation-Specific <span className="text-brand-purple text-glow">Workshops</span>
              </h2>
              <p className="text-white/70 mb-6">
                I run regular posing workshops for ICN, NBA, and other federations. 
                Each workshop is tailored to federation-specific requirements.
              </p>
              <p className="text-white/60">
                Workshops are announced on Instagram and to Ongoing Coaching clients first.
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.1}>
              <div className="glass-card-dark p-6">
                <h3 className="font-heading text-brand-purple mb-4">Upcoming Workshops</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-brand-purple" />
                    </div>
                    <span>ICN Workshops — Monthly</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-brand-purple" />
                    </div>
                    <span>NBA Workshop Series — Check Instagram</span>
                  </li>
                </ul>
                <a 
                  href="https://instagram.com/personalisedposing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center text-brand-purple font-medium hover:underline"
                >
                  Follow for announcements
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </RevealOnScroll>
          </div>
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
              Want to Join a Workshop?
            </h2>
            <p className="text-white/90 mb-6">
              Get in touch or follow on Instagram for the latest schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-white group">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="https://instagram.com/personalisedposing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-4 rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Follow @personalisedposing
              </a>
            </div>
          </RevealOnScroll>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/20 blur-3xl rounded-full" />
      </section>
    </div>
  )
}

export default Workshops
