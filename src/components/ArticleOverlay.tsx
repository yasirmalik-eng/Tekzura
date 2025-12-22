import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { X, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface Article {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  gradient: string;
  tags: string[];
  summary: string;
  content: {
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
  cta: {
    text: string;
    description: string;
  };
}

interface ArticleOverlayProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleOverlay: React.FC<ArticleOverlayProps> = ({ article, isOpen, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Prevent scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] overflow-y-auto"
        >
          {/* Backdrop with animated noise */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0a0e27]/98 backdrop-blur-2xl"
          >
            {/* Animated gradient background */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)',
                backgroundSize: '200% 200%',
              }}
            />

            {/* Light streaks */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: ['-100%', '200%'],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: 'linear',
                }}
                className={`absolute top-${i * 30}% h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent`}
              />
            ))}

            {/* Grain overlay */}
            <div className="absolute inset-0 opacity-5 mix-blend-overlay">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
              }} />
            </div>
          </motion.div>

          {/* Content Container */}
          <div className="relative min-h-screen flex justify-center py-12 px-4">
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="fixed top-6 right-6 z-[10000] p-3 bg-white/10 backdrop-blur-xl border border-cyan-500/30 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400 transition-all group"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
            </motion.button>

            {/* Article Content */}
            <motion.article
              ref={contentRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative max-w-4xl w-full"
            >
              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-96 rounded-3xl overflow-hidden mb-12 border border-cyan-500/20"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent" />
                
                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-6 left-6"
                >
                  <div className={`px-4 py-2 bg-gradient-to-r ${article.gradient} rounded-full text-white shadow-lg`}>
                    {article.category}
                  </div>
                </motion.div>

                {/* Glow effect */}
                <div className={`absolute -inset-2 bg-gradient-to-br ${article.gradient} opacity-20 blur-2xl -z-10`} />
              </motion.div>

              {/* Article Header */}
              <div className="mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-4xl md:text-6xl mb-6 bg-gradient-to-r ${article.gradient} bg-clip-text text-transparent leading-tight`}
                >
                  {article.title}
                </motion.h1>

                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4 text-gray-400 mb-6"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span>{article.readTime}</span>
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {article.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-full text-cyan-400"
                    >
                      <Tag className="w-4 h-4" />
                      <span>{tag}</span>
                    </motion.span>
                  ))}
                </motion.div>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl"
                >
                  <p className="text-lg text-gray-300 leading-relaxed italic">
                    {article.summary}
                  </p>
                </motion.div>
              </div>

              {/* Section Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className={`h-px bg-gradient-to-r ${article.gradient} mb-12 origin-left`}
              />

              {/* Article Content Sections */}
              <div className="space-y-12 mb-16">
                {article.content.sections.map((section, index) => (
                  <ArticleSection
                    key={index}
                    section={section}
                    index={index}
                    gradient={article.gradient}
                  />
                ))}
              </div>

              {/* Closing CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="relative p-12 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-3xl text-center overflow-hidden"
              >
                {/* Animated background */}
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `linear-gradient(45deg, rgba(34, 211, 238, 0.1), rgba(59, 130, 246, 0.1))`,
                    backgroundSize: '200% 200%',
                  }}
                />

                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl mb-4 text-white">
                    {article.cta.text}
                  </h3>
                  <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                    {article.cta.description}
                  </p>

                  <motion.a
                    href="https://calendly.com/yasirmalik2182/new-meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all group"
                  >
                    <span className="text-lg">Book a Consultation</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.a>
                </div>

                {/* Decorative particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -100],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    className="absolute bottom-0 w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      left: `${15 + i * 15}%`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ArticleSection: React.FC<{
  section: { title: string; content: string };
  index: number;
  gradient: string;
}> = ({ section, index, gradient }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <h2 className={`text-2xl md:text-3xl mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {section.title}
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        className="text-lg text-gray-300 leading-relaxed"
      >
        {section.content}
      </motion.p>
    </motion.div>
  );
};

export default ArticleOverlay;