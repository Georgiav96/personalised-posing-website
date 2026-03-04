import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ShowDays from './pages/ShowDays'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import ClientPortal from './pages/ClientPortal'
import SignUp from './pages/SignUp'
import Quiz from './pages/Quiz'
import ReadinessQuiz from './pages/ReadinessQuiz'
import PosingCalculator from './pages/PosingCalculator'
import Events from './pages/Events'
import Workshops from './pages/Workshops'
import Links from './pages/Links'
import DiscoveryCall from './pages/DiscoveryCall'

function Layout({ children }) {
  const location = useLocation()
  
  // Pages without navbar/footer
  const noLayoutPages = ['/', '/links']
  const hideLayout = noLayoutPages.includes(location.pathname) || location.pathname === ''
  
  if (hideLayout) {
    return children
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router basename="/personalised-posing-website">
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/show-days" element={<ShowDays />} />
          <Route path="/results" element={<ShowDays />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portal" element={<ClientPortal />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/start" element={<ReadinessQuiz />} />
          <Route path="/calculator" element={<PosingCalculator />} />
          <Route path="/events" element={<Events />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/links" element={<Links />} />
          <Route path="/discovery-call" element={<DiscoveryCall />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
