import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-glass-dark border-t border-white/10 py-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">

                            <h3 className="text-xl font-heading font-bold text-white tracking-tight">NATHAN MENDIS</h3>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs font-body leading-relaxed">
                            Building intelligent backend architectures and immersive frontend experiences.
                            Turning complex problems into elegant solutions.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-body font-bold tracking-wider uppercase text-sm text-primary">Connect</h4>
                        <div className="flex space-x-5">
                            <a href="https://github.com/nathanmendis" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><Github size={22} /></a>
                            <a href="https://www.linkedin.com/in/nathan-mendis-a2318122a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><Linkedin size={22} /></a>
                            <a href="mailto:nathanmendis17@gmail.com" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><Mail size={22} /></a>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><FileText size={22} /></a>
                        </div>
                    </div>


                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 font-body">© 2026 Nathan Mendis. All rights reserved.</p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
