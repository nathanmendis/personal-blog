import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const FreelancePopup = () => {
    const [isOpen, setIsOpen] = useState(false);

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



    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[85vh] relative"
                    >
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-black transition-colors rounded-full hover:bg-slate-100 z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-6">
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
                                    <Gift size={24} />
                                </div>
                            </div>

                            <h2 className="text-2xl font-light text-center text-black mb-2 tracking-tight">
                                Limited Time Offer
                            </h2>
                            <p className="text-slate-600 text-sm text-center mb-6 font-light leading-relaxed">
                                Get your website reviewed by professionals for <span className="font-semibold text-black">free</span> and get <span className="font-semibold text-black">15% off</span> on your overall quote.
                            </p>

                            <div className="space-y-4">
                                <Link
                                    to="/freelance/free-website-review"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full mt-4 bg-black text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <span>Claim Offer &rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FreelancePopup;
