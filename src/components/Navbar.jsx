import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/home' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Show Days', path: '/show-days' },
  { name: 'Events', path: '/events' },
  { name: 'Workshops', path: '/workshops' },
  { name: 'Contact', path: '/contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-brand-purple text-white text-center py-2 text-sm font-medium">
        <Link to="/quiz" className="hover:underline">
          NOT SURE WHERE TO START? TAKE OUR QUIZ! →
        </Link>
      </div>
      
      <nav className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' 
          : 'bg-black/60 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            
            {/* Logo - Left */}
            <Link to="/" className="flex items-center">
              <img 
                src={`${import.meta.env.BASE_URL}images/logos/logo-main.png`} 
                alt="Personalised Posing" 
                className="h-14 sm:h-16 lg:h-20 w-auto brightness-0 invert"
              />
            </Link>

            {/* Nav Links - Right (Desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-wider font-semibold transition-colors whitespace-nowrap ${
                    location.pathname === link.path 
                      ? 'text-brand-purple' 
                      : 'text-white/90 hover:text-brand-purple'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-black/90 backdrop-blur-lg border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-sm uppercase tracking-wider font-medium py-2 ${
                    location.pathname === link.path 
                      ? 'text-brand-purple' 
                      : 'text-white/90'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
