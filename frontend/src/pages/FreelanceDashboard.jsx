import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Users, Star, Clock, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Freelance from '../components/sections/Freelance';
import MobileContactModal from '../components/sections/MobileContactModal';
import { freelanceProjects } from '../data/freelanceProjects';
import { freelanceReviews } from '../data/freelanceReviews';

const FreelanceDashboard = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeReviewIndex, setActiveReviewIndex] = useState(0);
    const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % freelanceProjects.length);
        }, 5000); // Auto-scroll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const stepInterval = setInterval(() => {
            setActiveStep((current) => (current + 1) % 4);
        }, 1500);
        return () => clearInterval(stepInterval);
    }, []);

    const nextSlide = () => {
        setActiveIndex((current) => (current + 1) % freelanceProjects.length);
    };

    const prevSlide = () => {
        setActiveIndex((current) => (current - 1 + freelanceProjects.length) % freelanceProjects.length);
    };

    const nextReviewSlide = () => {
        setActiveReviewIndex((current) => (current + 1) % freelanceReviews.length);
    };

    const prevReviewSlide = () => {
        setActiveReviewIndex((current) => (current - 1 + freelanceReviews.length) % freelanceReviews.length);
    };

    const stats = [
        { label: "Active Clients", value: "3+", icon: <Users size={20} className="text-black mb-4" strokeWidth={1.5} /> },
        { label: "Projects Delivered", value: "12", icon: <Star size={20} className="text-black mb-4" strokeWidth={1.5} /> },
        { label: "Avg. Turnaround", value: "2 Weeks", icon: <Clock size={20} className="text-black mb-4" strokeWidth={1.5} /> },
        { label: "Satisfaction Rate", value: "100%", icon: <Heart size={20} className="text-black mb-4" strokeWidth={1.5} /> },
    ];



    return (
        <div className="py-12 md:py-24 space-y-16 md:space-y-24 min-h-screen bg-white w-full md:w-[100vw] md:ml-[calc(-50vw+50%)] overflow-hidden">
            {/* Dashboard Header */}
            <section className="max-w-7xl mx-auto px-4 relative z-10 pt-8 pb-32" style={{ perspective: "1000px" }}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, rotateX: 20, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-3xl transform-style-3d"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <span className="w-12 h-[1px] bg-black"></span>
                            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-slate-500">
                                Independent Studio
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, rotateY: -10, z: -100 }}
                            animate={{ opacity: 1, rotateY: 0, z: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-5xl md:text-7xl font-light text-black leading-[1.1] tracking-tight mb-8"
                        >
                            Elevating brands through <br />
                            <span className="font-semibold italic text-slate-800 drop-shadow-sm">digital craftsmanship.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                            className="text-lg md:text-xl text-slate-500 font-light max-w-xl leading-relaxed"
                        >
                            Delivering bespoke web experiences for visionary brands. A curated selection of professional engagements and measurable outcomes.
                        </motion.p>
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
                                Start A<br />Project
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

                {/* Mobile CTA */}
                <div className="md:hidden flex justify-center mt-12 mb-8">
                    <button
                        onClick={() => setIsMobileFormOpen(true)}
                        className="bg-transparent text-black border-2 border-black px-6 py-4 rounded-none font-semibold uppercase tracking-widest text-xs shadow-none w-full max-w-xs transition-colors hover:bg-slate-100"
                    >
                        Transform Your Web Presence Now
                    </button>
                </div>

                {/* Freelance Portfolio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <h2 className="text-2xl font-light mb-16 text-center text-black tracking-widest uppercase">
                        Proven Client Successes
                    </h2>

                    <div className="relative h-[600px] flex items-center justify-center">
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="hidden md:flex absolute left-2 md:-left-12 z-20 p-3 bg-white border border-slate-200 rounded-full text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="hidden md:flex absolute right-2 md:-right-12 z-20 p-3 bg-white border border-slate-200 rounded-full text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
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
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={1}
                                            onDragEnd={(e, { offset }) => {
                                                if (offset.x < -50) {
                                                    nextSlide();
                                                } else if (offset.x > 50) {
                                                    prevSlide();
                                                }
                                            }}
                                            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                            className={`absolute top-0 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[550px] ${!isCenter ? 'pointer-events-none' : ''}`}
                                        >
                                            <div className="relative h-64 overflow-hidden bg-slate-100 shrink-0 group/image">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = '/fallback-image.png'; }}
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
                                                <div className="mb-4"></div>
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

            {/* How It Works */}
            <section className="py-24 bg-slate-50 relative border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-light text-black tracking-tight mb-4">How It Works</h2>
                        <div className="w-12 h-1 bg-black mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 -translate-y-1/2 z-0"></div>

                        {[
                            { step: "01", title: "Tell Me What You Need", desc: "Send me your idea, requirements or existing website." },
                            { step: "02", title: "Plan", desc: "I'll recommend the appropriate approach and scope." },
                            { step: "03", title: "Build", desc: "Design, development, testing and refinement." },
                            { step: "04", title: "Launch", desc: "Deploy the finished project and provide post-launch support." }
                        ].map((item, idx) => (
                            <div key={idx} className={`relative z-10 p-6 md:p-8 border rounded-2xl flex flex-col items-center text-center transition-all duration-500 transform ${activeStep === idx ? 'bg-white border-black shadow-xl scale-105 -translate-y-2' : 'bg-slate-50 border-slate-200 shadow-sm scale-100'}`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold font-mono text-lg mb-6 shadow-md transition-colors duration-500 ${activeStep === idx ? 'bg-black text-white' : 'bg-slate-200 text-slate-500'}`}>
                                    {item.step}
                                </div>
                                <h4 className={`text-xl font-bold mb-3 transition-colors duration-500 ${activeStep === idx ? 'text-black' : 'text-slate-700'}`}>{item.title}</h4>
                                <p className={`text-sm leading-relaxed transition-colors duration-500 ${activeStep === idx ? 'text-slate-800' : 'text-slate-500'}`}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="w-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full mx-auto mt-20"
                >
                    <h2 className="text-2xl font-light mb-16 text-center text-black tracking-widest uppercase">
                        Client Testimonials
                    </h2>
                    <div className="relative w-full max-w-4xl mx-auto px-4 md:px-12">
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevReviewSlide}
                            className="absolute -left-2 md:-left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white border border-slate-200 rounded-full text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextReviewSlide}
                            className="absolute -right-2 md:-right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white border border-slate-200 rounded-full text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <div className="overflow-hidden relative w-full rounded-2xl shadow-sm border border-slate-200 bg-white">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeReviewIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-8 md:p-12"
                                >
                                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                        <div className="md:w-1/3 shrink-0">
                                            <p className="font-semibold text-xl text-black tracking-wide">{freelanceReviews[activeReviewIndex].client}</p>
                                            <p className="text-xs text-slate-500 uppercase tracking-widest mt-2">{freelanceReviews[activeReviewIndex].company}</p>
                                            <div className="mt-4 flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={16} className="text-black mr-1" fill="currentColor" />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="md:w-2/3 md:border-l border-slate-200 md:pl-8">
                                            <p className="text-lg text-slate-600 font-light leading-relaxed italic">
                                                "{freelanceReviews[activeReviewIndex].review}"
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center mt-8 gap-2">
                            {freelanceReviews.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveReviewIndex(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeReviewIndex === idx ? 'bg-black w-8' : 'bg-slate-300 hover:bg-slate-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Re-using the Freelance Services and Contact form */}
            <Freelance />

            {/* Why Work With Me? */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-light text-black tracking-tight mb-4">Why Work With Me?</h2>
                        <div className="w-12 h-1 bg-black mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {[
                            "Direct communication with the developer",
                            "Modern responsive websites",
                            "Mobile-first development",
                            "Performance-conscious development",
                            "SEO fundamentals",
                            "Custom integrations and automation",
                            "Clear communication",
                            "Post-launch support"
                        ].map((benefit, idx) => (
                            <div key={idx} className="flex flex-col justify-center items-center text-center p-8 border border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors shadow-sm">
                                <span className="text-slate-900 font-semibold text-lg">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Free Website Review Teaser */}
            <section className="py-24 bg-white relative border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-4xl font-light text-black tracking-tight mb-6">
                        Not sure what's holding your website back?
                    </h2>
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
                        I'll personally review your website and identify 3–5 practical improvements across UX, mobile experience, performance, SEO and conversion.
                    </p>
                    <Link
                        to="/freelance/free-website-review"
                        className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-lg font-semibold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Get a Free Website Review &rarr;
                    </Link>
                </div>
            </section>


            {/* Final CTA */}
            <section className="py-32 bg-white relative border-t border-slate-200 text-center">
                <div className="max-w-3xl mx-auto px-4 md:px-6">
                    <h2 className="text-5xl font-light text-black tracking-tight mb-6">Have an idea? Let's build it.</h2>
                    <p className="text-xl text-slate-600 mb-12 leading-relaxed font-light">
                        Whether you need a new website, an e-commerce store, a redesign or a custom web application, tell me what you're trying to achieve.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setIsMobileFormOpen(true)}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-lg font-semibold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors"
                        >
                            Start a Project &rarr;
                        </button>
                        <Link
                            to="/freelance/free-website-review"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-black text-black rounded-lg font-semibold uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors"
                        >
                            Get a Free Website Review &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            <MobileContactModal
                isOpen={isMobileFormOpen}
                onClose={() => setIsMobileFormOpen(false)}
            />
        </div>
    );
};

export default FreelanceDashboard;
