import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Video,
  Palette,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Play
} from 'lucide-react';
import navIcon from '../assets/nav_icon.png';

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="p-8 bg-base-200 border border-base-300 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-base-100">
      <div className="w-full h-full flex items-center justify-center">
        <Icon size={32} />
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-base-content/70 leading-relaxed">{desc}</p>
  </div>
);
const Footer = () => {
  const [showContact, setShowContact] = useState(false);
  return (
    <footer className="mt-20 border-t border-base-300">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={navIcon} alt="Intrameet" className="h-6 w-6" />
          <span className="font-semibold">Intrameet</span>
          <span className="text-base-content/60">© {new Date().getFullYear()}</span>
        </div>
        <div className="text-sm text-base-content/70">
          <Link to="/terms" className="link link-hover">Terms</Link>
          <span className="mx-2">•</span>
          <a className="link link-hover" href="#features">Features</a>
          <span className="mx-2">•</span>
          <button
            type="button"
            onClick={() => setShowContact((s) => !s)}
            className="link link-hover"
          >
            Contact
          </button>
          {showContact && (
            <div className="mt-2 text-xs text-base-content">
              Contact: 
              <a href="mailto:pratik.dg@somaiya.edu" className="link ml-1">pratik.dg@somaiya.edu</a>
              <span className="mx-1">/</span>
              <a href="mailto:jadhav.ss@somaiya.edu" className="link">jadhav.ss@somaiya.edu</a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content" data-theme="winter">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-base-100 border-b border-base-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={navIcon} alt="Intrameet" className="h-8 w-8" />
            <span className="text-xl font-bold">Intrameet</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn btn-ghost">Sign In</Link>
            <Link to="/onboarding" className="btn btn-primary rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg transition">Get Started</Link>
          </div>
        </div>
      </header>
      {/* Normal page scrolling */}
      <main>
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-4rem)]">
          <div className="container mx-auto h-full px-4">
            <div className="h-full grid md:grid-cols-2 gap-10 items-center">
              <div className="animate-[fadeInUp_0.8s_ease-out] flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                  Connect, Chat, and Collaborate
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-sky-800"> Seamlessly</span>
                </h1>
                <p className="mt-4 text-base-content/80 text-lg max-w-xl">
                Effortless Chat, Video Calls, and Screen Sharing. 
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/onboarding" className="btn btn-lg rounded-full btn-primary font-semibold shadow hover:-translate-y-0.5 transition">
                    <Play size={20} />
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-lg rounded-full btn-outline border-base-300 hover:border-base-content">
                    Sign In
                  </Link>
                </div>
                
              </div>
              <div className="flex items-center justify-center p-6 md:p-8 animate-[fadeInRight_0.8s_ease-out_0.2s_both]">
                {/* Phone mockup */}
                <div className="w-[300px] h-[600px] bg-neutral-900 rounded-[30px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative mx-auto my-6 md:my-8">
                  <div className="w-full h-full bg-base-100 rounded-2xl overflow-hidden flex flex-col">
                    <div className="bg-base-200 px-5 py-4 border-b border-base-300 flex items-center justify-between">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                        <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                        <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                      </div>
                      <div className="font-semibold text-neutral-700">Intrameet</div>
                    </div>
                    <div className="flex-1 p-5 flex flex-col gap-4 bg-base-200">
                      <div className="flex gap-2 items-end">
                        <div className="w-8 h-8 rounded-full bg-primary text-base-100 flex items-center justify-center">👋</div>
                        <div className="bg-base-100 px-4 py-3 rounded-2xl shadow max-w-[200px]">
                          <p className="text-sm text-neutral-800 m-0">Hey! Ready for our Presentation?</p>
                          <span className="text-[11px] text-neutral-500 block mt-1">12:30 PM</span>
                        </div>
                      </div>
                      <div className="flex gap-2 items-end flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-neutral-400/60 flex items-center justify-center">👤</div>
                        <div className="bg-base-100 px-4 py-3 rounded-2xl shadow max-w-[200px]">
                          <p className="text-sm text-neutral-800 m-0">Absolutely! Lets Go ...</p>
                          <span className="text-[11px] text-neutral-500 block mt-1">12:31 PM</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-base-100 px-4 py-3 rounded-2xl shadow flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="min-h-[calc(100vh-4rem)] flex bg-base-100 text-base-content">
          <div className="container mx-auto px-4 my-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Everything you need to stay connected</h2>
              <p className="text-base-content/70">Powerful features designed for modern Users</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Feature icon={Video} title="HD Video Calls" desc="Crystal clear video calls. Share your screen, collaborate in real-time." />
              <Feature icon={MessageCircle} title="Instant Messaging" desc="Send messages, files, and emojis instantly. Organize conversations in DMs." />
              <Feature icon={Palette} title="Personalized Themes" desc="Make IntraMeet your own. Choose from a variety of light and dark themes to create your perfect workspace." />
              <Feature icon={Shield} title="Secure & Private" desc="End-to-end protections and enterprise-grade security for peace of mind." />
              <Feature icon={Zap} title="Lightning Fast" desc="Optimized for speed and reliability. Low-latency connections for smooth communication." />
              <Feature icon={Globe} title="Cross Platform" desc="Works seamlessly across desktop, mobile, and web. Stay connected wherever you are." />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
