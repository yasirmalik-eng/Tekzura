import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Cpu, Play } from 'lucide-react';
import ProjectOverlay from './ProjectOverlay';
import WorkPortfolioOverlay from './WorkPortfolioOverlay';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showWorkOverlay, setShowWorkOverlay] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create 3D particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: Math.random() * 2 + 1,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: ['#22d3ee', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 3)],
      });
    }

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Draw 3D wave background
      const waveGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      waveGradient.addColorStop(0, `rgba(6, 182, 212, ${0.03 + Math.sin(time) * 0.02})`);
      waveGradient.addColorStop(0.5, `rgba(37, 99, 235, ${0.05 + Math.cos(time) * 0.02})`);
      waveGradient.addColorStop(1, `rgba(147, 51, 234, ${0.03 + Math.sin(time * 1.5) * 0.02})`);
      ctx.fillStyle = waveGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update 3D particles
      particles.forEach((particle) => {
        // 3D projection
        const scale = 1000 / (1000 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2 * (1 - scale);
        const y2d = particle.y * scale + canvas.height / 2 * (1 - scale);
        const size = particle.size * scale;

        // Draw particle with glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 2);
        gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16)}`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Update 3D position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;

        // Reset particle if it goes behind camera
        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      // Draw 3D connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1, i + 5).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 200) {
            const scale1 = 1000 / (1000 + p1.z);
            const scale2 = 1000 / (1000 + p2.z);
            const x1 = p1.x * scale1 + canvas.width / 2 * (1 - scale1);
            const y1 = p1.y * scale1 + canvas.height / 2 * (1 - scale1);
            const x2 = p2.x * scale2 + canvas.width / 2 * (1 - scale2);
            const y2 = p2.y * scale2 + canvas.height / 2 * (1 - scale2);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 * (1 - distance / 200)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ perspective: '1000px' }}>
      {/* 3D Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 3D Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotateZ: [0, 180, 360],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.3, 0.15],
          rotateZ: [360, 180, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
      />

      {/* Content with 3D transforms */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </motion.div>
          <span className="text-cyan-400 text-sm">AI-Powered Digital Solutions</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-4 h-4 text-yellow-400" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, z: -100 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
        >
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #ffffff, #22d3ee, #3b82f6, #8b5cf6, #ffffff)',
              backgroundSize: '200% auto',
            }}
            className="bg-clip-text text-transparent"
          >
            Transform Your Vision
          </motion.span>
          <br />
          <motion.span
            animate={{
              backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #8b5cf6, #3b82f6, #22d3ee, #ffffff, #8b5cf6)',
              backgroundSize: '200% auto',
            }}
            className="bg-clip-text text-transparent"
          >
            Into Digital Reality
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ transformStyle: 'preserve-3d', translateZ: 20 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Enterprise-grade digital solutions powered by AI and crafted by experts.
          We build premium web platforms, automation systems, and e-commerce solutions that drive real business growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Start Your Project Button - Premium Glowing Design */}
          <motion.button
            onClick={() => setShowProjectOverlay(true)}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: '0 30px 60px -12px rgba(34, 211, 238, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-xl overflow-hidden"
          >
            {/* Multi-layer glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl" />
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-2xl"
            />
            
            <span className="relative z-10 flex items-center space-x-2 text-white">
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          {/* View Our Work Button - Outlined with Play Icon */}
          <motion.button
            onClick={() => setShowWorkOverlay(true)}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              borderColor: 'rgba(34, 211, 238, 0.8)',
              backgroundColor: 'rgba(34, 211, 238, 0.05)'
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 bg-transparent border-2 border-cyan-500/40 rounded-xl hover:border-cyan-400 transition-all group"
          >
            <span className="flex items-center space-x-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
              <Play className="w-5 h-5 fill-current" />
              <span>View Our Work</span>
            </span>
          </motion.button>
        </motion.div>

        {/* 3D Floating Icon Cards */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotateX: [0, 10, 0],
            rotateY: [0, 10, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d', translateZ: 50 }}
          className="absolute top-1/4 left-10 hidden lg:block"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-2xl backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center shadow-xl">
            <Cpu className="w-10 h-10 text-cyan-400" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotateX: [0, -10, 0],
            rotateY: [0, -10, 0],
            rotateZ: [0, -5, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d', translateZ: 50 }}
          className="absolute top-1/3 right-10 hidden lg:block"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full backdrop-blur-sm border border-purple-500/30 flex items-center justify-center shadow-xl">
            <Zap className="w-8 h-8 text-purple-400" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateX: [0, 15, 0],
            rotateY: [0, 15, 0],
            rotateZ: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d', translateZ: 50 }}
          className="absolute bottom-1/4 left-1/4 hidden lg:block"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-lg backdrop-blur-sm border border-blue-500/30 flex items-center justify-center shadow-xl">
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
        </motion.div>
      </motion.div>

      {/* 3D Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotateX: [0, 10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-cyan-500/5"
        >
          <motion.div
            animate={{ 
              y: [0, 12, 0], 
              opacity: [1, 0, 1],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
          />
        </motion.div>
      </motion.div>

      {/* Project Overlay */}
      <ProjectOverlay isOpen={showProjectOverlay} onClose={() => setShowProjectOverlay(false)} />

      {/* Work Portfolio Overlay */}
      <WorkPortfolioOverlay isOpen={showWorkOverlay} onClose={() => setShowWorkOverlay(false)} />
    </section>
  );
};

export default Hero;