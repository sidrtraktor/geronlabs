import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StubPage from '../components/StubPage';
import HeroContent from '../components/HeroContent';

const Home = () => {
    // State to track if the "system" has been launched
    // Check sessionStorage to persist state across navigation (e.g. Back button)
    const [isLaunched, setIsLaunched] = useState(() => {
        return sessionStorage.getItem('geron_launched') === 'true';
    });

    const handleLaunch = () => {
        sessionStorage.setItem('geron_launched', 'true');
        setIsLaunched(true);
    };

    return (
        <AnimatePresence mode="wait">
            {!isLaunched ? (
                <StubPage key="stub" onLaunch={handleLaunch} />
            ) : (
                <HeroContent key="hero" />
            )}
        </AnimatePresence>
    );
};

export default Home;
