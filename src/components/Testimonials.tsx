import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      name: 'Jennifer Smith',
      role: 'CEO, TechVentures Inc',
      company: 'TechVentures',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      rating: 5,
      text: 'Tekzura transformed our entire digital infrastructure. Their AI-powered solutions increased our operational efficiency by 200%. The team\'s expertise and dedication are unmatched.',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO, FinanceFlow',
      company: 'FinanceFlow',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      rating: 5,
      text: 'Working with Tekzura was a game-changer. They delivered a complex mobile app ahead of schedule and under budget. Our user engagement has increased by 350% since launch.',
      gradient: 'from-blue-400 to-purple-500',
    },
    {
      name: 'Sarah Chen',
      role: 'Marketing Director, BrandPulse',
      company: 'BrandPulse',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      rating: 5,
      text: 'The automation systems Tekzura built for us saved our team 30+ hours per week. Their attention to detail and innovative approach exceeded all expectations.',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      name: 'David Thompson',
      role: 'Founder, EduTech Solutions',
      company: 'EduTech',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      rating: 5,
      text: 'Tekzura\'s team didn\'t just build our platform - they became our partners. The scalability and performance of our new system have allowed us to grow 10x faster than anticipated.',
      gradient: 'from-pink-400 to-rose-500',
    },
    {
      name: 'Amanda Wilson',
      role: 'VP of Operations, HealthCare Plus',
      company: 'HealthCare Plus',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
      rating: 5,
      text: 'Outstanding service from start to finish. Tekzura delivered a healthcare platform that\'s both HIPAA compliant and incredibly user-friendly. Patient satisfaction has soared.',
      gradient: 'from-rose-400 to-cyan-500',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Premium multi-layer background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,182,212,0.12),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_70%)]" />
        </div>

        {/* Animated rotating gradient orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-blue-500/8 to-transparent rounded-full blur-3xl"
        />

        {/* Subtle line pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating stars/sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 4) * 20}%`,
              boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
            }}
          />
        ))}

        {/* Corner gradients */}
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-blue-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-cyan-500/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-4"
          >
            Client Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Don't just take our word for it - hear from the businesses we've helped transform
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative">
          <div className="relative h-[500px] md:h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute w-full"
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="p-3 bg-white/5 backdrop-blur-sm border border-cyan-500/30 rounded-full hover:bg-cyan-500/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-cyan-400" />
            </motion.button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className="relative"
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-cyan-400 w-8'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(1)}
              className="p-3 bg-white/5 backdrop-blur-sm border border-cyan-500/30 rounded-full hover:bg-cyan-500/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-cyan-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-cyan-500/20 rounded-3xl">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5 rounded-3xl`} />

        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-br ${testimonial.gradient} opacity-20 blur-2xl -z-10`} />

        {/* Quote icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-6 -left-6"
        >
          <div className={`p-4 bg-gradient-to-br ${testimonial.gradient} rounded-2xl shadow-lg`}>
            <Quote className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative">
          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex space-x-1 mb-6"
          >
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonial Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
          >
            "{testimonial.text}"
          </motion.p>

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-4"
          >
            <div className="relative">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/30"
              />
              <div className={`absolute -inset-1 bg-gradient-to-br ${testimonial.gradient} rounded-full blur opacity-50 -z-10`} />
            </div>
            <div>
              <h4 className={`text-lg bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                {testimonial.name}
              </h4>
              <p className="text-gray-400">
                {testimonial.role}
              </p>
              <p className="text-gray-500 text-sm">{testimonial.company}</p>
            </div>
          </motion.div>
        </div>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/5 to-transparent rounded-tl-full" />
      </div>
    </div>
  );
};

export default Testimonials;