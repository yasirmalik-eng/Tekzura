import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, Code, ShoppingCart, TrendingUp, Globe, Cpu, Users, Database, Monitor, Package, BarChart3, Blocks, Zap, Target, FileCheck } from 'lucide-react';

interface ServiceDetailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: 'web' | 'ecommerce' | 'marketing' | 'wordpress' | 'ai' | 'leads' | 'data' | null;
}

const ServiceDetailOverlay = ({ isOpen, onClose, serviceType }: ServiceDetailOverlayProps) => {
  const serviceData = {
    web: {
      title: 'Web Development',
      icon: Code,
      gradient: 'from-cyan-400 to-blue-600',
      description: 'Our web development services are designed to build powerful, scalable digital foundations for modern businesses. At Tekzura, we don\'t just create websites — we engineer high-performance web applications that deliver speed, security, and long-term scalability.\n\nWe focus on clean architecture, responsive design, and optimized performance to ensure every website works seamlessly across devices and browsers. From simple landing pages to complex enterprise platforms, our solutions are built to support growth, handle increasing traffic, and provide exceptional user experiences.',
      features: [
        'Custom-built web applications tailored to your business needs',
        'Responsive and mobile-first design approach',
        'Scalable architecture designed for future expansion',
        'Performance optimization for fast load times',
        'Secure, maintainable, and SEO-friendly systems',
      ],
      ctaText: 'Start a consultation to discuss your web project goals and technical requirements.',
      phases: ['Discovery', 'Design', 'Development', 'Launch'],
      animationType: 'devices',
    },
    ecommerce: {
      title: 'E-Commerce Solutions',
      icon: ShoppingCart,
      gradient: 'from-blue-400 to-purple-600',
      description: 'Tekzura\'s e-commerce solutions are built to convert visitors into customers and customers into loyal brand advocates. We design complete online store systems that combine visual appeal with seamless functionality and optimized user journeys.\n\nOur approach focuses on creating intuitive shopping experiences, secure checkout flows, and easy product management. Whether you\'re launching a new store or scaling an existing one, we ensure your e-commerce platform is reliable, fast, and ready to grow with your business.',
      features: [
        'Custom e-commerce platform development',
        'Secure and smooth checkout experience',
        'Product, inventory, and order management',
        'Mobile-optimized shopping experiences',
        'Conversion-focused store design',
      ],
      ctaText: 'Plan your e-commerce store with a tailored strategy session.',
      phases: ['Product Setup', 'Payment Config', 'Testing', 'Go Live'],
      animationType: 'products',
    },
    marketing: {
      title: 'Digital Marketing',
      icon: TrendingUp,
      gradient: 'from-purple-400 to-pink-600',
      description: 'Our digital marketing services are built around data, strategy, and measurable outcomes. We help brands increase visibility, attract the right audience, and convert engagement into revenue through well-structured marketing systems.\n\nFrom search visibility to targeted campaigns, we design marketing strategies that align with your business goals and deliver consistent results. Every campaign is monitored, optimized, and refined to maximize return on investment.',
      features: [
        'Search engine optimization for long-term growth',
        'Paid advertising strategies with measurable ROI',
        'Social media campaigns focused on engagement',
        'Content strategies that build trust and authority',
        'Performance tracking and reporting',
      ],
      ctaText: 'Build a customized digital marketing plan aligned with your growth goals.',
      phases: ['Research', 'Strategy', 'Execution', 'Optimization'],
      animationType: 'charts',
    },
    wordpress: {
      title: 'WordPress',
      icon: Globe,
      gradient: 'from-pink-400 to-rose-600',
      description: 'Our WordPress solutions are crafted for businesses that want flexibility, performance, and ease of management without compromising on quality. We go beyond templates to build custom WordPress websites that are secure, scalable, and fully aligned with your brand.\n\nWhether you need a content-driven website, business platform, or online store, we deliver WordPress systems that are optimized for speed, usability, and long-term success.',
      features: [
        'Custom WordPress theme development',
        'Plugin customization and integration',
        'Performance and speed optimization',
        'Secure and scalable site architecture',
        'Easy content management for your team',
      ],
      ctaText: 'Start your WordPress project with a tailored development approach.',
      phases: ['Setup', 'Customization', 'Content', 'Training'],
      animationType: 'blocks',
    },
    ai: {
      title: 'Automation & AI',
      icon: Cpu,
      gradient: 'from-cyan-400 via-purple-500 to-pink-600',
      description: 'Tekzura helps businesses work smarter by designing intelligent automation systems that reduce manual work and increase efficiency. Our automation solutions are built to connect workflows, eliminate repetitive tasks, and improve operational accuracy.\n\nWe analyze your processes and design systems that streamline operations, support growth, and adapt to changing business needs. Automation is not just about speed — it\'s about building resilient, intelligent systems.',
      features: [
        'Workflow automation for repetitive processes',
        'AI-powered decision support systems',
        'Intelligent task orchestration',
        'Process optimization and system integration',
        'Scalable automation architecture',
      ],
      ctaText: 'Identify automation opportunities and design smarter workflows.',
      phases: ['Analysis', 'Design', 'Implementation', 'Scale'],
      animationType: 'nodes',
    },
    leads: {
      title: 'Lead Generation',
      icon: Users,
      gradient: 'from-blue-400 to-cyan-600',
      description: 'Our lead generation services are designed to consistently attract and convert high-quality prospects. We build structured systems that guide users from interest to action, ensuring your sales pipeline stays full and predictable.\n\nEvery lead generation strategy is customized based on your audience, market, and business objectives. We focus on quality over quantity to deliver leads that are more likely to convert.',
      features: [
        'Conversion-focused landing pages',
        'Lead capture and qualification systems',
        'Funnel design and optimization',
        'Audience targeting and segmentation',
        'Continuous performance optimization',
      ],
      ctaText: 'Create a lead generation system that drives real business growth.',
      phases: ['Attract', 'Capture', 'Nurture', 'Convert'],
      animationType: 'funnel',
    },
    data: {
      title: 'Data Entry Services',
      icon: Database,
      gradient: 'from-green-400 to-teal-600',
      description: 'Tekzura provides accurate, reliable data entry services to support smooth business operations. We help businesses maintain clean, organized, and structured data that supports reporting, automation, and decision-making.\n\nOur focus is on precision, consistency, and confidentiality. Whether ongoing support or project-based work, we ensure your data is handled with professionalism and care.',
      features: [
        'Structured data organization and management',
        'Data cleaning and validation',
        'Database and spreadsheet management',
        'CRM data support',
        'Reliable and secure data handling',
      ],
      ctaText: 'Request professional data support tailored to your needs.',
      phases: ['Collect', 'Validate', 'Process', 'Deliver'],
      animationType: 'checklist',
    },
  };

  if (!serviceType || !isOpen) return null;

  const service = serviceData[serviceType];
  const Icon = service.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Animated background based on service type */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {service.animationType === 'devices' && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-20 left-20 w-64 h-40 rounded-lg border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                >
                  <Monitor className="w-12 h-12 text-cyan-400/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="absolute top-20 right-20 w-32 h-48 rounded-2xl border-2 border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                />
              </>
            )}

            {service.animationType === 'products' && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`absolute ${i === 0 ? 'left-10 top-20' : i === 1 ? 'right-10 top-40' : 'left-1/2 bottom-20'} w-32 h-40 rounded-xl border border-purple-400/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5`}
                  >
                    <Package className="w-8 h-8 text-purple-400/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </motion.div>
                ))}
              </>
            )}

            {service.animationType === 'charts' && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-10 left-10"
                >
                  <BarChart3 className="w-40 h-40 text-pink-400/20" />
                </motion.div>
                <div className="absolute top-10 right-10">
                  <TrendingUp className="w-32 h-32 text-purple-400/10" />
                </div>
              </>
            )}

            {service.animationType === 'blocks' && (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className={`absolute ${i === 0 ? 'top-20 left-20' : i === 1 ? 'top-40 right-20' : i === 2 ? 'bottom-40 left-32' : 'bottom-20 right-32'}`}
                  >
                    <Blocks className="w-24 h-24 text-rose-400/40" />
                  </motion.div>
                ))}
              </>
            )}

            {service.animationType === 'nodes' && (
              <svg className="absolute inset-0 w-full h-full opacity-10">
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <circle
                      r={30}
                      cx={`${20 + i * 15}%`}
                      cy={`${30 + (i % 2) * 40}%`}
                      fill="rgba(168, 85, 247, 0.2)"
                      stroke="rgba(168, 85, 247, 0.4)"
                      strokeWidth="2"
                    />
                    {i < 4 && (
                      <line
                        x1={`${20 + i * 15}%`}
                        y1={`${30 + (i % 2) * 40}%`}
                        x2={`${20 + (i + 1) * 15}%`}
                        y2={`${30 + ((i + 1) % 2) * 40}%`}
                        stroke="rgba(168, 85, 247, 0.3)"
                        strokeWidth="2"
                      />
                    )}
                  </g>
                ))}
              </svg>
            )}

            {service.animationType === 'funnel' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                <svg width="300" height="400" viewBox="0 0 300 400">
                  <path
                    d="M 50 50 L 250 50 L 200 150 L 100 150 Z"
                    fill="rgba(59, 130, 246, 0.2)"
                    stroke="rgba(59, 130, 246, 0.4)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 100 150 L 200 150 L 175 250 L 125 250 Z"
                    fill="rgba(59, 130, 246, 0.3)"
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 125 250 L 175 250 L 160 350 L 140 350 Z"
                    fill="rgba(59, 130, 246, 0.4)"
                    stroke="rgba(59, 130, 246, 0.6)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            )}

            {service.animationType === 'checklist' && (
              <div className="absolute inset-0 flex items-center justify-end pr-20">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`absolute right-20 opacity-15`}
                    style={{ top: `${20 + i * 15}%` }}
                  >
                    <FileCheck className="w-20 h-20 text-teal-400/40" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-5xl bg-gradient-to-br from-[#0f1435] via-[#0a0e27] to-[#0f1435] rounded-3xl border border-cyan-500/20 shadow-2xl overflow-hidden"
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

            <div className="p-8 md:p-12">
              {/* Icon & Title */}
              <div className="flex items-center gap-6 mb-8">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} bg-opacity-20 border border-cyan-400/30 flex items-center justify-center`}
                  style={{
                    boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
                  }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h2
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                  >
                    {service.title}
                  </h2>
                  <p className="text-cyan-400/70 mt-2">
                    Premium Digital Solutions
                  </p>
                </div>
              </div>

              {/* Description */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-10"
              >
                {service.description.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-300 text-lg leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* Features Grid */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-6 text-cyan-400">What's Included</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-400/50 transition-all hover:translate-x-1"
                    >
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Timeline */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-6 text-cyan-400">Our Process</h3>
                <div className="relative">
                  {/* Connection line */}
                  <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400" />

                  <div className="relative grid grid-cols-4 gap-4">
                    {service.phases.map((phase, index) => (
                      <div
                        key={index}
                        className="relative text-center"
                      >
                        <div
                          className="relative z-10 w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold"
                          style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}
                        >
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-300">{phase}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Next Step:</h3>
                  <p className="text-gray-300">{service.ctaText}</p>
                </div>
                
                <a
                  href="https://calendly.com/yasirmalik2182/new-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative px-12 py-5 rounded-2xl bg-gradient-to-r ${service.gradient} font-semibold text-lg overflow-hidden shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-200`}
                  style={{
                    boxShadow: '0 0 40px rgba(34, 211, 238, 0.4)',
                  }}
                >
                  <span className="relative flex items-center gap-3">
                    <Zap className="w-5 h-5" />
                    Get Started with {service.title}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailOverlay;