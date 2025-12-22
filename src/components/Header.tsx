import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    'Web Development',
    'E-Commerce Solutions',
    'Digital Marketing',
    'WordPress',
    'Automation & AI',
    'Lead Generation',
    'Data Entry'
  ];

  const serviceLinks = [
    'web',
    'ecommerce',
    'marketing',
    'wordpress',
    'ai',
    'leads',
    'data'
  ];

  const handleServiceClick = (serviceType: string, e: React.MouseEvent) => {
    e.preventDefault();
    // Scroll to services section and trigger the learn more
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to open the specific service detail
      window.dispatchEvent(new CustomEvent('openServiceDetail', { detail: { serviceType } }));
    }
    setServicesOpen(false);
    setMobileMenuOpen(false);
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('openAboutPage'));
    setMobileMenuOpen(false);
  };

  const teamLinks = [
    'Our Team',
    'Why Our Team Works'
  ];

  const handleTeamClick = (link: string, e: React.MouseEvent) => {
    e.preventDefault();
    const sectionId = link.toLowerCase().replace(/\s+/g, '-');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If section doesn't exist, scroll to #team
      const teamSection = document.getElementById('team');
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setTeamOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0e27]/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-white text-xl">T</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg blur opacity-30 -z-10" />
            </div>
            <span className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Tekzura
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about" onClick={handleAboutClick}>About</NavLink>
            
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-colors">
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-[#0d1333]/95 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden"
                  >
                    {services.map((service, index) => (
                      <motion.a
                        key={service}
                        href="#"
                        onClick={(e) => handleServiceClick(serviceLinks[index], e)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                      >
                        {service}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Team Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTeamOpen(true)}
              onMouseLeave={() => setTeamOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-colors">
                <span>Team</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${teamOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {teamOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-[#0d1333]/95 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden"
                  >
                    {teamLinks.map((link, index) => (
                      <motion.a
                        key={link}
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={(e) => handleTeamClick(link, e)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                      >
                        {link}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="#portfolio">Portfolio</NavLink>
            <NavLink href="#contact">Contact</NavLink>

            {/* CTA Button */}
            <motion.a
              href="https://calendly.com/yasirmalik2182/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg overflow-hidden group"
            >
              <span className="relative z-10">Book a Strategy Call</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.3)',
                    '0 0 30px rgba(34, 211, 238, 0.5)',
                    '0 0 20px rgba(34, 211, 238, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 space-y-2"
            >
              <MobileNavLink href="#home">Home</MobileNavLink>
              <MobileNavLink href="#about" onClick={handleAboutClick}>About</MobileNavLink>
              {services.map((service, index) => (
                <MobileNavLink key={service} href="#" onClick={(e) => handleServiceClick(serviceLinks[index], e)}>
                  {service}
                </MobileNavLink>
              ))}
              <MobileNavLink href="#team">Team</MobileNavLink>
              <MobileNavLink href="#portfolio">Portfolio</MobileNavLink>
              <MobileNavLink href="#contact">Contact</MobileNavLink>
              <motion.a
                href="https://calendly.com/yasirmalik2182/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-center mt-4"
              >
                Book a Strategy Call
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) => (
  <motion.a
    href={href}
    onClick={onClick}
    className="relative text-gray-300 hover:text-cyan-400 transition-colors group"
    whileHover="hover"
  >
    {children}
    <motion.span
      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
      variants={{
        hover: { width: '100%' },
      }}
      initial={{ width: 0 }}
      transition={{ duration: 0.3 }}
    />
  </motion.a>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) => (
  <motion.a
    href={href}
    onClick={onClick}
    whileTap={{ scale: 0.95 }}
    className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
  >
    {children}
  </motion.a>
);

export default Header;