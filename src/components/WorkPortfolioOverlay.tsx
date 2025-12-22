import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, TrendingUp } from 'lucide-react';

interface WorkPortfolioOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const WorkPortfolioOverlay = ({ isOpen, onClose }: WorkPortfolioOverlayProps) => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      client: 'RetailCo',
      result: '+300% Conversion',
      gradient: 'from-cyan-400 to-blue-600',
      direction: 'left',
    },
    {
      title: 'Financial Services App',
      client: 'FinTech Solutions',
      result: '50K+ Active Users',
      gradient: 'from-blue-400 to-purple-600',
      direction: 'right',
    },
    {
      title: 'Healthcare Automation',
      client: 'MediCare Network',
      result: '-95% Admin Workload',
      gradient: 'from-purple-400 to-pink-600',
      direction: 'left',
    },
    {
      title: 'Marketing Platform',
      client: 'BrandBoost',
      result: '+250% Campaign ROI',
      gradient: 'from-pink-400 to-rose-600',
      direction: 'right',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(20px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 bg-black/80"
            onClick={onClose}
          />

          {/* Moving background elements for depth */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-6xl bg-gradient-to-br from-[#0f1435] via-[#0a0e27] to-[#0f1435] rounded-3xl border border-cyan-500/20 shadow-2xl overflow-hidden"
            style={{
              boxShadow: '0 0 60px rgba(34, 211, 238, 0.2)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
            >
              <X className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
            </button>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Headline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  View Our Work
                </h2>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-gray-300 text-lg leading-relaxed mb-12 max-w-3xl"
              >
                Our work reflects our commitment to quality, innovation, and measurable results. Each project showcases how we solve real business challenges using smart digital systems, clean design, and scalable architecture. From high-performance websites to intelligent automation platforms, our portfolio demonstrates what's possible when strategy meets execution.
              </motion.p>

              {/* Project Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      x: project.direction === 'left' ? -50 : 50,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.6,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.03,
                      y: -5,
                    }}
                    className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Gradient background on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center"
                      >
                        <TrendingUp className="w-6 h-6 text-cyan-400" />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>

                      {/* Client */}
                      <p className="text-gray-400 text-sm mb-3">{project.client}</p>

                      {/* Result */}
                      <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${project.gradient} bg-opacity-20 border border-cyan-400/30`}>
                        <p className="text-cyan-400 font-semibold">{project.result}</p>
                      </div>

                      {/* Arrow indicator */}
                      <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        whileHover={{ x: 10, opacity: 1 }}
                        className="absolute top-6 right-6"
                      >
                        <ArrowRight className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                    </div>

                    {/* Animated border glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-12 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-lg overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: '0 0 40px rgba(34, 211, 238, 0.4)',
                  }}
                  onClick={() => {
                    onClose();
                    document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="relative flex items-center gap-3">
                    Explore Full Case Studies
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WorkPortfolioOverlay;
