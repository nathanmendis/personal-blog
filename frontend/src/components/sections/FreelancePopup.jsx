import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertCircle, CheckCircle, Gift } from 'lucide-react';
import api from '../../services/api';

const FreelancePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        message: '',
        sendToSelf: false
    });
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        // Check if this is the first time showing the popup in this session
        const hasSeenPopup = sessionStorage.getItem('hasSeenFreelancePopup');
        
        if (!hasSeenPopup) {
            // Show popup after 3 seconds on first load/reload
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('hasSeenFreelancePopup', 'true');
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        // Smartly append the website URL to the message body
        let finalMessage = formData.message;
        if (formData.website.trim()) {
            finalMessage += `\n\nWebsite for Review: ${formData.website}`;
        }

        const submitData = {
            name: formData.name,
            email: formData.email,
            subject: 'Free Professional Website Review & 15% Off Quote',
            message: finalMessage,
            sendToSelf: formData.sendToSelf
        };

        try {
            await api.post('/contact/', submitData);
            setStatus('success');
            setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        } catch (error) {
            console.error('Contact error:', error);
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative"
                    >
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-black transition-colors rounded-full hover:bg-slate-100 z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-10">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
                                    <Gift size={32} />
                                </div>
                            </div>

                            <h2 className="text-3xl font-light text-center text-black mb-2 tracking-tight">
                                Limited Time Offer
                            </h2>
                            <p className="text-slate-600 text-center mb-8 font-light leading-relaxed">
                                Get your website reviewed by professionals for <span className="font-semibold text-black">free</span> and get <span className="font-semibold text-black">15% off</span> on your overall quote.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label htmlFor="popup-name" className="text-xs font-semibold uppercase tracking-widest text-slate-500">Name</label>
                                        <input
                                            type="text"
                                            id="popup-name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="popup-email" className="text-xs font-semibold uppercase tracking-widest text-slate-500">Email</label>
                                        <input
                                            type="email"
                                            id="popup-email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="popup-website" className="text-xs font-semibold uppercase tracking-widest text-slate-500">Website URL (For Review)</label>
                                    <input
                                        type="url"
                                        id="popup-website"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm"
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="popup-message" className="text-xs font-semibold uppercase tracking-widest text-slate-500">Project Details</label>
                                    <textarea
                                        id="popup-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="3"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm resize-none"
                                        placeholder="Tell me about your project or what you need help with..."
                                    ></textarea>
                                </div>

                                <div className="flex items-center space-x-3 pt-2">
                                    <input
                                        type="checkbox"
                                        id="popup-sendToSelf"
                                        name="sendToSelf"
                                        checked={formData.sendToSelf}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-black border-slate-300 rounded focus:ring-black"
                                    />
                                    <label htmlFor="popup-sendToSelf" className="text-sm text-slate-600 select-none cursor-pointer">
                                        Send me a copy of this message
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full mt-4 bg-black text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <span className="flex items-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            <span>Sending...</span>
                                        </span>
                                    ) : status === 'success' ? (
                                        <span className="flex items-center space-x-2">
                                            <CheckCircle size={16} />
                                            <span>Sent Successfully!</span>
                                        </span>
                                    ) : (
                                        <span className="flex items-center space-x-2">
                                            <span>Claim Offer</span>
                                            <Send size={16} />
                                        </span>
                                    )}
                                </button>
                                
                                {status === 'error' && (
                                    <div className="mt-4 flex items-center justify-center space-x-2 text-red-500 text-sm">
                                        <AlertCircle size={16} />
                                        <span>Failed to send message. Please try again.</span>
                                    </div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FreelancePopup;
