import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import api from '../services/api';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/blogs/${id}/`);
                setBlog(response.data);
            } catch (err) {
                console.error("Failed to fetch blog:", err);
                setError("Failed to load intelligence report.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-primary font-mono animate-pulse uppercase tracking-widest text-xs">Accessing Neural Archives...</span>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="text-center bg-glass-surface border border-glass-stroke p-12 shadow-sm rounded-lg">
                    <h1 className="text-4xl font-heading font-bold text-primary mb-4 tracking-tighter italic">ACCESS DENIED</h1>
                    <p className="text-slate-500 font-mono mb-8 uppercase text-xs tracking-widest">{error || "Report signature not found in central database."}</p>
                    <Link to="/blog" className="px-8 py-3 bg-primary text-white font-heading font-bold uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-2 rounded-full">
                        <ArrowLeft size={16} /> RETURN TO BASE
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen py-10 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Tactical Header Navigation */}
                <div className="flex justify-between items-center mb-12">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-all font-mono text-xs group uppercase tracking-widest bg-glass-surface px-4 py-2 border border-glass-stroke hover:border-primary shadow-sm rounded-lg">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Intelligence
                    </Link>

                    <div className="flex gap-4">
                        <button className="w-9 h-9 flex items-center justify-center bg-glass-surface border border-glass-stroke text-slate-500 hover:text-primary hover:border-primary transition-all rounded-lg shadow-sm">
                            <Share2 size={16} />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-glass-surface border border-glass-stroke text-slate-500 hover:text-primary hover:border-primary transition-all rounded-lg shadow-sm">
                            <Bookmark size={16} />
                        </button>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-glass-surface border border-glass-stroke shadow-sm rounded-xl overflow-hidden relative">
                    {/* Visual Decor */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rotate-45 translate-x-16 -translate-y-16 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-1 h-20 bg-primary"></div>
                    
                    <header className="p-8 md:p-12 border-b border-slate-100">
                        <div className="flex flex-wrap items-center gap-6 text-primary font-mono text-[10px] mb-8 uppercase tracking-[0.2em]">
                            <span className="px-3 py-1 bg-primary/5 border border-primary/20 italic font-bold">Classified Report</span>
                            <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
                                <Calendar size={14} className="opacity-50" />
                                <span className="text-slate-500">{new Date(blog.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
                                <Clock size={14} className="opacity-50" />
                                <span className="text-slate-500">8 MIN READ</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-[1.1] tracking-tighter">
                            {blog.title.split(':').map((part, i) => (
                                <span key={i} className={i === 1 ? "text-primary block mt-2" : "block"}>
                                    {part}{i === 0 && blog.title.includes(':') ? ':' : ''}
                                </span>
                            ))}
                        </h1>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <span className="font-heading font-bold text-primary">NM</span>
                            </div>
                            <div>
                                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Author</p>
                                <p className="text-sm font-heading font-bold text-slate-800 uppercase tracking-tight">Nathan Mendis</p>
                            </div>
                        </div>
                    </header>

                    <div className="p-8 md:p-12">
                        <div className="prose prose-lg max-w-none 
                            prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic prose-headings:text-slate-900
                            prose-h2:text-primary prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-6 prose-h2:py-2 prose-h2:bg-primary/5
                            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-body
                            prose-strong:text-slate-900 prose-strong:font-bold
                            prose-li:text-slate-600
                            prose-code:text-primary prose-code:bg-slate-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-slate-200/50
                            prose-blockquote:border-primary prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:italic
                            ">
                            <ReactMarkdown>
                                {blog.content}
                            </ReactMarkdown>
                        </div>
                    </div>

                    <div className="px-8 py-6 bg-glass-card border-t border-glass-stroke flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em]">
                            <span className="w-2 h-2 bg-primary animate-pulse"></span>
                            END OF INTELLIGENCE REPORT // REF: {blog.id}
                        </div>
                        <div className="text-primary font-heading font-bold italic uppercase tracking-tighter text-sm">
                            Nathan Mendis // 2026 Archive
                        </div>
                    </div>
                </div>

                {/* Tactical Footer Elements */}
                <div className="mt-12 flex justify-between items-start opacity-30 pointer-events-none">
                    <div className="font-mono text-[8px] space-y-1">
                        <p>STX_PROTOCOL_V4.2</p>
                        <p>AUTH_TOKEN: {Math.random().toString(16).substring(2, 10).toUpperCase()}</p>
                        <p>ENCRYPTION: AES-256-GCM</p>
                    </div>
                    <div className="w-24 h-1 bg-primary"></div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;

