import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StubPage from '../components/StubPage';
import HeroContent from '../components/HeroContent';

const Home = () => {
    // State to track if the "system" has been launched
    const [isLaunched, setIsLaunched] = useState(false);

    return (
        <AnimatePresence mode="wait">
            {/* 
                mode="wait" means the exiting component finishes before the new one starts.
                BUT for Shared Layout (layoutId) to work magically across components, 
                they usually need to be present simultaneously or the transition is handled by Framer.
                
                However, for "Page Transition" where one page replaces another, 
                often we simply swap them. 
                
                If we want the Logo to morph, the components must share the context. 
                AnimatePresence allows the exit animation to play.
                
                If we use mode="wait", the logo from the first page disappears, 
                THEN the new page appears with the logo. The morph might break.
                
                Let's try WITHOUT mode="wait" (default handling: parallel). 
                Ideally, the StubPage fades out its content while the Logo stays, 
                and HeroContent fades in its content while the Logo moves.
             */}
            {!isLaunched ? (
                <StubPage key="stub" onLaunch={() => setIsLaunched(true)} />
            ) : (
                <HeroContent key="hero" />
            )}
        </AnimatePresence>
    );
};

export default Home;
