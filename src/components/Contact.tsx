import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Send, Check, AlertCircle, Mail, Phone, MapPin, Loader } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    'Web Development',
    'E-Commerce Solutions',
    'Digital Marketing',
    'WordPress',
    'Automation & AI',
    'Lead Generation',
    'Data Entry',
    'Other',
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setFormState('loading');

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an actual API call
      console.log('Form submitted:', formData);
      setFormState('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
      });

      // Reset to idle after 5 seconds
      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 px-6">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-cyan-500 to-blue-600 rounded-full blur-3xl"
        />
      </div>

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
            Get In Touch
          </motion.span>
          <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Let's Transform Your Business
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Partner with Tekzura to build intelligent, scalable digital solutions. Schedule a free strategy call with our experts today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Contact Information
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                We're here to answer any questions you have about our services.
                Reach out and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <ContactInfoCard
                icon={Mail}
                title="Email"
                value="info@tekzura.com"
                gradient="from-cyan-400 to-blue-500"
              />
              <ContactInfoCard
                icon={Phone}
                title="Phone"
                value="+92 326 9379244"
                gradient="from-blue-400 to-purple-500"
              />
              <ContactInfoCard
                icon={MapPin}
                title="Office"
                value="Bahwalpur , Pakistan"
                gradient="from-purple-400 to-pink-500"
              />
            </div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mt-12 p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl"
            >
              <h4 className="text-xl text-cyan-400 mb-3">Business Hours</h4>
              <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM PK</p>
              <p className="text-gray-300">Weekend: By Appointment</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="relative space-y-6">
              <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl">
                <div className="space-y-6">
                  {/* Name */}
                  <InputField
                    label="Your Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    disabled={formState === 'loading' || formState === 'success'}
                  />

                  {/* Email */}
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    disabled={formState === 'loading' || formState === 'success'}
                  />

                  {/* Company */}
                  <InputField
                    label="Company Name"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    error={errors.company}
                    disabled={formState === 'loading' || formState === 'success'}
                  />

                  {/* Service */}
                  <SelectField
                    label="Service Interested In"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    options={services}
                    error={errors.service}
                    disabled={formState === 'loading' || formState === 'success'}
                  />

                  {/* Message */}
                  <TextAreaField
                    label="Project Details"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    disabled={formState === 'loading' || formState === 'success'}
                  />

                  {/* Submit Button */}
                  <SubmitButton formState={formState} />
                </div>
              </div>
            </form>

            {/* Success/Error Messages */}
            <AnimatePresence>
              {formState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center space-x-3"
                >
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-green-400">
                    Thank you! We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
              {formState === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-400">
                    Something went wrong. Please try again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactInfoCard = ({ icon: Icon, title, value, gradient }: any) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl hover:border-cyan-500/40 transition-all"
  >
    <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <h4 className="text-gray-400 text-sm mb-1">{title}</h4>
      <p className="text-gray-200">{value}</p>
    </div>
  </motion.div>
);

const InputField = ({ label, name, type, value, onChange, error, disabled }: any) => (
  <div>
    <label htmlFor={name} className="block text-gray-300 mb-2">
      {label}
    </label>
    <motion.input
      whileFocus={{ scale: 1.01 }}
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-gray-200 placeholder-gray-500 outline-none transition-all ${
        error
          ? 'border-red-500/50 focus:border-red-500'
          : 'border-cyan-500/30 focus:border-cyan-500'
      } focus:shadow-lg focus:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed`}
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-1 text-sm text-red-400 flex items-center space-x-1"
        >
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error, disabled }: any) => (
  <div>
    <label htmlFor={name} className="block text-gray-300 mb-2">
      {label}
    </label>
    <motion.select
      whileFocus={{ scale: 1.01 }}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-gray-200 outline-none transition-all ${
        error
          ? 'border-red-500/50 focus:border-red-500'
          : 'border-cyan-500/30 focus:border-cyan-500'
      } focus:shadow-lg focus:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <option value="" className="bg-[#0d1333]">Select a service</option>
      {options.map((option: string) => (
        <option key={option} value={option} className="bg-[#0d1333]">
          {option}
        </option>
      ))}
    </motion.select>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-1 text-sm text-red-400 flex items-center space-x-1"
        >
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const TextAreaField = ({ label, name, value, onChange, error, disabled }: any) => (
  <div>
    <label htmlFor={name} className="block text-gray-300 mb-2">
      {label}
    </label>
    <motion.textarea
      whileFocus={{ scale: 1.01 }}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      rows={4}
      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-gray-200 placeholder-gray-500 outline-none transition-all resize-none ${
        error
          ? 'border-red-500/50 focus:border-red-500'
          : 'border-cyan-500/30 focus:border-cyan-500'
      } focus:shadow-lg focus:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed`}
      placeholder="Tell us about your project..."
    />
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-1 text-sm text-red-400 flex items-center space-x-1"
        >
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const SubmitButton = ({ formState }: { formState: string }) => (
  <motion.button
    type="submit"
    disabled={formState === 'loading' || formState === 'success'}
    whileHover={formState === 'idle' || formState === 'error' ? { scale: 1.02, y: -2 } : {}}
    whileTap={formState === 'idle' || formState === 'error' ? { scale: 0.98 } : {}}
    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
  >
    <span className="flex items-center justify-center space-x-2">
      {formState === 'loading' && (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          <span>Sending...</span>
        </>
      )}
      {formState === 'success' && (
        <>
          <Check className="w-5 h-5" />
          <span>Message Sent!</span>
        </>
      )}
      {(formState === 'idle' || formState === 'error') && (
        <>
          <span>Schedule a Call</span>
          <Send className="w-5 h-5" />
        </>
      )}
    </span>
  </motion.button>
);

export default Contact;