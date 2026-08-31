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
                    <span className="text-primary">/</span> TECHNICAL SKILLS
                </h2>
                <p className="text-center text-slate-500 mt-2 font-mono uppercase tracking-widest">My Analytics & Development Stack</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, items], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-glass-surface border border-glass-stroke p-6 hover:border-primary transition-colors group shadow-sm rounded-lg"
                    >
                        <div className="flex items-center justify-between mb-4 border-b border-glass-stroke pb-2">
                            <h3 className="font-heading text-xl tracking-wider text-slate-800 group-hover:text-slate-900">{category}</h3>
                            <div className="w-2 h-2 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {items.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-glass-light border border-glass-stroke text-xs font-mono text-slate-600 hover:text-primary hover:border-primary hover:bg-glass-surface transition-all cursor-default">
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
