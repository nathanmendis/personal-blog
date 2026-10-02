import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Smartphone, Zap, Search, Target, ShieldCheck, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const FreeWebsiteReview = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        document.title = "Free Website Review | Nathan Mendis";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Get a free manual website review from Nathan Mendis. Receive actionable feedback on UX, mobile experience, performance, SEO and conversion.');
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            metaDescription.content = 'Get a free manual website review from Nathan Mendis. Receive actionable feedback on UX, mobile experience, performance, SEO and conversion.';
            document.head.appendChild(metaDescription);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            // Reusing existing API with subject hardcoded
            await api.post('/contact/', {
                ...formData,
                subject: 'Free Website Review Request'
            });
            setStatus('success');
        } catch (error) {
            console.error('Contact error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen py-24 px-4 flex flex-col items-center justify-center bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white border border-slate-200 p-10 rounded-2xl shadow-sm text-center"
                >
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Your website is on my review list ✓</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Thanks! I'll take a look at your website and identify a few practical improvements. No sales pitch. Just useful feedback.
                    </p>
                    <Link
                        to="/freelance"
                        className="inline-flex items-center justify-center w-full py-4 bg-black text-white rounded-lg font-semibold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors"
                    >
                        Back to Freelance <ArrowRight size={16} className="ml-2" />
                    </Link>
                </motion.div>
            </div>
        );
    }

    const reviewAreas = [
        { icon: <Palette size={24} />, title: "UI / UX", desc: "Is the website clear, intuitive and visually professional?" },
        { icon: <Smartphone size={24} />, title: "Mobile Experience", desc: "Does the website work properly on phones and smaller screens?" },
        { icon: <Zap size={24} />, title: "Performance", desc: "Are there obvious issues affecting loading speed or usability?" },
        { icon: <Search size={24} />, title: "SEO Basics", desc: "Are there obvious technical/content issues affecting discoverability?" },
        { icon: <Target size={24} />, title: "Conversion", desc: "Are visitors clearly being guided toward contacting you, purchasing or taking the desired action?" },
        { icon: <ShieldCheck size={24} />, title: "Trust", desc: "Does the website provide enough information and credibility for visitors to trust the business?" }
    ];

    return (
        <div className="py-20 md:py-32 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* Hero Section */}
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-light text-black tracking-tight leading-[1.1] mb-6">
                            Get a Free Website Review
                        </h1>
                        <p className="text-2xl font-medium text-slate-800 mb-6">
                            I'll find 3–5 things you could improve on your website — completely free.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed mb-12">
                            I'll manually review your website and give you practical feedback on design, mobile experience, performance, SEO basics and conversion.
                        </p>

                        {/* What I'll Review */}
                        <div className="space-y-8">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-6">What I'll Review</h3>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {reviewAreas.map((area, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="shrink-0 text-black mt-1">
                                            {area.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{area.title}</h4>
                                            <p className="text-sm text-slate-600 leading-relaxed">{area.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* The Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 sticky top-24"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-slate-700">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-black text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-slate-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-black text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-slate-700">Tell me about your website</label>
                                <p className="text-[11px] text-slate-500 mb-1">Include your website URL so I know what to review.</p>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder='Paste your website URL here and tell me what you&apos;d like me to look at. Example: https://example.com — I&apos;d like feedback on the design and mobile experience.'
                                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-black text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className={`w-full py-4 rounded-lg font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
                                    status === 'loading' ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-black text-white hover:bg-slate-800'
                                }`}
                            >
                                {status === 'loading' ? 'Sending...' : 'Get My Free Review'}
                                {!status && <ArrowRight size={16} />}
                            </button>
                            
                            {status === 'error' && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-3 justify-center">
                                    <AlertCircle size={14} /> Failed to send request. Please try again.
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default FreeWebsiteReview;
