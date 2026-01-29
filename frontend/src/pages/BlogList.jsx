import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, AlertCircle } from 'lucide-react';
import api from '../services/api';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get('/blogs/');
                setBlogs(response.data);
            } catch (err) {
                console.error("Failed to fetch blogs:", err);
                setError("Unable to retrieve intelligence reports. System offline.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="pt-10 pb-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 border-b border-white/10 pb-4 flex items-end justify-between">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2">
                            FIELD <span className="text-valorant-red">REPORTS</span>
                        </h1>
                        <p className="text-gray-400 font-mono text-sm max-w-md">Declassified operations and technical insights from the field.</p>
                    </div>
                    <div className="hidden md:block h-2 bg-valorant-red w-20 mb-2"></div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-valorant-red border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-valorant-red font-mono animate-pulse">DECRYPTING DATA...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-900/20 border border-red-500/50 p-6 flex items-center gap-4">
                        <AlertCircle className="text-red-500" size={24} />
                        <div>
                            <h3 className="text-red-400 font-heading text-xl">CONNECTION FAILURE</h3>
                            <p className="text-gray-400 text-sm">{error}</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="group relative bg-valorant-dark border border-white/10 overflow-hidden hover:border-valorant-red/50 transition-all h-full flex flex-col"
                            >
                                {/* Decorative background bar */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-valorant-red transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300"></div>

                                <div className="p-6 flex flex-col h-full z-10">
                                    <div className="flex items-center gap-2 text-gray-500 text-xs font-mono mb-4">
                                        <Calendar size={14} />
                                        <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                                    </div>

                                    <h2 className="text-2xl font-heading text-white mb-3 group-hover:text-valorant-red transition-colors line-clamp-2">
                                        {blog.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm font-body mb-6 line-clamp-3 overflow-hidden text-ellipsis flex-grow">
                                        {blog.content}
                                    </p>

                                    <Link
                                        to={`/blog/${blog.id}`}
                                        className="mt-auto inline-flex items-center gap-2 text-white text-sm font-heading tracking-wider uppercase group-hover:text-valorant-red transition-colors"
                                    >
                                        <span>Read Full Report</span>
                                        <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;
