import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
    {
        title: "Harvey — AI-Powered HR Agent",
        tags: ["Agentic AI", "RAG", "LangGraph", "LLMs"],
        description: "Built a graph-based agentic AI system enabling multi-step reasoning and tool orchestration. Implemented RAG using Sentence Transformers and PostgreSQL (pgvector). Added state management and anti-hallucination safeguards.",
        github: "https://github.com/yourusername/harvey-hr-agent",
        demo: "https://harvey-demo-link.com",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
        title: "VibeeChat — Secure Messaging",
        tags: ["Django", "DRF", "JWT", "Cryptography"],
        description: "Developed a secure encrypted messaging backend. Implemented JWT-based stateless authentication and atomic operations for chats and friend requests.",
        github: "https://github.com/yourusername/vibeechat",
        demo: "https://vibeechat-live-link.com",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
        title: "WhatsApp Chat Analyzer",
        tags: ["Python", "Streamlit", "ML", "NLP"],
        description: "Interactive analytics dashboard for WhatsApp logs. Features interest modeling to identify key topics, time-series visualization, and comprehensive engagement statistics.",
        github: "https://github.com/nathanmendis/whatsappchat-analysis",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
        title: "Fake News Detection",
        tags: ["Python", "NLP", "ML"],
        description: "Implemented TF-IDF-based NLP pipelines and trained models including Logistic Regression and Random Forest. Achieved 95% accuracy.",
        github: "https://github.com/yourusername/fake-news-detection",
        demo: "https://fake-news-detector.streamlit.app",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600&h=400"
    }
];

const Projects = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="projects" className="py-20 bg-black/20">
            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold flex items-center gap-4">
                        <span className="w-4 h-12 bg-valorant-red"></span>
                        FEATURED ASSIGNMENTS
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="bg-valorant-dark border border-white/10 p-3 hover:bg-valorant-red hover:text-white transition-colors text-white/50"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="bg-valorant-dark border border-white/10 p-3 hover:bg-valorant-red hover:text-white transition-colors text-white/50"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto pb-8 snap-x scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex-none w-[90vw] md:w-[400px] snap-center group bg-valorant-dark border border-white/10 hover:border-valorant-red transition-all duration-300 flex flex-col"
                        >
                            <div className="relative h-56 overflow-hidden bg-gray-800">
                                <div className="absolute inset-0 bg-valorant-red/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" />

                                {/* Overlay Tags */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-20 flex gap-2 overflow-x-auto no-scrollbar">
                                    {project.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-valorant-red text-white whitespace-nowrap">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-heading text-white mb-2 group-hover:text-valorant-red transition-colors truncate">{project.title}</h3>
                                <p className="text-gray-400 text-sm font-body mb-6 flex-grow line-clamp-3">{project.description}</p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-valorant-red font-medium transition-colors">
                                        <Github size={16} /> CODE
                                    </a>
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-valorant-red font-medium transition-colors">
                                            <ExternalLink size={16} /> LIVE DEMO
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
