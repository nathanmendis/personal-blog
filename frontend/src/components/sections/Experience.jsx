import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
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
    return (
        <section id="experience" className="py-20 relative">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold">
                    <span className="text-valorant-red">/</span> MISSION HISTORY
                </h2>
                <div className="h-1 w-20 bg-valorant-red mt-4"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <div className="relative border-l-2 border-white/20 ml-4 md:ml-0 space-y-12 pl-8 md:pl-0">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative md:flex items-center justify-between group"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[41px] md:left-1/2 md:-ml-[9px] w-5 h-5 bg-valorant-dark border-2 border-valorant-red rounded-full z-10 group-hover:bg-valorant-red transition-colors"></div>

                            {/* Content Card (Left or Right based on index for desktop) */}
                            <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto md:text-right'} relative`}>
                                <div className="bg-white/5 border border-white/10 p-6 hover:border-valorant-red/50 transition-all cursor-crosshair">
                                    <span className="text-valorant-red font-mono text-sm tracking-widest">{exp.period}</span>
                                    <h3 className="text-xl font-heading font-bold text-white mt-1">{exp.role}</h3>
                                    <h4 className="text-lg font-heading text-gray-400 mb-4">{exp.company}</h4>
                                    <p className="text-gray-300 font-body text-sm leading-relaxed">
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
