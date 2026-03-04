import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Trophy, Award, Star, Users, Sparkles } from 'lucide-react'

const heroImage = `${import.meta.env.BASE_URL}images/showdays-bg.jpg`

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

const stats = [
  { number: '150+', label: 'Athletes Coached', icon: Users },
  { number: '500+', label: 'Top 5 Placings', icon: Trophy },
  { number: '24', label: 'Overall State Titles', icon: Award },
  { number: '14', label: 'Pro Wins', icon: Star },
]

const achievements = [
  {
    category: 'Pro Card Winners',
    results: [
      { athlete: 'Sarah Scott', achievement: 'ICN Fitness Pro — ICN Nationals', year: '2025' },
      { athlete: 'Nabonita Roy', achievement: 'WNBF Bikini Pro — WNBF India (First!)', year: '2025' },
      { athlete: 'Karissa McKercher', achievement: 'NBA Swimsuit Pro — Australia Winter Titles', year: '2025' },
      { athlete: 'Jamielee Rowe', achievement: 'NBA Wellness Pro — Australia Winter Titles', year: '2025' },
      { athlete: 'Taylor Lawrence', achievement: 'NBA Bikini Pro — Asia Pacific Bali', year: '2024' },
      { athlete: 'Kirra Ward', achievement: '2x Fitness Overall, Fitness Pro & ICN National Champion', year: '2024' },
      { athlete: 'Astrid Naranjo', achievement: 'NBA Wellness Pro — NBA Nationals', year: '2024' },
      { athlete: 'Raquel Chiosi', achievement: 'NBA Sports Pro — NBA Nationals', year: '2024' },
      { athlete: 'Jade Spencer', achievement: 'NBA Swimsuit Pro — NBA Nationals', year: '2024' },
      { athlete: 'Olivia Peskett', achievement: 'ICN Sports Pro — ICN Nationals', year: '2023' },
      { athlete: 'Sam Mckie', achievement: 'ICN Bikini Pro — ICN Nationals', year: '2023' },
      { athlete: 'Jess McPhee', achievement: 'FMG Fitness Pro — MFA Pro/Am Show', year: '2023' },
    ],
  },
  {
    category: 'Overall Winners',
    results: [
      { athlete: 'Sarah Scott', achievement: 'ICN North QLD Championships — Classic Figure & Fitness', year: '2025' },
      { athlete: 'Karissa McKercher', achievement: 'NBA Gold Coast Titles — Swimsuit Overall', year: '2025' },
      { athlete: 'Kirra Ward', achievement: 'ICN Nationals, ICN Brisbane Classic, ICN Sunshine Coast', year: '2024' },
      { athlete: 'Cat Torpy', achievement: 'ICN All Female Classic — Bikini Overall', year: '2024' },
      { athlete: 'Leticia McPhee', achievement: 'ICN All Female Classic — Sports Overall', year: '2024' },
      { athlete: 'Jade Spencer', achievement: 'NBA Brisbane Titles — Swimsuit Overall', year: '2024' },
      { athlete: 'Olivia Peskett', achievement: 'ICN Brisbane Championships — Sports Overall', year: '2023' },
      { athlete: 'Borany Meas', achievement: 'NBA Brisbane State Titles — Sports Overall', year: '2023' },
    ],
  },
]

function ShowDays() {
  return (
    <div className="overflow-hidden bg-[#0a0a0a]">
      {/* Hero - Dark with background image */}
      <section className="relative min-h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Results"
            className="w-full h-full object-cover object-top"
          />
          {/* Dark gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>
        
        <FloatingParticles />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 lg:px-16 xl:px-20 pt-32 lg:pt-36 min-h-[70vh] flex items-center">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-dark mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Track Record
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6"
            >
              Proven <span className="text-brand-purple text-glow">Results</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-lg leading-relaxed"
            >
              Numbers don't lie. See what my athletes have achieved on stages across the world.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats - Dark */}
      <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
        <FloatingParticles />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <span className="badge-dark mb-4">
              The Numbers
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-white">
              Show Day <span className="text-brand-purple text-glow">Highlights</span>
            </h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="stat-card-dark">
                  <GlowingIcon icon={stat.icon} className="mx-auto mb-3 w-12 h-12" />
                  <div className="text-3xl md:text-4xl font-heading text-brand-purple text-glow mb-2">{stat.number}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements - Dark */}
      <section className="section-padding bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          {achievements.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-16 last:mb-0">
              <RevealOnScroll className="mb-8">
                <h2 className="text-2xl md:text-3xl font-heading text-white">
                  {section.category === 'Pro Card Winners' ? (
                    <>🏆 <span className="text-brand-purple text-glow">{section.category}</span></>
                  ) : (
                    <>👑 <span className="text-brand-purple text-glow">{section.category}</span></>
                  )}
                </h2>
              </RevealOnScroll>
              
              <div className="grid md:grid-cols-2 gap-4">
                {section.results.map((result, index) => (
                  <RevealOnScroll key={index} delay={index * 0.05}>
                    <div className={`glass-card-dark p-5 ${sectionIndex === 0 ? 'border-l-4 border-brand-purple' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-white">{result.athlete}</h3>
                          <p className="text-sm text-white/60 mt-1">{result.achievement}</p>
                        </div>
                        <span className="text-xs text-brand-purple font-medium bg-brand-purple/20 border border-brand-purple/30 px-2 py-1 rounded-full">{result.year}</span>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          ))}
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
            <h2 className="text-3xl md:text-4xl font-heading text-white mb-6 text-glow-white">
              Ready to Add Your Name to the List?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join the athletes who've transformed their stage presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="btn-white group">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/testimonials" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center">
                Read Testimonials
              </Link>
            </div>
          </RevealOnScroll>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/20 blur-3xl rounded-full" />
      </section>
    </div>
  )
}

export default ShowDays
