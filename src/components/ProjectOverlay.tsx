import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight, Sparkles, User, Mail, Phone, Building, MessageSquare, Target } from 'lucide-react';

interface ProjectOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectOverlay = ({ isOpen, onClose }: ProjectOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { title: 'Share Your Vision', icon: Sparkles, description: 'Tell us about your project goals' },
    { title: 'Strategic Planning', icon: CheckCircle, description: 'We analyze and design the solution' },
    { title: 'Precision Execution', icon: CheckCircle, description: 'Development with your success in mind' },
    { title: 'Launch & Scale', icon: CheckCircle, description: 'Deploy and grow with confidence' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
      });
      onClose();
    }, 3000);
  };

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

          {/* Animated gradient light flow from edges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
            <motion.div
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"
            />
            <motion.div
              animate={{
                x: ['100%', '-100%'],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-purple-400 to-transparent"
            />
            <motion.div
              animate={{
                y: ['100%', '-100%'],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-0 right-0 w-1 h-full bg-gradient-to-t from-transparent via-cyan-400 to-transparent"
            />
          </motion.div>

          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-5xl bg-gradient-to-br from-[#0f1435] via-[#0a0e27] to-[#0f1435] rounded-3xl border border-cyan-500/20 shadow-2xl overflow-hidden my-8"
            style={{
              boxShadow: '0 0 60px rgba(34, 211, 238, 0.2), inset 0 0 60px rgba(34, 211, 238, 0.05)',
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
            <div className="p-8 md:p-12 max-h-[85vh] overflow-y-auto">
              {/* Headline with animated entry */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% 100%' }}
                >
                  <h2 className="text-4xl md:text-5xl mb-6">Start Your Project</h2>
                </motion.div>
              </motion.div>

              {/* Description with line-by-line reveal */}
              <div className="space-y-4 mb-12">
                {[
                  'Starting a project with Tekzura means partnering with a team that understands both technology and business strategy.',
                  'This step allows you to share your vision, goals, and challenges so we can design a solution that delivers real impact.',
                  'Whether you\'re launching a new digital product or improving existing systems, we approach every project with precision, creativity, and long-term scalability in mind.',
                ].map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Multi-step progress indicator */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="mb-12"
              >
                <h3 className="text-xl mb-6 text-cyan-400">What Happens Next</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.2 + index * 0.15, duration: 0.5 }}
                        onMouseEnter={() => setCurrentStep(index)}
                        className="relative p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
                        style={{
                          boxShadow: currentStep === index ? '0 0 30px rgba(34, 211, 238, 0.3)' : 'none',
                        }}
                      >
                        {/* Step number */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm shadow-lg">
                          {index + 1}
                        </div>

                        <div className="flex items-start gap-4">
                          <motion.div
                            animate={{
                              scale: currentStep === index ? 1.1 : 1,
                              rotate: currentStep === index ? 360 : 0,
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex-shrink-0"
                          >
                            <Icon className="w-8 h-8 text-cyan-400" />
                          </motion.div>
                          <div>
                            <h4 className="text-white mb-1 group-hover:text-cyan-400 transition-colors">
                              {step.title}
                            </h4>
                            <p className="text-gray-400 text-sm">{step.description}</p>
                          </div>
                        </div>

                        {/* Animated highlight bar */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: currentStep === index ? '100%' : 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Project Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="space-y-6"
              >
                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.7 }}
                  >
                    <label htmlFor="name" className="block text-sm text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.9 }}
                  >
                    <label htmlFor="phone" className="block text-sm text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </motion.div>

                  {/* Company */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2.0 }}
                  >
                    <label htmlFor="company" className="block text-sm text-gray-300 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
                        placeholder="Your Company"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Project Type */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.1 }}
                  >
                    <label htmlFor="projectType" className="block text-sm text-gray-300 mb-2">
                      Project Type *
                    </label>
                    <div className="relative">
                      <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0a0e27]">Select Type</option>
                        <option value="web-development" className="bg-[#0a0e27]">Web Development</option>
                        <option value="ecommerce" className="bg-[#0a0e27]">E-Commerce</option>
                        <option value="digital-marketing" className="bg-[#0a0e27]">Digital Marketing</option>
                        <option value="wordpress" className="bg-[#0a0e27]">WordPress</option>
                        <option value="automation-ai" className="bg-[#0a0e27]">Automation & AI</option>
                        <option value="lead-generation" className="bg-[#0a0e27]">Lead Generation</option>
                        <option value="data-entry" className="bg-[#0a0e27]">Data Entry</option>
                        <option value="other" className="bg-[#0a0e27]">Other</option>
                      </select>
                    </div>
                  </motion.div>

                  {/* Budget */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.2 }}
                  >
                    <label htmlFor="budget" className="block text-sm text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0a0e27]">Select Budget</option>
                      <option value="under-5k" className="bg-[#0a0e27]">Under $5,000</option>
                      <option value="5k-10k" className="bg-[#0a0e27]">$5,000 - $10,000</option>
                      <option value="10k-25k" className="bg-[#0a0e27]">$10,000 - $25,000</option>
                      <option value="25k-50k" className="bg-[#0a0e27]">$25,000 - $50,000</option>
                      <option value="50k-plus" className="bg-[#0a0e27]">$50,000+</option>
                    </select>
                  </motion.div>

                  {/* Timeline */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.3 }}
                  >
                    <label htmlFor="timeline" className="block text-sm text-gray-300 mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0a0e27]">Select Timeline</option>
                      <option value="asap" className="bg-[#0a0e27]">ASAP</option>
                      <option value="1-2-months" className="bg-[#0a0e27]">1-2 Months</option>
                      <option value="3-6-months" className="bg-[#0a0e27]">3-6 Months</option>
                      <option value="6-plus-months" className="bg-[#0a0e27]">6+ Months</option>
                      <option value="flexible" className="bg-[#0a0e27]">Flexible</option>
                    </select>
                  </motion.div>
                </div>

                {/* Project Description */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.4 }}
                >
                  <label htmlFor="description" className="block text-sm text-gray-300 mb-2">
                    Project Description *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all resize-none"
                      placeholder="Tell us about your project goals, challenges, and what you're looking to achieve..."
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="flex justify-center pt-6"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.05, y: isSubmitting || isSubmitted ? 0 : -5 }}
                    whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                    className="group relative px-12 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg overflow-hidden shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      boxShadow: '0 0 40px rgba(34, 211, 238, 0.4)',
                    }}
                  >
                    {/* Animated glow */}
                    {!isSubmitted && (
                      <motion.div
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    )}

                    <span className="relative flex items-center gap-3">
                      {isSubmitting && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      )}
                      {isSubmitted && <CheckCircle className="w-5 h-5" />}
                      {isSubmitted ? 'Submitted Successfully!' : isSubmitting ? 'Submitting...' : 'Submit Your Project Details'}
                      {!isSubmitting && !isSubmitted && (
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </motion.form>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectOverlay;
