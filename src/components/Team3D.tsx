import React, { useState, useRef } from 'react';
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';  // Corrected import from motion/react
import {
  Linkedin,
  Twitter,
  Github,
  X,
  Award,
  Target,
  Users as UsersIcon,
  Zap,
  ArrowRight,
} from 'lucide-react';

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedMember, setSelectedMember] = useState<any>(null);

  /* ---------- EXAMPLE DATA (Replace with your actual data) ---------- */
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Frontend Developer',
      image: '/path/to/image.jpg',  // replace with actual image path
      gradient: 'from-indigo-500 to-blue-500',  // Customize gradient as required
      bio: 'John is a talented developer with a passion for frontend technologies.',
    },
    {
      name: 'Jane Smith',
      role: 'Backend Developer',
      image: '/path/to/image.jpg',  // replace with actual image path
      gradient: 'from-red-500 to-yellow-500',  // Customize gradient as required
      bio: 'Jane is an experienced backend developer specializing in APIs.',
    },
    // Add more members as per your data
  ];

  const whyWeWork = [
    {
      icon: Award,
      title: 'Innovation',
      description: 'We innovate to solve the toughest problems.',
      gradient: 'from-pink-500 to-yellow-500', // Customize gradient as required
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Our precision helps us achieve the highest quality.',
      gradient: 'from-teal-500 to-blue-500', // Customize gradient as required
    },
    // Add more items as per your data
  ];

  return (
    <section
      id="team"
      ref={ref}
      className="relative py-24 px-6"
      style={{ perspective: '2000px' }}
    >
      {/* Background – slow infinite removed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/4 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-4">
            Our Team
          </span>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Meet The Experts
          </motion.h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A diverse team of passionate professionals dedicated to transforming your vision into reality
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {teamMembers.map((member, index) => (
            <TeamCard3D
              key={index}
              member={member}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>

        {/* Why Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyWeWork.map((item, index) => (
            <WhyCard3D key={index} item={item} index={index} isInView={isInView} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <TeamModal3D
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

/* ---------- TEAM CARD ---------- */
const TeamCard3D = ({ member, index, isInView, onClick }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{ rotateX, rotateY }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative cursor-pointer"
    >
      <div className="rounded-2xl bg-white/5 border border-cyan-500/20 overflow-hidden">
        {/* Glow – Appears once on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}  // Glow only appears once on hover
          transition={{ duration: 0.3 }}
          className="absolute -inset-2 bg-gradient-to-br from-cyan-500 to-blue-600 blur-xl -z-10"
        />

        <div className="relative h-80 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />

          {/* Stable particles */}
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 1.6 }}
              style={{
                opacity: isHovered ? 0.5 : 0,
                top: `${20 + i * 20}%`,
                right: `${10 + i * 10}%`,
              }}
              className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br ${member.gradient}`}
            />
          ))}
        </div>

        <div className="p-6">
          <h4 className={`text-xl bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
            {member.name}
          </h4>
          <p className="text-gray-400">{member.role}</p>
          <span className="text-cyan-400 text-sm flex items-center mt-2">
            View Full Profile <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- WHY CARD ---------- */
const WhyCard3D = ({ item, index, isInView }: any) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative"
    >
      <div className="p-8 bg-white/5 border border-cyan-500/20 rounded-2xl">
        <div className={`p-4 inline-flex bg-gradient-to-br ${item.gradient} rounded-xl mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-xl text-white mb-2">{item.title}</h4>
        <p className="text-gray-400">{item.description}</p>
      </div>
    </motion.div>
  );
};

/* ---------- MODAL ---------- */
const TeamModal3D = ({ member, onClose }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="text-cyan-400" />
        </button>

        <h3 className={`text-3xl bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
          {member.name}
        </h3>
        <p className="text-gray-400 mb-4">{member.role}</p>
        <p className="text-gray-300">{member.bio}</p>
      </motion.div>
    </motion.div>
  );
};

export default Team;
