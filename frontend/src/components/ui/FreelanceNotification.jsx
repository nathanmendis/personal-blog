import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FreelanceNotification = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Show before the Archive notification
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    const handleViewFreelance = () => {
        handleDismiss();
        navigate('/freelance');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed bottom-6 left-6 z-[100] max-w-[340px] w-full"
                >
                    <div className="bg-slate-900 border border-rose-500/30 shadow-[0_0_15px_rgba(225,29,72,0.15)] p-5 relative overflow-hidden group rounded-xl">
                        {/* Background subtle pattern */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rotate-45 translate-x-12 -translate-y-12"></div>
                        
                        <button 
                            onClick={handleDismiss}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white transition-colors z-10"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex gap-4 relative z-0">
                            <div className="w-12 h-12 shrink-0 rounded bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                                <Gift className="text-rose-400" size={20} />
                            </div>
                            
                            <div className="space-y-1">
                                <h4 className="text-[11px] uppercase font-bold tracking-[0.2em] text-rose-400 font-heading">Special Offer</h4>
                                <h3 className="text-sm font-heading font-bold text-white leading-tight uppercase tracking-tight">15% Off Freelance Services</h3>
                                <p className="text-[11px] text-slate-400 font-body leading-relaxed mt-1">
                                    Get a free professional review of your website and claim your discount.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleViewFreelance}
                            className="w-full mt-4 py-2.5 bg-rose-600/90 hover:bg-rose-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 group/btn transition-all rounded-lg shadow-sm"
                        >
                            Claim Offer <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FreelanceNotification;
