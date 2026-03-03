import { Link } from 'react-router-dom'
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-heading mb-4 text-brand-purple">Personalised Posing</h3>
            <p className="text-white/60 leading-relaxed mb-6 max-w-md">
              International posing and performance coach empowering hundreds of women to own their stage presence and present their physiques with confidence, clarity, and purpose.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/personalisedposing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-brand-purple/20 hover:border-brand-purple/50 transition-all duration-300 text-white/70 hover:text-brand-purple"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/personalisedposing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-brand-purple/20 hover:border-brand-purple/50 transition-all duration-300 text-white/70 hover:text-brand-purple"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="mailto:admin@personalisedposing.com.au"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-brand-purple/20 hover:border-brand-purple/50 transition-all duration-300 text-white/70 hover:text-brand-purple"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading mb-6 text-white">Quick Links</h4>
            <nav className="space-y-3">
              <Link to="/about" className="block text-white/60 hover:text-brand-purple transition-colors">
                About Georgia
              </Link>
              <Link to="/services" className="block text-white/60 hover:text-brand-purple transition-colors">
                Services
              </Link>
              <Link to="/show-days" className="block text-white/60 hover:text-brand-purple transition-colors">
                Show Days
              </Link>
              <Link to="/events" className="block text-white/60 hover:text-brand-purple transition-colors">
                Events
              </Link>
              <Link to="/workshops" className="block text-white/60 hover:text-brand-purple transition-colors">
                Workshops
              </Link>
              <Link to="/testimonials" className="block text-white/60 hover:text-brand-purple transition-colors">
                Testimonials
              </Link>
              <Link to="/contact" className="block text-white/60 hover:text-brand-purple transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading mb-6 text-white">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-purple mt-0.5" />
                <span className="text-white/60">Brisbane, Australia<br />& Internationally Online</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-purple" />
                <a href="mailto:admin@personalisedposing.com.au" className="text-white/60 hover:text-brand-purple transition-colors">
                  admin@personalisedposing.com.au
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Federations */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/40">
            <span className="text-sm font-semibold hover:text-brand-purple transition-colors">ICN</span>
            <span className="text-sm font-semibold hover:text-brand-purple transition-colors">IFBB/NPC</span>
            <span className="text-sm font-semibold hover:text-brand-purple transition-colors">NBA</span>
            <span className="text-sm font-semibold hover:text-brand-purple transition-colors">FMG</span>
            <span className="text-sm font-semibold hover:text-brand-purple transition-colors">OCB</span>
            <span className="text-sm font-semibold hover:text-brand-purple transition-colors">ANB</span>
            <span className="text-sm font-semibold hover:text-brand-purple transition-colors">INBA</span>
            <span className="text-sm font-semibold hover:text-brand-purple transition-colors">WNBF</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Personalised Posing. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-white/40 hover:text-brand-purple transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/40 hover:text-brand-purple transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
