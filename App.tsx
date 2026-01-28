
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Star, Mail, Instagram, Facebook, ArrowUpRight, Clapperboard, Camera, Users, ShieldCheck, Zap, Calendar, GraduationCap, Award, ArrowLeft } from 'lucide-react';
import { NAV_ITEMS, PROGRAMS, HIGHLIGHTS } from './constants';
import { Program } from './types';

type View = 'home' | 'privacy' | 'terms';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollToId = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id.replace('#', ''));
    
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(id.replace('#', ''));
        if (el) {
          const offset = window.innerWidth < 768 ? 80 : 120;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else if (element) {
      const offset = window.innerWidth < 768 ? 80 : 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'privacy':
        return <PrivacyPage setView={setCurrentView} />;
      case 'terms':
        return <TermsPage setView={setCurrentView} />;
      default:
        return <LandingPage scrollToId={scrollToId} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* Cinematic Lighting Accents */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-amber-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-zinc-800/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-2 md:py-3' : 'py-4 md:py-8'}`}>
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className={`flex justify-between items-center transition-all duration-500 rounded-2xl px-4 md:px-6 ${scrolled ? 'glass py-3 md:py-4 border border-white/5 shadow-2xl' : 'bg-transparent py-2'}`}>
            <button onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col group text-left relative z-[101]">
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black font-heading tracking-tighter text-white group-hover:text-amber-500 transition-colors uppercase leading-none">
                Act Like You Know
              </span>
              <span className="text-[7px] md:text-[9px] font-bold text-amber-500/80 tracking-[0.3em] md:tracking-[0.4em] uppercase ml-0.5 md:ml-1">Workshops</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => scrollToId(item.href)}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-all hover:translate-y-[-1px]"
                >
                  {item.label}
                </button>
              ))}
              <button onClick={() => scrollToId('#programs')} className="bg-amber-500 hover:bg-amber-400 text-black px-5 xl:px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/20 flex items-center gap-2">
                Book Now <ArrowUpRight size={14} />
              </button>
            </div>

            {/* Mobile Toggle */}
            <button className="lg:hidden text-white p-2 relative z-[101]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
              {isMenuOpen ? <X size={24} className="md:w-7 md:h-7" /> : <Menu size={24} className="md:w-7 md:h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-[100] bg-[#050505]/98 backdrop-blur-3xl lg:hidden flex flex-col transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center flex-grow space-y-6 md:space-y-8 px-6 pt-20 pb-12 overflow-y-auto">
            {NAV_ITEMS.map((item, idx) => (
              <button 
                key={item.label} 
                onClick={() => scrollToId(item.href)}
                className={`text-3xl sm:text-4xl md:text-5xl font-black font-heading text-zinc-100 hover:text-amber-500 transition-all uppercase tracking-tighter transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToId('#programs')}
              className={`w-full max-w-xs bg-amber-500 text-black py-4 sm:py-5 rounded-xl text-center font-black uppercase tracking-widest text-base sm:text-lg shadow-xl shadow-amber-900/20 transform transition-all delay-300 ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            >
              Register Now
            </button>
            
            <div className={`flex items-center gap-6 sm:gap-8 pt-8 md:pt-12 transition-all delay-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
               <a href="https://www.instagram.com/actlikeyouknowworkshops" className="text-zinc-500 hover:text-amber-500 transition-colors" aria-label="Instagram"><Instagram size={24} /></a>
               <a href="https://www.facebook.com/Act-Like-You-Know-Workshops-1536648089981009" className="text-zinc-500 hover:text-amber-500 transition-colors" aria-label="Facebook"><Facebook size={24} /></a>
               <a href="mailto:actlikeyouknowworkshops@gmail.com" className="text-zinc-500 hover:text-amber-500 transition-colors" aria-label="Email"><Mail size={24} /></a>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 pt-16 md:pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-20">
            <div className="lg:col-span-6 space-y-6 md:space-y-8">
              <button onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col group text-left">
                <span className="text-2xl md:text-3xl font-black font-heading tracking-tighter text-white uppercase leading-none">
                  Act Like You Know
                </span>
                <span className="text-[9px] font-bold text-amber-500 tracking-[0.3em] uppercase ml-1">Mentorship & Workshops</span>
              </button>
              <p className="text-zinc-500 font-medium leading-relaxed max-w-xs text-sm">
                Empowering the next generation of performers through elite industry training since 2009.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <Facebook size={18} />, href: "https://www.facebook.com/Act-Like-You-Know-Workshops-1536648089981009" },
                  { icon: <Instagram size={18} />, href: "https://www.instagram.com/actlikeyouknowworkshops" },
                  { icon: <Mail size={18} />, href: "mailto:actlikeyouknowworkshops@gmail.com" }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:bg-zinc-800 transition-all">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-3 space-y-4 md:space-y-6">
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Curriculum</h4>
              <ul className="space-y-3 md:space-y-4">
                {[
                  { name: 'C.A.M.P.', id: '#camp' },
                  { name: 'Private Coaching', id: '#coaching' },
                  { name: 'Virtual Sessions', id: '#virtual' },
                  { name: 'Career Consulting', id: '#consulting' }
                ].map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => scrollToId(link.id)} 
                      className="text-zinc-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-3 space-y-4 md:space-y-6">
               <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Direct Line</h4>
               <div className="bg-zinc-900/40 p-5 md:p-6 rounded-2xl border border-white/5 space-y-2 md:space-y-3">
                 <p className="text-[9px] text-zinc-600 uppercase tracking-widest font-black">Inquiries:</p>
                 <a href="mailto:actlikeyouknowworkshops@gmail.com" className="text-[10px] font-bold text-amber-500 hover:text-amber-400 break-all transition-colors underline underline-offset-4 decoration-amber-500/20">actlikeyouknowworkshops@gmail.com</a>
               </div>
            </div>
          </div>
          
          <div className="pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            <p className="text-zinc-700 text-[8px] font-bold uppercase tracking-[0.4em] text-center md:text-left">© 2026 AKY WORKSHOPS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 sm:gap-8">
              <button onClick={() => setCurrentView('privacy')} className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-700 hover:text-white transition-colors">Privacy</button>
              <button onClick={() => setCurrentView('terms')} className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-700 hover:text-white transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LandingPage: React.FC<{ scrollToId: (id: string) => void }> = ({ scrollToId }) => (
  <>
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://player.vimeo.com/video/1112984514?h=26cd2a8a2e&autoplay=1&loop=1&autopause=0&muted=1&title=0&byline=0&portrait=0&controls=0" 
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 scale-[1.5] sm:scale-[1.2] lg:scale-110 object-cover"
          frameBorder="0" 
          allow="autoplay; fullscreen" 
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/50 to-[#050505]"></div>
      </div>

      {/* Optimized PT- for Navigation Clearance */}
      <div className="container mx-auto px-6 relative z-10 pt-32 sm:pt-48 lg:pt-64 pb-16 md:pb-24">
        <div className="max-w-5xl space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-amber-500/10 border border-amber-500/20 px-3 md:px-4 py-1.5 rounded-full text-amber-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.25em] md:tracking-[0.3em]">
            <Award size={12} className="text-amber-500 md:w-3.5 md:h-3.5" />
            Industry Accredited Mentorship
          </div>
          <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading leading-[0.9] tracking-ultra-tight text-white uppercase break-words hyphens-auto">
            Act Like <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white text-glow">You Know!</span>
          </h1>
          <div className="space-y-4 md:space-y-6">
            <p className="text-lg sm:text-2xl md:text-3xl text-zinc-300 font-medium tracking-tight max-w-2xl leading-snug">
              "Creating <span className="text-amber-500 font-heading font-black">Great Actors</span> one class at a time."
            </p>
            <p className="text-xs sm:text-sm md:text-base text-zinc-500 max-w-xl leading-relaxed font-medium">
              Elite workshops, private coaching and mentorship for actors aiming for television, film, and theatrical excellence. Led by veteran professional Dennis L.A. White.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-2 md:pt-4">
            <button onClick={() => scrollToId('#programs')} className="bg-amber-500 hover:bg-amber-400 text-black px-8 md:px-10 py-4 md:py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs text-center transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-amber-900/30">
              Join The Workshop
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform hidden sm:block" />
            </button>
            <button onClick={() => scrollToId('#about')} className="bg-white/5 hover:bg-white/10 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs text-center transition-all border border-white/10 backdrop-blur-md">
              The Instructor
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Benefits Section */}
    <section id="community" className="py-16 sm:py-24 md:py-32 relative bg-[#050505] scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="space-y-3 md:space-y-4">
            <div className="text-amber-500 font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px]">The AKY Advantage</div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-heading uppercase tracking-tight text-white leading-tight">The Industry <br className="hidden sm:block" /><span className="text-amber-500">Standard</span></h2>
          </div>
          <p className="text-zinc-500 max-w-sm font-medium text-xs sm:text-sm md:text-base leading-relaxed">
            We bridge the gap between amateur performance and professional booking through rigorous, credit-backed mentorship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} className="p-8 md:p-10 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-amber-500/40 transition-all duration-500 hover:bg-zinc-900/40 group">
              <div className="mb-6 md:mb-8 w-12 h-12 md:w-14 md:h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-all duration-500">
                {i === 0 && <Clapperboard size={24} className="md:w-[28px] md:h-[28px]" />}
                {i === 1 && <Camera size={24} className="md:w-[28px] md:h-[28px]" />}
                {i === 2 && <Users size={24} className="md:w-[28px] md:h-[28px]" />}
                {i === 3 && <GraduationCap size={24} className="md:w-[28px] md:h-[28px]" />}
                {i === 4 && <Calendar size={24} className="md:w-[28px] md:h-[28px]" />}
                {i === 5 && <Zap size={24} className="md:w-[28px] md:h-[28px]" />}
              </div>
              <h3 className="text-lg md:text-xl font-black mb-3 text-white uppercase tracking-tight group-hover:text-amber-500 transition-colors font-heading">{h.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-medium text-xs sm:text-sm">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Programs Section */}
    <section id="programs" className="py-16 sm:py-24 md:py-32 bg-[#050505] relative border-t border-white/5 scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
           <div className="text-amber-500 font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px]">Premium Programs</div>
           <h2 className="text-4xl sm:text-5xl md:text-8xl font-black font-heading uppercase text-white tracking-tighter leading-tight">Choose Your <span className="text-amber-500">Path</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-12">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>

    {/* About Dennis L.A. White - Fixed Image size and side-by-side responsiveness */}
    <section id="about" className="py-16 sm:py-24 md:py-40 relative overflow-hidden bg-zinc-900/10 scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-24 items-center">
          
          {/* Order 1 on mobile: The Bio Image */}
          <div className="relative group order-1 lg:order-1 w-full mx-auto">
            <div className="absolute -inset-4 bg-amber-500/20 rounded-[3rem] blur-[80px] opacity-20"></div>
            <div className="relative w-full aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 md:border-8 border-zinc-900 shadow-3xl">
              <img 
                src="https://img1.wsimg.com/isteam/ip/dfdfe3df-804e-44eb-bb6a-a9ee12ee2bd1/TeachingPic1.jpg" 
                alt="Dennis L.A. White Teaching" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
            </div>
            {/* badge fix for tablet overlap */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 md:-bottom-10 md:-right-10 p-5 md:p-12 bg-amber-500 rounded-2xl md:rounded-3xl shadow-2xl text-black max-w-[130px] sm:max-w-[180px] md:max-w-xs border border-amber-400/50">
              <div className="space-y-0.5 md:space-y-1">
                <p className="text-3xl sm:text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter leading-none">20+</p>
                <p className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-tight">Years Industry Excellence</p>
              </div>
            </div>
          </div>
          
          {/* Order 2 on mobile: Text content */}
          <div className="space-y-8 md:space-y-10 order-2 lg:order-2">
            <div className="space-y-3 md:space-y-4">
              <div className="text-amber-500 font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px]">The Instructor</div>
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black font-heading uppercase leading-[0.9] tracking-tighter text-white">
                Dennis L.A. <span className="text-amber-500">White</span>
              </h2>
            </div>
            
            <div className="space-y-6 md:space-y-8 text-zinc-400 font-medium leading-relaxed text-sm sm:text-base md:text-lg">
              <p className="border-l-2 border-amber-500 pl-6 md:pl-8">
                Dennis L.A. White is a veteran of the Screen Actors Guild with <span className="text-white font-bold">over 50 major credits</span> across high-profile Film and Television. 
              </p>
              <p className="pl-6 md:pl-8">
                Known for his transformative performances in <span className="text-white italic">"NOTORIOUS"</span>, 
                <span className="text-white italic">"THE FAMILY BUSINESS"</span>, and <span className="text-white italic">"PARENTHOOD"</span>, Dennis brings real-world casting insight that only a true working professional can provide.
              </p>
              
              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-4">
                {['Acting Coach', 'Director', 'Producer', 'Casting Expert'].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-zinc-900/40 rounded-xl border border-white/5 transition-all hover:border-amber-500/30 group/tag">
                    <ShieldCheck size={14} className="text-amber-500 shrink-0" />
                    <span className="text-[7px] md:text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-200 truncate">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Gallery Grid - Improved mobile columns */}
    <section className="py-16 sm:py-24 md:py-32 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3 md:space-y-4">
          <div className="text-amber-500 font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px]">Behind The Scenes</div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-heading uppercase tracking-tight text-white">Our <span className="text-amber-500">Community</span></h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            "Teachingpic3.jpg",
            "TeachingPic1.jpg",
            "Teachingpic6.jpg",
            "teachingpic5.jpg"
          ].map((img, i) => (
            <div key={i} className={`group relative rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-700 hover:scale-[0.98] ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square lg:mt-12'}`}>
              <img 
                src={`https://img1.wsimg.com/isteam/ip/dfdfe3df-804e-44eb-bb6a-a9ee12ee2bd1/${img}`} 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000" 
                alt="Workshop Session"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6">
                <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-amber-500">Live Session {2024 - i}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Subscribe Section */}
    <section id="contact" className="py-16 sm:py-24 md:py-32 relative scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full"></div>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <div className="text-amber-500 font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px]">Stay Informed</div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading uppercase tracking-tighter text-white leading-tight">Join The <br className="hidden lg:block" /><span className="text-amber-500">Inner Circle</span></h2>
              <p className="text-zinc-500 font-medium text-xs sm:text-sm md:text-base leading-relaxed">Early access to workshops, celebrity guest announcements, and exclusive casting calls.</p>
            </div>
            
            <div className="bg-[#0a0a0a] p-6 sm:p-8 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl">
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1 md:space-y-2">
                  <label htmlFor="email-input" className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-3 md:ml-4 italic">Email Address</label>
                  <input 
                    id="email-input"
                    type="email" 
                    placeholder="actor@industry-pro.com" 
                    className="w-full px-5 md:px-8 py-4 md:py-5 bg-zinc-900 border border-white/5 rounded-xl md:rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all text-xs sm:text-sm font-bold placeholder:text-zinc-700"
                  />
                </div>
                <button type="submit" className="w-full py-4 md:py-5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px] transition-all shadow-xl shadow-amber-900/20 active:scale-95 flex items-center justify-center gap-3 md:gap-4">
                  Subscribe <ArrowUpRight size={16} />
                </button>
                <p className="text-[7px] md:text-[8px] text-center text-zinc-600 uppercase tracking-[0.2em] font-bold">Strictly professional updates. No spam.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const PrivacyPage: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6">
    <div className="container mx-auto max-w-4xl space-y-12 md:space-y-16 animate-in fade-in slide-in-from-bottom duration-700">
      <button 
        onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Stage
      </button>

      <div className="space-y-4 md:space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading uppercase tracking-tighter text-white leading-tight">Privacy <span className="text-amber-500">Policy</span></h1>
        <p className="text-zinc-500 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em]">Effective Date: January 1, 2024</p>
      </div>

      <div className="prose prose-invert prose-amber max-w-none space-y-8 md:space-y-10 text-zinc-400 font-medium leading-relaxed text-sm md:text-base">
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black font-heading uppercase text-white border-b border-white/5 pb-2">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you register for a workshop, subscribe to our newsletter, or communicate with us. This may include your name, email address, and any other information you choose to provide.</p>
        </section>

        <section className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black font-heading uppercase text-white border-b border-white/5 pb-2">2. How We Use Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our acting workshops and mentorship programs. This includes sending you audition notices, processing registrations, and providing industry motivation.</p>
        </section>

        <section className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black font-heading uppercase text-white border-b border-white/5 pb-2">3. Third-Party Services</h2>
          <p>We may use third-party services such as Zoom for virtual workshops and Vimeo for video content. These services have their own privacy policies, and we recommend reviewing them.</p>
        </section>

        <section className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black font-heading uppercase text-white border-b border-white/5 pb-2">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:actlikeyouknowworkshops@gmail.com" className="text-amber-500 underline">actlikeyouknowworkshops@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  </section>
);

const TermsPage: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6">
    <div className="container mx-auto max-w-4xl space-y-12 md:space-y-16 animate-in fade-in slide-in-from-bottom duration-700">
      <button 
        onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Stage
      </button>

      <div className="space-y-4 md:space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading uppercase tracking-tighter text-white leading-tight">Terms of <span className="text-amber-500">Service</span></h1>
        <p className="text-zinc-500 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em]">Last Updated: January 1, 2024</p>
      </div>

      <div className="prose prose-invert prose-amber max-w-none space-y-8 md:space-y-10 text-zinc-400 font-medium leading-relaxed text-sm md:text-base">
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black font-heading uppercase text-white border-b border-white/5 pb-2">1. Agreement to Terms</h2>
          <p>By accessing our website and participating in workshops, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
        </section>

        <section className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black font-heading uppercase text-white border-b border-white/5 pb-2">2. Workshop Registration</h2>
          <p>Registration for workshops (including C.A.M.P.) is subject to availability. We reserve the right to refuse service or cancel registrations if requirements (such as industry credits for intensive sessions) are not met.</p>
        </section>

        <section className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black font-heading uppercase text-white border-b border-white/5 pb-2">3. Refund Policy</h2>
          <p>Our programs require dedication and commitment. Specific refund policies are provided at the time of booking. Generally, digital sessions and mentorship fees are non-refundable once the session has commenced.</p>
        </section>

        <section className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black font-heading uppercase text-white border-b border-white/5 pb-2">4. Conduct</h2>
          <p>Participants are expected to maintain professional conduct during all live sessions and workshops. Disruptive behavior may lead to removal from the program without refund.</p>
        </section>
      </div>
    </div>
  </section>
);

const ProgramCard: React.FC<{ program: Program }> = ({ program }) => {
  return (
    <div 
      id={program.id}
      className={`group relative flex flex-col h-full rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-700 hover:translate-y-[-8px] scroll-mt-20 md:scroll-mt-24 ${program.isFeatured ? 'ring-1 ring-amber-500/50 shadow-2xl shadow-amber-900/10' : ''}`}
    >
      {program.isFeatured && (
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-amber-500 text-black text-[7px] md:text-[8px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
          Best Seller
        </div>
      )}
      
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={program.imageUrl} 
          alt={program.title} 
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90"></div>
        <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8">
           <div className="flex items-baseline gap-1 md:gap-2">
              <span className="text-2xl md:text-3xl font-black text-white font-heading">{program.price}</span>
              <span className="text-[7px] md:text-[8px] text-amber-500/80 uppercase font-black tracking-widest">{program.priceDetail}</span>
           </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-grow flex flex-col space-y-6 md:space-y-8">
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-lg md:text-2xl font-black text-white font-heading leading-tight group-hover:text-amber-500 transition-colors duration-500 uppercase">{program.title}</h3>
          <p className="text-zinc-500 font-medium text-[11px] md:text-xs leading-relaxed line-clamp-3">{program.description}</p>
        </div>
        
        <div className="space-y-3 md:space-y-4 flex-grow">
          {program.features?.slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-start gap-3 md:gap-4 text-[8px] md:text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
              <div className="shrink-0 mt-0.5 text-amber-500/40 group-hover:text-amber-500 transition-colors">
                <Star size={10} fill="currentColor" />
              </div>
              <span>{f}</span>
            </div>
          ))}
        </div>

        <a 
          href={program.paypalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 md:py-4 rounded-xl bg-zinc-100 text-black font-black uppercase tracking-[0.2em] text-[8px] md:text-[9px] hover:bg-amber-500 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 md:gap-3 no-underline"
        >
          Secure Seat <ArrowUpRight size={14} className="md:w-4 md:h-4" />
        </a>
      </div>
    </div>
  );
};

export default App;
