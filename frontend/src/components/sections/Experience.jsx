import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
    {
        role: "Freelance Full Stack Developer",
        company: "The Third Space",
        period: " Jan 2026",
        description: "Built and deployed a serverless React (Vite) platform for a café community hub, supporting 50+ daily active users. Implemented a lightweight CMS using Google Sheets + OpenSheet API, enabling non-technical content updates. Deployed on Vercel and integrated Elfsight for real-time reviews."
    },
    {
        role: "R&D Intern",
        company: "PureID Pvt. Ltd.",
        period: "Jan 2025 – Oct 2025",
        description: "Developed and deployed a Django-based customer requirements discovery platform. Implemented role-based authentication, admin dashboards, and PostgreSQL integration. Deployed production workloads on Azure."
    },
    {
        role: "Treasurer",
        company: "CODE Club (AI-ML)",
        period: "2023 – 2024",
        description: "Built backend features for a Django quiz platform (100+ users). Implemented certificate generation and event management. Organized seminars on Web Development, IBM Cloud, and Computer Graphics."
    }
];

const Experience = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end center"]
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" className="py-20 relative">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold relative inline-block text-slate-900">
                    PROFESSIONAL EXPERIENCE
                    <div className="absolute -bottom-4 left-0 w-1/2 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
                </h2>
            </div>

            <div ref={containerRef} className="max-w-4xl mx-auto px-4 relative">
                {/* Timeline Line Container */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -ml-px bg-slate-200 h-full">
                    <motion.div
                        style={{ height: height }}
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-primary-light"
                    />
                </div>

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative md:flex items-center justify-between group"
                        >
                            {/* Timeline Dot */}
                            {/* Adjusted left position to match the new line: left-8 (32px) for mobile, left-1/2 for desktop */}
                            <div className="absolute left-[23px] md:left-1/2 md:-ml-2 w-4 h-4 rounded-full z-10 bg-glass-surface border-2 border-primary group-hover:bg-primary transition-all duration-300"></div>

                            {/* Content Card */}
                            <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto pl-16 md:pl-0' : 'md:ml-auto pl-16 md:pl-0 md:text-right'} relative`}>
                                <div className="glass-panel p-6 rounded-xl hover:border-primary transition-all duration-300">
                                    <span className="text-primary font-mono text-sm tracking-widest">{exp.period}</span>
                                    <h3 className="text-xl font-heading font-bold text-slate-800 mt-1">{exp.role}</h3>
                                    <h4 className="text-lg font-body font-medium text-slate-500 mb-4">{exp.company}</h4>
                                    <p className="text-slate-600 font-body text-sm leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
