import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Instagram, Facebook, Clock, Send, Check, Sparkles, ChevronDown } from 'lucide-react'

const heroImage = '/images/contact-hero.jpg'

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

const faqs = [
  {
    question: 'How quickly will you respond?',
    answer: 'I typically respond to all enquiries within 24-48 hours.',
  },
  {
    question: 'Do you offer in-person coaching?',
    answer: 'Yes! In-person in Brisbane, and online worldwide.',
  },
  {
    question: 'What do I need for online coaching?',
    answer: 'A smartphone/laptop, full length mirror, and good lighting.',
  },
  {
    question: 'Do I need posing experience to start?',
    answer: 'Not at all! I work with complete beginners through to seasoned pros.',
  },
  {
    question: 'Can I book a single session?',
    answer: 'Yes — Casual Coaching is perfect for one-off sessions or occasional tune-ups.',
  },
  {
    question: "What's the best way to reach you?",
    answer: 'This form or DM me on Instagram @personalised_posing.',
  },
  {
    question: 'Do you work with interstate/international clients?',
    answer: 'Absolutely — I coach athletes across Australia and worldwide via online sessions.',
    link: { text: 'Read testimonials here', to: '/testimonials' },
  },
]

function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    federation: '',
    category: '',
    showDate: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  
  const toggleFaq = useCallback((index) => {
    setOpenFaqIndex(prev => prev === index ? null : index)
  }, [])

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'b065cbbe-bff2-4ef3-a6ed-fce8873a5e87',
          subject: `New enquiry from ${formState.name}`,
          from_name: 'Personalised Posing Website',
          ...formState,
        }),
      })
      
      const data = await response.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        alert('Something went wrong. Please try again or DM me on Instagram.')
      }
    } catch (error) {
      alert('Something went wrong. Please try again or DM me on Instagram.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="overflow-hidden bg-[#0a0a0a]">
      {/* Contact Hero - Left aligned */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <FloatingParticles dark />
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/70" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 lg:px-16 xl:px-20 pt-32 lg:pt-36 min-h-[50vh] flex items-center">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-dark mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Let's Connect
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6"
            >
              Get In <span className="text-brand-purple text-glow">Touch</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-lg leading-relaxed mb-8"
            >
              Have questions or ready to start your posing journey? Send me a message below or book a free discovery call.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/discovery-call" className="btn-glow">
                Book a Free Discovery Call
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Content - Dark */}
      <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
        <FloatingParticles dark />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Contact Info */}
            <RevealOnScroll direction="left" className="lg:col-span-2">
              <h2 className="text-2xl font-heading mb-8 text-white">Contact Info</h2>
              
              <div className="space-y-6 mb-12">
                {[
                  { icon: Mail, title: 'Email', content: 'admin@personalisedposing.com.au', link: 'mailto:admin@personalisedposing.com.au' },
                  { icon: MapPin, title: 'Location', content: 'Brisbane, Australia & Online Worldwide' },
                  { icon: Clock, title: 'Response Time', content: 'Within 24-48 hours' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <GlowingIcon icon={item.icon} />
                    <div>
                      <h3 className="font-semibold mb-1 text-white">{item.title}</h3>
                      {item.link ? (
                        <a href={item.link} className="text-brand-purple hover:underline">{item.content}</a>
                      ) : (
                        <p className="text-white/70">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <h3 className="font-semibold mb-4 text-white">Follow Along</h3>
              <div className="flex items-center gap-4 mb-12">
                <a 
                  href="https://instagram.com/personalisedposing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-brand-purple/20 hover:border-brand-purple/50 transition-all hover:scale-110 text-white/70 hover:text-brand-purple"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/personalisedposing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-brand-purple/20 hover:border-brand-purple/50 transition-all hover:scale-110 text-white/70 hover:text-brand-purple"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>

              {/* Quick FAQs - Accordion */}
              <h3 className="font-semibold mb-4 text-white">Quick Answers</h3>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div key={index} className="glass-card-dark overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <h4 className="font-medium text-sm text-white pr-4">{faq.question}</h4>
                      <ChevronDown 
                        className={`w-4 h-4 text-brand-purple flex-shrink-0 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: openFaqIndex === index ? 'auto' : 0,
                        opacity: openFaqIndex === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-white/60 text-sm">
                        {faq.answer}
                        {faq.link && (
                          <> <Link to={faq.link.to} className="text-brand-purple hover:underline">{faq.link.text}</Link></>
                        )}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Contact Form - Dark */}
            <RevealOnScroll direction="right" delay={0.2} className="lg:col-span-3">
              <div className="glass-card-dark p-8 md:p-12">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-brand-purple" />
                    </div>
                    <h2 className="text-2xl font-heading mb-4 text-white">Message Sent!</h2>
                    <p className="text-white/70 mb-6">I'll get back to you within 24-48 hours.</p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormState({ name: '', email: '', phone: '', federation: '', category: '', showDate: '', message: '' })
                      }}
                      className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-heading mb-2 text-white">Send a Message</h2>
                    <p className="text-white/60 mb-8">Fill out the form below and I'll be in touch soon.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Show Date</label>
                          <input
                            type="date"
                            name="showDate"
                            value={formState.showDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Federation</label>
                          <select
                            name="federation"
                            value={formState.federation}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                          >
                            <option value="" className="bg-[#1a1a1a]">Select Federation</option>
                            <option value="ICN" className="bg-[#1a1a1a]">ICN</option>
                            <option value="NBA" className="bg-[#1a1a1a]">NBA</option>
                            <option value="IFBB/NPC" className="bg-[#1a1a1a]">IFBB/NPC</option>
                            <option value="FMG" className="bg-[#1a1a1a]">FMG</option>
                            <option value="OCB" className="bg-[#1a1a1a]">OCB</option>
                            <option value="ANB" className="bg-[#1a1a1a]">ANB</option>
                            <option value="INBA" className="bg-[#1a1a1a]">INBA</option>
                            <option value="WNBF" className="bg-[#1a1a1a]">WNBF</option>
                            <option value="unsure" className="bg-[#1a1a1a]">Not Sure Yet</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Category</label>
                          <select
                            name="category"
                            value={formState.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                          >
                            <option value="" className="bg-[#1a1a1a]">Select Category</option>
                            <option value="Bikini" className="bg-[#1a1a1a]">Bikini</option>
                            <option value="Wellness" className="bg-[#1a1a1a]">Wellness</option>
                            <option value="Figure" className="bg-[#1a1a1a]">Figure</option>
                            <option value="Swimsuit" className="bg-[#1a1a1a]">Swimsuit</option>
                            <option value="Sports Model" className="bg-[#1a1a1a]">Sports Model</option>
                            <option value="Fitness" className="bg-[#1a1a1a]">Fitness</option>
                            <option value="unsure" className="bg-[#1a1a1a]">Not Sure Yet</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Message *</label>
                        <textarea
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Tell me about yourself and your competition goals..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all resize-none"
                        />
                      </div>

                      <button type="submit" className="btn-glow w-full" disabled={submitting}>
                        {submitting ? 'Sending...' : 'Send Message'}
                        {!submitting && <Send className="ml-2 w-5 h-5" />}
                      </button>
                    </form>
                  </>
                )}
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
        
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-heading text-white mb-6 text-glow-white">
              Ready to Transform Your Stage Presence?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Book a discovery call and let's discuss your competition goals.
            </p>
            <Link to="/services" className="btn-white">
              View Services
            </Link>
          </RevealOnScroll>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/20 blur-3xl rounded-full" />
      </section>
    </div>
  )
}

export default Contact
