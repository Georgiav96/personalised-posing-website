import { motion } from 'framer-motion'
import { 
  Globe, 
  Sparkles, 
  Calendar, 
  PartyPopper, 
  ShoppingBag, 
  Mic, 
  BookOpen,
  ExternalLink,
  Instagram,
  Mail
} from 'lucide-react'

const links = [
  {
    category: null,
    items: [
      { name: 'Website', url: 'https://personalisedposing.com.au', icon: Globe },
      { name: 'Services', url: 'https://personalisedposing.com.au/services', icon: Sparkles },
      { name: 'Workshops', url: 'https://personalisedposing.com.au/workshops', icon: Calendar },
      { name: 'Events', url: 'https://personalisedposing.com.au/events', icon: PartyPopper },
    ]
  },
  {
    category: 'Shop',
    items: [
      { name: 'Posing Bikinis', url: '#', icon: ShoppingBag },
      { name: 'Koko Australia Stagewear', url: 'https://kokoaustralia.com.au', icon: ShoppingBag },
      { name: 'The Shoe Fairy', url: 'https://theshoefairy.com.au', icon: ShoppingBag, badge: 'DC: POSE' },
    ]
  },
  {
    category: null,
    items: [
      { name: 'Podcasts', url: '#', icon: Mic },
    ]
  },
  {
    category: 'Resources',
    items: [
      { name: 'Posing Heels Recommendations', url: '#', icon: BookOpen },
      { name: 'Show Day Bag Checklist', url: '#', icon: BookOpen },
    ]
  }
]

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/personalised_posing', icon: Instagram },
  { name: 'Email', url: 'mailto:hello@personalisedposing.com.au', icon: Mail },
]

export default function Links() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      {/* Profile Header */}
      <div className="pt-12 pb-8 px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                PP
              </span>
            </div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-1"
        >
          Personalised Posing
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-purple-300/80 text-sm"
        >
          Professional Posing Coach for Bodybuilding Athletes
        </motion.p>
      </div>

      {/* Links */}
      <div className="px-6 pb-8 max-w-md mx-auto space-y-6">
        {links.map((section, sectionIdx) => (
          <motion.div
            key={sectionIdx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + sectionIdx * 0.1 }}
          >
            {section.category && (
              <h2 className="text-xs uppercase tracking-wider text-purple-400/60 mb-3 px-1">
                {section.category}
              </h2>
            )}
            <div className="space-y-3">
              {section.items.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <link.icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">{link.name}</span>
                        {link.badge && (
                          <span className="ml-2 text-xs bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-purple-400 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Social Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4 pt-6"
        >
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300"
            >
              <social.icon className="w-5 h-5 text-purple-400" />
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-white/20 text-xs pt-8"
        >
          © {new Date().getFullYear()} Personalised Posing
        </motion.p>
      </div>
    </div>
  )
}
