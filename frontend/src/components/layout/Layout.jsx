import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const { left, top } = containerRef.current.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-valorant-dark text-white font-body selection:bg-valorant-red selection:text-white flex flex-col relative overflow-hidden"
        >
            {/* Background Graphic Elements - Enhanced Layer */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* 1. Base Grid Layer */}
                {/* 1. Base Grid Layer */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                {/* 2. Interactive Red Gradient Glow (Flashlight Effect) */}
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 70, 85, 0.15), transparent 40%)`
                    }}
                ></div>

                {/* 3. Top Right Angled Gradient */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-valorant-red/5 to-transparent skew-x-12 transform origin-top-right"></div>

                {/* 4. Bottom Left Angled Gradient */}
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-valorant-red/5 to-transparent skew-x-12 transform origin-bottom-left"></div>

                {/* 5. Floating Tactical Elements */}
                <div className="absolute top-20 left-10 w-2 h-2 bg-valorant-red animate-pulse"></div>
                <div className="absolute top-24 left-10 w-2 h-10 bg-white/10"></div>

                <div className="absolute bottom-20 right-10 w-2 h-20 bg-valorant-red/20"></div>
                <div className="absolute bottom-20 right-14 w-2 h-4 bg-white/20"></div>

                {/* 6. Random Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/200\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
            </div>

            <Navbar />

            <main className="flex-grow pt-20 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
