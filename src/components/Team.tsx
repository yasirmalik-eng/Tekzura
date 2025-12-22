import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Linkedin, Twitter, Github, X, Award, Target, Users as UsersIcon, Zap, ArrowRight } from 'lucide-react';

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const teamMembers = [
    {
      name: 'Muhammad Yasir',
      role: 'Founder & CEO',
      image: '/yasir.jpg',
      bio: 'Visionary entrepreneur and technology leader with 6+ years of experience transforming businesses through innovative digital solutions. Yasir founded Tekzura to deliver AI-powered solutions that drive real business results.',
      skills: ['Strategic Leadership', 'Business Development', 'Digital Transformation', 'Client Relations'],
      social: { linkedin: '#', twitter: '#', github: '#' },
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      name: 'Sawera Malik',
      role: 'Full Stack Web Developer',
      image: '/sawera.webp',
      bio: 'Expert full-stack developer specializing in modern web technologies and responsive design. Sawera builds scalable, high-performance applications that deliver exceptional user experiences.',
      skills: ['React & Next.js', 'Node.js', 'Database Design', 'UI/UX Implementation'],
      social: { linkedin: '#', twitter: '#', github: '#' },
      gradient: 'from-blue-400 to-purple-500',
    },
    {
      name: 'Fakhar Malik',
      role: 'AI & Python Developer',
      image: '/fakharbhai.webp',
      bio: 'AI specialist and Python expert focused on building intelligent automation systems. Fakhar develops cutting-edge machine learning solutions that streamline operations and boost productivity.',
      skills: ['Python', 'Machine Learning', 'AI Development', 'Automation Systems'],
      social: { linkedin: '#', twitter: '#', github: '#' },
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      name: 'Muhammad Sajjad',
      role: 'Digital Marketing & Automation Expert',
      image: '/sajjadbhai.webp',
      bio: 'Digital marketing strategist with deep expertise in automation and lead generation. Sajjad creates data-driven campaigns that maximize ROI and scale business growth.',
      skills: ['Digital Marketing', 'Marketing Automation', 'Lead Generation', 'SEO/SEM'],
      social: { linkedin: '#', twitter: '#', github: '#' },
      gradient: 'from-pink-400 to-rose-500',
    },
    {
      name: 'Muhammad Mujahid',
      role: 'Social Media Manager',
      image: '/mujahidbhai.webp',
      bio: 'Creative social media strategist who builds engaging online communities. Mujahid crafts compelling content and campaigns that increase brand visibility and audience engagement.',
      skills: ['Social Media Strategy', 'Content Planning', 'Community Management', 'Brand Building'],
      social: { linkedin: '#', twitter: '#', github: '#' },
      gradient: 'from-rose-400 to-orange-500',
    },
    {
      name: 'Muhammad Hassan',
      role: 'Content Creator',
      image: '/hassanbhai.webp',
      bio: 'Talented content creator specializing in compelling storytelling and brand narratives. Hassan produces high-quality content that resonates with audiences and drives engagement.',
      skills: ['Content Creation', 'Copywriting', 'Video Production', 'Brand Storytelling'],
      social: { linkedin: '#', twitter: '#', github: '#' },
      gradient: 'from-orange-400 to-amber-500',
    },
    {
      name: 'Tahir Iqbal',
      role: 'Customer Support Specialist',
      image: '/tahirbhai.webp',
      bio: 'Dedicated customer support specialist committed to client success and satisfaction. Tahir ensures every client receives exceptional service and timely solutions to their needs.',
      skills: ['Customer Service', 'Technical Support', 'Problem Solving', 'Client Communication'],
      social: { linkedin: '#', twitter: '#', github: '#' },
      gradient: 'from-amber-400 to-cyan-500',
    },
  ];

  const whyWeWork = [
    {
      icon: UsersIcon,
      title: 'Collaborative Culture',
      description: 'We believe in the power of diverse perspectives working together towards a common goal.',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      icon: Award,
      title: 'Proven Expertise',
      description: 'Each team member brings specialized knowledge and years of experience in their domain.',
      gradient: 'from-blue-400 to-purple-500',
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on outcomes that matter, delivering measurable impact for every project.',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Cutting-Edge Tools',
      description: 'We leverage the latest technologies and methodologies to stay ahead of the curve.',
      gradient: 'from-pink-400 to-cyan-500',
    },
  ];

  return (
    <section id="team" ref={ref} className="relative py-24 px-6" style={{ perspective: '2000px' }}>
      <div className="max-w-7xl mx-auto relative z-10">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyWeWork.map((item, index) => (
            <WhyCard3D key={index} item={item} index={index} isInView={isInView} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <TeamModal3D member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

// Team Card Component
const TeamCard3D = ({ member, index, isInView, onClick }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [20, -20]);
  const rotateY = useTransform(mouseX, [-200, 200], [-20, 20]);

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
      initial={{ opacity: 0, y: 100, rotateX: -90, z: -300 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, z: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -20, z: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-cyan-500/20">
        <div className="relative h-80 overflow-hidden">
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
          />
        </div>
        <div className="p-6">
          <h4 className={`text-xl mb-1 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
            {member.name}
          </h4>
          <p className="text-gray-400">{member.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Why Card Component
const WhyCard3D = ({ item, index, isInView }: any) => {
  const Icon = item.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -90, z: -200 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, z: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: 'spring',
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -15, z: 80 }}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative group"
    >
      <div className="relative p-8 bg-white/5 backdrop-blur-md border border-cyan-500/20 rounded-2xl">
        <div className={`inline-flex p-4 bg-gradient-to-br ${item.gradient} rounded-xl mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h4 className={`text-xl mb-2 bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent`}>{item.title}</h4>
        <p className="text-gray-400">{item.description}</p>
      </div>
    </motion.div>
  );
};

// Team Modal Component
const TeamModal3D = ({ member, onClose }: any) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ perspective: '1500px' }}
    >
      <motion.div
        initial={{ scale: 0.5, rotateY: -180 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.5, rotateY: 180 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full bg-white/10 backdrop-blur-xl border border-cyan-500/30 rounded-3xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white/10 border border-cyan-500/30 rounded-full"
        >
          <X className="w-6 h-6 text-cyan-400" />
        </button>

        <div className="flex flex-col md:flex-row gap-8 p-8">
          <img src={member.image} alt={member.name} className="w-64 h-64 object-cover rounded-2xl shadow-2xl" />
          <div className="flex-1">
            <h3 className={`text-3xl mb-2 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
              {member.name}
            </h3>
            <p className="text-gray-300 text-lg mb-4">{member.role}</p>
            <p className="text-gray-400 mb-4">{member.bio}</p>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className={`px-4 py-2 bg-gradient-to-br ${member.gradient} bg-opacity-20 border border-cyan-500/30 rounded-lg text-sm text-cyan-300`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Team;
