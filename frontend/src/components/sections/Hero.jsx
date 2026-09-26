import React, { useRef, Suspense, useState, useEffect } from 'react';
import Hero3D from './Hero3D';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Download, ChevronRight, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), { stiffness: 100, damping: 30 });
    
    const [statusIndex, setStatusIndex] = useState(0);
    const availabilityStatuses = [
        "Available for Freelance Projects",
        "Open to Full-time SDE Roles"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % availabilityStatuses.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-start overflow-hidden ">
            {/* 3D Background Elements - Simple Parallax */}
            <motion.div style={{ y }} className="absolute right-[-10%] top-[20%] w-[50vw] h-[50vw] bg-primary/2 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid md:grid-cols-12 gap-12 items-center">

                {/* Text Content */}
                <div className="md:col-span-7 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-700"></div>
                        <span className="text-rose-700 font-mono tracking-widest text-sm font-semibold uppercase flex items-center gap-2 relative min-w-[300px]">
                            <span className="relative flex h-2.5 w-2.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-700"></span>
                            </span>
                            <div className="relative overflow-hidden h-6 w-full">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={statusIndex}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute left-0 top-0 whitespace-nowrap"
                                    >
                                        {availabilityStatuses[statusIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </span>
                    </motion.div>

                    <div className="relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-6xl md:text-8xl font-heading font-bold text-slate-900 tracking-tight leading-none"
                        >
                            Nathan <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-800 text-glow">
                                Mendis
                            </span>
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-slate-600 font-body max-w-xl pl-1 leading-relaxed"
                    >
                        AI & Full-Stack Engineer deploying intelligent, scalable systems.
                        Specialized in <span className="text-slate-900 font-semibold">Autonomous Systems</span>, <span className="text-slate-900 font-semibold">Django Architecture</span>, and <span className="text-slate-900 font-semibold">React Interfaces</span>.
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
                            className="group relative inline-flex items-center gap-3 px-8 py-3 bg-primary text-white hover:bg-primary-dark rounded-full font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Download size={20} /> Download Resume
                            </span>
                        </a>

                        <Link
                            to="/projects"
                            className="group inline-flex items-center gap-3 px-8 py-3 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-full text-slate-800 font-medium transition-all"
                        >
                            <span className="relative z-10">View Projects</span>
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            to="/freelance"
                            className="group inline-flex items-center gap-3 px-8 py-3 bg-red-600 hover:bg-red-700 shadow-md shadow-red-500/20 rounded-full text-white font-semibold transition-all transform hover:-translate-y-0.5"
                        >
                            <span className="relative z-10">Freelance Services</span>
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="flex gap-4">
                            <a
                                href="https://github.com/nathanmendis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                                aria-label="GitHub Profile"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/nathan-mendis-a2318122a/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* 3D Decorative / Stats Element */}
                <div className="hidden md:block md:col-span-5 relative">
                    <div className="w-[400px] h-[400px] rounded-full overflow-hidden border-2 border-primary/20 bg-slate-900 flex items-center justify-center relative z-10 shadow-lg ring-1 ring-primary/10">
                        <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                            <Hero3D />
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* Giant Background Text */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
                <h1 className="text-[20vw] font-heading font-bold text-slate-900 whitespace-nowrap leading-none tracking-tighter transform translate-y-1/3">
                    DEV
                </h1>
            </div>
        </section>
    );
};

export default Hero;
