import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'motion/react';
import { Code, ShoppingCart, TrendingUp, Globe, Cpu, Target, Database, ArrowRight } from 'lucide-react';
import ServiceDetailOverlay from './ServiceDetailOverlay';

const ServicesOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedService, setSelectedService] = useState<'web' | 'ecommerce' | 'marketing' | 'wordpress' | 'ai' | 'leads' | 'data' | null>(null);

  useEffect(() => {
    const handleOpenServiceDetail = (e: any) => {
      const serviceType = e.detail.serviceType;
      setSelectedService(serviceType);
    };

    window.addEventListener('openServiceDetail', handleOpenServiceDetail);
    return () => window.removeEventListener('openServiceDetail', handleOpenServiceDetail);
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications built with cutting-edge technologies for maximum performance and scalability.',
      gradient: 'from-cyan-400 to-blue-500',
      glowColor: 'cyan',
      type: 'web' as const,
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Solutions',
      description: 'Complete online store solutions that drive sales and deliver exceptional shopping experiences.',
      gradient: 'from-blue-400 to-indigo-500',
      glowColor: 'blue',
      type: 'ecommerce' as const,
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Data-driven marketing strategies that increase visibility, engagement, and conversions.',
      gradient: 'from-purple-400 to-pink-500',
      glowColor: 'purple',
      type: 'marketing' as const,
    },
    {
      icon: Globe,
      title: 'WordPress',
      description: 'Professional WordPress websites with custom themes, plugins, and optimized performance.',
      gradient: 'from-pink-400 to-rose-500',
      glowColor: 'pink',
      type: 'wordpress' as const,
    },
    {
      icon: Cpu,
      title: 'Automation & AI',
      description: 'Intelligent automation systems powered by AI to streamline operations and boost productivity.',
      gradient: 'from-rose-400 to-orange-500',
      glowColor: 'rose',
      type: 'ai' as const,
    },
    {
      icon: Target,
      title: 'Lead Generation',
      description: 'Strategic campaigns and systems designed to attract and convert high-quality leads.',
      gradient: 'from-orange-400 to-amber-500',
      glowColor: 'orange',
      type: 'leads' as const,
    },
    {
      icon: Database,
      title: 'Data Entry',
      description: 'Accurate and efficient data entry services to keep your business information organized.',
      gradient: 'from-amber-400 to-cyan-500',
      glowColor: 'amber',
      type: 'data' as const,
    },
  ];

  return (
    <section ref={ref} id="services" className="relative py-24 px-6" style={{ perspective: '2000px' }}>
      {/* Premium 3D Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradient overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.1),transparent_70%)]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(236,72,153,0.08),transparent_70%)]" />
        </div>

        {/* Animated gradient orb */}
        <motion.div
          animate={{
            rotateZ: [0, 360],
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/8 via-pink-500/5 to-transparent rounded-full blur-3xl"
        />

        {/* Hexagon pattern background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2322d3ee' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-16 h-16 border border-cyan-400/20 rounded-lg"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -45 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, type: 'spring' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.8, type: 'spring' }}
            whileHover={{ scale: 1.1, rotateY: 360 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-4 backdrop-blur-sm"
          >
            Our Services
          </motion.span>
          
          <motion.h2
            animate={isInView ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #ffffff, #22d3ee, #3b82f6, #8b5cf6, #ffffff)',
              backgroundSize: '200% auto',
              transformStyle: 'preserve-3d',
              translateZ: 20
            }}
            className="text-4xl md:text-6xl mb-6 bg-clip-text text-transparent"
          >
            Complete Digital Solutions
          </motion.h2>
          
          <p className="text-gray-400 text-lg max-w-3xl mx-auto" style={{ transformStyle: 'preserve-3d', translateZ: 10 }}>
            From concept to deployment, we deliver premium digital experiences
            that transform businesses and exceed expectations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} isInView={isInView} setSelectedService={setSelectedService} />
          ))}
        </div>
      </div>

      {/* Service Detail Overlay */}
      <ServiceDetailOverlay
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        serviceType={selectedService}
      />
    </section>
  );
};

const ServiceCard = ({ service, index, isInView, setSelectedService }: any) => {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        y: -10,
        z: 50,
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
    >
      {/* 3D Card container */}
      <div
        className="relative h-full p-6 bg-white/5 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-colors"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 3D Glow effect */}
        <div
          className="absolute -inset-1 rounded-2xl -z-10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${service.glowColor === 'cyan' ? '#22d3ee' : service.glowColor === 'blue' ? '#3b82f6' : service.glowColor === 'purple' ? '#8b5cf6' : service.glowColor === 'pink' ? '#ec4899' : service.glowColor === 'rose' ? '#f43f5e' : service.glowColor === 'orange' ? '#f97316' : '#f59e0b'}, transparent)`,
          }}
        />

        {/* 3D Icon */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            translateZ: 30,
          }}
          whileHover={{
            rotateY: 180,
            scale: 1.1,
            transition: { duration: 0.6, type: 'spring' },
          }}
          className="mb-6 relative"
        >
          <div
            className={`inline-flex p-4 bg-gradient-to-br ${service.gradient} rounded-xl shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Title with 3D effect */}
        <h3
          className={`text-xl mb-3 bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent font-semibold`}
          style={{ transformStyle: 'preserve-3d', translateZ: 20 }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="text-gray-400 text-sm mb-4 leading-relaxed"
          style={{ transformStyle: 'preserve-3d', translateZ: 15 }}
        >
          {service.description}
        </p>

        {/* 3D Learn More button */}
        <motion.button
          whileHover={{
            x: 5,
            scale: 1.05,
          }}
          style={{ transformStyle: 'preserve-3d', translateZ: 25 }}
          className={`inline-flex items-center space-x-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedService(service.type);
          }}
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServicesOverview;