import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What services does Tekzura offer?',
      answer: 'We offer comprehensive digital solutions including web development, mobile app development, AI-powered automation, digital marketing, and branding & design. Our team specializes in creating custom solutions tailored to your specific business needs.',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while complex enterprise applications can take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.',
      gradient: 'from-blue-400 to-purple-500',
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Absolutely! We offer comprehensive maintenance and support packages to ensure your digital solutions continue to perform optimally. This includes security updates, bug fixes, performance monitoring, and feature enhancements based on your evolving needs.',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      question: 'What is your development process?',
      answer: 'We follow an agile methodology with regular client communication. The process includes: discovery & planning, design & prototyping, development & testing, deployment, and ongoing optimization. You\'ll have full visibility and input throughout each phase.',
      gradient: 'from-pink-400 to-rose-500',
    },
    {
      question: 'Can you work with our existing systems?',
      answer: 'Yes! We have extensive experience integrating with existing systems and platforms. Whether it\'s legacy software, third-party APIs, or cloud services, our team can create seamless integrations that enhance your current infrastructure.',
      gradient: 'from-rose-400 to-cyan-500',
    },
    {
      question: 'What industries do you serve?',
      answer: 'We serve clients across diverse industries including e-commerce, finance, healthcare, education, manufacturing, and more. Our team\'s diverse expertise allows us to understand unique industry challenges and deliver tailored solutions.',
      gradient: 'from-cyan-400 to-purple-500',
    },
    {
      question: 'How do you ensure project security?',
      answer: 'Security is our top priority. We implement industry-standard security practices including encrypted data transmission, secure authentication, regular security audits, and compliance with relevant regulations (GDPR, HIPAA, etc.). All code undergoes rigorous security testing.',
      gradient: 'from-purple-400 to-blue-500',
    },
    {
      question: 'What are your pricing models?',
      answer: 'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. The best model depends on your project scope and needs. We provide transparent, detailed quotes with no hidden fees after our initial consultation.',
      gradient: 'from-blue-400 to-cyan-500',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
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
            FAQ
          </motion.span>
          <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Got questions? We've got answers. If you don't see what you're looking for, feel free to contact us.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({
  faq,
  index,
  isOpen,
  onClick,
  isInView,
}: {
  faq: any;
  index: number;
  isOpen: boolean;
  onClick: () => void;
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div
        className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10'
            : 'border-cyan-500/20 hover:border-cyan-500/40'
        }`}
      >
        {/* Background gradient on hover/open */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} opacity-0 transition-opacity duration-300 ${
            isOpen ? 'opacity-5' : 'group-hover:opacity-5'
          }`}
        />

        {/* Question */}
        <button
          onClick={onClick}
          className="relative w-full px-6 py-5 flex items-center justify-between text-left"
        >
          <span className="text-lg text-gray-200 pr-8">{faq.question}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 p-2 rounded-full ${
              isOpen ? 'bg-cyan-500/20' : 'bg-white/5'
            } transition-colors`}
          >
            {isOpen ? (
              <Minus className="w-5 h-5 text-cyan-400" />
            ) : (
              <Plus className="w-5 h-5 text-cyan-400" />
            )}
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                className="px-6 pb-6"
              >
                <div className="pt-2 pb-4 border-t border-cyan-500/20">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect on open */}
        {isOpen && (
          <div className={`absolute -inset-1 bg-gradient-to-br ${faq.gradient} opacity-20 blur-xl -z-10`} />
        )}
      </div>
    </motion.div>
  );
};

export default FAQ;
