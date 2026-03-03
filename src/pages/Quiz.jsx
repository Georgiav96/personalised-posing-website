import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, Mail } from 'lucide-react'

const Quiz = () => {
  const [hasStarted, setHasStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [email, setEmail] = useState('')
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: 'experience',
      question: "What's your competition experience?",
      options: [
        { value: 'first-time', label: "I've never competed before", icon: '🌱' },
        { value: 'some', label: "I've done 1-3 shows", icon: '⭐' },
        { value: 'experienced', label: "I've done 4+ shows", icon: '🏆' }
      ]
    },
    {
      id: 'physique',
      question: "How would you describe your physique goals?",
      options: [
        { value: 'soft-feminine', label: "Soft, feminine, toned — minimal muscle", icon: '🌸' },
        { value: 'athletic-balanced', label: "Athletic & balanced — moderate muscle", icon: '💪' },
        { value: 'muscular-defined', label: "Muscular & defined — noticeable development", icon: '🔥' },
        { value: 'lower-dominant', label: "Strong lower body — glutes & legs are my focus", icon: '🍑' }
      ]
    },
    {
      id: 'conditioning',
      question: "What level of conditioning are you comfortable with?",
      options: [
        { value: 'minimal', label: "Minimal — I prefer a softer, fuller look", icon: '☁️' },
        { value: 'moderate', label: "Moderate — some definition but not too lean", icon: '⚖️' },
        { value: 'lean', label: "Lean — I want visible muscle separation", icon: '🎯' },
        { value: 'very-lean', label: "Very lean — I'm willing to get stage-shredded", icon: '💎' }
      ]
    },
    {
      id: 'presentation',
      question: "What stage presentation style appeals to you?",
      options: [
        { value: 'glamorous', label: "Glamorous & elegant — heels, bikini, polished", icon: '✨' },
        { value: 'athletic', label: "Athletic & powerful — showcase strength", icon: '🏋️' },
        { value: 'artistic', label: "Artistic & expressive — routines & performance", icon: '🎭' },
        { value: 'natural', label: "Natural & drug-tested — clean competition", icon: '🌿' }
      ]
    },
    {
      id: 'location',
      question: "Where are you based?",
      options: [
        { value: 'qld', label: "Queensland", icon: '🌴' },
        { value: 'nsw', label: "New South Wales", icon: '🌊' },
        { value: 'vic', label: "Victoria", icon: '🏙️' },
        { value: 'other-aus', label: "Other Australian state", icon: '🦘' },
        { value: 'international', label: "Outside Australia", icon: '🌏' }
      ]
    },
    {
      id: 'priority',
      question: "What matters most to you in a federation?",
      options: [
        { value: 'beginner-friendly', label: "Beginner-friendly atmosphere", icon: '🤗' },
        { value: 'drug-tested', label: "Strict drug testing (natural)", icon: '✅' },
        { value: 'pathway', label: "Clear pathway to pro status", icon: '🎯' },
        { value: 'community', label: "Strong community & support", icon: '👯' },
        { value: 'prestige', label: "Prestige & recognition", icon: '👑' }
      ]
    }
  ]

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    if (step < questions.length - 1) {
      setStep(step + 1)
    }
  }

  const calculateResults = () => {
    const scores = {
      federations: {
        'ICN': 0,
        'NBA': 0,
        'FMG': 0,
        'OCB': 0,
        'ANB': 0,
        'IFBB': 0
      },
      categories: {
        'Bikini': 0,
        'Wellness': 0,
        'Sports/Fitness': 0,
        'Figure': 0
      }
    }

    // Experience scoring
    if (answers.experience === 'first-time') {
      scores.federations['ICN'] += 3
      scores.federations['NBA'] += 3
      scores.federations['ANB'] += 2
    } else if (answers.experience === 'experienced') {
      scores.federations['FMG'] += 2
      scores.federations['IFBB'] += 3
    }

    // Physique scoring
    if (answers.physique === 'soft-feminine') {
      scores.categories['Bikini'] += 4
      scores.federations['FMG'] += 2
    } else if (answers.physique === 'athletic-balanced') {
      scores.categories['Sports/Fitness'] += 3
      scores.categories['Bikini'] += 2
      scores.federations['NBA'] += 2
      scores.federations['ICN'] += 2
    } else if (answers.physique === 'muscular-defined') {
      scores.categories['Figure'] += 4
      scores.categories['Sports/Fitness'] += 2
      scores.federations['ICN'] += 2
    } else if (answers.physique === 'lower-dominant') {
      scores.categories['Wellness'] += 5
      scores.federations['NBA'] += 3
      scores.federations['ICN'] += 2
    }

    // Conditioning scoring
    if (answers.conditioning === 'minimal') {
      scores.categories['Bikini'] += 3
      scores.federations['FMG'] += 2
    } else if (answers.conditioning === 'moderate') {
      scores.categories['Bikini'] += 2
      scores.categories['Wellness'] += 2
    } else if (answers.conditioning === 'lean') {
      scores.categories['Sports/Fitness'] += 3
      scores.categories['Figure'] += 2
    } else if (answers.conditioning === 'very-lean') {
      scores.categories['Figure'] += 4
      scores.federations['IFBB'] += 2
    }

    // Presentation scoring
    if (answers.presentation === 'glamorous') {
      scores.federations['FMG'] += 3
      scores.categories['Bikini'] += 2
    } else if (answers.presentation === 'athletic') {
      scores.categories['Sports/Fitness'] += 3
      scores.categories['Figure'] += 2
      scores.federations['ICN'] += 2
    } else if (answers.presentation === 'artistic') {
      scores.categories['Sports/Fitness'] += 2
      scores.federations['NBA'] += 2
    } else if (answers.presentation === 'natural') {
      scores.federations['ICN'] += 3
      scores.federations['NBA'] += 3
      scores.federations['OCB'] += 4
      scores.federations['ANB'] += 3
    }

    // Priority scoring
    if (answers.priority === 'beginner-friendly') {
      scores.federations['ICN'] += 3
      scores.federations['NBA'] += 3
    } else if (answers.priority === 'drug-tested') {
      scores.federations['ICN'] += 3
      scores.federations['NBA'] += 3
      scores.federations['OCB'] += 4
      scores.federations['ANB'] += 3
    } else if (answers.priority === 'pathway') {
      scores.federations['FMG'] += 3
      scores.federations['IFBB'] += 3
    } else if (answers.priority === 'community') {
      scores.federations['ICN'] += 2
      scores.federations['NBA'] += 3
    } else if (answers.priority === 'prestige') {
      scores.federations['IFBB'] += 4
      scores.federations['FMG'] += 2
    }

    // Location scoring
    if (answers.location === 'qld') {
      scores.federations['NBA'] += 2
      scores.federations['ICN'] += 2
      scores.federations['FMG'] += 1
    } else if (answers.location === 'nsw' || answers.location === 'vic') {
      scores.federations['ICN'] += 2
      scores.federations['FMG'] += 2
      scores.federations['ANB'] += 1
    }

    // Sort and get top results
    const sortedFeds = Object.entries(scores.federations)
      .sort((a, b) => b[1] - a[1])
      .filter(([_, score]) => score > 0)
      .slice(0, 3)

    const sortedCats = Object.entries(scores.categories)
      .sort((a, b) => b[1] - a[1])
      .filter(([_, score]) => score > 0)
      .slice(0, 2)

    return { federations: sortedFeds, categories: sortedCats }
  }

  const handleSubmitEmail = (e) => {
    e.preventDefault()
    console.log('Quiz completed:', { email, answers, results: calculateResults() })
    setShowResults(true)
  }

  const results = calculateResults()

  const federationInfo = {
    'ICN': { 
      name: 'ICN (I Compete Natural)', 
      desc: 'Natural federation with strong QLD/national presence. Great for beginners.',
      color: 'bg-brand-lavender text-brand-purple'
    },
    'NBA': { 
      name: 'NBA (Natural Bodybuilding Australia)', 
      desc: 'Natural federation with welcoming community. Excellent Wellness division.',
      color: 'bg-brand-lavender text-brand-purple'
    },
    'FMG': { 
      name: 'FMG (Fitness Model Galaxy)', 
      desc: 'Glamorous presentation focus. Strong pathway to pro status.',
      color: 'bg-brand-lavender text-brand-purple'
    },
    'OCB': { 
      name: 'OCB (Oceania Championship Bodybuilding)', 
      desc: 'Strictly drug-tested natural federation.',
      color: 'bg-brand-lavender text-brand-purple'
    },
    'ANB': { 
      name: 'ANB (Australasian Natural Bodybuilding)', 
      desc: 'Natural federation with growing presence.',
      color: 'bg-brand-lavender text-brand-purple'
    },
    'IFBB': { 
      name: 'IFBB (International Federation)', 
      desc: 'Most prestigious international federation. Higher competition level.',
      color: 'bg-brand-lavender text-brand-purple'
    }
  }

  const categoryInfo = {
    'Bikini': 'Soft, feminine presentation. Focus on balanced proportions and stage presence.',
    'Wellness': 'Celebrates a more developed lower body (glutes, hamstrings, quads) with a smaller upper body.',
    'Sports/Fitness': 'Athletic, balanced physique with moderate muscle development.',
    'Figure': 'More muscular and defined. Showcases symmetry and muscle separation.'
  }

  const progress = ((step + 1) / questions.length) * 100

  // Email capture step
  if (step === questions.length && !showResults) {
    return (
      <div className="pt-28 lg:pt-20 min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-lavender flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-brand-purple" />
            </div>
            <h1 className="text-3xl font-heading text-brand-black mb-4">
              Your Results Are Ready!
            </h1>
            <p className="text-brand-gray">
              Enter your email to see your personalised federation & category recommendations.
            </p>
          </div>

          <form onSubmit={handleSubmitEmail} className="max-w-md mx-auto">
            <div className="mb-6">
              <label className="block text-sm font-medium text-brand-black mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white text-brand-dark focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                />
              </div>
            </div>
            <button type="submit" className="w-full btn-primary flex items-center justify-center">
              See My Results <ArrowRight className="ml-2" size={20} />
            </button>
            <p className="text-xs text-brand-gray text-center mt-4">
              We'll send your results + helpful posing tips. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    )
  }

  // Results page
  if (showResults) {
    return (
      <div className="pt-28 lg:pt-20 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-purple flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading text-brand-black mb-4">
              Your Personalised Results
            </h1>
            <p className="text-brand-gray">
              Based on your answers, here's where you could shine on stage!
            </p>
          </div>

          {/* Federation Results */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-brand-black">
              <span className="w-8 h-8 rounded-full bg-brand-purple text-white text-sm flex items-center justify-center mr-3">1</span>
              Recommended Federations
            </h2>
            <div className="space-y-4">
              {results.federations.map(([fed, score], index) => (
                <div key={fed} className={`p-6 rounded-xl border ${index === 0 ? 'border-brand-purple bg-brand-lavender' : 'border-gray-100 bg-brand-cream'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${index === 0 ? 'bg-brand-purple text-white' : 'bg-white text-brand-purple border border-brand-purple'}`}>
                        {index === 0 ? '⭐ Best Match' : `#${index + 1} Match`}
                      </span>
                      <h3 className="text-lg font-semibold text-brand-black">{federationInfo[fed]?.name || fed}</h3>
                    </div>
                  </div>
                  <p className="text-brand-gray text-sm">{federationInfo[fed]?.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category Results */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-brand-black">
              <span className="w-8 h-8 rounded-full bg-brand-purple text-white text-sm flex items-center justify-center mr-3">2</span>
              Recommended Categories
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {results.categories.map(([cat, score], index) => (
                <div key={cat} className={`p-6 rounded-xl ${index === 0 ? 'bg-brand-purple text-white' : 'bg-brand-cream border border-gray-100'}`}>
                  <p className={`text-xs font-medium mb-2 ${index === 0 ? 'text-white/80' : 'text-brand-purple'}`}>
                    {index === 0 ? '⭐ Top Pick' : 'Also Consider'}
                  </p>
                  <h3 className={`text-xl font-heading mb-2 ${index === 0 ? 'text-white' : 'text-brand-black'}`}>{cat}</h3>
                  <p className={`text-sm ${index === 0 ? 'text-white/80' : 'text-brand-gray'}`}>
                    {categoryInfo[cat]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-brand-cream p-6 rounded-xl mb-12">
            <p className="text-sm text-brand-gray">
              <strong className="text-brand-black">Note:</strong> These recommendations are based on your quiz answers and general guidance. 
              The best way to find your perfect fit is to work with a coach who can assess your individual 
              physique, goals, and circumstances. Every body is different!
            </p>
          </div>

          {/* CTA */}
          <div className="text-center bg-brand-lavender p-8 rounded-2xl">
            <h3 className="text-2xl font-heading text-brand-black mb-4">
              Ready To Take The Next Step?
            </h3>
            <p className="text-brand-gray mb-6">
              Get personalised guidance on your federation, category, and posing from someone who knows them all.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center">
              Start Your Coaching Journey <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Quiz intro screen
  if (!hasStarted) {
    return (
      <div className="pt-28 lg:pt-20 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-lavender flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-brand-purple" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading text-brand-black mb-4">
              Find Your Perfect Federation & Category
            </h1>
            <p className="text-xl text-brand-gray max-w-2xl mx-auto">
              Not sure where you fit in the bodybuilding world? Take this quick quiz to discover which federation and category might suit your physique and goals.
            </p>
          </div>

          {/* What you'll learn */}
          <div className="bg-brand-cream rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-heading text-brand-black mb-4 text-center">
              In Just 6 Questions, You'll Discover:
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                <p className="text-brand-gray">Which <strong className="text-brand-black">federations</strong> align with your experience level and goals</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <p className="text-brand-gray">Which <strong className="text-brand-black">categories</strong> suit your physique type and presentation style</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                <p className="text-brand-gray">Personalised <strong className="text-brand-black">recommendations</strong> based on your answers</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                <p className="text-brand-gray">Guidance on <strong className="text-brand-black">next steps</strong> for your competition journey</p>
              </div>
            </div>
          </div>

          {/* Time estimate */}
          <div className="text-center mb-8">
            <p className="text-brand-gray text-sm">⏱️ Takes about 2 minutes</p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button 
              onClick={() => setHasStarted(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              Start the Quiz
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-sm text-brand-gray mt-8 max-w-xl mx-auto">
            This quiz provides general guidance based on typical federation and category criteria. 
            For personalised advice tailored to your unique physique and goals, 
            consider working with a posing coach who knows all the federations.
          </p>
        </div>
      </div>
    )
  }

  // Quiz questions
  const currentQuestion = questions[step]

  return (
    <div className="pt-28 lg:pt-20 min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm text-brand-gray mb-2">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-brand-cream rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-purple transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-heading text-brand-black mb-2">
            {currentQuestion.question}
          </h1>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className={`w-full p-5 rounded-xl border-2 text-left transition-all hover:border-brand-purple hover:bg-brand-lavender ${
                answers[currentQuestion.id] === option.value
                  ? 'border-brand-purple bg-brand-lavender'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <span className="text-2xl mr-3">{option.icon}</span>
              <span className="text-brand-dark">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center text-brand-gray hover:text-brand-purple"
            >
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
          ) : (
            <div />
          )}
          
          {answers[currentQuestion.id] && step === questions.length - 1 && (
            <button
              onClick={() => setStep(questions.length)}
              className="btn-primary"
            >
              See My Results <ArrowRight className="ml-2" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz
