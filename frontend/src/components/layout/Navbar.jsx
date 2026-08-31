import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const navItems = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT', path: '#about' },
        { name: 'SKILLS', path: '#skills' },
        { name: 'EXPERIENCE', path: '#experience' },
        { name: 'PROJECTS', path: '#projects' },
        { name: 'ARCHIVE', path: '/projects' },
        { name: 'BLOG', path: '/blog' },
        { name: 'CONTACT', path: '#contact' },
    ];

    const handleNavClick = (e, path) => {
        e.preventDefault();
        setIsOpen(false);

        if (path.startsWith('#')) {
            if (location.pathname !== '/') {
                navigate('/');
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
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-glass-backdrop border-b border-glass-stroke shadow-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div
                        className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
                        onClick={() => navigate('/')}
                    >

                        <span className="text-xl font-heading font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors">NATHAN MENDIS</span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    onClick={(e) => handleNavClick(e, item.path)}
                                    className="relative group px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors duration-200 font-body tracking-wide cursor-pointer"
                                >
                                    <span className="relative z-10">{item.name}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 shadow-md">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.path}
                                onClick={(e) => handleNavClick(e, item.path)}
                                className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
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
