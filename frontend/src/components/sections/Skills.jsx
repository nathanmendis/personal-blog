import React from 'react';
import { motion } from 'framer-motion';

const skills = {
    "LANGUAGES": ["Python", "Java", "JavaScript", "SQL", "C++"],
    "BACKEND": ["Django", "Django REST Framework", "Flask"],
    "FRONTEND": ["ReactJS", "HTML", "CSS", "TailwindCSS"],
    "DATABASES": ["PostgreSQL", "MongoDB", "SQLite", "pgvector"],
    "AI / ML": ["LangGraph", "LangChain", "Transformers", "scikit-learn", "pandas", "spaCy"],
    "CLOUD / DEVOPS": ["Docker", "AWS", "Azure"]
};

const Skills = () => {
    return (
        <section id="skills" className="py-20 relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none"></div>

            <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-center">
                    <span className="text-valorant-red">/</span> AGENT LOADOUT
                </h2>
                <p className="text-center text-gray-400 mt-2 font-mono uppercase tracking-widest">Technological Arsenal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, items], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 p-6 hover:border-valorant-red/50 transition-colors group"
                    >
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                            <h3 className="font-heading text-xl tracking-wider text-valorant-light group-hover:text-white">{category}</h3>
                            <div className="w-2 h-2 bg-valorant-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {items.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-valorant-dark border border-white/20 text-xs font-mono text-gray-300 hover:text-valorant-red hover:border-valorant-red transition-all cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
