import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Download, ChevronRight } from 'lucide-react';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), { stiffness: 100, damping: 30 });

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20">
            {/* 3D Background Elements - Simple Parallax */}
            <motion.div style={{ y }} className="absolute right-[-10%] top-[20%] w-[50vw] h-[50vw] bg-valorant-red/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid md:grid-cols-12 gap-12 items-center">

                {/* Text Content */}
                <div className="md:col-span-7 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-[2px] w-12 bg-valorant-red"></div>
                        <span className="text-valorant-red font-mono tracking-widest text-sm font-bold uppercase">
                            Warning: High Capability Agent
                        </span>
                    </motion.div>

                    <div className="relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-7xl md:text-9xl font-heading font-bold text-white uppercase leading-[0.8] tracking-tighter"
                        >
                            Nathan <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-valorant-red via-white to-white/50 animate-pulse">
                                Mendis
                            </span>
                        </motion.h1>

                        {/* Glitch Overlay Text */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none mix-blend-overlay md:text-9xl font-heading font-bold uppercase leading-[0.8] tracking-tighter text-red-500 animate-pulse select-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-5px, -5px)' }}>
                            Nathan <br /> Mendis
                        </div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-gray-400 font-body max-w-xl border-l-4 border-valorant-red pl-6 leading-relaxed"
                    >
                        AI & Full-Stack Engineer deploying intelligent, scalable systems.
                        Specialized in <span className="text-white font-bold">Agentic AI</span>, <span className="text-white font-bold">Django Architecture</span>, and <span className="text-white font-bold">React Interfaces</span>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap gap-6"
                    >
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-valorant-red text-white hover:text-valorant-dark font-heading tracking-wider uppercase font-bold overflow-hidden clip-path-polygon transition-colors"
                            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Download size={20} /> Download Resume
                            </span>
                            <div className="absolute inset-0 bg-white transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-300 origin-left"></div>
                        </a>

                        <a
                            href="#projects"
                            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-heading tracking-wider uppercase font-bold hover:bg-white/5 transition-all"
                        >
                            <span className="relative z-10">View Assignments</span>
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>

                {/* 3D Decorative / Stats Element */}
                <div className="hidden md:block md:col-span-5 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative w-full aspect-square"
                    >
                        {/* Rotating ring effect */}
                        <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
                        <div className="absolute inset-10 border border-valorant-red/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                        {/* Card */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-80 bg-valorant-dark/80 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500 shadow-2xl">
                                <div className="text-right">
                                    <span className="block text-xs font-mono text-valorant-red">CLASS: ENGINEER</span>
                                    <span className="block text-4xl font-heading font-bold text-white">01</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs font-mono text-gray-400">
                                            <span>PYTHON</span>
                                            <span>98%</span>
                                        </div>
                                        <div className="h-1 bg-white/10 w-full"><div className="h-full bg-valorant-red w-[98%]"></div></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs font-mono text-gray-400">
                                            <span>REACT</span>
                                            <span>90%</span>
                                        </div>
                                        <div className="h-1 bg-white/10 w-full"><div className="h-full bg-valorant-red w-[90%]"></div></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs font-mono text-gray-400">
                                            <span>AI / ML</span>
                                            <span>95%</span>
                                        </div>
                                        <div className="h-1 bg-white/10 w-full"><div className="h-full bg-valorant-red w-[95%]"></div></div>
                                    </div>
                                </div>
                                <div className="text-xs font-mono text-gray-500 truncate">
                                    ID: 8a7-9b2-c13
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Giant Background Text */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
                <h1 className="text-[20vw] font-heading font-bold text-white whitespace-nowrap leading-none tracking-tighter transform translate-y-1/3">
                    AGENT
                </h1>
            </div>
        </section>
    );
};

export default Hero;
