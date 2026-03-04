import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, Calendar, Users, Zap } from 'lucide-react'

const ReadinessQuiz = () => {
  const [hasStarted, setHasStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: 'stage',
      question: "Where are you in your competition journey?",
      options: [
        { value: 'curious', label: "Just curious — exploring if competing is for me", icon: '🤔' },
        { value: 'decided', label: "I've decided to compete but haven't booked a show", icon: '✨' },
        { value: 'booked', label: "I've booked my show — it's happening!", icon: '🎯' },
        { value: 'weeks-out', label: "I'm in prep — less than 12 weeks out", icon: '🔥' },
        { value: 'experienced', label: "I've competed before and want to level up", icon: '🏆' }
      ]
    },
    {
      id: 'timeline',
      question: "When are you thinking of competing?",
      options: [
        { value: 'unsure', label: "Not sure yet — still figuring it out", icon: '❓' },
        { value: '6-plus', label: "6+ months away", icon: '📅' },
        { value: '3-6', label: "3-6 months away", icon: '⏰' },
        { value: '1-3', label: "1-3 months away", icon: '🚀' },
        { value: 'soon', label: "Less than 4 weeks!", icon: '⚡' }
      ]
    },
    {
      id: 'posing-experience',
      question: "What's your posing experience?",
      options: [
        { value: 'none', label: "I've never practiced posing", icon: '🌱' },
        { value: 'self-taught', label: "I've watched videos and practiced alone", icon: '📱' },
        { value: 'some-coaching', label: "I've had a few posing sessions before", icon: '👍' },
        { value: 'regular', label: "I practice regularly with a coach", icon: '💪' }
      ]
    },
    {
      id: 'confidence',
      question: "How confident do you feel about your stage presence?",
      options: [
        { value: 'nervous', label: "Nervous — the stage scares me a bit", icon: '😰' },
        { value: 'unsure', label: "Unsure — I don't know what to expect", icon: '🤷' },
        { value: 'okay', label: "Okay — I can get through it but want to improve", icon: '😊' },
        { value: 'confident', label: "Confident — I just need to polish my skills", icon: '💃' }
      ]
    },
    {
      id: 'support',
      question: "What kind of support are you looking for?",
      options: [
        { value: 'full-journey', label: "Full journey support — from start to stage", icon: '🌟' },
        { value: 'technique', label: "Technical posing — nailing the poses", icon: '🎯' },
        { value: 'confidence', label: "Confidence building — feeling good on stage", icon: '💜' },
        { value: 'peak-week', label: "Peak week & show day prep", icon: '👑' },
        { value: 'quick-fix', label: "Quick polish before my show", icon: '✨' }
      ]
    },
    {
      id: 'learning-style',
      question: "How do you prefer to learn?",
      options: [
        { value: 'one-on-one', label: "1:1 — personalised attention", icon: '🎯' },
        { value: 'group', label: "Group setting — learning with others", icon: '👯' },
        { value: 'online', label: "Online — flexible and remote", icon: '💻' },
        { value: 'mix', label: "A mix of everything", icon: '🔄' }
      ]
    }
  ]

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    if (step < questions.length - 1) {
      setStep(step + 1)
    }
  }

  const getRecommendation = () => {
    const { stage, timeline, confidence, support, 'learning-style': learningStyle, 'posing-experience': posingExp } = answers

    // Determine urgency
    const isUrgent = timeline === 'soon' || timeline === '1-3' || stage === 'weeks-out'
    const isNewbie = posingExp === 'none' || posingExp === 'self-taught'
    const needsConfidence = confidence === 'nervous' || confidence === 'unsure'
    
    let recommendation = {
      title: '',
      description: '',
      services: [],
      cta: '',
      ctaLink: ''
    }

    // Urgent + close to show
    if (isUrgent) {
      recommendation = {
        title: "Let's Get You Stage-Ready! 🔥",
        description: "You're close to your show — time is precious. I recommend intensive 1:1 sessions to fast-track your stage presence and make sure you feel confident and prepared.",
        services: [
          { name: '1:1 Intensive Sessions', desc: 'Focused, personalised coaching to nail your poses', icon: '🎯' },
          { name: 'Show Day Prep', desc: 'Peak week guidance and backstage support', icon: '👑' }
        ],
        cta: 'Book a Discovery Call',
        ctaLink: '/discovery-call'
      }
    }
    // New to posing, needs foundation
    else if (isNewbie && needsConfidence) {
      recommendation = {
        title: "Let's Build Your Foundation 🌱",
        description: "Starting from scratch is exciting! I recommend beginning with a discovery call so we can map out your journey together and find the right starting point for you.",
        services: [
          { name: '1:1 Foundation Sessions', desc: 'Learn the basics with personalised guidance', icon: '🌟' },
          { name: 'Workshops', desc: 'Great for building confidence in a supportive group', icon: '👯' }
        ],
        cta: 'Book a Discovery Call',
        ctaLink: '/discovery-call'
      }
    }
    // Wants group learning
    else if (learningStyle === 'group') {
      recommendation = {
        title: "Workshops Are Perfect For You! 👯",
        description: "You'll thrive in a group environment where you can learn alongside other women on the same journey. My workshops are supportive, fun, and incredibly valuable.",
        services: [
          { name: 'Posing Workshops', desc: 'Learn in a supportive group environment', icon: '✨' },
          { name: 'Community Events', desc: 'Connect with like-minded competitors', icon: '💜' }
        ],
        cta: 'View Upcoming Workshops',
        ctaLink: '/workshops'
      }
    }
    // Experienced, wants to level up
    else if (stage === 'experienced') {
      recommendation = {
        title: "Ready to Level Up! 🏆",
        description: "You've got experience under your belt — now it's about refinement. Let's work on the details that separate good from great and help you stand out on stage.",
        services: [
          { name: '1:1 Advanced Sessions', desc: 'Fine-tune your stage presence', icon: '💎' },
          { name: 'Competition Strategy', desc: 'Federation-specific coaching', icon: '🎯' }
        ],
        cta: 'Book a Discovery Call',
        ctaLink: '/discovery-call'
      }
    }
    // Default recommendation
    else {
      recommendation = {
        title: "Let's Find Your Perfect Fit! ✨",
        description: "Based on your answers, I'd love to chat and understand your goals better. A quick discovery call will help me recommend the perfect pathway for you.",
        services: [
          { name: '1:1 Coaching', desc: 'Personalised posing guidance', icon: '🎯' },
          { name: 'Workshops', desc: 'Group learning experiences', icon: '👯' },
          { name: 'Online Options', desc: 'Flexible remote coaching', icon: '💻' }
        ],
        cta: 'Book a Discovery Call',
        ctaLink: '/discovery-call'
      }
    }

    return recommendation
  }

  const progress = ((step + 1) / questions.length) * 100

  if (showResults) {
    const recommendation = getRecommendation()
    
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              Quiz Complete!
            </div>
            <h1 className="text-3xl md:text-4xl font-heading text-white mb-4">
              {recommendation.title}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              {recommendation.description}
            </p>
          </div>

          <div className="bg-white/5 border border-brand-purple/20 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-heading text-white mb-6">Recommended For You:</h3>
            <div className="space-y-4">
              {recommendation.services.map((service, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <h4 className="text-white font-semibold">{service.name}</h4>
                    <p className="text-white/60 text-sm">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={recommendation.ctaLink}
              className="btn-primary text-center"
            >
              {recommendation.cta}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/services"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all text-center"
            >
              View All Services
            </Link>
          </div>

          <p className="text-center text-white/50 text-sm mt-8">
            Not quite right? <Link to="/contact" className="text-brand-purple hover:underline">Get in touch</Link> and we'll figure it out together.
          </p>
        </div>
      </div>
    )
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            2 Minute Quiz
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-6">
            Find Your <span className="text-brand-purple">Perfect Start</span>
          </h1>
          
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Not sure where to begin? Answer a few quick questions and I'll recommend the best way for us to work together based on where you're at.
          </p>

          <button
            onClick={() => setHasStarted(true)}
            className="btn-primary text-lg"
          >
            Let's Do This
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <Calendar className="w-8 h-8 text-brand-purple mx-auto mb-2" />
              <p className="text-white/60 text-sm">Takes 2 mins</p>
            </div>
            <div className="p-4">
              <Users className="w-8 h-8 text-brand-purple mx-auto mb-2" />
              <p className="text-white/60 text-sm">Personalised results</p>
            </div>
            <div className="p-4">
              <Zap className="w-8 h-8 text-brand-purple mx-auto mb-2" />
              <p className="text-white/60 text-sm">Clear next steps</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[step]

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/50 mb-2">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-purple to-brand-purple-light transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading text-white">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
                answers[currentQuestion.id] === option.value
                  ? 'border-brand-purple bg-brand-purple/20 text-white'
                  : 'border-white/10 bg-white/5 text-white/80 hover:border-brand-purple/50 hover:bg-white/10'
              }`}
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              step === 0
                ? 'text-white/30 cursor-not-allowed'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {step === questions.length - 1 && answers[currentQuestion.id] && (
            <button
              onClick={() => setShowResults(true)}
              className="btn-primary"
            >
              See My Results
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReadinessQuiz
