import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  CheckCircle, 
  MessageCircle, 
  BookOpen, 
  ShoppingBag, 
  Users, 
  Bell, 
  Video,
  ChevronRight,
  Clock,
  Plus,
  ExternalLink,
  Lock,
  Footprints
} from 'lucide-react'

// Placeholder for authenticated user
const mockUser = {
  name: 'Sarah',
  lessonsRemaining: 8,
  lessonsTotal: 12,
  nextLesson: {
    date: 'Tuesday, 4 March 2026',
    time: '10:00 AM',
    type: 'Online (Google Meet)'
  },
  memberSince: 'February 2026'
}

const ClientPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // TODO: Implement actual authentication
    setIsLoggedIn(true)
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="pt-28 lg:pt-20 min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-brand-purple flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-heading text-brand-black">Client Portal</h1>
              <p className="text-brand-gray mt-2">Sign in to access your coaching dashboard</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-1">Password</label>
                  <input 
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button type="submit" className="w-full btn-primary py-3">
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-brand-gray">
              <a href="#" className="text-brand-purple hover:underline">Forgot your password?</a>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-brand-gray">
                Not a client yet? <Link to="/services" className="text-brand-purple hover:underline">View services</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="pt-28 lg:pt-20 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-purple text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-white/80 text-sm">Welcome back,</p>
              <h1 className="text-2xl md:text-3xl font-heading">{mockUser.name}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <p className="text-xs text-white/80">Lessons Remaining</p>
                <p className="text-xl font-heading">{mockUser.lessonsRemaining} / {mockUser.lessonsTotal}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* Next Lesson Card */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold text-brand-black">Your Next Lesson</h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Upcoming</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-brand-purple" />
                </div>
                <div>
                  <p className="font-medium text-brand-black">{mockUser.nextLesson.date}</p>
                  <p className="text-sm text-brand-gray">{mockUser.nextLesson.time} • {mockUser.nextLesson.type}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a href="#" className="text-sm text-brand-purple hover:underline flex items-center gap-1">
                  <Video className="w-4 h-4" /> Join Meeting
                </a>
                <a href="#" className="text-sm text-brand-gray hover:text-brand-purple flex items-center gap-1">
                  <Clock className="w-4 h-4" /> Reschedule
                </a>
              </div>
            </div>

            {/* Quick Message */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-brand-black mb-4">Message Georgia</h2>
              <p className="text-sm text-brand-gray mb-4">Questions about your posing journey? Reach out directly.</p>
              <a 
                href="https://t.me/Personalised_Posing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary w-full text-sm py-2 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Open Telegram
              </a>
            </div>
          </div>

          {/* Portal Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* My Lessons */}
            <Link to="/portal/lessons" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-brand-purple" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-purple transition-colors" />
              </div>
              <h3 className="font-semibold text-brand-black mb-1">My Lessons</h3>
              <p className="text-sm text-brand-gray">View, manage, and reschedule your booked lessons</p>
              <div className="mt-3 text-xs text-brand-purple font-medium">{mockUser.lessonsRemaining} lessons remaining</div>
            </Link>

            {/* Book Extra Lessons */}
            <Link to="/portal/book-extra" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-brand-purple" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-purple transition-colors" />
              </div>
              <h3 className="font-semibold text-brand-black mb-1">Book Extra Lessons</h3>
              <p className="text-sm text-brand-gray">Purchase additional lessons at your VIP discounted rate</p>
              <div className="mt-3 text-xs text-green-600 font-medium">$110/lesson (you save $20)</div>
            </Link>

            {/* Posing Check-Ins */}
            <Link to="/portal/check-ins" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-brand-purple" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-purple transition-colors" />
              </div>
              <h3 className="font-semibold text-brand-black mb-1">Posing Check-Ins</h3>
              <p className="text-sm text-brand-gray">Submit posing videos for feedback between lessons</p>
              <div className="mt-3 text-xs text-brand-gray">View submission guidelines</div>
            </Link>

            {/* Resource Centre */}
            <Link to="/portal/resources" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-brand-purple" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-purple transition-colors" />
              </div>
              <h3 className="font-semibold text-brand-black mb-1">Resource Centre</h3>
              <p className="text-sm text-brand-gray">Mobility, breathwork, endurance guides & more</p>
            </Link>

            {/* Preparing for Lesson 1 */}
            <Link to="/portal/prepare" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-brand-purple" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-purple transition-colors" />
              </div>
              <h3 className="font-semibold text-brand-black mb-1">Preparing for Your Lesson</h3>
              <p className="text-sm text-brand-gray">What to bring, what to wear, how to prepare</p>
            </Link>

            {/* Heels Recommendations */}
            <Link to="/portal/heels" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center mb-4">
                  <Footprints className="w-6 h-6 text-brand-purple" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-purple transition-colors" />
              </div>
              <h3 className="font-semibold text-brand-black mb-1">Heels Recommendations</h3>
              <p className="text-sm text-brand-gray">Find the perfect posing heels for your category</p>
            </Link>

            {/* Shop */}
            <a href="#" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-brand-purple" />
                </div>
                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-brand-purple transition-colors" />
              </div>
              <h3 className="font-semibold text-brand-black mb-1">Shop</h3>
              <p className="text-sm text-brand-gray">Practice bikinis, posing heels, PP merch</p>
              <div className="mt-3 text-xs text-green-600 font-medium">VIP pricing available</div>
            </a>

            {/* Workshops */}
            <Link to="/workshops" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-brand-purple" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-purple transition-colors" />
              </div>
              <h3 className="font-semibold text-brand-black mb-1">Workshops</h3>
              <p className="text-sm text-brand-gray">Book upcoming posing workshops</p>
              <div className="mt-3 text-xs text-green-600 font-medium">VIP discounts apply</div>
            </Link>

            {/* Community Events */}
            <Link to="/events" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-brand-purple" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-purple transition-colors" />
              </div>
              <h3 className="font-semibold text-brand-black mb-1">Community Events</h3>
              <p className="text-sm text-brand-gray">Social events & community connections</p>
            </Link>

            {/* Community Notices */}
            <a 
              href="https://t.me/+QAvtHCcw66dmMmU1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-brand-lavender flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-brand-purple" />
                </div>
                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-brand-purple transition-colors" />
              </div>
              <h3 className="font-semibold text-brand-black mb-1">Community Notices</h3>
              <p className="text-sm text-brand-gray">Stay updated with announcements & reminders</p>
              <div className="mt-3 text-xs text-brand-gray">Opens Telegram channel</div>
            </a>

          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-sm text-brand-gray">
            <p>Member since {mockUser.memberSince} • <a href="#" className="text-brand-purple hover:underline">View my info</a> • <button onClick={() => setIsLoggedIn(false)} className="text-brand-purple hover:underline">Sign out</button></p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default ClientPortal
