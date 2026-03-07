import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar, Sparkles, Trophy, Target, Gem } from 'lucide-react'

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

function WorkshopCard({ icon: Icon, title, description }) {
  return (
    <div className="glass-card-dark p-6 h-full">
      <div className="w-12 h-12 rounded-xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-brand-purple" />
      </div>
      <h4 className="font-heading text-white text-lg mb-2">{title}</h4>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  )
}

function AcuityEmbed({ src, title }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://embed.acuityscheduling.com/js/embed.js'
    script.type = 'text/javascript'
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <iframe
      src={src}
      title={title}
      width="100%"
      height="800"
      frameBorder="0"
      allow="payment"
      className="rounded-xl"
    />
  )
}

function Workshops() {
  return (
    <div className="overflow-hidden bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <FloatingParticles />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/70" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 lg:px-16 xl:px-20 pt-32 lg:pt-36 min-h-[50vh] flex items-center">
          <div className="max-w-xl">
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
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6"
            >
              Posing <span className="text-brand-purple text-glow">Workshops</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-lg leading-relaxed"
            >
              Federation-specific workshops focusing on stage structure and flow. Hands-on guidance, expert feedback, and a chance to connect with fellow competitors.
            </motion.p>
          </div>
        </div>
      </section>

      {/* The 3 Workshop Pillars */}
      <section className="section-padding bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-2xl md:text-3xl font-heading text-white mb-4 text-center">
              The <span className="text-brand-purple text-glow">3 Workshop Pillars</span>
            </h2>
            <p className="text-white/70 mb-10 text-center max-w-2xl mx-auto">
              Each federation has 3 workshops designed to cover every aspect of your stage performance.
            </p>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-3 gap-6">
            <RevealOnScroll delay={0.1}>
              <WorkshopCard
                icon={Target}
                title="Pose Like a Pro"
                description="Master your mandatory poses and stage comparisons. Learn proper positioning, angles, and how to present yourself with confidence during judging."
              />
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <WorkshopCard
                icon={Sparkles}
                title="Seamless Stagecraft"
                description="Perfect your I-Walk or T-Walk routine. Focus on stage presence, transitions, and performance flow that captivates judges and audience."
              />
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <WorkshopCard
                icon={Gem}
                title="Presentation on Point"
                description="Posing rehearsal bringing it all together. Fine-tune your stage timing, endurance, and those finishing touches that make you stand out."
              />
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.4}>
            <div className="mt-10 p-6 glass-card-dark text-center">
              <p className="text-white/70">
                <span className="text-brand-purple font-medium">Note:</span> These workshops focus on stage structure and flow — not individual pose building. For personalised pose refinements, <Link to="/services" className="text-brand-purple hover:underline">book a 1:1 session</Link>.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ICN Workshops */}
      <section id="icn" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
        <FloatingParticles />
        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <span className="badge-dark mb-4 inline-flex">
                <Trophy className="w-4 h-4" />
                ICN Federation
              </span>
              <h2 className="text-2xl md:text-3xl font-heading text-white mb-4">
                ICN Posing <span className="text-brand-purple text-glow">Workshops</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                ICN-specific workshops covering stage comparisons, posing endurance & resets, and final posing rehearsals.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="glass-card-dark p-4 md:p-6">
              <AcuityEmbed 
                src="https://app.acuityscheduling.com/schedule.php?owner=30497349&appointmentType=category:ICN%20Posing%20Workshops&ref=embedded_csp"
                title="ICN Workshops Booking"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="mt-8 text-center">
              <a 
                href="https://app.acuityscheduling.com/catalog.php?owner=30497349&action=addCart&clear=1&id=2172251"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                Get ICN Season Pass — Save $30
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <p className="text-white/50 text-sm mt-3">All 3 ICN workshops for $60 (normally $90)</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* NBA Workshops */}
      <section id="nba" className="section-padding bg-[#0f0f0f] relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <span className="badge-dark mb-4 inline-flex">
                <Trophy className="w-4 h-4" />
                NBA Federation
              </span>
              <h2 className="text-2xl md:text-3xl font-heading text-white mb-4">
                NBA Posing <span className="text-brand-purple text-glow">Workshops</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                NBA-specific workshops covering stage comparisons, I-Walk routine, and final posing rehearsals.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="glass-card-dark p-4 md:p-6">
              <AcuityEmbed 
                src="https://app.acuityscheduling.com/schedule.php?owner=30497349&appointmentType=category:NBA%20Posing%20Workshops&ref=embedded_csp"
                title="NBA Workshops Booking"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="mt-8 text-center">
              <a 
                href="https://app.acuityscheduling.com/catalog.php?owner=30497349&action=addCart&clear=1&id=2172231"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                Get NBA Season Pass — Save $30
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <p className="text-white/50 text-sm mt-3">All 3 NBA workshops for $60 (normally $90)</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-purple" />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }} />
        
        <FloatingParticles />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-2xl md:text-3xl font-heading text-white mb-4 text-glow-white">
              Looking for OCB or FMG Workshops?
            </h2>
            <p className="text-white/90 mb-6">
              More federations coming soon. Follow on Instagram for announcements.
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
