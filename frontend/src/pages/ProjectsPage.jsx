import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Mail, Linkedin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData, socialsData } from '../data/projectsData';

const ProjectsPage = () => {
    return (
        <div className="min-h-screen bg-glass-dark pt-24 pb-20 px-4 md:px-8 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
                >
                    <div>
                        <Link to="/" className="text-primary flex items-center gap-2 mb-4 hover:gap-3 transition-all font-heading text-sm uppercase tracking-widest group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 tracking-tighter">
                            PROJECT <span className="text-primary">ARCHIVE</span>
                        </h1>
                        <p className="text-slate-500 mt-2 font-body max-w-2xl text-sm italic">
                            A comprehensive list of my technical implementations, research projects, and creative experiments.
                        </p>
                    </div>

                    {/* Socials - Clutter free */}
                    <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
                        {socialsData.map((social) => {
                            const Icon = social.name === "GitHub" ? Github : social.name === "LinkedIn" ? Linkedin : Mail;
                            return (
                                <a 
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2"
                                    title={social.name}
                                >
                                    <div className="w-10 h-10 rounded bg-glass-card flex items-center justify-center border border-glass-stroke group-hover:border-primary group-hover:bg-primary/5 transition-all">
                                        <Icon size={18} className="text-slate-700 group-hover:text-primary" />
                                    </div>
                                    <span className="hidden lg:block text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-slate-800 transition-colors">
                                        {social.name}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Projects List - Mobile View (Hidden on MD+) */}
                <div className="md:hidden space-y-4">
                    {projectsData.map((project, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-glass-surface border border-glass-stroke p-5 rounded-xl shadow-sm relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/2 rotate-45 translate-x-8 -translate-y-8"></div>
                            
                            <div className="mb-4">
                                <h3 className="text-xl font-heading font-bold text-slate-800 group-hover:text-primary transition-colors">
                                    {project.title.split('—')[0]}
                                </h3>
                                <p className="text-[10px] text-slate-400 font-body uppercase tracking-widest">
                                    {project.title.split('—')[1] || ''}
                                </p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <h4 className="text-[9px] uppercase font-bold text-primary mb-1 tracking-tighter italic">Impact</h4>
                                    <p className="text-sm text-primary/95 font-medium leading-relaxed italic border-l border-primary/30 pl-3">
                                        {project.impact}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-[9px] uppercase font-bold text-slate-400 mb-2 tracking-tighter">Stack</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 bg-glass-light border border-glass-stroke text-[9px] uppercase font-bold text-slate-500 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[9px] uppercase font-bold text-slate-400 mb-1 tracking-tighter">Details</h4>
                                    <p className="text-xs text-slate-600 font-body leading-relaxed">
                                        {project.description}
                                    </p>
                                    {project.disclaimer && (
                                        <div className="mt-2 bg-primary/5 border-l border-primary/40 px-2 py-1 flex gap-2 items-center">
                                            <span className="text-[8px] font-bold text-primary uppercase italic">{project.disclaimer}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                                <a 
                                    href={project.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 py-2 bg-glass-light border border-glass-stroke text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:bg-glass-card hover:border-glass-stroke rounded"
                                >
                                    <Github size={14} /> GitHub
                                </a>
                                {project.demo && (
                                    <a 
                                        href={project.demo} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 py-2 bg-primary text-[10px] font-bold uppercase tracking-widest text-white hover:bg-primary-dark rounded"
                                    >
                                        <ExternalLink size={14} /> Live
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Table Container - Desktop View (Hidden on Mobile) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="hidden md:block w-full overflow-x-auto rounded border border-glass-stroke bg-glass-surface shadow-sm overflow-hidden"
                >
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-glass-stroke bg-glass-card">
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-slate-750 font-heading">Project Name</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-slate-750 font-heading">Key Impact</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-slate-750 font-heading">Tech Stack</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-slate-750 font-heading">Description</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-slate-750 font-heading text-center">Links</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectsData.map((project, index) => (
                                <tr 
                                    key={index}
                                    className="border-b border-glass-stroke hover:bg-glass-light transition-colors group"
                                >
                                    <td className="px-6 py-6 align-top">
                                        <h3 className="text-slate-800 font-heading font-medium text-lg leading-tight group-hover:text-primary transition-colors whitespace-nowrap">
                                            {project.title.split('—')[0]}
                                        </h3>
                                        <span className="text-[10px] text-slate-400 font-body block mt-1 uppercase tracking-tight">
                                            {project.title.split('—')[1] || ''}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 align-top">
                                        <p className="text-primary/95 text-sm font-medium leading-relaxed italic">
                                            {project.impact}
                                        </p>
                                    </td>
                                    <td className="px-6 py-6 align-top">
                                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-glass-light border border-glass-stroke text-[9px] uppercase font-bold text-slate-500 rounded-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 align-top max-w-sm">
                                        <p className="text-slate-600 text-xs font-body leading-relaxed">
                                            {project.description}
                                        </p>
                                        {project.disclaimer && (
                                            <p className="text-primary/70 text-[9px] font-bold mt-2 uppercase italic tracking-tighter">
                                                {project.disclaimer}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-6 py-6 align-top">
                                        <div className="flex flex-col gap-2 items-center justify-center">
                                            <a 
                                                href={project.github} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 flex items-center justify-center bg-glass-light border border-glass-stroke text-slate-600 rounded hover:border-primary hover:bg-primary/5 group/link transition-all"
                                                title="View Code"
                                            >
                                                <Github size={14} className="text-slate-600 group-hover/link:text-primary" />
                                            </a>
                                            {project.demo && (
                                                <a 
                                                    href={project.demo} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 flex items-center justify-center bg-glass-light border border-glass-stroke text-slate-600 rounded hover:border-primary hover:bg-primary/5 group/link transition-all"
                                                    title="Live Demo"
                                                >
                                                    <ExternalLink size={14} className="text-slate-600 group-hover/link:text-primary" />
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Footer Info */}
                <div className="mt-8 flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 font-heading">
                    <span>Nathan Mendis // Archive 2026</span>
                    <span className="text-primary">End of List</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
