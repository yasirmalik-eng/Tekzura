import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'motion/react';
import { Award, Briefcase, Users, Zap } from 'lucide-react';

const Stats = () => {
  const ref = useRef(null);

  // 🔹 trigger earlier
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const stats = [
    {
      icon: Award,
      value: 6,
      suffix: '+',
      label: 'Years of Excellence',
      color: 'from-cyan-400 to-blue-500',
      description: 'Proven track record',
    },
    {
      icon: Briefcase,
      value: 150,
      suffix: '+',
      label: 'Projects Delivered',
      color: 'from-blue-400 to-purple-500',
      description: 'Successfully completed',
    },
    {
      icon: Users,
      value: 80,
      suffix: '+',
      label: 'Global Clients',
      color: 'from-purple-400 to-pink-500',
      description: 'Trusted partnerships',
    },
    {
      icon: Zap,
      value: 65,
      suffix: '+',
      label: 'AI Solutions Deployed',
      color: 'from-pink-400 to-cyan-500',
      description: 'Automation systems',
    },
  ];

  return (
    <section ref={ref} className="relative py-24 px-6" style={{ perspective: '1500px' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotateZ: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: -30 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            animate={isInView ? { backgroundPosition: ['0% 50%', '100% 50%'] } : {}}
            transition={{ duration: 2 }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6)',
              backgroundSize: '200% auto',
            }}
            className="text-4xl md:text-5xl mb-4 bg-clip-text text-transparent"
          >
            Trusted by Industry Leaders
          </motion.h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Delivering exceptional results with proven expertise and cutting-edge technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  stat,
  index,
  isInView,
}: {
  stat: {
    icon: any;
    value: number;
    suffix: string;
    label: string;
    color: string;
    description: string;
  };
  index: number;
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

  useEffect(() => {
    if (!isInView) return;

    // 🔹 counter completes in ≤ 1.2s
    const duration = 1200;
    const steps = 50;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -60 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -12, scale: 1.04 }}
      className="relative group"
    >
      <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />

        <div className={`inline-flex p-4 mb-4 bg-gradient-to-br ${stat.color} rounded-xl`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        <span className={`text-5xl bg-gradient-to-br ${stat.color} bg-clip-text text-transparent block`}>
          {count}{stat.suffix}
        </span>

        <p className="text-gray-300 mt-2">{stat.label}</p>
      </div>
    </motion.div>
  );
};

export default Stats;
