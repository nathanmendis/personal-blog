import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle, Radio, Shield, Terminal } from 'lucide-react';
import api from '../../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/contact/', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (error) {
            console.error('Contact error:', error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-20 relative">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Left Panel - Visual/Info */}
                    <div className="md:w-5/12">
                        <div className="bg-valorant-dark/80 backdrop-blur-sm border border-white/10 p-8 h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Shield size={120} className="text-valorant-red" />
                            </div>

                            <h2 className="text-4xl font-heading font-bold mb-6">
                                SECURE <br />
                                <span className="text-valorant-red">CHANNEL</span>
                            </h2>

                            <div className="space-y-8 font-mono text-sm text-gray-400">
                                <div className="p-4 border border-white/10 bg-black/20">
                                    <p className="mb-2 text-valorant-red uppercase tracking-widest text-xs font-bold">STATUS</p>
                                    <div className="flex items-center gap-2 text-green-400">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        OPEN FOR ASSIGNMENTS
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-valorant-red">
                                            <Terminal size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider mb-1">Direct Line</p>
                                            <p className="text-white hover:text-valorant-red transition-colors cursor-pointer">nathanmendis17@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-valorant-red">
                                            <Radio size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider mb-1">Frequency</p>
                                            <p className="text-white">Encrypted // TLS 1.3</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 opacity-50 text-[10px]">
                                    <p>SYSTEM ID: N-01-A</p>
                                    <p>PROTOCOL: HANDSHAKE</p>
                                    <p>COORDINATES: UNKNOWN</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - The Form */}
                    <div className="md:w-7/12">
                        <div className="bg-white/5 border border-white/10 p-1 relative">
                            {/* Corner accents */}
                            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-valorant-red"></div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-valorant-red"></div>

                            <form onSubmit={handleSubmit} className="bg-valorant-dark p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Agent ID / Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-black/40 border-b-2 border-white/10 focus:border-valorant-red px-4 py-3 text-white placeholder-gray-600 outline-none transition-all font-mono text-sm hover:bg-black/60"
                                            placeholder="ENTER NAME"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Contact Freq / Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-black/40 border-b-2 border-white/10 focus:border-valorant-red px-4 py-3 text-white placeholder-gray-600 outline-none transition-all font-mono text-sm hover:bg-black/60"
                                            placeholder="ENTER EMAIL"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Mission Type</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border-b-2 border-white/10 focus:border-valorant-red px-4 py-3 text-white/80 outline-none transition-all font-mono text-sm hover:bg-black/60 appearance-none"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Freelance Project">Freelance Mission</option>
                                        <option value="Collaboration">Tactical Alliance (Collab)</option>
                                        <option value="Recruitment">Recruitment</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Briefing Data</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full bg-black/40 border-l-2 border-white/10 focus:border-valorant-red px-4 py-3 text-white placeholder-gray-600 outline-none transition-all font-mono text-sm resize-none hover:bg-black/60 focus:bg-white/5"
                                        placeholder="TRANSMIT YOUR MESSAGE..."
                                    ></textarea>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`
                                            relative px-8 py-4 font-heading font-bold tracking-widest uppercase transition-all
                                            clip-path-polygon hover:bg-white hover:text-valorant-dark
                                            ${status === 'loading' ? 'bg-gray-600 cursor-not-allowed' : 'bg-valorant-red text-white'}
                                        `}
                                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                                    >
                                        <span className="flex items-center gap-2">
                                            {status === 'loading' ? 'ENCRYPTING...' :
                                                status === 'success' ? 'SENT' :
                                                    'INITIATE UPLOAD'}

                                            {status === 'success' ? <CheckCircle size={18} /> :
                                                status === 'loading' ? null : <Send size={18} />}
                                        </span>
                                    </button>
                                </div>

                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-green-500/10 border border-green-500/30 p-4 flex items-center gap-3"
                                    >
                                        <CheckCircle className="text-green-500" size={20} />
                                        <p className="text-green-400 text-sm font-mono">TRANSMISSION SUCCESSFUL. STAND BY FOR RESPONSE.</p>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-500/10 border border-red-500/30 p-4 flex items-center gap-3"
                                    >
                                        <AlertCircle className="text-red-500" size={20} />
                                        <p className="text-red-400 text-sm font-mono">TRANSMISSION FAILED. ENCRYPTION ERROR. TRY AGAIN.</p>
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
