import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code,
  ShoppingCart,
  TrendingUp,
  Globe,
  Cpu,
  Target,
  Database,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Mail,
  ArrowRight,
  Check,
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleServiceClick = (serviceType: string, e: React.MouseEvent) => {
    e.preventDefault();
    // Scroll to services section and trigger the learn more
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to open the specific service detail
      window.dispatchEvent(new CustomEvent('openServiceDetail', { detail: { serviceType } }));
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('openAboutPage'));
  };

  const services = [
    { name: 'Web Development', icon: Code, type: 'web' },
    { name: 'E-Commerce Solutions', icon: ShoppingCart, type: 'ecommerce' },
    { name: 'Digital Marketing', icon: TrendingUp, type: 'marketing' },
    { name: 'WordPress', icon: Globe, type: 'wordpress' },
    { name: 'Automation & AI', icon: Cpu, type: 'ai' },
    { name: 'Lead Generation', icon: Target, type: 'leads' },
    { name: 'Data Entry', icon: Database, type: 'data' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#', gradient: 'from-cyan-400 to-blue-500' },
    { name: 'Twitter', icon: Twitter, href: '#', gradient: 'from-blue-400 to-purple-500' },
    { name: 'GitHub', icon: Github, href: '#', gradient: 'from-purple-400 to-pink-500' },
    { name: 'Instagram', icon: Instagram, href: '#', gradient: 'from-pink-400 to-rose-500' },
  ];

  return (
    <footer className="relative pt-24 pb-8 px-6 border-t border-cyan-500/20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-t from-cyan-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-t from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <span className="text-white text-xl">T</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg blur opacity-30 -z-10" />
              </div>
              <span className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Tekzura
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming businesses with premium AI-powered digital solutions.
              6+ years of innovation and excellence.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 bg-white/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg hover:bg-gradient-to-br hover:${social.gradient} transition-all group`}
                  >
                    <Icon className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.name}>
                    <motion.a
                      href={`#${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors group"
                      onClick={(e) => handleServiceClick(service.type, e)}
                    >
                      <Icon className="w-4 h-4 text-cyan-500/50 group-hover:text-cyan-400 transition-colors" />
                      <span>{service.name}</span>
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                    onClick={link.name === 'About' ? handleAboutClick : undefined}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest insights and offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={subscribed}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-cyan-500/30 rounded-xl text-gray-200 placeholder-gray-500 outline-none focus:border-cyan-500 transition-all disabled:opacity-50"
                />
              </div>
              <motion.button
                type="submit"
                disabled={subscribed}
                whileHover={!subscribed ? { scale: 1.02 } : {}}
                whileTap={!subscribed ? { scale: 0.98 } : {}}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
              >
                {subscribed ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 border-t border-cyan-500/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Tekzura. All rights reserved. Crafted with passion and AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <motion.a
                href="#privacy"
                whileHover={{ y: -2 }}
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#terms"
                whileHover={{ y: -2 }}
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#cookies"
                whileHover={{ y: -2 }}
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                Cookie Policy
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-2 h-2 bg-cyan-400 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-32 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full"
        />
      </div>
    </footer>
  );
};

export default Footer;