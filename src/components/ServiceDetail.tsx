import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Code, ShoppingCart, TrendingUp, Globe, Cpu, Target, Database, ArrowRight, CheckCircle } from 'lucide-react';

const ServiceDetail = () => {
  const services = [
    {
      id: 0,
      icon: Code,
      title: 'Web Development',
      subtitle: 'Build Your Digital Empire',
      description: 'We craft high-performance web applications using the latest frameworks and technologies. From responsive landing pages to complex enterprise platforms, our solutions are built to scale and deliver exceptional user experiences.',
      features: [
        'Custom Web Applications',
        'Responsive Design',
        'Progressive Web Apps (PWA)',
        'API Development & Integration',
        'Cloud Infrastructure',
        'Performance Optimization'
      ],
      gradient: 'from-cyan-400 to-blue-600',
      animationType: 'parallax',
    },
    {
      id: 1,
      icon: ShoppingCart,
      title: 'E-Commerce Solutions',
      subtitle: 'Power Your Online Store',
      description: 'Complete e-commerce platforms that drive sales and deliver seamless shopping experiences. We build secure, scalable online stores with integrated payment systems and inventory management.',
      features: [
        'Custom E-Commerce Platforms',
        'Payment Gateway Integration',
        'Shopping Cart Solutions',
        'Product Management Systems',
        'Order Tracking & Fulfillment',
        'Mobile Commerce'
      ],
      gradient: 'from-blue-400 to-indigo-600',
      animationType: 'parallax',
    },
    {
      id: 2,
      icon: TrendingUp,
      title: 'Digital Marketing',
      subtitle: 'Grow Your Audience',
      description: 'Data-driven marketing strategies that deliver measurable results. From SEO to social media campaigns, we help you reach the right audience and convert them into loyal customers.',
      features: [
        'Search Engine Optimization (SEO)',
        'Pay-Per-Click Advertising (PPC)',
        'Social Media Marketing',
        'Content Strategy & Creation',
        'Email Marketing Campaigns',
        'Analytics & Reporting'
      ],
      gradient: 'from-purple-400 to-pink-600',
      animationType: 'growth',
    },
    {
      id: 3,
      icon: Globe,
      title: 'WordPress',
      subtitle: 'Professional WordPress Solutions',
      description: 'Custom WordPress websites that combine ease of use with powerful functionality. From blogs to enterprise sites, we deliver optimized, secure WordPress solutions tailored to your needs.',
      features: [
        'Custom Theme Development',
        'Plugin Development & Integration',
        'WordPress Optimization',
        'WooCommerce Integration',
        'Migration & Maintenance',
        'Security & Backup Solutions'
      ],
      gradient: 'from-pink-400 to-rose-600',
      animationType: 'parallax',
    },
    {
      id: 4,
      icon: Cpu,
      title: 'Automation & AI',
      subtitle: 'AI-Powered Efficiency',
      description: 'Transform your business operations with intelligent automation. We implement AI-driven systems that reduce manual work, eliminate errors, and free your team to focus on strategic initiatives.',
      features: [
        'Workflow Automation',
        'AI & Machine Learning Integration',
        'Robotic Process Automation (RPA)',
        'Custom Chatbots & Virtual Assistants',
        'Data Processing & Analysis',
        'Third-Party Integration'
      ],
      gradient: 'from-rose-400 to-orange-600',
      animationType: 'connected',
    },
    {
      id: 5,
      icon: Target,
      title: 'Lead Generation',
      subtitle: 'Convert Prospects into Customers',
      description: 'Strategic lead generation systems that attract, capture, and nurture high-quality prospects. We design conversion-focused campaigns that fill your sales pipeline with qualified leads.',
      features: [
        'Landing Page Design & Optimization',
        'Lead Capture Forms & Tools',
        'Marketing Automation',
        'Lead Scoring & Qualification',
        'CRM Integration',
        'Conversion Rate Optimization'
      ],
      gradient: 'from-orange-400 to-amber-600',
      animationType: 'growth',
    },
    {
      id: 6,
      icon: Database,
      title: 'Data Entry',
      subtitle: 'Accurate & Efficient Data Management',
      description: 'Professional data entry services to keep your business information organized and accessible. We handle data processing with accuracy and efficiency, ensuring your data integrity.',
      features: [
        'Database Management',
        'Data Migration & Transfer',
        'Data Cleansing & Validation',
        'Document Digitization',
        'CRM Data Entry',
        'Spreadsheet Management'
      ],
      gradient: 'from-amber-400 to-cyan-600',
      animationType: 'parallax',
    },
  ];

  return (
    <section className="relative py-24">
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}
    </section>
  );
};

const ServiceSection = ({
  service,
  index,
}: {
  service: any;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const Icon = service.icon;

  return (
    <div
      ref={ref}
      id={`service-${index}`}
      className={`relative px-6 py-24 ${index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-1/4 w-96 h-96 bg-gradient-to-br ${service.gradient} opacity-5 rounded-full blur-3xl`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            {/* Service badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className={`inline-block px-4 py-2 bg-gradient-to-r ${service.gradient} bg-opacity-10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-6`}
            >
              Service #{index + 1}
            </motion.span>

            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {service.title}
            </h2>
            <h3 className={`text-2xl md:text-3xl mb-6 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
              {service.subtitle}
            </h3>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {service.description}
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {service.features.map((feature: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className={`w-5 h-5 mt-0.5 text-cyan-400 flex-shrink-0`} />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r ${service.gradient} rounded-xl shadow-lg hover:shadow-2xl transition-all group`}
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 relative"
          >
            {service.animationType === 'parallax' && (
              <ParallaxVisual service={service} scrollYProgress={scrollYProgress} />
            )}
            {service.animationType === 'connected' && (
              <ConnectedNodesVisual service={service} />
            )}
            {service.animationType === 'growth' && (
              <GrowthChartVisual service={service} isInView={isInView} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Parallax Visual Component
const ParallaxVisual = ({ service, scrollYProgress }: any) => {
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const Icon = service.icon;

  return (
    <div className="relative w-full h-96">
      {/* Main icon */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className={`p-12 bg-gradient-to-br ${service.gradient} rounded-3xl shadow-2xl`}>
          <Icon className="w-24 h-24 text-white" />
        </div>
        <div className={`absolute -inset-4 bg-gradient-to-br ${service.gradient} rounded-3xl blur-2xl opacity-50 -z-10`} />
      </motion.div>

      {/* Floating elements */}
      <motion.div
        style={{ y: y2 }}
        className={`absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-30`}
      />
      <motion.div
        style={{ y: y1 }}
        className={`absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-full opacity-20`}
      />
    </div>
  );
};

// Connected Nodes Visual
const ConnectedNodesVisual = ({ service }: any) => {
  return (
    <div className="relative w-full h-96">
      <svg className="w-full h-full">
        {/* Animated connecting lines */}
        {[
          { x1: '20%', y1: '30%', x2: '50%', y2: '50%' },
          { x1: '80%', y1: '30%', x2: '50%', y2: '50%' },
          { x1: '50%', y1: '50%', x2: '30%', y2: '80%' },
          { x1: '50%', y1: '50%', x2: '70%', y2: '80%' },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatType: 'reverse' }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodes */}
      {[
        { top: '30%', left: '20%', delay: 0 },
        { top: '30%', left: '80%', delay: 0.2 },
        { top: '50%', left: '50%', delay: 0.4 },
        { top: '80%', left: '30%', delay: 0.6 },
        { top: '80%', left: '70%', delay: 0.8 },
      ].map((node, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: node.delay }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: node.top, left: node.left }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                '0 0 20px rgba(34, 211, 238, 0.3)',
                '0 0 30px rgba(34, 211, 238, 0.6)',
                '0 0 20px rgba(34, 211, 238, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
            className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-full`}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Growth Chart Visual
const GrowthChartVisual = ({ service, isInView }: any) => {
  const bars = [
    { height: '40%', delay: 0 },
    { height: '55%', delay: 0.1 },
    { height: '65%', delay: 0.2 },
    { height: '80%', delay: 0.3 },
    { height: '95%', delay: 0.4 },
  ];

  return (
    <div className="relative w-full h-96 flex items-end justify-center space-x-8 px-12">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          animate={isInView ? { height: bar.height, opacity: 1 } : {}}
          transition={{ duration: 1, delay: bar.delay, ease: 'easeOut' }}
          className={`w-16 bg-gradient-to-t ${service.gradient} rounded-t-xl relative`}
        >
          <motion.div
            animate={{
              boxShadow: [
                `0 0 20px rgba(34, 211, 238, 0.3)`,
                `0 0 30px rgba(34, 211, 238, 0.6)`,
                `0 0 20px rgba(34, 211, 238, 0.3)`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: bar.delay }}
            className="absolute inset-0 rounded-t-xl"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceDetail;
