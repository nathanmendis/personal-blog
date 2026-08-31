import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-glass-card border-t border-glass-stroke py-4 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    {/* Brand */}
                    <p className="text-xs font-heading font-bold text-slate-600 tracking-widest uppercase">
                        Nathan Mendis
                    </p>

                    {/* Copyright */}
                    <p className="text-xs text-slate-400 font-body order-last sm:order-none">
                        © 2026 Nathan Mendis. All rights reserved.
                    </p>

                    {/* Social icons */}
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/nathanmendis" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors duration-200" aria-label="GitHub">
                            <Github size={17} />
                        </a>
                        <a href="https://www.linkedin.com/in/nathan-mendis-a2318122a/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors duration-200" aria-label="LinkedIn">
                            <Linkedin size={17} />
                        </a>
                        <a href="mailto:nathanmendis17@gmail.com" className="text-slate-400 hover:text-primary transition-colors duration-200" aria-label="Email">
                            <Mail size={17} />
                        </a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors duration-200" aria-label="Resume">
                            <FileText size={17} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
