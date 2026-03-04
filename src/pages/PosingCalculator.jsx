import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Sparkles, ArrowRight, CheckCircle, Zap, Target, ShoppingBag, AlertTriangle } from 'lucide-react'

const PosingCalculator = () => {
  const [showDate, setShowDate] = useState('')
  const [experience, setExperience] = useState('')
  const [result, setResult] = useState(null)

  const calculateTimeline = () => {
    if (!showDate || !experience) return

    const show = new Date(showDate)
    const today = new Date()
    const diffTime = show - today
    const weeksOut = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
    const daysOut = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // Recommended start times based on experience (Georgia's guidelines)
    const recommendedWeeks = {
      'first-time': { min: 24, max: 30, label: '24-30 weeks' },
      'some': { min: 16, max: 24, label: '16-24 weeks' },
      'experienced': { min: 12, max: 16, label: '12-16 weeks' }
    }

    const idealRange = recommendedWeeks[experience]
    const idealMid = (idealRange.min + idealRange.max) / 2
    const weeksLate = idealRange.min - weeksOut
    
    let phase, phaseEmoji, phaseColor, focus, frequency, message, urgency

    if (weeksOut <= 0) {
      phase = "SHOW TIME!"
      phaseEmoji = "🏆"
      phaseColor = "text-yellow-400"
      focus = "Trust your preparation. You've got this!"
      frequency = "Light practice only — preserve energy"
      message = "It's go time! Trust your prep and shine on stage."
      urgency = "showtime"
    } else if (weeksOut <= 2) {
      phase = "Peak Week"
      phaseEmoji = "⚡"
      phaseColor = "text-red-400"
      focus = "Final polish, run-throughs, mental prep, visualisation"
      frequency = "Daily light practice (10-15 mins)"
      message = "You're in the final stretch! Focus on confidence, breathing, and visualisation."
      urgency = "peak"
    } else if (weeksOut <= 4) {
      phase = "Final Refinement"
      phaseEmoji = "💎"
      phaseColor = "text-orange-400"
      focus = "Stage presence, transitions, T-walk confidence, no-mirror practice"
      frequency = "5-6x per week (including without mirror)"
      message = "Time to polish every detail. Your posing should feel automatic now."
      urgency = "final"
    } else if (weeksOut <= 8) {
      phase = "Active Prep"
      phaseEmoji = "🔥"
      phaseColor = "text-brand-purple"
      focus = "Perfecting poses, building stamina, practising in heels, stage presence"
      frequency = "4-5x per week"
      message = "This is prime time! Consistent practice builds muscle memory."
      urgency = "active"
    } else if (weeksOut <= 12) {
      phase = "Skill Building"
      phaseEmoji = "🏗️"
      phaseColor = "text-blue-400"
      focus = "Refining poses, building confidence, heel work, transitions"
      frequency = "3-4x per week"
      message = "Great progress zone — skills are locking in!"
      urgency = "skill"
    } else if (weeksOut <= 16) {
      phase = "Foundation Building"
      phaseEmoji = "🌟"
      phaseColor = "text-cyan-400"
      focus = "Learning poses, understanding angles, building base confidence"
      frequency = "2-3x per week"
      message = "Perfect timing to build a strong foundation!"
      urgency = "foundation"
    } else if (weeksOut <= 24) {
      phase = "Early Prep"
      phaseEmoji = "🌱"
      phaseColor = "text-green-400"
      focus = "Getting familiar with your category, basic poses, posture work"
      frequency = "1-2x per week"
      message = "You're ahead of the game! Use this time to explore and learn."
      urgency = "early"
    } else {
      phase = "Planning Phase"
      phaseEmoji = "📋"
      phaseColor = "text-emerald-400"
      focus = "Research your category, watch stage footage, begin light practice"
      frequency = "1x per week (casual practice)"
      message = "Plenty of time! Start getting familiar with what's ahead."
      urgency = "planning"
    }

    // Status messages based on timing
    let statusMessage, statusEmoji, statusColor
    if (weeksLate > 12) {
      statusMessage = `Okay, real talk — ideally you would've started ${weeksLate} weeks ago 😅 But don't panic! With intensive sessions and commitment, we can absolutely get you stage-ready. Let's chat ASAP.`
      statusEmoji = "😱"
      statusColor = "bg-red-500/20 border-red-500/30"
    } else if (weeksLate > 6) {
      statusMessage = `You're about ${weeksLate} weeks behind the ideal timeline for your experience level — but this is totally workable! Focused, consistent sessions will get you there.`
      statusEmoji = "😬"
      statusColor = "bg-orange-500/20 border-orange-500/30"
    } else if (weeksLate > 0) {
      statusMessage = `You're a little behind (${weeksLate} weeks), but very manageable. Let's get you started and build momentum!`
      statusEmoji = "👀"
      statusColor = "bg-yellow-500/20 border-yellow-500/30"
    } else if (weeksOut <= idealRange.max && weeksOut >= idealRange.min) {
      statusMessage = "Perfect timing! You're right in the ideal window. Let's build something incredible together."
      statusEmoji = "✨"
      statusColor = "bg-green-500/20 border-green-500/30"
    } else {
      statusMessage = "You're ahead of schedule — amazing! We've got plenty of time to perfect every detail and build rock-solid confidence."
      statusEmoji = "🎉"
      statusColor = "bg-brand-purple/20 border-brand-purple/30"
    }

    // Key milestones
    const milestones = [
      {
        task: "Order Competition Bikini",
        idealWeeks: "8-12 weeks out",
        minWeeks: 6,
        status: weeksOut >= 8 ? 'upcoming' : weeksOut >= 6 ? 'now' : 'urgent',
        note: "Custom suits need 6-8 weeks. Order early for peace of mind!",
        emoji: "👙"
      },
      {
        task: "Buy & Break In Heels",
        idealWeeks: "8-12 weeks out",
        minWeeks: 8,
        status: weeksOut >= 10 ? 'upcoming' : weeksOut >= 6 ? 'now' : 'urgent',
        note: "Practice daily to break them in. Your feet will thank you!",
        emoji: "👠"
      },
      {
        task: "Register for Competition",
        idealWeeks: "4-8 weeks out",
        minWeeks: 2,
        status: weeksOut >= 6 ? 'upcoming' : weeksOut >= 2 ? 'now' : 'urgent',
        note: "Early bird rates usually close 4-6 weeks out. Don't miss the deadline!",
        emoji: "📝"
      },
      {
        task: "Start No-Mirror Practice",
        idealWeeks: "4-6 weeks out",
        minWeeks: 2,
        status: weeksOut >= 6 ? 'upcoming' : weeksOut >= 2 ? 'now' : 'urgent',
        note: "You won't have a mirror on stage! Build muscle memory now.",
        emoji: "🪞"
      },
      {
        task: "Final Suit Fitting",
        idealWeeks: "2-3 weeks out",
        minWeeks: 1,
        status: weeksOut >= 3 ? 'upcoming' : weeksOut >= 1 ? 'now' : 'urgent',
        note: "Check fit with your stage-ready physique. Allow time for adjustments.",
        emoji: "✂️"
      },
      {
        task: "Book Tan, Hair & Makeup",
        idealWeeks: "4-6 weeks out",
        minWeeks: 2,
        status: weeksOut >= 4 ? 'upcoming' : weeksOut >= 2 ? 'now' : 'urgent',
        note: "Good artists book out fast during comp season!",
        emoji: "💅"
      }
    ]

    setResult({
      weeksOut,
      daysOut,
      phase,
      phaseEmoji,
      phaseColor,
      focus,
      frequency,
      message,
      urgency,
      statusMessage,
      statusEmoji,
      statusColor,
      idealRange,
      weeksLate,
      milestones
    })
  }

  const getMilestoneColor = (status) => {
    switch(status) {
      case 'urgent': return 'bg-red-500/20 border-red-500/40 text-red-300'
      case 'now': return 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300'
      default: return 'bg-white/5 border-white/10 text-white/70'
    }
  }

  const getMilestoneLabel = (status) => {
    switch(status) {
      case 'urgent': return '⚠️ Do this NOW!'
      case 'now': return '👉 Time to do this'
      default: return '📅 Coming up'
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            Free Tool
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">
            When Should I Start <span className="text-brand-purple">Posing?</span>
          </h1>
          
          <p className="text-white/70 text-lg max-w-lg mx-auto">
            Enter your competition date and get your personalised timeline with key milestones.
          </p>
        </div>

        {/* Calculator Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="space-y-6">
            {/* Competition Date */}
            <div>
              <label className="block text-white font-medium mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                When is your competition?
              </label>
              <input
                type="date"
                value={showDate}
                onChange={(e) => setShowDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:border-brand-purple focus:outline-none transition-colors"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-white font-medium mb-3">
                <Sparkles className="w-4 h-4 inline mr-2" />
                What's your competition experience?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'first-time', label: 'First Timer', emoji: '🌱', ideal: '24-30 weeks' },
                  { value: 'some', label: '1-3 Shows', emoji: '⭐', ideal: '16-24 weeks' },
                  { value: 'experienced', label: '4+ Shows', emoji: '🏆', ideal: '12-16 weeks' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setExperience(option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      experience === option.value
                        ? 'border-brand-purple bg-brand-purple/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{option.emoji}</span>
                    <span className="text-white text-sm font-medium block">{option.label}</span>
                    <span className="text-white/50 text-xs">Ideal: {option.ideal}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateTimeline}
              disabled={!showDate || !experience}
              className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                showDate && experience
                  ? 'bg-brand-purple text-white hover:bg-brand-purple-light'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Calculate My Timeline
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Countdown */}
            <div className="bg-gradient-to-br from-brand-purple/20 to-brand-purple/5 border border-brand-purple/30 rounded-2xl p-8 text-center">
              <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Time Until Show Day</p>
              <div className="flex items-center justify-center gap-6">
                <div>
                  <span className="text-5xl md:text-6xl font-heading text-white">{result.weeksOut}</span>
                  <p className="text-white/60 text-sm">weeks</p>
                </div>
                <div className="text-white/30 text-3xl">/</div>
                <div>
                  <span className="text-5xl md:text-6xl font-heading text-brand-purple">{result.daysOut}</span>
                  <p className="text-white/60 text-sm">days</p>
                </div>
              </div>
              <p className="text-white/50 text-sm mt-4">
                Ideal posing start for your experience: <strong className="text-white">{result.idealRange.label}</strong>
              </p>
            </div>

            {/* Status Message */}
            <div className={`${result.statusColor} border rounded-2xl p-6`}>
              <div className="flex items-start gap-4">
                <span className="text-3xl">{result.statusEmoji}</span>
                <p className="text-white/90">{result.statusMessage}</p>
              </div>
            </div>

            {/* Current Phase */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{result.phaseEmoji}</span>
                <div>
                  <p className="text-white/60 text-sm">You're in</p>
                  <h3 className={`text-2xl font-heading ${result.phaseColor}`}>{result.phase}</h3>
                </div>
              </div>
              <p className="text-white/70">{result.message}</p>
            </div>

            {/* What to Focus On */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-brand-purple" />
                  <h4 className="text-white font-semibold">Focus On</h4>
                </div>
                <p className="text-white/70 text-sm">{result.focus}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-brand-purple" />
                  <h4 className="text-white font-semibold">Practice Frequency</h4>
                </div>
                <p className="text-white/70 text-sm">{result.frequency}</p>
              </div>
            </div>

            {/* Key Milestones */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="w-5 h-5 text-brand-purple" />
                <h3 className="text-xl font-heading text-white">Key Milestones & Deadlines</h3>
              </div>
              <div className="space-y-3">
                {result.milestones.map((milestone, i) => (
                  <div key={i} className={`${getMilestoneColor(milestone.status)} border rounded-xl p-4`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{milestone.emoji}</span>
                        <div>
                          <h4 className="text-white font-medium">{milestone.task}</h4>
                          <p className="text-white/50 text-sm">{milestone.note}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-medium">{getMilestoneLabel(milestone.status)}</span>
                        <p className="text-white/40 text-xs">{milestone.idealWeeks}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-heading text-white mb-4">💡 Common Questions</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-brand-purple font-medium">When should I order my competition bikini?</p>
                  <p className="text-white/70">Order 8-12 weeks out for custom suits. Minimum 6 weeks — designers get busy during comp season! This gives time for creation, shipping, and any adjustments.</p>
                </div>
                <div>
                  <p className="text-brand-purple font-medium">When should I buy my stage heels?</p>
                  <p className="text-white/70">Buy 8-12 weeks out and practice in them daily. Breaking in heels takes time — your feet need to adjust, and you need to build confidence walking and posing in them.</p>
                </div>
                <div>
                  <p className="text-brand-purple font-medium">When do I register for my competition?</p>
                  <p className="text-white/70">Register 4-8 weeks out to get early bird pricing. Standard registration usually closes 1-2 weeks before. Late entries may be accepted with an extra fee, but don't risk missing out!</p>
                </div>
                <div>
                  <p className="text-brand-purple font-medium">When should I practice without a mirror?</p>
                  <p className="text-white/70">Start no-mirror practice 4-6 weeks out. On stage, there's no mirror — you need to feel your poses, not see them. This builds the muscle memory and body awareness that separates good from great.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-brand-purple/20 to-transparent border border-brand-purple/20 rounded-2xl p-6">
              <h3 className="text-xl font-heading text-white mb-2">Ready to get started?</h3>
              <p className="text-white/70 mb-4">Let's create a posing plan that fits your timeline and goals.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/discovery-call" className="btn-primary text-center">
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/start" className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors text-center">
                  Take the Readiness Quiz
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PosingCalculator
