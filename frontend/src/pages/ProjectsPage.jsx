import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Mail, Linkedin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData, socialsData } from '../data/projectsData';

const ProjectsPage = () => {
    return (
        <div className="min-h-screen bg-valorant-dark pt-24 pb-20 px-4 md:px-8 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
                >
                    <div>
                        <Link to="/" className="text-valorant-red flex items-center gap-2 mb-4 hover:gap-3 transition-all font-heading text-sm uppercase tracking-widest group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tighter">
                            PROJECT <span className="text-valorant-red">ARCHIVE</span>
                        </h1>
                        <p className="text-gray-400 mt-2 font-body max-w-2xl text-sm italic">
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
                                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-valorant-red group-hover:bg-valorant-red/10 transition-all">
                                        <Icon size={18} className="text-white group-hover:text-valorant-red" />
                                    </div>
                                    <span className="hidden lg:block text-[10px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors">
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
                            className="bg-black/40 border border-white/10 p-5 rounded relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-valorant-red/5 rotate-45 translate-x-8 -translate-y-8"></div>
                            
                            <div className="mb-4">
                                <h3 className="text-xl font-heading font-bold text-white group-hover:text-valorant-red transition-colors">
                                    {project.title.split('—')[0]}
                                </h3>
                                <p className="text-[10px] text-gray-500 font-body uppercase tracking-widest">
                                    {project.title.split('—')[1] || ''}
                                </p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <h4 className="text-[9px] uppercase font-bold text-valorant-red mb-1 tracking-tighter italic">Impact</h4>
                                    <p className="text-sm text-valorant-red/90 font-medium leading-relaxed italic border-l border-valorant-red/30 pl-3">
                                        {project.impact}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-[9px] uppercase font-bold text-gray-500 mb-2 tracking-tighter">Stack</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] uppercase font-bold text-gray-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[9px] uppercase font-bold text-gray-500 mb-1 tracking-tighter">Details</h4>
                                    <p className="text-xs text-gray-400 font-body leading-relaxed">
                                        {project.description}
                                    </p>
                                    {project.disclaimer && (
                                        <div className="mt-2 bg-valorant-red/5 border-l border-valorant-red/40 px-2 py-1 flex gap-2 items-center">
                                            <span className="text-[8px] font-bold text-valorant-red uppercase italic">{project.disclaimer}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                                <a 
                                    href={project.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-valorant-red hover:border-valorant-red transition-all"
                                >
                                    <Github size={14} /> GitHub
                                </a>
                                {project.demo && (
                                    <a 
                                        href={project.demo} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 py-2 bg-valorant-red text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#ff4655] transition-all"
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
                    className="hidden md:block w-full overflow-x-auto rounded border border-white/10 bg-black/40 backdrop-blur-sm scrollbar-hide"
                >
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-valorant-red font-heading">Project Name</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-valorant-red font-heading">Key Impact</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-valorant-red font-heading">Tech Stack</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-valorant-red font-heading">Description</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-valorant-red font-heading text-center">Links</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectsData.map((project, index) => (
                                <tr 
                                    key={index}
                                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="px-6 py-6 align-top">
                                        <h3 className="text-white font-heading font-medium text-lg leading-tight group-hover:text-valorant-red transition-colors whitespace-nowrap">
                                            {project.title.split('—')[0]}
                                        </h3>
                                        <span className="text-[10px] text-gray-500 font-body block mt-1 uppercase tracking-tight">
                                            {project.title.split('—')[1] || ''}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 align-top">
                                        <p className="text-valorant-red/90 text-sm font-medium leading-relaxed italic">
                                            {project.impact}
                                        </p>
                                    </td>
                                    <td className="px-6 py-6 align-top">
                                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] uppercase font-bold text-gray-400 rounded-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 align-top max-w-sm">
                                        <p className="text-gray-400 text-xs font-body leading-relaxed">
                                            {project.description}
                                        </p>
                                        {project.disclaimer && (
                                            <p className="text-valorant-red/60 text-[9px] font-bold mt-2 uppercase italic tracking-tighter">
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
                                                className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded hover:border-valorant-red hover:bg-valorant-red/10 group/link transition-all"
                                                title="View Code"
                                            >
                                                <Github size={14} className="text-white group-hover/link:text-valorant-red" />
                                            </a>
                                            {project.demo && (
                                                <a 
                                                    href={project.demo} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded hover:border-valorant-red hover:bg-valorant-red/10 group/link transition-all"
                                                    title="Live Demo"
                                                >
                                                    <ExternalLink size={14} className="text-white group-hover/link:text-valorant-red" />
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
                <div className="mt-8 flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600 font-heading">
                    <span>Nathan Mendis // Archive 2026</span>
                    <span className="text-valorant-red">End of List</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
