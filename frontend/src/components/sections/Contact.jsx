import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle, Mail, MapPin } from 'lucide-react';
import api from '../../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
        sendToSelf: false
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/contact/', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '', sendToSelf: false });
        } catch (error) {
            console.error('Contact error:', error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-20 relative">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Left Panel - Visual/Info */}
                    <div className="md:w-5/12">
                        <div className="glass-panel p-8 h-full relative overflow-hidden rounded-2xl flex flex-col justify-between">

                            <div>
                                <h2 className="text-4xl font-heading font-bold mb-6 text-white">
                                    Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Collab</span>
                                </h2>
                                <p className="text-gray-400 font-body text-lg leading-relaxed mb-12">
                                    Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                                </p>
                            </div>

                            <div className="space-y-8 font-body text-sm text-gray-300">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider mb-1 text-gray-500">Email Me</p>
                                        <p className="text-white text-lg font-medium group-hover:text-primary transition-colors">nathanmendis17@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider mb-1 text-gray-500">Location</p>
                                        <p className="text-white text-lg font-medium">Remote / Worldwide</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative orb */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Right Panel - The Form */}
                    <div className="md:w-7/12">
                        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-white placeholder-gray-600 outline-none transition-all font-body text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-white placeholder-gray-600 outline-none transition-all font-body text-sm"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-white outline-none transition-all font-body text-sm appearance-none"
                                >
                                    <option value="General Inquiry" className="bg-glass-dark text-white">General Inquiry</option>
                                    <option value="Freelance Project" className="bg-glass-dark text-white">Freelance Project</option>
                                    <option value="Collaboration" className="bg-glass-dark text-white">Collaboration</option>
                                    <option value="Recruitment" className="bg-glass-dark text-white">Recruitment</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-white placeholder-gray-600 outline-none transition-all font-body text-sm resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <div className="relative inline-block w-11 h-6 transition duration-200 ease-in-out">
                                    <input
                                        type="checkbox"
                                        name="sendToSelf"
                                        id="sendToSelf"
                                        checked={formData.sendToSelf}
                                        onChange={handleChange}
                                        className="opacity-0 w-0 h-0 absolute"
                                    />
                                    <label
                                        htmlFor="sendToSelf"
                                        className={`block overflow-hidden h-6 rounded-full cursor-pointer border border-white/10 transition-colors duration-200 ${formData.sendToSelf ? 'bg-primary' : 'bg-white/10'}`}
                                    ></label>
                                    <label
                                        htmlFor="sendToSelf"
                                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ease-in-out cursor-pointer ${formData.sendToSelf ? 'translate-x-5' : 'translate-x-0'}`}
                                    ></label>
                                </div>
                                <label htmlFor="sendToSelf" className="text-gray-400 font-body text-xs cursor-pointer select-none tracking-wide">
                                    Send a copy to my email
                                </label>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`
                                        group relative px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-300
                                        ${status === 'loading' ? 'bg-white/10 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white'}
                                    `}
                                >
                                    <span className="flex items-center gap-2">
                                        {status === 'loading' ? 'Sending...' :
                                            status === 'success' ? 'Message Sent' :
                                                'Send Message'}

                                        {status === 'success' ? <CheckCircle size={18} /> :
                                            status === 'loading' ? null : <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                                    </span>
                                </button>
                            </div>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3"
                                >
                                    <CheckCircle className="text-green-500" size={20} />
                                    <p className="text-green-400 text-sm">Message sent successfully! I'll get back to you soon.</p>
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3"
                                >
                                    <AlertCircle className="text-red-500" size={20} />
                                    <p className="text-red-400 text-sm">Something went wrong. Please try again later.</p>
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
