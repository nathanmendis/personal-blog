import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-valorant-dark border-t border-white/10 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-valorant-red transform -skew-x-12"></div>
                            <h3 className="text-xl font-heading text-white tracking-wider">PROTOCOL: AGENT</h3>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs font-body">
                            Building intelligent backend architectures and immersive frontend experiences.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-heading tracking-widest border-l-4 border-valorant-red pl-3">CONNECT</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-valorant-red transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-valorant-red transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-valorant-red transition-colors"><Mail size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-valorant-red transition-colors"><FileText size={20} /></a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-heading tracking-widest border-l-4 border-valorant-red pl-3">SYSTEM STATUS</h4>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm text-gray-400 font-mono">ALL SYSTEMS OPERATIONAL</span>
                        </div>
                        <p className="text-xs text-gray-500 font-mono">
                            V.1.0.0 // REACT // DJANGO
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 font-mono">© 2026 NATHAN MENDIS. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-4 text-xs text-gray-500 font-mono uppercase">
                        <a href="#" className="hover:text-valorant-red">Privacy Policy</a>
                        <span className="text-valorant-red">/</span>
                        <a href="#" className="hover:text-valorant-red">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
