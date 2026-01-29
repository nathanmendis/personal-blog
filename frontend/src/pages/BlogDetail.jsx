import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
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
                    <div className="w-12 h-12 border-4 border-valorant-red border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-valorant-red font-mono animate-pulse">ACCESSING ARCHIVES...</span>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="text-center">
                    <h1 className="text-4xl font-heading text-red-500 mb-4">ACCESS DENIED</h1>
                    <p className="text-gray-400 font-mono mb-8">{error || "Report not found."}</p>
                    <Link to="/blog" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-heading">
                        RETURN TO BASE
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen py-10 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 font-mono text-sm group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    BACK TO INTELLIGENCE
                </Link>

                <header className="mb-12 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-4 text-valorant-red font-mono text-xs mb-4">
                        <span className="px-2 py-1 bg-valorant-red/10 border border-valorant-red/20 uppercase">Classified</span>
                        <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(blog.published_at).toLocaleDateString()}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>
                </header>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-body">
                    {/* Simple whitespace handling for now. Can use react-markdown later if needed */}
                    <div className="whitespace-pre-wrap leading-relaxed">
                        {blog.content}
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center text-gray-500 font-mono text-xs">
                    <span>END OF REPORT</span>
                    <span>ID: {blog.id} // V.1.0</span>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;
