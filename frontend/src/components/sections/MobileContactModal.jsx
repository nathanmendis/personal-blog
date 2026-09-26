import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../../services/api';

const MobileContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            await api.post('/contact/', {
                name: formData.name,
                email: formData.email,
                subject: 'Freelance Inquiry (Mobile)',
                message: formData.message,
                sendToSelf: false
            });
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ name: '', email: '', message: '' });
            }, 2000);
        } catch (error) {
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
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
                >
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold font-heading text-slate-900">Transform Your Web Presence</h3>
                            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-black text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-black text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-black text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                                        placeholder="Tell me about your freelance project needs..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full mt-2 bg-transparent text-black border-2 border-black px-8 py-4 rounded-none font-semibold uppercase tracking-widest text-xs hover:bg-slate-100 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                                            <span>Send Inquiry</span>
                                            <Send size={16} />
                                        </span>
                                    )}
                                </button>
                                
                                <p className="text-center text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5 mt-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Typically replies within 2 hrs
                                </p>

                                {status === 'error' && (
                                    <div className="mt-2 flex items-center justify-center space-x-2 text-red-500 text-sm">
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

export default MobileContactModal;
