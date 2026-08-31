import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, CheckCircle, Mail, MapPin, RotateCcw } from 'lucide-react';
import api from '../../services/api';

/* ── Sending animation shown while API call is in flight ── */
const SendingPanel = () => {
    return (
        <motion.div
            key="sending"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center gap-8 min-h-[420px] relative overflow-hidden"
        >
            {/* Background pulse rings */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-primary/20"
                    initial={{ width: 60, height: 60, opacity: 0.6 }}
                    animate={{ width: 60 + i * 80, height: 60 + i * 80, opacity: 0 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.55,
                        ease: 'easeOut',
                    }}
                />
            ))}

            {/* Paper-plane icon launching */}
            <div className="relative z-10 flex flex-col items-center gap-2">
                <motion.div
                    animate={{
                        y: [0, -8, 0, -14, 0],
                        rotate: [0, -5, 0, 5, 0],
                        x: [0, 4, 0, -4, 0],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
                >
                    <Send size={36} className="text-primary translate-x-0.5" strokeWidth={1.5} />
                </motion.div>

                {/* Trail dots beneath the plane */}
                <div className="flex gap-1.5 mt-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.25,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Text */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 space-y-1"
            >
                <h3 className="text-xl font-heading font-bold text-slate-800">Sending your message</h3>
                <p className="text-slate-400 font-body text-sm">Hang tight, this only takes a moment…</p>
            </motion.div>

            {/* Scanning progress bar */}
            <div className="relative z-10 w-48 h-1 rounded-full bg-glass-stroke overflow-hidden">
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
                />
            </div>
        </motion.div>
    );
};

/* ── Success animation shown in place of the form ── */
const SuccessPanel = ({ name, onReset }) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const id = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 500);
        return () => clearInterval(id);
    }, []);

    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center gap-6 min-h-[420px] relative overflow-hidden"
        >
            {/* Decorative rings */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute w-72 h-72 rounded-full border border-primary/10"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute w-52 h-52 rounded-full border border-primary/15"
            />

            {/* Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
                className="relative z-10 w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 14 }}
                >
                    <CheckCircle size={40} className="text-primary" strokeWidth={1.5} />
                </motion.div>

                {/* Orbiting dot */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(3,174,210,0.5)]" />
                </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="relative z-10 space-y-2"
            >
                <h3 className="text-2xl font-heading font-bold text-slate-900">
                    Message Received{dots}
                </h3>
                <p className="text-slate-500 font-body text-sm max-w-xs mx-auto leading-relaxed">
                    {name ? `Thanks, ${name}!` : 'Thanks!'} I'll get back to you as soon as possible.
                </p>
            </motion.div>

            {/* Animated bar */}
            <motion.div className="relative z-10 w-40 h-1 rounded-full bg-glass-stroke overflow-hidden">
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
                />
            </motion.div>

            {/* Reset button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={onReset}
                className="relative z-10 flex items-center gap-2 text-xs text-slate-400 hover:text-primary transition-colors font-body tracking-wide"
            >
                <RotateCcw size={13} />
                Send another message
            </motion.button>
        </motion.div>
    );
};

/* ── Main contact section ── */
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
        sendToSelf: false
    });
    const [status, setStatus] = useState('idle');
    const [submittedName, setSubmittedName] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/contact/', formData);
            setSubmittedName(formData.name.split(' ')[0]);
            setStatus('success');
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '', sendToSelf: false });
        } catch (error) {
            console.error('Contact error:', error);
            setStatus('error');
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setSubmittedName('');
    };

    return (
        <section id="contact" className="py-20 relative">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Left Panel - Info */}
                    <div className="md:w-5/12">
                        <div className="glass-panel p-8 h-full relative overflow-hidden rounded-2xl flex flex-col justify-between">
                            <div>
                                <h2 className="text-4xl font-heading font-bold mb-6 text-slate-900">
                                    Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Collab</span>
                                </h2>
                                <p className="text-slate-500 font-body text-lg leading-relaxed mb-12">
                                    Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                                </p>
                            </div>

                            <div className="space-y-8 font-body text-sm text-slate-600">
                                <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open('mailto:nathanmendis17@gmail.com')}>
                                    <div className="w-12 h-12 rounded-full bg-glass-card flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider mb-1 text-slate-400">Email Me</p>
                                        <p className="text-slate-800 text-lg font-medium group-hover:text-primary transition-colors">nathanmendis17@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-glass-card flex items-center justify-center text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-all duration-300">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider mb-1 text-slate-400">Location</p>
                                        <p className="text-slate-800 text-lg font-medium">Remote / Worldwide</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative orb */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
                        </div>
                    </div>

                    {/* Right Panel - Form or Success */}
                    <div className="md:w-7/12">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <SuccessPanel key="success" name={submittedName} onReset={handleReset} />
                            ) : status === 'loading' ? (
                                <SendingPanel key="sending" />
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.96 }}
                                    transition={{ duration: 0.4 }}
                                    onSubmit={handleSubmit}
                                    className="glass-panel p-8 rounded-2xl space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Your Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-glass-light border border-glass-stroke rounded-lg focus:border-primary focus:bg-glass-surface focus:ring-1 focus:ring-primary px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition-all font-body text-sm"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-glass-light border border-glass-stroke rounded-lg focus:border-primary focus:bg-glass-surface focus:ring-1 focus:ring-primary px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition-all font-body text-sm"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Subject</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-glass-light border border-glass-stroke rounded-lg focus:border-primary focus:bg-glass-surface focus:ring-1 focus:ring-primary px-4 py-3 text-slate-800 outline-none transition-all font-body text-sm appearance-none"
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Freelance Project">Freelance Project</option>
                                            <option value="Collaboration">Collaboration</option>
                                            <option value="Recruitment">Recruitment</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="w-full bg-glass-light border border-glass-stroke rounded-lg focus:border-primary focus:bg-glass-surface focus:ring-1 focus:ring-primary px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition-all font-body text-sm resize-none"
                                            placeholder="Tell me about your project..."
                                        />
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
                                                className={`block overflow-hidden h-6 rounded-full cursor-pointer border border-glass-stroke transition-colors duration-200 ${formData.sendToSelf ? 'bg-primary' : 'bg-glass-light'}`}
                                            />
                                            <label
                                                htmlFor="sendToSelf"
                                                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ease-in-out cursor-pointer ${formData.sendToSelf ? 'translate-x-5' : 'translate-x-0'}`}
                                            />
                                        </div>
                                        <label htmlFor="sendToSelf" className="text-slate-500 font-body text-xs cursor-pointer select-none tracking-wide">
                                            Send a copy to my email
                                        </label>
                                    </div>

                                    <div className="pt-2 flex items-center justify-between">
                                        {/* Error inline */}
                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-center gap-2 text-red-600 text-xs font-body"
                                            >
                                                <AlertCircle size={14} />
                                                Something went wrong. Try again.
                                            </motion.div>
                                        )}
                                        <div className="ml-auto">
                                            <button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                className={`group relative px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-200
                                                    ${status === 'loading' ? 'bg-glass-card text-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'}`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    {status === 'loading' ? (
                                                        <>
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                                className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full"
                                                            />
                                                            Sending
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
