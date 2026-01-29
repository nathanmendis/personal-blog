import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT', path: '#about' },
        { name: 'SKILLS', path: '#skills' },
        { name: 'EXPERIENCE', path: '#experience' },
        { name: 'PROJECTS', path: '#projects' },
        { name: 'BLOG', path: '/blog' },
        { name: 'CONTACT', path: '#contact' },
    ];

    const handleNavClick = (e, path) => {
        e.preventDefault();
        setIsOpen(false);

        if (path.startsWith('#')) {
            if (location.pathname !== '/') {
                navigate('/');
                // Small timeout to allow navigation to complete before scrolling
                setTimeout(() => {
                    const element = document.querySelector(path);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                const element = document.querySelector(path);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(path);
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-valorant-dark/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div
                        className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-8 h-8 bg-valorant-red transform -skew-x-12 flex items-center justify-center">
                            <span className="text-white font-bold font-heading transform skew-x-12">N</span>
                        </div>
                        <span className="text-2xl font-heading tracking-wider text-white">NATHAN MENDIS</span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    onClick={(e) => handleNavClick(e, item.path)}
                                    className="relative group px-3 py-2 text-sm font-medium text-valorant-light hover:text-white transition-colors duration-200 font-heading tracking-widest cursor-pointer"
                                >
                                    <span className="relative z-10">{item.name}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-valorant-red transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-valorant-dark border-b border-valorant-red">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.path}
                                onClick={(e) => handleNavClick(e, item.path)}
                                className="block px-3 py-2 text-base font-medium text-valorant-light hover:text-white hover:bg-white/5 font-heading tracking-wider cursor-pointer"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
