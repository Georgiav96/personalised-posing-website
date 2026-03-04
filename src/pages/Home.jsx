import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Star, ChevronDown, ChevronUp, Check, X, Users, Calendar, Trophy, Award, Instagram, Mail, Sparkles, Heart, Target } from 'lucide-react'

// Marketing photos
const heroImage = '/images/georgia-hero-composite.jpg'
const aboutImage = '/images/georgia-about.jpg'
const heroBackground = `${import.meta.env.BASE_URL}images/hero-background.jpg`
const transformImage = `${import.meta.env.BASE_URL}images/driven-section.jpg`
const commitmentImage = '/images/marketing-shoot/05102025_GeorgiaVoice_High-805.jpg'

// Autoplay video component - plays when scrolled into view with delay and fade
function AutoplayVideo() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  
  useEffect(() => {
    let timer
    if (videoRef.current) {
      if (isInView && !hasStarted) {
        // 4 second delay before playing
        timer = setTimeout(() => {
          videoRef.current.play().then(() => {
            setIsVisible(true)
            setHasStarted(true)
          }).catch(() => {
            // If autoplay with audio blocked, try muted
            videoRef.current.muted = true
            videoRef.current.play().then(() => {
              setIsVisible(true)
              setHasStarted(true)
            })
          })
        }, 4000)
      } else if (!isInView && hasStarted) {
        videoRef.current.pause()
        setIsVisible(false)
        setHasStarted(false)
      }
    }
    return () => clearTimeout(timer)
  }, [isInView, hasStarted])
  
  return (
    <div ref={containerRef} className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0.3 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <video
          ref={videoRef}
          className="w-full h-auto object-cover"
          src={`${import.meta.env.BASE_URL}videos/action-video-web.mp4`}
          loop
          playsInline
          preload="metadata"
        />
      </motion.div>
    </div>
  )
}

// Click-to-play video component with hover play button
function ClickToPlayVideo({ src }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
  }

  return (
    <div 
      className="relative w-full cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-auto object-cover"
        src={src}
        playsInline
        preload="metadata"
        onEnded={handleVideoEnd}
      />
      {/* Play/Pause Button Overlay */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !isPlaying ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-purple/90 backdrop-blur flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          style={{ boxShadow: '0 0 40px rgba(149, 0, 255, 0.5)' }}
        >
          <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.div>
      </motion.div>
      {/* Pause indicator when playing */}
      {isPlaying && isHovered && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="w-16 h-16 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

// Scroll reveal wrapper component
function RevealOnScroll({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const variants = {
    up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
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

// Staggered children wrapper
function StaggerContainer({ children, className = '', staggerDelay = 0.1 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating particles component for dark sections
function FloatingParticles({ dark = false }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-10 ${dark ? 'particles-dark' : ''}`}>
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
      <div className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse ${dark ? 'bg-gradient-to-br from-brand-purple/20 to-transparent' : 'bg-gradient-to-br from-brand-purple/10 to-transparent'}`} style={{ animationDelay: '4s' }} />
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
  { number: '24', label: 'State Titles', icon: Award },
  { number: '14', label: 'Pro Wins', icon: Star },
]

const federations = ['ICN', 'NBA', 'IFBB', 'NPC', 'FMG', 'OCB', 'ANB', 'WNBF']

const painPoints = [
  "I train hard, but I don't feel confident in my posing.",
  "I'm not sure how to show my physique properly.",
  "I freeze or overthink when I'm on stage.",
  "I don't know where I fit across federations.",
]

const youreNot = [
  'Stuck inside your head',
  'Second-guessing every move',
  'Comparing yourself to others',
  'Feeling stiff and awkward',
]

const youFeel = [
  'Grounded and present',
  'Confident in your flow',
  'Connected to your body',
  'Ready to own the stage',
]

const services = [
  {
    icon: Users,
    title: '1:1 Coaching',
    description: 'Personalised posing guidance tailored to your physique, category, and federation.',
    link: '/services#coaching',
    featured: true,
    image: `${import.meta.env.BASE_URL}images/service-coaching.jpg`,
  },
  {
    icon: Calendar,
    title: 'Workshops',
    description: 'Group sessions and intensive workshop experiences for competition prep.',
    link: '/workshops',
    image: `${import.meta.env.BASE_URL}images/service-workshops.jpg`,
    imagePosition: 'center',
  },
  {
    icon: Heart,
    title: 'Community Events',
    description: 'Connect with like-minded women through social events and wellness activities.',
    link: '/events',
    image: `${import.meta.env.BASE_URL}images/service-events.jpg`,
  },
]

const valueProps = [
  {
    icon: Target,
    title: 'Federation-Specific Guidance',
    description: 'Know exactly what the judges are looking for in YOUR division.',
  },
  {
    icon: Sparkles,
    title: 'Action-Focused Coaching',
    description: 'Empowering context, practical tips, and personalised cues — so you leave each lesson knowing exactly what to work on.',
  },
  {
    icon: Heart,
    title: 'Personal Connection',
    description: 'No templates. Every session is built around YOU and your unique goals.',
  },
]

const processSteps = [
  {
    step: 1,
    title: 'Choose Your Service',
    description: 'Select Ongoing Coaching or Casual Coaching based on your needs and timeline.',
  },
  {
    step: 2,
    title: 'Book & Prepare',
    description: 'Complete payment, fill out your onboarding form, and access your Client Portal.',
  },
  {
    step: 3,
    title: 'Show Up & Grow',
    description: 'Arrive ready for your sessions. I\'ll meet you exactly where you\'re at.',
  },
  {
    step: 4,
    title: 'Practise & Refine',
    description: 'Between sessions, practise and submit check-ins for ongoing feedback.',
  },
  {
    step: 5,
    title: 'Own the Stage',
    description: 'Build the muscle memory and confidence to shine on show day.',
  },
]

const testimonials = [
  {
    quote: "Georgia offers such a unique and beautifully quirky approach to her services. She gave me confidence and believed in my ability — taking out two National Pro Cards for Fitness plus incredible posing compliments from ICN Worldwide Commentators.",
    name: 'Kirra Ward',
    title: 'Fitness Pro (NBA & ICN)',
    image: `${import.meta.env.BASE_URL}images/testimonial-kirra.jpg`,
    featured: true,
  },
  {
    quote: "She has become a sister, an icon, a mentor and a role model to me. Everything is so special and personalised. She helped me see my potential and always wants the best for her clients.",
    name: 'Taylor Lawrence',
    title: 'Bikini & Swimsuit Pro (NBA)',
    image: `${import.meta.env.BASE_URL}images/testimonial-taylor.jpg`,
  },
  {
    quote: "Georgia puts in 110% effort into every one of her posing clients. She really has a great eye for making you look incredible in front of the judges!",
    name: 'Olivia Peskett',
    title: 'Sports Model Pro',
    image: `${import.meta.env.BASE_URL}images/testimonial-olivia.jpg`,
  },
]

const faqs = [
  {
    question: 'How do online posing sessions work?',
    answer: 'Online sessions are conducted live via Google Meet. You\'ll need to download the Google Meet app on your phone or laptop, and make sure your camera and audio are set up in a well-lit space with enough room to practice walking and posing.',
  },
  {
    question: 'How far out from competition should I start?',
    answer: 'I recommend starting 20-30 weeks out for the best results — this gives us time to build strong foundations and muscle memory. For tighter timelines (16-20 weeks), weekly sessions are essential. I generally don\'t take on new ongoing clients under 16 weeks out.',
  },
  {
    question: 'Which federations do you coach?',
    answer: 'I work across all major federations including ICN, NBA, IFBB/NPC, FMG, OCB, ANB, INBA, and WNBF. I coach for Swimsuit, Bikini, Wellness, Sports Model, Fitness, and Figure (muscularity & symmetry poses).',
  },
  {
    question: 'What if I\'m a complete beginner?',
    answer: 'Perfect! Many of my clients start with zero posing experience. I\'ll teach you everything from the fundamentals up. No judgement — everyone starts somewhere.',
  },
]

function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="overflow-x-hidden bg-[#0a0a0a]">
      {/* Hero Section - Dark with fade-in */}
      <motion.section 
        ref={heroRef} 
        className="relative min-h-screen overflow-hidden bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-black">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-athlete.jpg`}
            alt="Stage athlete"
            className="w-full h-full object-cover"
            style={{ objectPosition: '20% 65%' }}
          />
          {/* Dark gradient overlays - semi-transparent to show particles */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
        
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 lg:pt-36">
          <div className="min-h-[85vh] flex items-center">
            {/* Text Content */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="badge-dark mb-6">
                  <Sparkles className="w-4 h-4" />
                  International Posing Coach
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading leading-tight mb-6 text-white"
              >
                Own The Stage With{' '}
                <span className="text-brand-purple text-glow">Confidence</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed"
              >
                I help women showcase their hard work with confidence, clarity, and purpose. 
                My approach blends technical posing with deep personal awareness — so you don't just 
                <em> look</em> prepared, you <em>feel</em> prepared.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Link to="/services" className="btn-glow">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/about" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center">
                  Learn More
                </Link>
              </motion.div>
              
            </div>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 mt-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.1}>
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="stat-card-dark">
                  <div className="text-3xl md:text-4xl font-heading text-brand-purple text-glow mb-2">{stat.number}</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </motion.section>

      {/* Tagline Marquee - Dark */}
      <section className="py-8 bg-black/50 border-y border-white/5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, index) => (
            <span key={index} className="inline-flex items-center">
              <span className="text-white/60 font-heading text-2xl mx-8">
                More Than Just a Posing Coach
              </span>
              <span className="text-brand-purple mx-4">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Video Section - Full Width Autoplay */}
      <section className="bg-[#0a0a0a]">
        <AutoplayVideo />
      </section>

      {/* Tagline Marquee - After Video */}
      <section className="py-8 bg-black/50 border-y border-white/5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, index) => (
            <span key={index} className="inline-flex items-center">
              <span className="text-white/60 font-heading text-2xl mx-8">
                More Than Just a Posing Coach
              </span>
              <span className="text-brand-purple mx-4">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Services Section - Dark with glowing icons */}
      <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <span className="badge-dark mb-4">
              How I Help
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white mb-4">
              Choose Your Path to <span className="text-brand-purple text-glow">Stage Confidence</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Whether you're a first-time competitor or a seasoned athlete, I offer a well-rounded range of services to support every aspect of your posing journey.
            </p>
          </RevealOnScroll>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <Link 
                  to={service.link}
                  className="bento-card-dark-featured group block overflow-hidden"
                >
                  {service.image && (
                    <div className="h-48 -mx-8 -mt-8 mb-6 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${service.imagePosition === 'center' ? 'object-center' : 'object-top'}`}
                      />
                    </div>
                  )}
                  <GlowingIcon icon={service.icon} className="mb-4" />
                  <h3 className="text-xl font-heading mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-white/70">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-brand-purple">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Value Proposition Section - Dark with image */}
      <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <span className="badge-dark mb-4">
                Why Work With Me
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white mb-6">
                Guidance That's <span className="text-brand-purple text-glow">Grounded &<br />Results-Driven</span>
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Working with a coach isn't about finding someone who tells you what to do — 
                it's about finding someone who understands your challenges and helps you take meaningful action.
              </p>
              
              <div className="space-y-6">
                {valueProps.map((prop, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="flex gap-4 glass-card-dark p-5"
                  >
                    <GlowingIcon icon={prop.icon} />
                    <div>
                      <h4 className="font-heading text-white mb-1">{prop.title}</h4>
                      <p className="text-white/60 text-sm">{prop.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Link to="/discovery-call" className="btn-glow mt-8 inline-flex">
                Book a Discovery Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </RevealOnScroll>
            
            <RevealOnScroll direction="right" delay={0.2}>
              <div className="relative">
                <div className="float-image-reverse overflow-hidden rounded-3xl">
                  <img 
                    src={transformImage}
                    alt="Georgia coaching"
                    className="w-full"
                    style={{ 
                      boxShadow: '0 0 60px rgba(149, 0, 255, 0.2), 0 20px 50px rgba(0,0,0,0.5)',
                      border: '1px solid rgba(149, 0, 255, 0.2)',
                      transform: 'scale(1.15)',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand-purple/20 rounded-full blur-3xl" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Dark */}
      <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <span className="badge-dark mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white mb-4">
              Real People. <span className="text-brand-purple text-glow">Real Results.</span>
            </h2>
          </RevealOnScroll>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <div className="bento-card-dark-featured h-full flex flex-col">
                  {testimonial.image && (
                    <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-brand-purple/30 mx-auto">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-1 mb-4 text-brand-purple">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="leading-relaxed mb-6 font-accent italic text-white/80">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-auto">
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-brand-purple">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <RevealOnScroll className="text-center mt-12">
            <Link to="/testimonials" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center">
              Read More Stories
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* Pain Points / Empathy Section - Dark Purple gradient */}
      <section className="section-padding bg-gradient-dark-purple relative overflow-hidden">
        <FloatingParticles dark />
        <div className="max-w-4xl mx-auto relative z-10">
          <RevealOnScroll className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-4 text-white">
              You've put in the work.<br />
              <span className="text-brand-purple text-glow">You've built the body.</span>
            </h2>
            <p className="text-xl text-white/70">
              So why does stepping on stage still feel overwhelming?
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <div className="glass-card-dark-purple p-8 md:p-12 text-center">
              {/* Part 1: The question */}
              <h3 className="text-2xl font-heading text-white mb-6">
                If You've Ever Said To Yourself...
              </h3>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {painPoints.map((point, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur rounded-full px-5 py-3 text-white/90 font-accent italic text-sm border border-white/10"
                  >
                    "{point}"
                  </motion.span>
                ))}
              </div>
              
              {/* Divider */}
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent mx-auto mb-10" />
              
              {/* Part 2: The answer */}
              <h3 className="text-2xl md:text-3xl font-heading text-brand-purple mb-4">
                Then You Are Exactly Who I Am Here To Help
              </h3>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                You're not behind. You're not bad at posing. You just haven't been shown 
                how to move with confidence in your own body yet.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Video Break Section */}
      <section className="bg-[#0a0a0a]">
        <ClickToPlayVideo src={`${import.meta.env.BASE_URL}videos/section-break-video-web.mp4`} />
      </section>

      {/* Imagine Show Day - Dark Side by Side */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white mb-4">
              Imagine <span className="text-brand-purple text-glow">Show Day...</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              You step on stage knowing exactly where to place your feet, how to hold your posture, 
              and how to move with flow.
            </p>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 gap-6">
            <RevealOnScroll direction="left" delay={0.1}>
              <div className="glass-card-dark p-8 h-full">
                <h3 className="text-xl font-heading text-white mb-6 text-center">YOU'RE NOT...</h3>
                <div className="space-y-4">
                  {youreNot.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                        <X className="w-4 h-4 text-red-400" />
                      </div>
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="right" delay={0.2}>
              <div className="bento-card-dark-featured p-8 h-full">
                <h3 className="text-xl font-heading text-white mb-6 text-center">YOU FEEL...</h3>
                <div className="space-y-4">
                  {youFeel.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Process Section - Dark with parallax background */}
      <section className="section-padding relative overflow-hidden process-section-parallax">
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/journey-bg.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealOnScroll className="text-center mb-16">
            <span className="badge-dark mb-4">
              The Process
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-white">
              Your Journey to <span className="text-brand-purple text-glow">Stage Confidence</span>
            </h2>
          </RevealOnScroll>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {processSteps.map((step, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="process-step-box"
                  whileHover={{ 
                    y: -8, 
                    boxShadow: '0 20px 40px rgba(149, 0, 255, 0.25), 0 0 60px rgba(149, 0, 255, 0.15)',
                    borderColor: 'rgba(149, 0, 255, 0.5)'
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <div className="step-number-box">{step.step}</div>
                  <h3 className="text-lg font-heading mb-2 text-white">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <RevealOnScroll delay={0.5}>
            <div className="glass-card-dark-purple p-8 text-center mt-8">
              <p className="text-lg text-white/90">
                I don't just teach poses. I teach you how to present your physique with intention —
                <br />
                <span className="mt-2 inline-block">so you show up feeling <span className="text-brand-purple font-semibold">prepared, powerful, and proud.</span></span>
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Scrolling Banner - Glowing */}
      <section className="bg-gradient-purple py-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple via-brand-purple-light to-brand-purple" />
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 100px rgba(149, 0, 255, 0.5)' }} />
        <div className="relative z-10 animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="text-2xl md:text-3xl font-heading text-white mx-8 text-glow-white">
                READY TO TRANSFORM YOUR STAGE PRESENCE?
              </span>
              <span className="text-2xl md:text-3xl font-heading text-white/40 mx-4">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Commitment Section - Dark with image */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <span className="badge-dark mb-4">
                Working Together
              </span>
              <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">
                Commitment & <span className="text-brand-purple text-glow">Alignment</span>
              </h2>
              <p className="text-lg text-white/70 mb-6 leading-relaxed">
                My clients come to me because they're ready to invest in themselves. 
                They understand that posing is the final piece of the puzzle — and they're 
                committed to putting in the practice.
              </p>
              <p className="text-white/60 mb-8 leading-relaxed">
                I work best with athletes who are coachable, open to feedback, and willing 
                to step outside their comfort zone. If that sounds like you, we're going to 
                do incredible things together.
              </p>
              <Link to="/contact" className="btn-glow">
                Let's Work Together
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </RevealOnScroll>
            
            <RevealOnScroll direction="right" delay={0.2}>
              <div className="relative">
                <div className="float-image">
                  <img 
                    src={commitmentImage}
                    alt="Working together"
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

      {/* FAQ Section - Dark */}
      <section className="section-padding bg-[#0f0f0f]">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <span className="badge-dark mb-4">
              Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-white">
              Frequently Asked <span className="text-brand-purple text-glow">Questions</span>
            </h2>
          </RevealOnScroll>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="glass-card-dark overflow-hidden">
                  <button
                    className="w-full px-6 py-5 flex justify-between items-center text-left font-semibold text-lg hover:text-brand-purple transition-colors text-white"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-brand-purple" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-white/70 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Glowing purple gradient */}
      <section className="section-padding relative overflow-hidden">
        {/* Background with glow */}
        <div className="absolute inset-0 bg-gradient-purple" />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }} />
        
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white mb-6 text-glow-white">
              Ready to Own the Stage?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Your transformation begins with a single step. Let's create your winning presence together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discovery-call" className="btn-white group">
                Book Your Discovery Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-brand-purple transition-all duration-300 inline-flex items-center justify-center">
                View Services
              </Link>
            </div>
          </RevealOnScroll>
        </div>
        
        {/* Glow effect at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/20 blur-3xl rounded-full" />
      </section>
    </div>
  )
}

export default Home
