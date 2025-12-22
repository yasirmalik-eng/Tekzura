import React from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Sparkles, 
  Target, 
  Zap, 
  Rocket, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  Cpu
} from 'lucide-react';

const About = () => {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const whoWeAreRef = React.useRef(null);
  const missionRef = React.useRef(null);
  const differenceRef = React.useRef(null);
  const howWeWorkRef = React.useRef(null);
  const visionRef = React.useRef(null);
  const ctaRef = React.useRef(null);

  const whoWeAreInView = useInView(whoWeAreRef, { once: true, amount: 0.4 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.4 });
  const differenceInView = useInView(differenceRef, { once: true, amount: 0.3 });
  const howWeWorkInView = useInView(howWeWorkRef, { once: true, amount: 0.3 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.4 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  const differencePoints = [
    {
      icon: Cpu,
      title: "We think in systems, not features",
      description: "Building interconnected solutions that work together seamlessly"
    },
    {
      icon: TrendingUp,
      title: "We design for growth, not short-term wins",
      description: "Every solution is built to scale with your business evolution"
    },
    {
      icon: Zap,
      title: "We combine automation, design, and strategy",
      description: "Creating one seamless experience that drives real results"
    }
  ];

  const workflowSteps = [
    { step: 1, title: "Discover", description: "Understanding your business challenges and goals" },
    { step: 2, title: "Design", description: "Creating a tailored solution roadmap" },
    { step: 3, title: "Develop", description: "Building with quality and precision" },
    { step: 4, title: "Optimize", description: "Testing and refining for peak performance" }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Deep dark gradient background with moving elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#141b3d] to-[#0a0e27]" />
        
        {/* Moving abstract shapes */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-purple-500/5 to-blue-600/5 rounded-full blur-3xl"
        />

        {/* Soft light waves */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30"
          >
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400">About Tekzura</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl mb-6"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI-Powered Digital Solutions
            </span>
            <br />
            <span className="text-white">Built for Scale</span>
          </motion.h2>
        </motion.div>

        {/* Who We Are */}
        <motion.div
          ref={whoWeAreRef}
          className="max-w-5xl mx-auto mb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={whoWeAreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-cyan-500/20"
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/50 rounded-br-3xl" />

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={whoWeAreInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              Who We Are
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              animate={whoWeAreInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={whoWeAreInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Tekzura is a premium digital solutions agency specializing in building intelligent, 
                scalable, and high-performance systems for modern businesses. With over{' '}
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(34, 211, 238, 0.5)',
                      '0 0 20px rgba(34, 211, 238, 0.8)',
                      '0 0 10px rgba(34, 211, 238, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-cyan-400 font-semibold"
                >
                  6 years of hands-on experience
                </motion.span>
                , we help companies transform ideas into powerful digital products that drive real, 
                measurable growth.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={whoWeAreInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                We work at the intersection of technology, automation, and strategy — delivering 
                solutions that are not only visually refined but also operationally efficient. Every 
                project we take on is designed to reduce complexity, improve performance, and create 
                long-term value.
              </motion.p>
            </motion.div>

            {/* Floating decorative element */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-400/30 flex items-center justify-center"
            >
              <Rocket className="w-12 h-12 text-cyan-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          ref={missionRef}
          className="max-w-5xl mx-auto mb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-xl border border-blue-500/20"
          >
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              Our Mission
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              animate={missionInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Our mission is to empower businesses through smart digital solutions that scale 
                effortlessly. We aim to replace manual effort with intelligent systems, transform 
                outdated processes into streamlined workflows, and help brands stay competitive in 
                an evolving digital landscape.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                We believe technology should work for your business — not the other way around. 
                That's why every solution we build is tailored, future-ready, and aligned with real 
                business goals.
              </motion.p>
            </motion.div>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={missionInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-8 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-transparent rounded-full origin-left"
            />

            {/* Background gradient shift */}
            <motion.div
              animate={missionInView ? {
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                ],
              } : {}}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl pointer-events-none -z-10"
            />
          </motion.div>
        </motion.div>

        {/* What Makes Us Different */}
        <motion.div
          ref={differenceRef}
          className="max-w-6xl mx-auto mb-32"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={differenceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            What Makes Us Different
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differencePoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={differenceInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(34, 211, 238, 0.3)'
                  }}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center"
                  >
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-xl mb-4 text-white group-hover:text-cyan-400 transition-colors">
                    {point.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {point.description}
                  </p>

                  {/* Hover glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 -z-10 blur-xl"
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* How We Work */}
        <motion.div
          ref={howWeWorkRef}
          className="max-w-6xl mx-auto mb-32"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={howWeWorkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            How We Work
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={howWeWorkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          >
            Our process is transparent, structured, and automation-driven. We begin by understanding 
            your business challenges, then design a solution roadmap tailored to your goals.
          </motion.p>

          {/* Timeline */}
          <div className="relative">
            {/* Progress line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={howWeWorkInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full origin-left hidden md:block"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={howWeWorkInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  className="relative"
                >
                  {/* Step number */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-cyan-500/50 relative z-10"
                  >
                    {step.step}
                  </motion.div>

                  {/* Content */}
                  <div className="text-center">
                    <h4 className="text-2xl mb-3 text-cyan-400">{step.title}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </div>

                  {/* Connecting arrow (desktop only) */}
                  {index < workflowSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={howWeWorkInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                      className="hidden md:block absolute top-8 -right-4 text-cyan-400"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Communication note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={howWeWorkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-center text-gray-400 mt-12 italic"
          >
            Throughout the process, communication remains clear and proactive — so you always know 
            where your project stands.
          </motion.p>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          ref={visionRef}
          className="max-w-5xl mx-auto mb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-xl border border-purple-500/20 overflow-hidden"
          >
            {/* Background motion */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
                backgroundSize: '200% 200%',
              }}
            />

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl mb-8 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent relative z-10"
            >
              Our Vision
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              animate={visionInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed relative z-10"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={visionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                We envision a future where businesses operate smarter through intelligent digital 
                systems. Tekzura is committed to building solutions that adapt, scale, and evolve — 
                helping brands remain agile in a rapidly changing world.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={visionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Our vision is not just to build websites or platforms, but to create digital 
                ecosystems that support long-term success.
              </motion.p>
            </motion.div>

            {/* Floating icon */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl border border-purple-400/30 flex items-center justify-center"
            >
              <Target className="w-16 h-16 text-purple-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          ref={ctaRef}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative p-16 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30"
          >
            <motion.h3
              initial={{ opacity: 0, scale: 0.9 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl mb-6 text-white"
            >
              Ready to build something{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                powerful?
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 mb-10"
            >
              Partner with Tekzura and transform your digital presence into a growth engine.
            </motion.p>

            <motion.a
              href="https://calendly.com/yasirmalik2182/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: '0 20px 60px rgba(34, 211, 238, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-xl font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all relative overflow-hidden group"
            >
              {/* Glow pulse effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-xl opacity-50"
              />
              
              <span className="relative z-10">Let's Talk</span>
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.a>

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
        </motion.div>
      </div>
    </section>
  );
};

export default About;