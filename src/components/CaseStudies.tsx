import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { ArrowRight, X, TrendingUp, Target, CheckCircle } from 'lucide-react';

const CaseStudies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const caseStudies = [
    {
      title: 'E-Commerce Platform Transformation',
      client: 'RetailCo',
      industry: 'Retail',
      gradient: 'from-cyan-400 to-blue-600',
      icon: '🛒',
      overview: 'RetailCo partnered with Tekzura to modernize their e-commerce platform and dramatically improve online sales performance. The goal was to transform an outdated shopping experience into a fast, conversion-optimized digital storefront capable of supporting growth and high traffic volumes.',
      challenge: 'The existing platform suffered from slow load times, poor mobile usability, and an inefficient checkout process. These issues led to high bounce rates and low conversion performance, limiting revenue potential.',
      solution: 'Tekzura designed and implemented a high-performance e-commerce architecture with a focus on speed, usability, and conversion optimization. The platform was rebuilt with streamlined user flows, optimized product pages, and a frictionless checkout experience.',
      implementation: [
        'Complete redesign of the user experience',
        'Performance optimization for faster page loading',
        'Mobile-first shopping experience',
        'Optimized checkout and product discovery'
      ],
      results: [
        '+300% increase in conversion rate',
        '2.5-second average page load time',
        'Significant improvement in customer engagement and sales'
      ],
      keyTakeaway: 'A fast, user-focused e-commerce experience directly impacts revenue and customer satisfaction.',
      problem: 'Legacy platform couldn\'t handle growing traffic, resulting in slow page loads and 40% cart abandonment rate.',
      result: '300% increase in conversion rate, 2.5s average page load time, and $5M additional revenue in the first quarter.',
      metrics: [
        { label: 'Conversion Rate', value: '+300%' },
        { label: 'Page Load Time', value: '2.5s' },
        { label: 'Revenue Increase', value: '$5M' },
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'AWS', 'AI/ML'],
    },
    {
      title: 'Financial Services App',
      client: 'FinTech Solutions',
      industry: 'Finance',
      gradient: 'from-blue-400 to-purple-600',
      icon: '💳',
      overview: 'FinTech Solutions required a modern financial services application capable of handling complex processes with speed, accuracy, and reliability. Tekzura was brought in to streamline operations while maintaining enterprise-grade precision.',
      challenge: 'Manual workflows and outdated systems caused processing delays, errors, and scalability limitations, affecting both internal efficiency and customer experience.',
      solution: 'Tekzura developed a robust financial application with intelligent automation and optimized workflows, ensuring secure, fast, and accurate data processing.',
      implementation: [
        'Workflow redesign for operational efficiency',
        'Automation of critical financial processes',
        'High-accuracy data handling systems',
        'Performance and reliability optimization'
      ],
      results: [
        '85% reduction in processing time',
        '99.9% accuracy rate',
        'Improved operational scalability and user trust'
      ],
      keyTakeaway: 'Smart automation transforms complex financial operations into fast, reliable systems.',
      problem: 'Manual financial processes were time-consuming and error-prone, leading to customer dissatisfaction and high operational costs.',
      result: '85% reduction in processing time, 99.9% accuracy rate, and 50,000+ active users within 6 months.',
      metrics: [
        { label: 'Processing Time', value: '-85%' },
        { label: 'Accuracy Rate', value: '99.9%' },
        { label: 'Active Users', value: '50K+' },
      ],
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Stripe', 'Firebase'],
    },
    {
      title: 'Healthcare Automation System',
      client: 'MediCare Network',
      industry: 'Healthcare',
      gradient: 'from-purple-400 to-pink-600',
      icon: '🏥',
      overview: 'MediCare Network partnered with Tekzura to automate administrative workflows and improve appointment management across their healthcare facilities.',
      challenge: 'Administrative overload and manual scheduling led to inefficiencies, increased staff workload, and frequent missed appointments.',
      solution: 'Tekzura implemented an intelligent healthcare automation system that streamlined scheduling, reminders, and administrative tasks.',
      implementation: [
        'Automated appointment scheduling and reminders',
        'Centralized administrative workflows',
        'Data-driven process optimization'
      ],
      results: [
        '95% reduction in administrative workload',
        '60% decrease in missed appointments',
        'Improved patient experience and staff efficiency'
      ],
      keyTakeaway: 'Automation in healthcare improves both operational efficiency and patient outcomes.',
      problem: 'Administrative staff spent 20+ hours weekly on manual appointment scheduling and patient data entry.',
      result: '95% reduction in administrative workload, 60% fewer missed appointments, and improved patient satisfaction scores.',
      metrics: [
        { label: 'Admin Workload', value: '-95%' },
        { label: 'Missed Appointments', value: '-60%' },
        { label: 'Patient Satisfaction', value: '+45%' },
      ],
      technologies: ['Python', 'TensorFlow', 'React', 'MongoDB', 'AWS Lambda'],
    },
    {
      title: 'Marketing Campaign Platform',
      client: 'BrandBoost',
      industry: 'Marketing',
      gradient: 'from-pink-400 to-rose-600',
      icon: '📈',
      overview: 'BrandBoost needed a scalable campaign platform capable of launching, managing, and optimizing marketing initiatives rapidly and efficiently.',
      challenge: 'Slow deployment cycles and limited performance insights restricted campaign effectiveness and growth.',
      solution: 'Tekzura built a centralized marketing platform enabling rapid deployment, real-time tracking, and campaign optimization.',
      implementation: [
        'Campaign management system development',
        'Performance tracking and analytics integration',
        'Optimized deployment workflows'
      ],
      results: [
        '250% increase in campaign ROI',
        '4× faster campaign deployment',
        'Enhanced data-driven decision-making'
      ],
      keyTakeaway: 'Speed and visibility are critical for high-performing marketing campaigns.',
      problem: 'Fragmented marketing tools resulted in poor campaign tracking and inability to measure ROI effectively.',
      result: '250% increase in campaign ROI, 4x faster campaign deployment, and comprehensive cross-channel insights.',
      metrics: [
        { label: 'Campaign ROI', value: '+250%' },
        { label: 'Deployment Speed', value: '4x' },
        { label: 'Data Accuracy', value: '100%' },
      ],
      technologies: ['Vue.js', 'GraphQL', 'Redis', 'Google Analytics', 'Tableau'],
    },
    {
      title: 'Manufacturing IoT Solution',
      client: 'IndustrialTech',
      industry: 'Manufacturing',
      gradient: 'from-rose-400 to-cyan-600',
      icon: '🏭',
      overview: 'IndustrialTech required an intelligent IoT solution to monitor operations, reduce downtime, and lower operational costs.',
      challenge: 'Unplanned downtime and inefficient monitoring systems resulted in significant financial losses.',
      solution: 'Tekzura developed a real-time IoT monitoring platform that provided actionable insights and predictive maintenance capabilities.',
      implementation: [
        'IoT data collection and monitoring',
        'Real-time alerts and dashboards',
        'Predictive maintenance optimization'
      ],
      results: [
        '70% reduction in downtime',
        '$1.8M in cost savings',
        'Improved operational visibility and control'
      ],
      keyTakeaway: 'Real-time data and predictive insights drive efficiency in manufacturing operations.',
      problem: 'Equipment downtime and maintenance issues caused $2M annual losses with no predictive capabilities.',
      result: '70% reduction in unplanned downtime, $1.8M cost savings annually, and 99.5% equipment uptime.',
      metrics: [
        { label: 'Downtime Reduction', value: '-70%' },
        { label: 'Cost Savings', value: '$1.8M' },
        { label: 'Equipment Uptime', value: '99.5%' },
      ],
      technologies: ['IoT', 'TensorFlow', 'React', 'InfluxDB', 'AWS IoT'],
    },
    {
      title: 'Education Platform Scale-Up',
      client: 'EduLearn',
      industry: 'Education',
      gradient: 'from-cyan-400 to-purple-600',
      icon: '🎓',
      overview: 'EduLearn partnered with Tekzura to scale their digital education platform to support rapid user growth and high concurrency.',
      challenge: 'The existing system struggled to handle increased traffic, risking performance issues and service interruptions.',
      solution: 'Tekzura engineered a scalable, high-availability platform capable of supporting large user volumes without compromising performance.',
      implementation: [
        'Scalable system architecture',
        'Performance and load optimization',
        'High-availability infrastructure'
      ],
      results: [
        '500,000 concurrent users supported',
        '99.99% system uptime',
        'Seamless learning experience at scale'
      ],
      keyTakeaway: 'Scalable digital platforms enable sustainable growth in education technology.',
      problem: 'Platform struggled to support growing user base, with frequent crashes during peak hours affecting 100K+ students.',
      result: 'Zero downtime during peak periods, 500K concurrent users supported, and 99.99% uptime achieved.',
      metrics: [
        { label: 'Concurrent Users', value: '500K' },
        { label: 'System Uptime', value: '99.99%' },
        { label: 'Load Time', value: '-80%' },
      ],
      technologies: ['Microservices', 'Kubernetes', 'React', 'CDN', 'MongoDB'],
    },
  ];

  return (
    <section id="portfolio" ref={ref} className="relative py-24 px-6">
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
            Case Studies
          </motion.span>
          <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Real Results, Real Impact
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Explore how we've helped businesses transform their operations and achieve exceptional growth
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <CaseCard
              key={index}
              caseStudy={caseStudy}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedCase(caseStudy)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedCase && (
          <CaseModal caseStudy={selectedCase} onClose={() => setSelectedCase(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const CaseCard = ({
  caseStudy,
  index,
  isInView,
  onClick,
}: {
  caseStudy: any;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      {/* Glass card */}
      <div className="relative h-full p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-cyan-500/50">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${caseStudy.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-br ${caseStudy.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`} />

        {/* Industry tag */}
        <div className={`inline-block px-3 py-1 bg-gradient-to-r ${caseStudy.gradient} bg-opacity-20 border border-cyan-500/30 rounded-full text-cyan-400 text-xs mb-4`}>
          {caseStudy.industry}
        </div>

        {/* Title */}
        <h3 className={`text-2xl mb-3 bg-gradient-to-br ${caseStudy.gradient} bg-clip-text text-transparent`}>
          {caseStudy.title}
        </h3>

        {/* Client */}
        <p className="text-gray-400 mb-6">{caseStudy.client}</p>

        {/* Metrics preview */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {caseStudy.metrics.slice(0, 2).map((metric: any, i: number) => (
            <div key={i} className="p-3 bg-white/5 rounded-lg">
              <div className={`text-xl bg-gradient-to-r ${caseStudy.gradient} bg-clip-text text-transparent`}>
                {metric.value}
              </div>
              <div className="text-xs text-gray-500">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Learn more */}
        <button
          onClick={onClick}
          className="w-full mt-2 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-all group-hover:border-cyan-400"
        >
          <span>View Full Case Study</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

const CaseModal = ({ caseStudy, onClose }: { caseStudy: any; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-[#0d1333] border border-cyan-500/30 rounded-2xl overflow-hidden my-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
        >
          <X className="w-5 h-5 text-cyan-400" />
        </button>

        {/* Header */}
        <div className={`relative p-8 bg-gradient-to-br ${caseStudy.gradient} bg-opacity-20`}>
          <div className="inline-block px-3 py-1 bg-white/10 border border-white/30 rounded-full text-white text-xs mb-4">
            {caseStudy.industry}
          </div>
          <h2 className="text-3xl md:text-4xl mb-2 text-white">
            {caseStudy.title}
          </h2>
          <p className="text-gray-200">{caseStudy.client}</p>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {/* Overview */}
          <div className="mb-8">
            <h3 className="text-2xl text-white mb-4">Overview</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {caseStudy.overview}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {caseStudy.metrics.map((metric: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl text-center"
              >
                <div className={`text-3xl mb-2 bg-gradient-to-r ${caseStudy.gradient} bg-clip-text text-transparent`}>
                  {metric.value}
                </div>
                <div className="text-gray-400">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Challenge */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-cyan-400" />
              <h3 className="text-2xl text-cyan-400">Challenge</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl text-blue-400">Solution</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {caseStudy.solution}
            </p>
          </div>

          {/* Implementation */}
          <div className="mb-8">
            <h3 className="text-2xl text-purple-400 mb-4">Implementation</h3>
            <ul className="space-y-3">
              {caseStudy.implementation.map((item: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl text-purple-400">Results</h3>
            </div>
            <ul className="space-y-3">
              {caseStudy.results.map((item: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <TrendingUp className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Key Takeaway */}
          <div className="mb-8 p-6 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl">
            <h3 className="text-xl text-cyan-400 mb-3">💡 Key Takeaway</h3>
            <p className="text-gray-300 leading-relaxed text-lg italic">
              {caseStudy.keyTakeaway}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-lg text-gray-300 mb-4">Technologies Used</h4>
            <div className="flex flex-wrap gap-3">
              {caseStudy.technologies.map((tech: string, index: number) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className={`px-4 py-2 bg-gradient-to-r ${caseStudy.gradient} bg-opacity-20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href="#contact"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-8 inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r ${caseStudy.gradient} rounded-xl shadow-lg`}
          >
            <span>Start Your Success Story</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudies;