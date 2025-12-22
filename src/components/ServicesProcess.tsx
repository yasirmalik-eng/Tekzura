import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Code, ShoppingCart, TrendingUp, Globe, Cpu, Target, Database, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesProcessProps {
  serviceType?: 'web' | 'ecommerce' | 'marketing' | 'wordpress' | 'ai' | 'leads' | 'data' | 'all';
}

const ServicesProcess = ({ serviceType = 'all' }: ServicesProcessProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const services = [
    {
      id: 'web',
      icon: Code,
      title: 'Web Development',
      gradient: 'from-cyan-400 to-blue-500',
      steps: [
        {
          title: 'Discovery & Requirement Analysis',
          description: 'We begin by understanding your business goals, target audience, and technical requirements. This phase ensures the solution aligns with your vision and growth strategy.'
        },
        {
          title: 'UX Planning & Architecture',
          description: 'We design the user journey, information structure, and technical architecture to ensure performance, scalability, and ease of use.'
        },
        {
          title: 'Design & Development',
          description: 'Our team builds responsive, high-performance web applications using modern frameworks, ensuring clean code and optimal user experience.'
        },
        {
          title: 'Automation Integration',
          description: 'Automated workflows are implemented for form handling, content updates, and system monitoring to reduce manual effort.'
        },
        {
          title: 'Testing & Deployment',
          description: 'We perform thorough testing for performance, security, and compatibility before launching a stable, scalable product.'
        },
        {
          title: 'Optimization & Support',
          description: 'Post-launch monitoring and continuous optimization ensure long-term performance and growth.'
        }
      ]
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      title: 'E-Commerce Solutions',
      gradient: 'from-blue-400 to-indigo-500',
      steps: [
        {
          title: 'Business & Product Analysis',
          description: 'We analyze your products, audience, and sales goals to design a conversion-focused e-commerce strategy.'
        },
        {
          title: 'Store Structure & UX Design',
          description: 'We create intuitive navigation, optimized product pages, and smooth checkout flows.'
        },
        {
          title: 'Platform Development',
          description: 'Your store is built with scalable architecture, secure payment systems, and inventory management.'
        },
        {
          title: 'Automation Setup',
          description: 'Order processing, inventory updates, and customer notifications are automated to improve efficiency.'
        },
        {
          title: 'Testing & Launch',
          description: 'We test transactions, performance, and security before going live.'
        },
        {
          title: 'Growth Optimization',
          description: 'We optimize for conversions, speed, and user behavior to increase sales over time.'
        }
      ]
    },
    {
      id: 'marketing',
      icon: TrendingUp,
      title: 'Digital Marketing',
      gradient: 'from-purple-400 to-pink-500',
      steps: [
        {
          title: 'Market & Audience Research',
          description: 'We analyze your industry, competitors, and target audience to define a data-driven strategy.'
        },
        {
          title: 'Strategy Planning',
          description: 'Campaigns are planned with clear objectives, channels, and KPIs.'
        },
        {
          title: 'Campaign Execution',
          description: 'SEO, content, ads, and social campaigns are launched with performance tracking.'
        },
        {
          title: 'Marketing Automation',
          description: 'Email sequences, lead nurturing, and reporting are automated for efficiency.'
        },
        {
          title: 'Performance Analysis',
          description: 'Data is monitored continuously to identify opportunities for improvement.'
        },
        {
          title: 'Scaling & Optimization',
          description: 'Successful campaigns are scaled to maximize ROI.'
        }
      ]
    },
    {
      id: 'wordpress',
      icon: Globe,
      title: 'WordPress',
      gradient: 'from-pink-400 to-rose-500',
      steps: [
        {
          title: 'Website Goals & Content Planning',
          description: 'We define site objectives, content structure, and functionality requirements.'
        },
        {
          title: 'Custom Design & Theme Development',
          description: 'We create a custom WordPress design aligned with your brand identity.'
        },
        {
          title: 'Development & Integration',
          description: 'Plugins, features, and content management systems are implemented.'
        },
        {
          title: 'Automation Configuration',
          description: 'Automated backups, updates, and performance monitoring are configured.'
        },
        {
          title: 'Security & Testing',
          description: 'We ensure site security, speed, and reliability before launch.'
        },
        {
          title: 'Ongoing Maintenance & Support',
          description: 'Continuous monitoring keeps your site stable and updated.'
        }
      ]
    },
    {
      id: 'ai',
      icon: Cpu,
      title: 'Automation & AI',
      gradient: 'from-rose-400 to-orange-500',
      steps: [
        {
          title: 'Process Audit & Opportunity Identification',
          description: 'We identify repetitive tasks and inefficiencies across your operations.'
        },
        {
          title: 'Workflow Design',
          description: 'Automated workflows are designed to streamline operations and reduce errors.'
        },
        {
          title: 'AI System Implementation',
          description: 'Intelligent systems are integrated to handle data processing and decision support.'
        },
        {
          title: 'Testing & Validation',
          description: 'Automations are tested for accuracy, reliability, and scalability.'
        },
        {
          title: 'Deployment & Training',
          description: 'Systems are deployed with clear documentation and training for your team.'
        },
        {
          title: 'Continuous Optimization',
          description: 'Automation systems are monitored and refined to adapt to business growth.'
        }
      ]
    },
    {
      id: 'leads',
      icon: Target,
      title: 'Lead Generation',
      gradient: 'from-orange-400 to-yellow-500',
      steps: [
        {
          title: 'Audience Definition',
          description: 'We identify ideal customer profiles and targeting criteria.'
        },
        {
          title: 'Funnel Design',
          description: 'Conversion-focused landing pages and lead capture systems are built.'
        },
        {
          title: 'Campaign Launch',
          description: 'Traffic sources and outreach campaigns are activated.'
        },
        {
          title: 'Lead Automation',
          description: 'Lead capture, scoring, and nurturing are automated for efficiency.'
        },
        {
          title: 'Qualification & Reporting',
          description: 'Qualified leads are delivered with performance insights.'
        },
        {
          title: 'Optimization & Scaling',
          description: 'Funnels are optimized to improve lead quality and volume.'
        }
      ]
    },
    {
      id: 'data',
      icon: Database,
      title: 'Data Entry',
      gradient: 'from-emerald-400 to-teal-500',
      steps: [
        {
          title: 'Data Assessment',
          description: 'We evaluate data sources, formats, and requirements.'
        },
        {
          title: 'Data Structuring',
          description: 'Data is organized into clean, usable formats.'
        },
        {
          title: 'Automated Validation',
          description: 'Automated checks ensure accuracy and consistency.'
        },
        {
          title: 'Secure Processing',
          description: 'Data is handled with confidentiality and compliance.'
        },
        {
          title: 'Quality Review',
          description: 'Manual and automated reviews ensure high accuracy.'
        },
        {
          title: 'Delivery & Maintenance',
          description: 'Clean, organized data is delivered and maintained.'
        }
      ]
    }
  ];

  return (
    <section id="services-process" ref={ref} className="relative py-32 px-6 overflow-hidden bg-[#0a0e27]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 mb-6 backdrop-blur-sm"
          >
            Our Step-by-Step Process
          </motion.span>

          <h2 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Services
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            At Tekzura, every service follows a structured, automation-driven workflow designed to deliver clarity, efficiency, and measurable results. From discovery to deployment and optimization, our process ensures quality, transparency, and scalability across all digital solutions.
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-20">
          {services.filter(service => serviceType === 'all' || service.id === serviceType).map((service, serviceIndex) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: serviceIndex * 0.05 }}
                className="relative"
              >
                {/* Service Header */}
                <div className="flex items-center gap-4 mb-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                    style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className={`text-3xl md:text-4xl bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      {serviceIndex + 1}. {service.title}
                    </h3>
                    <p className="text-cyan-400/70">Step-by-Step Process</p>
                  </div>
                </div>

                {/* Process Steps */}
                <div className="relative pl-8 md:pl-12">
                  {/* Vertical Line */}
                  <div className={`absolute left-3 md:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b ${service.gradient} opacity-30`} />

                  <div className="space-y-6">
                    {service.steps.map((step, stepIndex) => (
                      <motion.div
                        key={stepIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: stepIndex * 0.05 }}
                        className="relative group"
                      >
                        {/* Step Number Circle */}
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          className={`absolute -left-8 md:-left-12 w-10 h-10 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center text-sm z-10`}
                          style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
                        >
                          {stepIndex + 1}
                        </motion.div>

                        {/* Step Content */}
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                        >
                          <h4 className="text-xl mb-3 text-cyan-400">
                            Step {stepIndex + 1}: {step.title}
                          </h4>
                          <p className="text-gray-400 leading-relaxed">
                            {step.description}
                          </p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why This Process Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <div className="relative bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-12 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-3xl opacity-20 blur-2xl -z-10" />
            
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full blur-3xl -z-10"
            />

            <h3 className="text-4xl mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Why This Process Works
            </h3>

            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Our step-by-step approach ensures:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Clear communication at every stage',
                'Reduced manual effort through automation',
                'Scalable systems built for long-term growth',
                'Measurable outcomes and consistent quality'
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
                >
                  <CheckCircle2 className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                  <p className="text-lg text-gray-300">{benefit}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesProcess;