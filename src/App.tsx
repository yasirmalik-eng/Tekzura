import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ServicesOverview from './components/ServicesOverview';
import ServiceDetail from './components/ServiceDetail';
import Team from './components/Team';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor3D from './components/Cursor3D';
import GlobalCTA from './components/GlobalCTA';
import AboutPageOverlay from './components/AboutPageOverlay';
import './styles/globals.css';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    setMounted(true);

    // Listen for About page open event
    const handleOpenAbout = () => {
      setIsAboutOpen(true);
    };

    window.addEventListener('openAboutPage', handleOpenAbout);
    return () => window.removeEventListener('openAboutPage', handleOpenAbout);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative bg-[#0a0e27] text-white overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Premium Animated Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.15),transparent_50%)]" />
        </div>

        {/* Animated grid pattern */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Noise texture overlay for depth */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating 3D orbs with improved quality */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotateZ: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-cyan-400/5 to-transparent rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotateZ: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -80, 80, 0],
            rotateZ: [0, 180, 360],
            scale: [1, 1.1, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/8 via-purple-400/4 to-transparent rounded-full blur-3xl"
        />

        {/* Enhanced 3D floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotateX: [0, 360],
              rotateY: [0, 360],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transformStyle: 'preserve-3d',
            }}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-blue-400' : 'bg-purple-400'
            }`}
          />
        ))}

        {/* Animated gradient mesh */}
        <motion.div
          style={{ rotateZ: rotateX }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20" />
        </motion.div>

        {/* Scanning line effect */}
        <motion.div
          animate={{
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          style={{
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
          }}
        />

        {/* Corner accent gradients */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/5 to-transparent" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-purple-500/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-pink-500/5 to-transparent" />
      </div>

      <Header />
      <main className="relative z-10">
        <>
          <Hero />
          <Stats />
          <ServicesOverview />
          <ServiceDetail />
          <Team />
          <CaseStudies />
          <Testimonials />
          <FAQ />
          <Blog />
          <GlobalCTA />
          <Contact />
        </>
      </main>
      <Footer />
      <Cursor3D />
      <AboutPageOverlay isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}