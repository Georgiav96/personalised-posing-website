import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Star, Quote, Sparkles } from 'lucide-react'

const heroImage = '/images/marketing-shoot/05102025_GeorgiaVoice_High-805.jpg'

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
      
      {/* Large gradient orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-br from-brand-purple/40 to-transparent" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl animate-pulse bg-gradient-to-tr from-brand-purple/30 to-transparent" style={{ animationDelay: '2s' }} />
    </div>
  )
}

const testimonials = [
  {
    quote: "Georgia offers such a unique and beautifully quirky approach to her services. No routine is the same and there is something different about the way Georgia's girls shine on stage. She gave me confidence and believed in my ability which ultimately got me to stage with a very successful season — taking out two National NBA & ICN Pro Cards for Fitness plus incredible posing compliments from ICN Worldwide Commentators.",
    name: 'Kirra Ward',
    title: 'Fitness Pro (NBA & ICN)',
    federation: 'NBA & ICN',
    category: 'Fitness',
    featured: true,
  },
  {
    quote: "She has become a sister, an icon, a mentor and a role model to me. Everything is so special and personalised to the individual and their needs. She helped me see my potential and always wants the best for her clients. Couldn't recommend a more beautiful soul and business.",
    name: 'Taylor Lawrence',
    title: 'Bikini & Swimsuit Pro (NBA)',
    federation: 'NBA',
    category: 'Bikini & Swimsuit',
    featured: true,
  },
  {
    quote: "Georgia puts in 110% effort into every one of her posing clients to make sure they are performing at their best. You put in so much hard work during your entire prep and you want to make sure all that hard work is shown off and maximised on stage — she really has a great eye for making you look incredible in front of the judges!",
    name: 'Olivia Peskett',
    title: 'Sports Model Pro',
    federation: 'ICN',
    category: 'Sports Model',
    featured: true,
  },
  {
    quote: "Georgia is amazing at what she does. I've had the best season yet and a huge part of that is because of Georgia and the effort and personalisation that she puts into every routine. She makes you feel confident and like you've been seen and heard.",
    name: 'Heather Windle',
    title: 'Bikini Competitor',
    federation: 'ICN',
    category: 'Bikini',
  },
  {
    quote: "Georgia was probably the best posing coach I could ask for, being there for me not only as a coach but as a friend. She built my confidence and we built a bond that I will cherish forever.",
    name: 'Molly McKinnon',
    title: 'Bikini Competitor',
    federation: 'ICN',
    category: 'Bikini',
  },
  {
    quote: "Georgia is absolutely amazing — definitely at the top in this sport as a coach and as a competitor herself. She's authentic, passionate and caring, and does everything with so much heart. She knows the federation requirements really well but also works with you to bring your own personality to your posing.",
    name: 'Jane Weekley',
    title: 'Fitness Competitor',
    federation: 'ICN',
    category: 'Fitness',
  },
  {
    quote: "She's not just a fantastic coach but a genuine friend who I am so beyond grateful for. When I first started I was the biggest newbie ever and had zero idea of what I was doing. She's been so patient and kind.",
    name: 'Harriet Baker',
    title: 'Bikini Competitor',
    federation: 'ICN',
    category: 'Bikini',
  },
  {
    quote: "Georgia's passion for posing comes out in the way she teaches and explains everything. She's all about flow and elegance and has an eye for detail. She helped me so much with getting comfortable with posing and I placed 1st in my first Comp!",
    name: 'Mina Shahbazpour',
    title: 'Bikini Competitor',
    federation: 'ICN',
    category: 'Bikini',
  },
  {
    quote: "The confidence that she helps you find is unmatched! The quirkiness and personalisation behind every routine is special and unique! Not only is she an amazing posing coach but she is relatable, she is a friend.",
    name: 'Abigail Robertson',
    title: 'Online Client',
    federation: 'Online',
    category: 'Bikini',
  },
]

function Testimonials() {
  const featuredTestimonials = testimonials.filter(t => t.featured)
  const regularTestimonials = testimonials.filter(t => !t.featured)

  return (
    <div className="overflow-hidden bg-[#0a0a0a]">
      {/* Hero Section - Dark */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge-dark mb-6">
              <Sparkles className="w-4 h-4" />
              Success Stories
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-4"
          >
            Real People. <span className="text-brand-purple text-glow">Real Results.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Hear from the incredible women who've transformed their stage presence.
          </motion.p>
        </div>
      </section>

      {/* Featured Testimonials - Dark */}
      <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <span className="badge-dark mb-4">
              Featured
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-white">
              Pro Athletes & <span className="text-brand-purple text-glow">Top Performers</span>
            </h2>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredTestimonials.map((testimonial, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="bento-card-dark-featured h-full flex flex-col">
                  <Quote className="w-10 h-10 text-white/30 mb-4" />
                  <div className="flex items-center gap-1 text-brand-purple mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/90 leading-relaxed mb-6 font-accent italic flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/20">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-brand-purple">{testimonial.title}</div>
                    <div className="text-xs text-white/50 mt-1">{testimonial.federation} • {testimonial.category}</div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Testimonials - Dark */}
      <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-white">
              More <span className="text-brand-purple text-glow">Success Stories</span>
            </h2>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularTestimonials.map((testimonial, index) => (
              <RevealOnScroll key={index} delay={index * 0.08}>
                <div className="testimonial-card-dark h-full flex flex-col">
                  <Quote className="w-8 h-8 text-brand-purple/30 mb-4" />
                  <div className="flex items-center gap-1 text-brand-purple mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/70 leading-relaxed mb-6 font-accent italic flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-brand-purple">{testimonial.title}</div>
                    <div className="text-xs text-white/50 mt-1">{testimonial.federation} • {testimonial.category}</div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

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
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of women who've transformed their stage presence with personalised posing coaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="btn-white group">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center">
                Get In Touch
              </Link>
            </div>
          </RevealOnScroll>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/20 blur-3xl rounded-full" />
      </section>
    </div>
  )
}

export default Testimonials
