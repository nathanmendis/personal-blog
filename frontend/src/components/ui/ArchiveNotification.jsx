import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ArchiveNotification = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Show after a short delay on every refresh
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    const handleViewArchive = () => {
        handleDismiss();
        navigate('/projects');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed bottom-6 right-6 z-[100] max-w-[340px] w-full"
                >
                    <div className="bg-white border border-slate-200 shadow-lg p-5 relative overflow-hidden group rounded-xl">
                        {/* Background subtle pattern */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/2 rotate-45 translate-x-12 -translate-y-12"></div>
                        
                        <button 
                            onClick={handleDismiss}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700 transition-colors z-10"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex gap-4 relative z-0">
                            <div className="w-12 h-12 shrink-0 rounded bg-primary/5 border border-primary/20 flex items-center justify-center">
                                <Sparkles className="text-primary" size={20} />
                            </div>
                            
                            <div className="space-y-1">
                                <h4 className="text-[11px] uppercase font-bold tracking-[0.2em] text-primary font-heading">New Update</h4>
                                <h3 className="text-sm font-heading font-bold text-slate-800 leading-tight uppercase tracking-tight">Project Archive is Live</h3>
                                <p className="text-[11px] text-slate-500 font-body leading-relaxed mt-1">
                                    Explore all technical projects in a recruiter-optimized tabular view.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleViewArchive}
                            className="w-full mt-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 group/btn transition-all rounded-lg"
                        >
                            Go to Archive <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ArchiveNotification;
