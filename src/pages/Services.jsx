import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, X, Clock, Calendar, Users, Star, AlertTriangle, Info, Sparkles } from 'lucide-react'

const heroImage = '/images/marketing-shoot/05102025_GeorgiaVoice_High-768.jpg'
const ongoingImage = '/images/marketing-shoot/05102025_GeorgiaVoice_High-931.jpg'
const casualImage = '/images/marketing-shoot/05102025_GeorgiaVoice_High-683.jpg'

// Scroll reveal wrapper
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

// Floating particles for dark sections
function FloatingParticles({ dark = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
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

function Services() {
  return (
    <div className="overflow-hidden bg-[#0a0a0a]">
      {/* Hero Section - Dark with background image */}
      <section className="relative min-h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Georgia coaching"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>
        
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 lg:px-16 xl:px-20 pt-32 lg:pt-36 min-h-[70vh] flex items-center">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="badge-dark mb-6">
                <Sparkles className="w-4 h-4" />
                Services & Offerings
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6"
            >
              Which Path Is <span className="text-brand-purple text-glow">Right For You?</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/80 max-w-lg leading-relaxed"
            >
              Whether you're preparing for your first show or refining your stage presence, I have a service to support your journey.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Service Comparison - Dark */}
      <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
        <FloatingParticles dark />
        <div className="max-w-6xl mx-auto relative z-10">
          <RevealOnScroll className="text-center mb-12">
            <span className="badge-dark mb-4">
              1:1 Posing Coaching
            </span>
            <h2 className="text-3xl md:text-4xl font-heading mb-4 text-white">
              Ongoing vs <span className="text-brand-purple text-glow">Casual Coaching</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Not sure which is right for you? Here's the breakdown.
            </p>
          </RevealOnScroll>

          {/* Comparison Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* Ongoing Coaching - Featured */}
            <RevealOnScroll direction="left" delay={0.1}>
              <div className="relative bento-card-dark-featured overflow-hidden h-full">
                <div className="absolute top-4 right-4 bg-white/20 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Recommended
                </div>
                
                <div className="h-48 relative overflow-hidden rounded-2xl mb-6 -mx-8 -mt-8 px-8 pt-8">
                  <img 
                    src={ongoingImage}
                    alt="Ongoing Coaching"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-purple to-transparent" />
                  <h3 className="absolute bottom-4 left-8 text-3xl font-heading text-white text-glow-white">Ongoing Coaching</h3>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  A structured 12-lesson posing program with full support throughout your competition prep. The complete experience for serious competitors.
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {[
                      '12 x 45-minute personalised posing lessons',
                      'Exclusive Client Portal access',
                      'Posing check-in submissions between lessons',
                      'Direct coach support via Telegram',
                      'Client Resource Centre (mobility, breathwork, guides)',
                      'Community support & connection',
                      'VIP discounts on workshops & extras',
                      'Competition day support (location dependent)',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/80">
                        <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Best For:</h4>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>✓ First-time competitors</li>
                    <li>✓ Athletes in prep needing structured support</li>
                    <li>✓ Anyone wanting to build a solid posing foundation</li>
                    <li>✓ Multiple federation/category preparation</li>
                  </ul>
                </div>

                <div className="bg-black/30 backdrop-blur rounded-xl p-4 mb-6 border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Payment Options:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-white">Pay Upfront</span>
                        <span className="ml-2 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">+ Free Bikini</span>
                      </div>
                      <span className="font-heading text-white text-lg">$1,320</span>
                    </div>
                    <div className="flex justify-between items-center text-white/70">
                      <span>12-Week Plan</span>
                      <span>$110/week</span>
                    </div>
                    <div className="flex justify-between items-center text-white/70">
                      <span>24-Week Plan</span>
                      <span>$60/week</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-3">Effective rate: $110/lesson (save $20/lesson vs Casual)</p>
                </div>

                <Link to="/signup?service=ongoing" className="btn-white w-full">
                  Start Ongoing Coaching
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </RevealOnScroll>

            {/* Casual Coaching - Dark */}
            <RevealOnScroll direction="right" delay={0.2}>
              <div className="bento-card-dark overflow-hidden h-full">
                <div className="h-48 relative overflow-hidden rounded-2xl mb-6 -mx-8 -mt-8 px-8 pt-8">
                  <img 
                    src={casualImage}
                    alt="Casual Coaching"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30" />
                  <h3 className="absolute bottom-4 left-8 text-3xl font-heading text-white">Casual Coaching</h3>
                </div>
                
                <p className="text-white/70 mb-6 leading-relaxed">
                  A single 45-minute posing lesson for quick guidance, tune-ups, or a fresh perspective on your posing.
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-brand-purple mt-0.5 flex-shrink-0" />
                      1 x 45-minute personalised posing lesson
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-brand-purple mt-0.5 flex-shrink-0" />
                      Take-home recap video
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-brand-purple mt-0.5 flex-shrink-0" />
                      Federation-specific guidance
                    </li>
                  </ul>
                  <ul className="space-y-2 mt-3 opacity-50">
                    {[
                      'No portal access',
                      'No check-in submissions',
                      'No ongoing coach support',
                      'No community access',
                      'No VIP discounts',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/60">
                        <X className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Best For:</h4>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>✓ Off-season maintenance</li>
                    <li>✓ Experienced athletes wanting fresh feedback</li>
                    <li>✓ Quick tune-up before a show</li>
                  </ul>
                </div>

                <div className="bg-amber-900/30 border border-amber-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-200 font-medium">Not recommended for first-time competitors in prep</p>
                      <p className="text-xs text-amber-300/70 mt-1">One session won't build the muscle memory and confidence you need.</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Single Session</span>
                    <span className="font-heading text-2xl text-brand-purple">$130</span>
                  </div>
                </div>

                <Link to="/signup?service=casual" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center w-full">
                  Book Casual Session
                </Link>
              </div>
            </RevealOnScroll>
          </div>

          {/* Comparison Table - Dark */}
          <RevealOnScroll delay={0.3}>
            <div className="glass-card-dark p-8">
              <h3 className="text-xl font-heading text-white mb-6 text-center">Quick Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 text-white/60 font-normal"></th>
                      <th className="text-center py-3 px-4 font-heading text-white/80">Casual</th>
                      <th className="text-center py-3 px-4 font-heading text-brand-purple bg-brand-purple/10 rounded-t-lg">Ongoing ⭐</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { feature: 'Sessions', casual: '1', ongoing: '12' },
                      { feature: 'Per-lesson cost', casual: '$130', ongoing: '$110' },
                      { feature: 'Client Portal', casual: false, ongoing: true },
                      { feature: 'Check-in submissions', casual: false, ongoing: true },
                      { feature: 'Coach support', casual: false, ongoing: true },
                      { feature: 'Resource Centre', casual: false, ongoing: true },
                      { feature: 'Community access', casual: false, ongoing: true },
                      { feature: 'VIP discounts', casual: false, ongoing: true },
                      { feature: 'Comp day support', casual: false, ongoing: true },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-white/5">
                        <td className="py-3 pr-4 text-white/60">{row.feature}</td>
                        <td className="text-center py-3 px-4">
                          {typeof row.casual === 'boolean' ? (
                            row.casual ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-white/20 mx-auto" />
                          ) : (
                            <span className="text-white/80">{row.casual}</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4 bg-brand-purple/10">
                          {typeof row.ongoing === 'boolean' ? (
                            row.ongoing ? <Check className="w-5 h-5 text-brand-purple mx-auto" /> : <X className="w-5 h-5 text-white/20 mx-auto" />
                          ) : (
                            <span className="text-brand-purple font-medium">{row.ongoing}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Before You Sign Up - Dark */}
      <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
        <FloatingParticles dark />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <span className="badge-dark mb-4">
              Important Information
            </span>
            <h2 className="text-3xl md:text-4xl font-heading mb-4 text-white">
              Before You Sign Up for <span className="text-brand-purple text-glow">Ongoing Coaching</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Ongoing Coaching is a structured, committed program. Please read this carefully before signing up.
            </p>
          </RevealOnScroll>

          <div className="space-y-6">
            {[
              {
                icon: Calendar,
                title: 'Plan Ahead & Book All 12 Lessons Upfront',
                content: 'You will be asked to book all 12 lessons at sign-up. This ensures consistency, a solid routine, less stress during prep, and secured availability.',
                items: ['Consistency in your posing development', 'A solid routine as part of your overall prep', 'Less stress and decision fatigue as prep deepens', 'Secured availability — your times are locked in'],
              },
              {
                icon: Info,
                title: '12 Lessons is the Minimum',
                content: 'On average, my clients complete 16-20+ lessons before stepping on stage for their first show. Plan for more — not less. You\'ll also want buffer time for life circumstances.',
              },
              {
                icon: Clock,
                title: 'When to Start',
                timing: [
                  { weeks: '30+ weeks', desc: 'Best for multiple federations/categories' },
                  { weeks: '24+ weeks', desc: 'Ideal for 1 federation' },
                  { weeks: '16-24 weeks', desc: 'Sign up ASAP' },
                  { weeks: '16 weeks', desc: 'Hard cutoff — must complete 12 lessons before show day', warning: true },
                ],
              },
              {
                icon: Users,
                title: 'Shift Workers & Variable Schedules',
                content: 'If your roster changes regularly, you\'ll need to plan accordingly. Book as far ahead as your roster allows. The expectation remains: all 12 lessons completed before your first show.',
              },
            ].map((item, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="glass-card-dark p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <GlowingIcon icon={item.icon} />
                    <div>
                      <h3 className="text-xl font-heading text-white mb-3">{item.title}</h3>
                      {item.content && <p className="text-white/70 mb-4">{item.content}</p>}
                      {item.items && (
                        <ul className="space-y-2 text-white/70">
                          {item.items.map((listItem, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-brand-purple mt-1 flex-shrink-0" />
                              <span>{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.timing && (
                        <div className="space-y-3">
                          {item.timing.map((t, i) => (
                            <div key={i} className={`flex items-center gap-3 ${t.warning ? 'text-amber-400' : ''}`}>
                              <span className={`w-24 text-sm font-medium ${t.warning ? 'text-amber-400' : 'text-white'}`}>{t.weeks}</span>
                              <span className={t.warning ? 'font-medium' : 'text-white/70'}>{t.desc}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}

            {/* Warning Card - Dark */}
            <RevealOnScroll delay={0.4}>
              <div className="bg-amber-900/30 border border-amber-500/30 rounded-3xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-amber-200 mb-3">This is a Commitment</h3>
                    <p className="text-amber-300/80">
                      Once you activate your payment plan, it is <strong className="text-amber-200">non-refundable</strong>. Make sure you're ready — financially, schedule-wise, and mentally — before signing up.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.5} className="text-center mt-12">
            <Link to="/signup?service=ongoing" className="btn-glow">
              I'm Ready — Start Ongoing Coaching
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </RevealOnScroll>
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
              Ready to Transform Your Stage Presence?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you choose Ongoing Coaching for the full experience or a Casual session for quick guidance, I'm here to help you own the stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup?service=ongoing" className="btn-white group">
                Start Ongoing Coaching
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/quiz" className="border-2 border-white text-white px-6 py-4 rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center">
                Not Sure? Take the Quiz
              </Link>
            </div>
          </RevealOnScroll>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/20 blur-3xl rounded-full" />
      </section>
    </div>
  )
}

export default Services
