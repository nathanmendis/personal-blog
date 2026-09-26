import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, Star, Clock, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Freelance from '../components/sections/Freelance';
import { freelanceProjects } from '../data/freelanceProjects';
import { freelanceReviews } from '../data/freelanceReviews';

const FreelanceDashboard = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % freelanceProjects.length);
        }, 5000); // Auto-scroll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setActiveIndex((current) => (current + 1) % freelanceProjects.length);
    };

    const prevSlide = () => {
        setActiveIndex((current) => (current - 1 + freelanceProjects.length) % freelanceProjects.length);
    };

    const stats = [
        { label: "Active Clients", value: "3+", icon: <Users size={20} className="text-black mb-4" strokeWidth={1.5} /> },
        { label: "Projects Delivered", value: "12", icon: <Star size={20} className="text-black mb-4" strokeWidth={1.5} /> },
        { label: "Avg. Turnaround", value: "2 Weeks", icon: <Clock size={20} className="text-black mb-4" strokeWidth={1.5} /> },
        { label: "Satisfaction Rate", value: "100%", icon: <Heart size={20} className="text-black mb-4" strokeWidth={1.5} /> },
    ];



    return (
        <div
            className="py-24 space-y-24 min-h-screen bg-white"
            style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
        >
            {/* Dashboard Header */}
            <section className="max-w-7xl mx-auto px-4 relative z-10 pt-8 pb-32">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-12 h-[1px] bg-black"></span>
                            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-slate-500">
                                Independent Studio
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-light text-black leading-[1.1] tracking-tight mb-8">
                            Elevating brands through <br />
                            <span className="font-semibold italic">digital craftsmanship.</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-light max-w-xl leading-relaxed">
                            Delivering bespoke web experiences for visionary brands. A curated selection of professional engagements and measurable outcomes.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="hidden md:flex shrink-0"
                    >
                        <button 
                            onClick={() => document.getElementById('freelance').scrollIntoView({ behavior: 'smooth' })}
                            className="group flex items-center justify-center w-40 h-40 rounded-full border border-black text-black hover:bg-black hover:text-white transition-all duration-500"
                        >
                            <span className="text-xs font-semibold uppercase tracking-widest text-center leading-loose">
                                Start A<br/>Project
                            </span>
                        </button>
                    </motion.div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (idx * 0.1) }}
                            className="flex flex-col border-t border-slate-200 pt-6 group"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">{stat.label}</p>
                                <div className="text-slate-300 group-hover:text-black transition-colors duration-300">
                                    {React.cloneElement(stat.icon, { className: "w-5 h-5 mb-0", strokeWidth: 1.5 })}
                                </div>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-light text-black tracking-tight">{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Freelance Portfolio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <h2 className="text-2xl font-light mb-16 text-center text-black tracking-widest uppercase">
                        Selected Works
                    </h2>

                    <div className="relative h-[600px] flex items-center justify-center">
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 md:-left-12 z-20 p-3 bg-white border border-slate-200 rounded-full text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 md:-right-12 z-20 p-3 bg-white border border-slate-200 rounded-full text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <div className="relative w-full max-w-lg h-full flex justify-center perspective-1000">
                            <AnimatePresence mode="popLayout">
                                {freelanceProjects.map((project, idx) => {
                                    const n = freelanceProjects.length;
                                    let offset = (idx - activeIndex) % n;
                                    if (offset < -Math.floor(n / 2)) offset += n;
                                    if (offset > Math.floor(n / 2)) offset -= n;

                                    const isCenter = offset === 0;

                                    return (
                                        <motion.div
                                            key={project.title}
                                            initial={false}
                                            animate={{
                                                x: `${offset * 75}%`,
                                                scale: isCenter ? 1 : 0.85,
                                                opacity: Math.abs(offset) > 1 ? 0 : isCenter ? 1 : 0.6,
                                                zIndex: isCenter ? 10 : 5,
                                            }}
                                            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                            className={`absolute top-0 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[550px] ${!isCenter ? 'pointer-events-none' : ''}`}
                                        >
                                            <div className="relative h-64 overflow-hidden bg-slate-100 shrink-0 group/image">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                                                />
                                                {project.demo && isCenter && (
                                                    <a
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="absolute inset-0 bg-slate-200/0 group-hover/image:bg-slate-200/60 backdrop-blur-[1px] transition-all duration-300 flex items-center justify-center opacity-0 group-hover/image:opacity-100"
                                                    >
                                                        <span className="bg-black text-white px-6 py-3 rounded-full font-semibold uppercase tracking-widest text-xs shadow-lg transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-300">
                                                            View Live Site
                                                        </span>
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex flex-col flex-grow p-8">
                                                <h3 className="text-2xl font-semibold text-black mb-3 tracking-wide">{project.title}</h3>
                                                <p className="text-sm text-slate-500 font-light leading-relaxed mb-6 flex-grow">
                                                    {project.description}
                                                </p>
                                                <div className="border-t border-slate-200 pt-4 mb-4">
                                                    <p className="text-xs text-slate-800 font-medium uppercase tracking-wider">
                                                        Outcome: <span className="text-slate-500 font-normal normal-case tracking-normal ml-1 line-clamp-2">{project.impact}</span>
                                                    </p>
                                                </div>
                                                {project.demo && (
                                                    <div className="mt-auto">
                                                        <a
                                                            href={project.demo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-black hover:text-slate-500 transition-colors"
                                                        >
                                                            Visit Live Site <span aria-hidden="true" className="ml-2">&rarr;</span>
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Customer Reviews */}
            <section className="w-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full mx-auto mt-32"
                >
                    <h2 className="text-2xl font-light mb-16 text-center text-black tracking-widest uppercase">
                        Client Testimonials
                    </h2>
                    <div className="relative overflow-hidden w-full py-4">
                        <motion.div
                            className="flex gap-8 w-max"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                        >
                            {[...freelanceReviews, ...freelanceReviews].map((review, idx) => (
                                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-lg transition-all duration-300 text-left w-[300px] md:w-[700px] shrink-0">
                                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                        <div className="md:w-1/3 shrink-0">
                                            <p className="font-semibold text-xl text-black tracking-wide">{review.client}</p>
                                            <p className="text-xs text-slate-500 uppercase tracking-widest mt-2">{review.company}</p>
                                            <div className="mt-4 flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={16} className="text-black mr-1" fill="currentColor" />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="md:w-2/3 md:border-l border-slate-200 md:pl-8">
                                            <p className="text-lg text-slate-600 font-light leading-relaxed italic">
                                                "{review.review}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Re-using the Freelance Services and Contact form */}
            <Freelance />
        </div>
    );
};

export default FreelanceDashboard;
