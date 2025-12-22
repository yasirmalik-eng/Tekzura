import React from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

const GlobalCTA = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Premium multi-layer animated background */}
      <div className="absolute inset-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent" />
        
        {/* Radial gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_70%)]" />
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)]" />
          <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.1),transparent_70%)]" />
        </div>

        {/* Animated rotating gradient orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/15 rounded-full blur-3xl"
        />

        {/* Dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Animated light beams */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/50 to-transparent" />
        </motion.div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(i) * 30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${10 + i * 6}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating icons */}
          <div className="relative mb-12">
            {[
              { Icon: Sparkles, delay: 0, x: -100, y: -50 },
              { Icon: Zap, delay: 0.2, x: 100, y: -50 },
              { Icon: Target, delay: 0.4, x: 0, y: 50 },
            ].map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: [0, 1, 1],
                          scale: [0, 1.2, 1],
                          x: item.x,
                          y: item.y,
                        }
                      : {}
                  }
                  transition={{
                    delay: item.delay,
                    duration: 0.8,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                      rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center"
                    style={{
                      boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
                    }}
                  >
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-32"
          >
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-8"
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 100%' }}
              >
                Ready to Elevate
              </motion.span>
              <br />
              <span className="text-white">Your Digital Operations?</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Partner with Tekzura to build premium digital solutions that scale with your business and deliver measurable results.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.1, duration: 0.6, type: 'spring', stiffness: 200 }}
            >
              <motion.a
                href="https://calendly.com/yasirmalik2182/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex px-16 py-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 font-bold text-xl overflow-hidden shadow-2xl"
                style={{
                  boxShadow: '0 0 60px rgba(34, 211, 238, 0.5)',
                }}
              >
                {/* Animated glow effect */}
                <motion.div
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />

                {/* Button content */}
                <span className="relative flex items-center gap-4">
                  <Sparkles className="w-6 h-6" />
                  Book a Strategy Call
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </span>

                {/* Particle effects on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -100],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="absolute bottom-0 w-2 h-2 bg-white rounded-full"
                      style={{
                        left: `${(i + 1) * 15}%`,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-16 flex flex-wrap justify-center gap-8 text-gray-400"
            >
              {[
                { value: '6+', label: 'Years Experience' },
                { value: '200+', label: 'Projects Delivered' },
                { value: '98%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />
    </section>
  );
};

export default GlobalCTA;