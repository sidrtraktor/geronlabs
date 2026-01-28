import React from 'react';
import { motion } from 'framer-motion';
import { WireframeButton } from '../components/ui/WireframePrimitives';
import HeroImage from '../assets/hero_sculpture_nodes.png';
import Logo from '../assets/geron_logo_g.png';

const Home = () => {
    return (
        <div className="h-screen w-full relative flex items-center justify-center bg-geron-white overflow-hidden">

            {/* Background Grid/Noise (Optional) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* Logo */}
            <div className="absolute top-8 left-8 z-50">
                <img src={Logo} alt="Geron Labs" className="h-16 w-auto opacity-80" />
            </div>

            {/* Central Hero Section */}
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Main Sculpture Image */}
                    <img
                        src={HeroImage}
                        alt="David Sculpture Wireframe"
                        className="h-[80vh] w-auto object-contain drop-shadow-2xl grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                    />

                    {/* Overlay Glow Effect */}
                    <div className="absolute inset-0 bg-geron-cyan/5 mix-blend-overlay pointer-events-none rounded-full blur-3xl opacity-50" />
                </motion.div>
            </div>

            {/* Navigation Nodes (Absolute positioning relative to screen) */}

            {/* Top Right: About */}
            <div className="absolute top-[20%] right-[10%] xl:right-[15%]">
                <WireframeButton to="/about" direction="left">
                    About Geron
                </WireframeButton>
                {/* Connecting Line (Decorative SVG) */}
                <svg className="absolute top-1/2 right-full w-24 h-32 -translate-y-full pointer-events-none opacity-30 hidden lg:block">
                    <path d="M 0 128 Q 40 128 96 10" fill="none" stroke="#1A1A1A" strokeWidth="1" />
                </svg>
            </div>

            {/* Middle Right: Cases */}
            <div className="absolute top-[50%] right-[5%] xl:right-[10%]">
                <WireframeButton to="/cases" direction="left">
                    Case Studies
                </WireframeButton>
                <div className="absolute top-1/2 right-full w-16 h-[1px] bg-geron-grey-dark/20 hidden lg:block" />
            </div>

            {/* Bottom Right: Solutions */}
            <div className="absolute bottom-[20%] right-[10%] xl:right-[15%]">
                <WireframeButton to="/cases" direction="left">
                    Solutions
                </WireframeButton>
                <svg className="absolute bottom-1/2 right-full w-24 h-32 translate-y-full pointer-events-none opacity-30 hidden lg:block">
                    <path d="M 0 0 Q 40 0 96 118" fill="none" stroke="#1A1A1A" strokeWidth="1" />
                </svg>
            </div>

            {/* Bottom Left: Contact */}
            <div className="absolute bottom-[20%] left-[10%] xl:left-[15%]">
                <WireframeButton to="/contact" direction="right">
                    Contact System
                </WireframeButton>
                <svg className="absolute bottom-1/2 left-full w-24 h-32 translate-y-full pointer-events-none opacity-30 hidden lg:block">
                    <path d="M 96 0 Q 56 0 0 118" fill="none" stroke="#1A1A1A" strokeWidth="1" />
                </svg>
            </div>

            {/* Decorative Technical details */}
            <div className="absolute bottom-8 left-8 font-mono text-xs text-geron-grey-mid opacity-50">
                <p>SYSTEM: ONLINE</p>
                <p>VER: 2.0.45-ALPHA</p>
            </div>

        </div>
    );
};

export default Home;
