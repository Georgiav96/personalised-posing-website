import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, Circle, CreditCard, Calendar, FileText, Mail, ArrowRight, ArrowLeft, Check, AlertTriangle, Gift } from 'lucide-react'

const SignUp = () => {
  const [searchParams] = useSearchParams()
  const [service, setService] = useState(searchParams.get('service') || null)
  const [step, setStep] = useState(service ? 1 : 0)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    instagram: '',
    returnClient: '',
    heardFrom: '',
    prepCoach: '',
    federations: '',
    categories: '',
    firstShowDate: '',
    weeksOut: '',
    additionalShows: '',
    prepStage: '',
    previousPosingCoach: '',
    injuries: '',
    mobilityRestrictions: '',
    currentChallenges: '',
    goals: '',
    sessionFormat: '',
    emergencyName: '',
    emergencyEmail: '',
    emergencyPhone: '',
    emergencyRelationship: '',
    acceptTerms: false,
    acceptPaymentTerms: false
  })

  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) {
      setService(serviceParam)
      setStep(1)
    }
  }, [searchParams])

  const ongoingPlans = [
    {
      id: 'upfront',
      name: 'Pay Upfront',
      price: '$1,320',
      period: 'one-time',
      weeklyEquiv: '$110/lesson',
      description: 'Best value — includes FREE Personalised Posing bikini',
      bonus: true
    },
    {
      id: '12week',
      name: '12-Week Plan',
      price: '$110',
      period: '/week',
      total: '$1,320 total',
      description: '12 weekly payments via direct debit',
      popular: true
    },
    {
      id: '24week',
      name: '24-Week Plan',
      price: '$60',
      period: '/week',
      total: '$1,440 total',
      description: '24 weekly payments — most flexible'
    }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handlePayment = () => {
    // TODO: Integrate with Stripe
    // For now, proceed to form
    setStep(3)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // TODO: Save form data
    setStep(4)
  }

  const handleBookingComplete = () => {
    setStep(5)
  }

  const stepLabels = service === 'ongoing' 
    ? ['Service', 'Payment Plan', 'Checkout', 'Onboarding', 'Book Lessons', 'Welcome']
    : ['Service', 'Checkout', 'Onboarding', 'Book Lesson', 'Welcome']

  const currentStepIndex = step

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-brand-dark focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
  const labelClass = "block text-sm font-medium text-brand-black mb-1"

  return (
    <div className="pt-28 lg:pt-20 min-h-screen relative">
      {/* Background Image with Dark Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/payment-bg.jpg`}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="relative z-10">
      {/* Hero */}
      <section className="py-12 bg-brand-purple text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading mb-4">
            {service === 'ongoing' ? 'Start Ongoing Coaching' : service === 'casual' ? 'Book Casual Session' : 'Choose Your Service'}
          </h1>
          <p className="text-lg text-white/90">
            {service === 'ongoing' && 'Your structured 12-lesson posing journey starts here'}
            {service === 'casual' && 'Book your one-off posing session'}
            {!service && 'Select the right coaching option for your goals'}
          </p>
        </div>
      </section>

      {/* Progress Indicator */}
      {step > 0 && step < 5 && (
        <div className="bg-brand-cream py-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between text-sm">
              {(service === 'ongoing' ? [1, 2, 3, 4] : [1, 2, 3]).map((s, idx) => (
                <div key={s} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step > s ? 'bg-brand-purple text-white' : 
                    step === s ? 'bg-brand-purple text-white' : 
                    'bg-white text-brand-gray border border-gray-200'
                  }`}>
                    {step > s ? <Check size={16} /> : s}
                  </div>
                  {idx < (service === 'ongoing' ? 3 : 2) && (
                    <div className={`w-12 md:w-24 h-0.5 mx-2 ${step > s ? 'bg-brand-purple' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">

          {/* Step 0: Choose Service */}
          {step === 0 && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-heading text-brand-black mb-4">
                  Which Service Is Right For You?
                </h2>
                <p className="text-brand-gray">
                  Not sure? <Link to="/services" className="text-brand-purple hover:underline">Compare services in detail</Link> or <Link to="/quiz" className="text-brand-purple hover:underline">take our quiz</Link>.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Ongoing Coaching */}
                <div 
                  onClick={() => { setService('ongoing'); setStep(1); }}
                  className="relative p-6 rounded-2xl border-2 border-brand-purple bg-white cursor-pointer hover:shadow-lg transition-all"
                >
                  <span className="absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple text-white">
                    Recommended
                  </span>
                  <h3 className="text-xl font-heading text-brand-black mb-2">Ongoing Coaching</h3>
                  <p className="text-brand-gray text-sm mb-4">12 lessons + full support throughout your prep</p>
                  <div className="text-brand-purple font-heading text-2xl mb-4">From $60/week</div>
                  <ul className="space-y-2 text-sm text-brand-gray mb-4">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-purple" /> 12 x 45-min lessons</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-purple" /> Client Portal access</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-purple" /> Coach support & check-ins</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-purple" /> Community & resources</li>
                  </ul>
                  <div className="text-brand-purple font-medium">Select Ongoing →</div>
                </div>

                {/* Casual Coaching */}
                <div 
                  onClick={() => { setService('casual'); setStep(1); }}
                  className="p-6 rounded-2xl border border-gray-200 bg-white cursor-pointer hover:border-brand-purple hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-heading text-brand-black mb-2">Casual Coaching</h3>
                  <p className="text-brand-gray text-sm mb-4">Single session for tune-ups or fresh feedback</p>
                  <div className="text-brand-black font-heading text-2xl mb-4">$130</div>
                  <ul className="space-y-2 text-sm text-brand-gray mb-4">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-purple" /> 1 x 45-min lesson</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-purple" /> Take-home recap video</li>
                  </ul>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 mb-4">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    Not recommended for first-time competitors in prep
                  </div>
                  <div className="text-brand-gray font-medium">Select Casual →</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Payment Plan Selection (Ongoing) or Checkout Info (Casual) */}
          {step === 1 && service === 'ongoing' && (
            <div>
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-lavender text-brand-purple text-sm font-medium mb-4">
                  <CreditCard size={16} className="mr-2" /> Step 1 of 4
                </div>
                <h2 className="text-3xl font-heading text-brand-black">
                  Choose Your Payment Plan
                </h2>
                <p className="text-brand-gray mt-2">All plans include the same 12-lesson experience</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {ongoingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative p-6 rounded-2xl cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? 'bg-brand-purple text-white ring-4 ring-brand-purple/30'
                        : 'bg-white border border-gray-200 hover:border-brand-purple'
                    }`}
                  >
                    {plan.popular && (
                      <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedPlan === plan.id ? 'bg-white text-brand-purple' : 'bg-brand-purple text-white'
                      }`}>
                        Most Popular
                      </span>
                    )}
                    {plan.bonus && (
                      <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        selectedPlan === plan.id ? 'bg-white text-brand-purple' : 'bg-green-500 text-white'
                      }`}>
                        <Gift size={12} /> Free Bikini
                      </span>
                    )}
                    <div className="text-center">
                      <h3 className={`text-lg font-semibold mb-2 ${selectedPlan === plan.id ? 'text-white' : 'text-brand-black'}`}>
                        {plan.name}
                      </h3>
                      <div className="mb-2">
                        <span className="text-3xl font-heading">{plan.price}</span>
                        <span className={`text-sm ${selectedPlan === plan.id ? 'text-white/80' : 'text-brand-gray'}`}>
                          {plan.period}
                        </span>
                      </div>
                      {plan.total && (
                        <p className={`text-xs mb-2 ${selectedPlan === plan.id ? 'text-white/70' : 'text-brand-gray'}`}>
                          {plan.total}
                        </p>
                      )}
                      <p className={`text-sm ${selectedPlan === plan.id ? 'text-white/80' : 'text-brand-gray'}`}>
                        {plan.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-center">
                      {selectedPlan === plan.id ? (
                        <CheckCircle className="text-white" size={24} />
                      ) : (
                        <Circle className="text-gray-300" size={24} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* What's Included Reminder */}
              <div className="bg-brand-cream p-6 rounded-xl mb-8">
                <h4 className="font-semibold mb-3 text-brand-black">All Plans Include:</h4>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-brand-gray">
                  <li className="flex items-center"><Check size={16} className="text-brand-purple mr-2" /> 12 x 45-minute lessons</li>
                  <li className="flex items-center"><Check size={16} className="text-brand-purple mr-2" /> Exclusive Client Portal</li>
                  <li className="flex items-center"><Check size={16} className="text-brand-purple mr-2" /> Posing check-in submissions</li>
                  <li className="flex items-center"><Check size={16} className="text-brand-purple mr-2" /> Direct coach support</li>
                  <li className="flex items-center"><Check size={16} className="text-brand-purple mr-2" /> Client Resource Centre</li>
                  <li className="flex items-center"><Check size={16} className="text-brand-purple mr-2" /> Community access</li>
                  <li className="flex items-center"><Check size={16} className="text-brand-purple mr-2" /> VIP discounts</li>
                  <li className="flex items-center"><Check size={16} className="text-brand-purple mr-2" /> Competition day support</li>
                </ul>
              </div>

              {/* Important Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Before you continue:</p>
                    <p>By proceeding, you understand that this is a committed, non-refundable program. You will be required to book all 12 lessons at sign-up. Make sure you've read the <Link to="/services#before-you-sign-up" className="underline">prerequisites</Link>.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => { setService(null); setStep(0); }}
                  className="px-6 py-4 rounded-full font-semibold border border-gray-200 text-brand-gray hover:bg-gray-50 flex items-center"
                >
                  <ArrowLeft className="mr-2" size={20} /> Back
                </button>
                <button
                  onClick={() => selectedPlan && setStep(2)}
                  disabled={!selectedPlan}
                  className={`flex-1 py-4 rounded-full font-semibold flex items-center justify-center ${
                    selectedPlan
                      ? 'btn-primary'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue to Checkout <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 1 for Casual: Direct to checkout */}
          {step === 1 && service === 'casual' && (
            <div>
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-lavender text-brand-purple text-sm font-medium mb-4">
                  <CreditCard size={16} className="mr-2" /> Step 1 of 3
                </div>
                <h2 className="text-3xl font-heading text-brand-black">
                  Casual Coaching Session
                </h2>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-heading text-brand-black mb-2">1 x 45-Minute Posing Lesson</h3>
                  <div className="text-4xl font-heading text-brand-purple">$130</div>
                </div>
                <ul className="space-y-2 text-brand-gray max-w-md mx-auto">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-purple" /> Personalised posing guidance</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-purple" /> Federation-specific coaching</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-purple" /> Take-home recap video</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-purple" /> Online or in-person options</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">First-time competitor in prep?</p>
                    <p>Casual Coaching may not provide enough time to build the muscle memory and confidence you need. <Link to="/signup?service=ongoing" className="underline font-medium">Consider Ongoing Coaching instead</Link>.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => { setService(null); setStep(0); }}
                  className="px-6 py-4 rounded-full font-semibold border border-gray-200 text-brand-gray hover:bg-gray-50 flex items-center"
                >
                  <ArrowLeft className="mr-2" size={20} /> Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 rounded-full font-semibold btn-primary flex items-center justify-center"
                >
                  Continue to Checkout <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Stripe Checkout (placeholder) */}
          {step === 2 && (
            <div>
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-lavender text-brand-purple text-sm font-medium mb-4">
                  <CreditCard size={16} className="mr-2" /> Step {service === 'ongoing' ? '2 of 4' : '2 of 3'}
                </div>
                <h2 className="text-3xl font-heading text-brand-black">
                  Secure Checkout
                </h2>
              </div>

              <div className="bg-brand-cream rounded-2xl p-8 mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-heading text-brand-black mb-2">
                    {service === 'ongoing' ? 'Ongoing Coaching' : 'Casual Coaching'}
                  </h3>
                  {service === 'ongoing' && selectedPlan && (
                    <p className="text-brand-gray">
                      {selectedPlan === 'upfront' && 'Pay Upfront — $1,320'}
                      {selectedPlan === '12week' && '12-Week Plan — $110/week'}
                      {selectedPlan === '24week' && '24-Week Plan — $60/week'}
                    </p>
                  )}
                  {service === 'casual' && (
                    <p className="text-brand-gray">Single Session — $130</p>
                  )}
                </div>

                {/* Stripe Checkout Placeholder */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-center text-brand-gray mb-4">
                    Stripe checkout will be embedded here
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Card Number</label>
                      <input type="text" placeholder="4242 4242 4242 4242" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Expiry</label>
                        <input type="text" placeholder="MM/YY" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>CVC</label>
                        <input type="text" placeholder="123" className={inputClass} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-xs text-brand-gray text-center">
                  <p>By completing this payment, you agree to our Terms & Conditions.</p>
                  <p>All payments are non-refundable, non-transferable, and non-exchangeable.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 rounded-full font-semibold border border-gray-200 text-brand-gray hover:bg-gray-50 flex items-center"
                >
                  <ArrowLeft className="mr-2" size={20} /> Back
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 py-4 rounded-full font-semibold btn-primary flex items-center justify-center"
                >
                  Complete Payment <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Onboarding Form */}
          {step === 3 && (
            <div>
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-lavender text-brand-purple text-sm font-medium mb-4">
                  <FileText size={16} className="mr-2" /> Step {service === 'ongoing' ? '3 of 4' : '3 of 3'}
                </div>
                <h2 className="text-3xl font-heading text-brand-black">
                  Complete Your Onboarding
                </h2>
                <p className="text-brand-gray mt-2">Client intake form + Terms & Conditions</p>
              </div>

              <form onSubmit={handleFormSubmit}>
                {/* Client Details */}
                <div className="bg-brand-cream p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-brand-black">Client Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Instagram Handle</label>
                      <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className={inputClass} placeholder="@" />
                    </div>
                    <div>
                      <label className={labelClass}>Are You a Return Client? *</label>
                      <select name="returnClient" value={formData.returnClient} onChange={handleChange} required className={inputClass}>
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Where Did You Hear About Us?</label>
                      <input type="text" name="heardFrom" value={formData.heardFrom} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Competition Info */}
                <div className="bg-brand-cream p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-brand-black">Competition Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Prep Coach</label>
                      <input type="text" name="prepCoach" value={formData.prepCoach} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Federation(s) *</label>
                      <input type="text" name="federations" value={formData.federations} onChange={handleChange} required className={inputClass} placeholder="e.g., ICN, NBA" />
                    </div>
                    <div>
                      <label className={labelClass}>Category/Categories *</label>
                      <input type="text" name="categories" value={formData.categories} onChange={handleChange} required className={inputClass} placeholder="e.g., Bikini, Wellness" />
                    </div>
                    <div>
                      <label className={labelClass}>First Show Date</label>
                      <input type="date" name="firstShowDate" value={formData.firstShowDate} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Stage of Prep *</label>
                      <select name="prepStage" value={formData.prepStage} onChange={handleChange} required className={inputClass}>
                        <option value="">Select...</option>
                        <option value="off-season">Off-season</option>
                        <option value="pre-prep">Pre-prep</option>
                        <option value="in-prep">In prep</option>
                        <option value="peak-week">Peak week</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Previous Posing Coach?</label>
                      <select name="previousPosingCoach" value={formData.previousPosingCoach} onChange={handleChange} className={inputClass}>
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Health */}
                <div className="bg-brand-cream p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-brand-black">Health & Body Awareness</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Current or Previous Injuries</label>
                      <textarea name="injuries" value={formData.injuries} onChange={handleChange} className={inputClass} rows={3} placeholder="List any injuries or mark N/A" />
                    </div>
                    <div>
                      <label className={labelClass}>Mobility Restrictions</label>
                      <textarea name="mobilityRestrictions" value={formData.mobilityRestrictions} onChange={handleChange} className={inputClass} rows={2} placeholder="Any mobility concerns we should know about?" />
                    </div>
                  </div>
                </div>

                {/* Posing Focus */}
                <div className="bg-brand-cream p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-brand-black">Posing Focus</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>What are you currently feeling most unsure or stuck with when it comes to your posing?</label>
                      <textarea name="currentChallenges" value={formData.currentChallenges} onChange={handleChange} className={inputClass} rows={3} />
                    </div>
                    <div>
                      <label className={labelClass}>What are you hoping to get out of posing coaching?</label>
                      <textarea name="goals" value={formData.goals} onChange={handleChange} className={inputClass} rows={3} />
                    </div>
                    <div>
                      <label className={labelClass}>Preferred Session Format *</label>
                      <select name="sessionFormat" value={formData.sessionFormat} onChange={handleChange} required className={inputClass}>
                        <option value="">Select...</option>
                        <option value="online">Online (Google Meet)</option>
                        <option value="in-person">In-Person (Brisbane)</option>
                        <option value="mix">Mix of both</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-brand-cream p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-brand-black">Emergency Contact</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input type="email" name="emergencyEmail" value={formData.emergencyEmail} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Relationship *</label>
                      <input type="text" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} required className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="bg-brand-cream p-6 rounded-xl mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-brand-black">Terms & Conditions</h3>
                  <div className="bg-white rounded-lg p-4 max-h-48 overflow-y-auto text-sm text-brand-gray mb-4 border border-gray-200">
                    <p className="mb-2"><strong>1. Coaching Service Overview</strong></p>
                    <p className="mb-2">{service === 'ongoing' ? 'Ongoing Coaching includes 12 x 45-minute personalised posing lessons delivered online or in person, with full client portal access and support.' : 'Casual Coaching is a one-off, 45-minute personalised posing lesson delivered online or in person.'}</p>
                    <p className="mb-2"><strong>2. Payment & Refund Policy</strong></p>
                    <p className="mb-2">All services are non-refundable, non-transferable, and non-exchangeable. Full payment or payment plan activation is required at the time of booking.</p>
                    <p className="mb-2"><strong>3. Rescheduling Policy</strong></p>
                    <p className="mb-2">Reschedule requests must be made at least 24 hours in advance. Lessons cancelled or rescheduled with less than 24 hours' notice will be forfeited.</p>
                    <p className="mb-2"><strong>4. Health & Safety</strong></p>
                    <p>Participation in posing coaching is voluntary and undertaken at the client's own risk. Clients confirm they are over 18 years of age and medically fit to participate.</p>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="acceptTerms" 
                      checked={formData.acceptTerms} 
                      onChange={handleChange}
                      required
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-purple focus:ring-brand-purple"
                    />
                    <span className="text-sm text-brand-gray">
                      I have read and agree to the Terms & Conditions, including the non-refundable payment policy and rescheduling terms.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-semibold btn-primary flex items-center justify-center"
                >
                  Continue to Book {service === 'ongoing' ? 'Your 12 Lessons' : 'Your Lesson'} <ArrowRight className="ml-2" size={20} />
                </button>
              </form>
            </div>
          )}

          {/* Step 4: Book Lessons */}
          {step === 4 && (
            <div>
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-lavender text-brand-purple text-sm font-medium mb-4">
                  <Calendar size={16} className="mr-2" /> {service === 'ongoing' ? 'Step 4 of 4' : 'Final Step'}
                </div>
                <h2 className="text-3xl font-heading text-brand-black">
                  {service === 'ongoing' ? 'Book Your 12 Lessons' : 'Book Your Lesson'}
                </h2>
                {service === 'ongoing' && (
                  <p className="text-brand-gray mt-2">Select your preferred dates and times for all 12 sessions</p>
                )}
              </div>

              <div className="bg-brand-cream rounded-2xl p-8 mb-8">
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                  <p className="text-brand-gray mb-6">
                    Booking calendar will be embedded here (Cal.com integration)
                  </p>
                  {service === 'ongoing' && (
                    <div className="bg-white rounded-lg p-4 text-sm text-brand-gray max-w-md mx-auto">
                      <p className="font-medium text-brand-black mb-2">Remember:</p>
                      <ul className="text-left space-y-1">
                        <li>• Book all 12 lessons now to secure your times</li>
                        <li>• Weekly or fortnightly frequency recommended</li>
                        <li>• Plan for buffer time (illness, schedule changes)</li>
                        <li>• You can reschedule with 24+ hours notice</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleBookingComplete}
                className="w-full py-4 rounded-full font-semibold btn-primary flex items-center justify-center"
              >
                Complete Booking <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          )}

          {/* Step 5: Welcome / Confirmation */}
          {step === 5 && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-heading text-brand-black mb-4">
                You're All Set! 🎉
              </h2>
              <p className="text-brand-gray mb-8 max-w-lg mx-auto">
                {service === 'ongoing' 
                  ? "Welcome to Ongoing Coaching! Your 12 lessons are booked and you're officially part of the Personalised Posing family."
                  : "Your Casual Coaching session is booked! Check your email for preparation details."
                }
              </p>

              {service === 'ongoing' && (
                <div className="bg-brand-cream rounded-2xl p-8 mb-8 text-left max-w-lg mx-auto">
                  <h3 className="font-semibold text-brand-black mb-4">What Happens Next:</h3>
                  <ol className="space-y-3 text-brand-gray">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-purple text-white text-sm flex items-center justify-center flex-shrink-0">1</span>
                      <span>Check your email for your welcome message and portal access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-purple text-white text-sm flex items-center justify-center flex-shrink-0">2</span>
                      <span>Log in to your Client Portal to explore resources</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-purple text-white text-sm flex items-center justify-center flex-shrink-0">3</span>
                      <span>Join the Telegram community (link in your welcome email)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-purple text-white text-sm flex items-center justify-center flex-shrink-0">4</span>
                      <span>Prepare for your first lesson (checklist in your email)</span>
                    </li>
                  </ol>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {service === 'ongoing' && (
                  <Link to="/portal" className="btn-primary">
                    Go to Client Portal
                  </Link>
                )}
                <Link to="/" className="btn-secondary">
                  Back to Home
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>
      </div>
    </div>
  )
}

export default SignUp
