import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Sparkles, ArrowRight, AlertCircle, CheckCircle, Zap, Target } from 'lucide-react'

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

    // Recommended start times based on experience
    const recommendedWeeks = {
      'first-time': 16,
      'some': 12,
      'experienced': 8
    }

    const idealStart = recommendedWeeks[experience]
    const weeksLate = idealStart - weeksOut
    
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
      focus = "Final polish, run-throughs, mental prep"
      frequency = "Daily light practice (10-15 mins)"
      message = "You're in the final stretch! Focus on confidence and visualization."
      urgency = "peak"
    } else if (weeksOut <= 4) {
      phase = "Final Refinement"
      phaseEmoji = "💎"
      phaseColor = "text-orange-400"
      focus = "Stage presence, transitions, T-walk confidence"
      frequency = "4-5x per week"
      message = "Time to polish every detail. Your posing should feel automatic."
      urgency = "final"
    } else if (weeksOut <= 8) {
      phase = "Active Prep"
      phaseEmoji = "🔥"
      phaseColor = "text-brand-purple"
      focus = "Perfecting poses, building stamina, practising in heels"
      frequency = "3-4x per week"
      message = "This is prime time! Consistent practice will build muscle memory."
      urgency = "active"
    } else if (weeksOut <= 12) {
      phase = "Foundation Building"
      phaseEmoji = "🏗️"
      phaseColor = "text-blue-400"
      focus = "Learning poses, understanding angles, building confidence"
      frequency = "2-3x per week"
      message = "Perfect timing to build a strong foundation!"
      urgency = "foundation"
    } else {
      phase = "Early Prep"
      phaseEmoji = "🌱"
      phaseColor = "text-green-400"
      focus = "Getting familiar with your category, basic poses"
      frequency = "1-2x per week"
      message = "You're ahead of the game! Use this time to explore and learn."
      urgency = "early"
    }

    // Cheeky messages based on timing
    let statusMessage, statusEmoji, statusColor
    if (weeksLate > 8) {
      statusMessage = `Okay so... ideally you would've started ${weeksLate} weeks ago 😅 But hey, we can work with this! Intensive sessions incoming.`
      statusEmoji = "😱"
      statusColor = "bg-red-500/20 border-red-500/30"
    } else if (weeksLate > 4) {
      statusMessage = `You're about ${weeksLate} weeks behind the ideal timeline — but don't panic! With focused sessions, we can absolutely get you stage-ready.`
      statusEmoji = "😬"
      statusColor = "bg-orange-500/20 border-orange-500/30"
    } else if (weeksLate > 0) {
      statusMessage = `You're a little behind (${weeksLate} weeks), but totally manageable. Let's get you started ASAP!`
      statusEmoji = "👀"
      statusColor = "bg-yellow-500/20 border-yellow-500/30"
    } else if (weeksLate > -4) {
      statusMessage = "Perfect timing! You're right on track. Let's build something great together."
      statusEmoji = "✨"
      statusColor = "bg-green-500/20 border-green-500/30"
    } else {
      statusMessage = "You're ahead of schedule — love to see it! We've got plenty of time to perfect everything."
      statusEmoji = "🎉"
      statusColor = "bg-brand-purple/20 border-brand-purple/30"
    }

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
      idealStart,
      weeksLate
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
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
            Enter your competition date and find out exactly where you should be in your posing journey.
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
                  { value: 'first-time', label: 'First Timer', emoji: '🌱' },
                  { value: 'some', label: '1-3 Shows', emoji: '⭐' },
                  { value: 'experienced', label: '4+ Shows', emoji: '🏆' }
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
                    <span className="text-white text-sm">{option.label}</span>
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

            {/* CTA */}
            <div className="bg-gradient-to-r from-brand-purple/20 to-transparent border border-brand-purple/20 rounded-2xl p-6">
              <h3 className="text-xl font-heading text-white mb-2">Ready to get started?</h3>
              <p className="text-white/70 mb-4">Let's create a posing plan that fits your timeline.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="btn-primary text-center">
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/start" className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors text-center">
                  Take the Full Quiz
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
