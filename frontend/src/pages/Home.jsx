import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact'; // We will create this next

const Home = () => {
    return (
        <div className="space-y-20 pb-20 overflow-hidden">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
        </div>
    );
};

export default Home;
