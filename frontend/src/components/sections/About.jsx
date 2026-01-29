import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 relative">
                {/* Decorative frame for image/resume */}
                <div className="relative border-2 border-valorant-red/30 p-2">
                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-valorant-red"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-valorant-red"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-valorant-red"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-valorant-red"></div>

                    <div className="bg-valorant-dark border border-white/5 p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-valorant-red/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <h3 className="text-2xl font-heading mb-4 relative z-10">MISSION BRIEFING</h3>
                        <p className="text-gray-300 font-body relative z-10 mb-4">
                            I’m an AI-focused full-stack developer who loves solving practical problems using clean backend architecture and intelligent systems.
                        </p>
                        <p className="text-gray-300 font-body relative z-10">
                            I’ve built and deployed production-ready platforms involving role-based authentication, secure APIs, encrypted messaging, and AI-powered automation. My recent work focuses on Agentic AI, RAG pipelines, and NLP-driven products.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">
                        <span className="text-valorant-red">/</span> ABOUT THE AGENT
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                <span className="text-valorant-red font-bold font-heading text-xl">01</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-heading mb-1">ENGINEERING STUDENT</h4>
                                <p className="text-gray-400 text-sm">Final-year Artificial Intelligence & Machine Learning engineering student.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                <span className="text-valorant-red font-bold font-heading text-xl">02</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-heading mb-1">FULL-STACK SPECIALIST</h4>
                                <p className="text-gray-400 text-sm">Hands-on experience in Django, React, and production deployments.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                <span className="text-valorant-red font-bold font-heading text-xl">03</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-heading mb-1">AI INNOVATOR</h4>
                                <p className="text-gray-400 text-sm">Building real-world products where backend architecture meets intelligent automation.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
