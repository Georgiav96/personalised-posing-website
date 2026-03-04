import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Heart, Sparkles, Target, Users, ChevronDown } from 'lucide-react'

const heroImage = '/images/about-hero-new.jpg'
const storyImage = '/images/coaching-what-i-do.jpg'
const performingArtsImage = '/images/performing-arts-new.jpg'
const approachImage = '/images/marketing-shoot/05102025_GeorgiaVoice_High-805.jpg'

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

// Floating particles for dark sections
function FloatingParticles({ dark = false }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-10`}>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: dark 
              ? `linear-gradient(135deg, rgba(149,0,255,${0.3 + Math.random() * 0.4}), rgba(191,95,255,${0.2 + Math.random() * 0.3}))`
              : `linear-gradient(135deg, rgba(149,0,255,${0.2 + Math.random() * 0.3}), rgba(191,95,255,${0.1 + Math.random() * 0.2}))`,
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
      
      {/* Large gradient orbs */}
      <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse ${dark ? 'bg-gradient-to-br from-brand-purple/40 to-transparent' : 'bg-gradient-to-br from-brand-purple/30 to-transparent'}`} />
      <div className={`absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl animate-pulse ${dark ? 'bg-gradient-to-tr from-brand-purple/30 to-transparent' : 'bg-gradient-to-tr from-brand-lavender/50 to-transparent'}`} style={{ animationDelay: '2s' }} />
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

// Federation data
const federationData = {
  ICN: { name: 'ICN', categories: ['Bikini', 'Wellness', 'Sports Model', 'Figure'] },
  'IFBB/NPC': { name: 'IFBB/NPC', categories: ['Bikini', 'Wellness', 'Figure', 'Fitness'] },
  NBA: { name: 'NBA', categories: ['Bikini', 'Wellness', 'Sports Model', 'Figure'] },
  FMG: { name: 'FMG', categories: ['Bikini', 'Wellness', 'Sports Model', 'Fitness'] },
  OCB: { name: 'OCB', categories: ['Bikini', 'Figure'] },
  ANB: { name: 'ANB', categories: ['Bikini', 'Wellness', 'Figure'] },
  WNBF: { name: 'WNBF', categories: ['Bikini', 'Figure'] },
}

const federations = Object.keys(federationData)

// Interactive Federations Section - Dark
const FederationsSection = () => {
  const [selectedFed, setSelectedFed] = useState('ICN')
  const currentFed = federationData[selectedFed]

  return (
    <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
      <FloatingParticles dark />
      <div className="max-w-6xl mx-auto relative z-10">
        <RevealOnScroll className="text-center mb-12">
          <span className="badge-dark mb-4">
            Expertise Across
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-4 text-white">
            All Major <span className="text-brand-purple text-glow">Federations</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            I stay current with judging criteria and posing standards across all federations.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {federations.map((fed) => (
              <button
                key={fed}
                onClick={() => setSelectedFed(fed)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  selectedFed === fed
                    ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/40 scale-105'
                    : 'glass-card-dark text-white/80 hover:border-brand-purple/50 border border-white/10'
                }`}
              >
                {fed}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="glass-card-dark p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-4">
              Categories I Coach in <span className="text-brand-purple">{selectedFed}</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {currentFed.categories.map((cat, index) => (
                <span
                  key={index}
                  className="px-5 py-2 rounded-full text-sm font-medium bg-brand-purple/20 text-brand-purple border border-brand-purple/30"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3} className="mt-8">
          <div className="glass-card-dark-purple p-8 text-center">
            <h3 className="text-xl font-heading text-white mb-4">
              Not Sure Which Category You'll Compete In?
            </h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              During our sessions, we'll work together to identify the category that best suits your physique, strengths, and goals.
            </p>
            <Link to="/quiz" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 inline-flex items-center">
              Take the Quiz
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

const values = [
  {
    icon: Heart,
    title: 'Safe Space',
    description: 'I create a safe, intentional space where you can learn to trust yourself.',
  },
  {
    icon: Sparkles,
    title: 'Presence Over Perfection',
    description: 'Posing isn\'t about perfection — it\'s about presence and self-expression.',
  },
  {
    icon: Target,
    title: 'Personalised Approach',
    description: 'Every woman has her own strengths and story. Your coaching is built around YOU.',
  },
  {
    icon: Users,
    title: 'Team Effort',
    description: 'I work closely with prep coaches because your success takes a whole team.',
  },
]

function About() {
  return (
    <div className="overflow-hidden bg-[#0a0a0a]">
      {/* Hero Section - Dark with video background */}
      <section className="relative min-h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/about-hero-bg.jpg`}
            alt="Stage background"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'right 20%' }}
          />
          {/* Dark gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
        
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 lg:px-16 xl:px-20 pt-32 lg:pt-36 min-h-[80vh] flex items-center">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-accent text-brand-purple text-xl mb-4"
            >
              Hi there,
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading text-white mb-6"
            >
              I'm <span className="text-brand-purple text-glow">Georgia</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/80 max-w-lg leading-relaxed"
            >
              International posing and performance coach helping women shine on stage with confidence, clarity, and purpose.
            </motion.p>
          </div>
        </div>
      </section>

      {/* My Work Section - Dark */}
      <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <div className="relative">
                <div className="float-image">
                  <img 
                    src={storyImage}
                    alt="Georgia coaching"
                    className="rounded-3xl w-full"
                    style={{ 
                      boxShadow: '0 0 60px rgba(149, 0, 255, 0.2), 0 20px 50px rgba(0,0,0,0.5)',
                      border: '1px solid rgba(149, 0, 255, 0.2)'
                    }}
                  />
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="right" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-heading mb-6 text-white">
                What I <span className="text-brand-purple text-glow">Do</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                My work blends technical posing, performance coaching, and deep personal awareness — so athletes don't just <em className="font-accent text-brand-purple">look</em> prepared, they <em className="font-accent text-brand-purple">feel</em> prepared. I work with women across multiple federations and divisions, from first-time competitors to seasoned athletes.
              </p>
              
              <div className="glass-card-dark-purple p-6">
                <p className="text-white/90 leading-relaxed">
                  Since launching Personalised Posing, I've supported <strong className="text-brand-purple">500+ Top 5 placings, 24 Overall State Titles, and 14 Pro Wins</strong>.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Performing Arts Background - Dark */}
      <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left" className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-heading mb-6 text-white">
                My <span className="text-brand-purple text-glow">Background</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                This isn't just about poses. My background in acting and performing arts taught me that every person brings their own life experience into their body. Confidence, fear, identity, pressure — it all shows up on stage. That's why I don't copy and paste routines or treat athletes like they're the same.
              </p>
              
              <div className="glass-card-dark p-6">
                <p className="text-white/90 leading-relaxed">
                  My role is to create a safe space where you can build trust in yourself, understand how you perform under pressure, and learn to express confidence without forcing it.
                </p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="right" delay={0.2} className="order-1 lg:order-2">
              <div className="relative">
                <div className="float-image-reverse">
                  <img 
                    src={performingArtsImage}
                    alt="Performing Arts Background"
                    className="rounded-3xl w-full"
                    style={{ 
                      boxShadow: '0 0 60px rgba(149, 0, 255, 0.2), 0 20px 50px rgba(0,0,0,0.5)',
                      border: '1px solid rgba(149, 0, 255, 0.2)'
                    }}
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Educational Role - Dark */}
      <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <div className="relative">
                <div className="float-image">
                  <img 
                    src={approachImage}
                    alt="Georgia's approach"
                    className="rounded-3xl w-full"
                    style={{ 
                      boxShadow: '0 0 60px rgba(149, 0, 255, 0.2), 0 20px 50px rgba(0,0,0,0.5)',
                      border: '1px solid rgba(149, 0, 255, 0.2)'
                    }}
                  />
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="right" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-heading mb-6 text-white">
                My <span className="text-brand-purple text-glow">Approach</span>
              </h2>
              <p className="text-white/70 leading-relaxed">
                I play a strong educational role staying across federation criteria, category expectations, and posing standards — helping clients understand where they fit best and how to present their physique. I work closely with prep coaches because your success is a team effort. Whether you're stepping on stage for the first time or you're a seasoned pro, my job is to help you feel prepared, confident, and proud.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Values - Dark */}
      <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <span className="badge-dark mb-4">
              How I Work
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-white">
              My Core <span className="text-brand-purple text-glow">Values</span>
            </h2>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="bento-card-dark group">
                  <GlowingIcon icon={value.icon} className="mb-4" />
                  <h3 className="text-xl font-heading mb-3 text-white">{value.title}</h3>
                  <p className="text-white/70 leading-relaxed">{value.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* My Goal - Dark */}
      <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <span className="badge-dark mb-4">
              My Promise
            </span>
            <h2 className="text-3xl md:text-4xl font-heading mb-8 text-white">
              My Goal is <span className="text-brand-purple text-glow">Simple</span>
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-4">
              To help you showcase your hard work with confidence, authenticity, and pride —
            </p>
            <p className="text-2xl md:text-3xl font-heading text-brand-purple text-glow">
              and leave the stage knowing you showed up as yourself.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Federations */}
      <FederationsSection />

      {/* CTA - Glowing purple gradient */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-purple" />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }} />
        
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white mb-6 text-glow-white">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's create your stage presence together. Book a discovery call and tell me about your competition goals.
            </p>
            <Link to="/contact" className="btn-white group">
              Book Your Discovery Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealOnScroll>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/20 blur-3xl rounded-full" />
      </section>
    </div>
  )
}

export default About
