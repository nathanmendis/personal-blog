import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, Sparkles, X, Send, AlertCircle, CheckCircle, Monitor, Server, ShoppingBag, Zap, PenTool, Database } from 'lucide-react';
import api from '../../services/api';

const Freelance = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Freelance Inquiry',
        message: '',
        sendToSelf: false
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/contact/', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: 'Freelance Inquiry', message: '', sendToSelf: false });
        } catch (error) {
            console.error('Contact error:', error);
            setStatus('error');
        }
    };

    const services = [
        {
            title: "Frontend Engineering",
            description: "Crafting pixel-perfect, highly interactive user interfaces using modern frameworks like React and Next.js, tailored for performance and aesthetics.",
            icon: <Monitor size={24} className="text-black" />
        },
        {
            title: "Backend Architecture",
            description: "Building robust, scalable, and secure server-side solutions and APIs using Node.js, Django, and modern cloud infrastructure.",
            icon: <Database size={24} className="text-black" />
        },
        {
            title: "Shopify & E-Commerce",
            description: "Custom Shopify themes, headless commerce solutions, and checkout optimizations designed to maximize your conversion rates.",
            icon: <ShoppingBag size={24} className="text-black" />
        },
        {
            title: "UI/UX Design",
            description: "Translating brand identities into intuitive digital experiences with high-fidelity wireframing, prototyping, and modern design systems.",
            icon: <PenTool size={24} className="text-black" />
        },
        {
            title: "Performance Optimization",
            description: "Auditing and optimizing Core Web Vitals, SEO, and load times to ensure your web presence is blazingly fast and highly discoverable.",
            icon: <Zap size={24} className="text-black" />
        },
        {
            title: "Full-Stack Solutions",
            description: "End-to-end application development, taking your visionary concept from initial architecture to final production deployment.",
            icon: <Code size={24} className="text-black" />
        }
    ];

    return (
        <section id="freelance" className="py-20 relative bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-800 font-mono text-sm uppercase tracking-wider mb-6 shadow-sm"
                    >
                        <Sparkles size={16} className="text-black" />
                        Available for Freelance
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-heading font-light text-black mb-6 tracking-wide">
                        Solutions <span className="font-bold">We Offer</span>
                    </h2>
                    
                    <p className="text-lg text-slate-600 max-w-2xl font-body leading-relaxed">
                        From pixel-perfect frontend interfaces to robust backend architectures and highly optimized e-commerce platforms, we deliver end-to-end technical solutions to elevate your digital presence.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                {React.cloneElement(service.icon, { className: "group-hover:text-white transition-colors duration-300" })}
                            </div>
                            <h3 className="text-xl font-heading font-bold text-black mb-4">{service.title}</h3>
                            <p className="text-slate-500 font-body text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-4 bg-black text-white rounded-full font-semibold uppercase tracking-widest text-sm shadow-md hover:bg-slate-800 transition-all flex items-center gap-3"
                    >
                        <Send size={18} />
                        Contact Now for Freelance Work
                    </motion.button>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-glass-light border border-glass-stroke rounded-2xl shadow-2xl p-8 z-10 overflow-hidden"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">Let's Discuss Your Project</h3>
                            <p className="text-slate-500 font-body text-sm mb-6">Fill out the form below and I'll get back to you shortly.</p>

                            {status === 'success' ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h4>
                                    <p className="text-slate-500 text-sm">I'll be in touch soon.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 text-black text-sm font-medium hover:underline uppercase tracking-wider"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-black text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                        placeholder="Your Name"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-black text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                        placeholder="Email Address"
                                    />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-black text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                                        placeholder="Tell me about your freelance project needs..."
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`w-full py-4 rounded-lg font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
                                            status === 'loading' ? 'bg-slate-200 text-slate-500' : 'bg-black text-white hover:bg-slate-800 shadow-sm'
                                        }`}
                                    >
                                        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                                        {!status && <Send size={18} />}
                                    </button>
                                    {status === 'error' && (
                                        <p className="text-red-500 text-xs flex items-center gap-1 mt-2 justify-center">
                                            <AlertCircle size={12} /> Failed to send. Please try again.
                                        </p>
                                    )}
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Freelance;
