import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/david_head_new.jpg';
// Logo is handled by the parent container for the shared layout, 
// OR we pass it down if we want to render it here, 
// BUT the requirement says "Logo physically moves". 
// To achieve Shared Layout, the Logo should probably be in the Container OR 
// we use the Same LayoutId in both components. 
// The prompt says: "use Framer Motion's `layoutId="main-logo"` on both the big logo (Start) and the small top-left logo (End)."
// So I will render the logo here too.
import Logo from '../assets/geron_logo_g.png';
import Footer from './Footer';

// --- internal components ---

const ConnectorLine = ({ start, end, isHovered, delay }) => {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
            {/* Base Line */}
            <motion.line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#A3A3A3"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 3.0, delay: delay, ease: "easeInOut" }}
            />
            {/* Hover Glow */}
            <AnimatePresence>
                {isHovered && (
                    <motion.line
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                        stroke="url(#gradient-glow)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>
            <defs>
                <linearGradient id="gradient-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
            </defs>
            {/* End Point Dot */}
            <circle cx={end.x} cy={end.y} r="2" fill="#A3A3A3" opacity="0.8" />
            <circle cx={start.x} cy={start.y} r="2" fill="#A3A3A3" opacity="0.8" />
        </svg>
    );
};

// --- Text Scramble / Translation Component ---
const CipherText = ({ text, targetText, isHovered }) => {
    const [display, setDisplay] = useState(text);
    const intervalRef = useRef(null);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+';

    useEffect(() => {
        let currentText = isHovered ? targetText : text;
        let iteration = 0;

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplay(prev =>
                currentText
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return currentText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= currentText.length) {
                clearInterval(intervalRef.current);
            }

            iteration += 1 / 2; // Speed of transformation
        }, 30);

        return () => clearInterval(intervalRef.current);
    }, [isHovered, text, targetText]);

    return <span>{display}</span>;
};

const NavLabel = ({ label, labelRu, number, to, align = 'left', isMobile, isHovered, onHover, onLeave }) => {
    const targetText = labelRu || label;

    return (
        <Link
            to={to}
            className={`group flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} ${isMobile ? 'items-center text-center w-full py-4 border-b border-gray-100 last:border-0' : ''}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <span className="font-mono text-[10px] text-gray-400 mb-1 tracking-widest opacity-60">
                [{number}]
            </span>
            <span className="text-sm md:text-lg font-bold uppercase tracking-[0.2em] text-gray-800 group-hover:text-cyan-600 transition-colors bg-white/80 backdrop-blur-sm px-1 leading-none py-1">
                <CipherText text={label} targetText={targetText} isHovered={isHovered} />
            </span>
        </Link>
    );
};

const HeroContent = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Configuration - STRICT ALIGNMENT
    const navItems = [
        {
            id: 'philosophy',
            label: 'PHILOSOPHY',
            labelRu: 'ФИЛОСОФИЯ',
            number: '01',
            to: '/about',
            align: 'right',
            // Brow/Forehead -> Right Axis
            start: { x: '62%', y: '28%' },
            end: { x: '82%', y: '28%' },
            delay: 0.4 // Doubled from 0.2
        },
        {
            id: 'cases',
            label: 'CASE STUDIES',
            labelRu: 'КЕЙСЫ',
            number: '02',
            to: '/cases',
            align: 'right',
            // Cheek -> Right Axis
            start: { x: '65%', y: '45%' },
            end: { x: '82%', y: '45%' },
            delay: 0.8 // Doubled from 0.4
        },
        {
            id: 'solutions',
            label: 'SOLUTIONS',
            labelRu: 'РЕШЕНИЯ',
            number: '03',
            to: '/solutions',
            align: 'right',
            // Jaw/Neck -> Right Axis
            start: { x: '60%', y: '65%' },
            end: { x: '82%', y: '65%' },
            delay: 1.2 // Doubled from 0.6
        },
        {
            id: 'contact',
            label: 'CONTACT',
            labelRu: 'КОНТАКТЫ',
            number: '04',
            to: '/contact',
            align: 'left',
            // Neck/Base -> Left Axis
            start: { x: '45%', y: '75%' },
            end: { x: '18%', y: '75%' },
            delay: 1.6 // Doubled from 0.8
        }
    ];

    return (
        <div className="h-screen w-full relative bg-white overflow-hidden flex flex-col">

            {/* 1. ENGINEERING GRID BACKGROUND */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-[0.15]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 3.0 }} // Doubled into 3.0
                style={{
                    backgroundImage: 'linear-gradient(#E5E5E5 1px, transparent 1px), linear-gradient(90deg, #E5E5E5 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* 2. LOGO INTEGRATION - Fixed & Blended */}
            {/* Added layoutId for transition from StubPage */}
            <motion.div
                layoutId="main-logo"
                className="absolute top-8 left-8 z-50 mix-blend-multiply pointer-events-none select-none"
                transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }} // Doubled into 2.4
            >
                <img src={Logo} alt="Geron Labs" className="h-32 md:h-40 w-auto opacity-90 contrast-125 saturate-0" />
            </motion.div>

            {/* Main Content */}
            <div className="flex-grow w-full flex items-center justify-center relative">

                {/* SCENE CONTAINER (Desktop) */}
                <div className="relative w-full max-w-6xl aspect-[16/9] md:min-h-[600px] flex items-center justify-center">

                    {/* The Image */}
                    <motion.div
                        className="relative z-10 h-[45vh] md:h-[75vh] max-h-[700px] w-auto object-contain flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0, scale: 0.95, y: 50, filter: 'blur(10px)' }} // Added reveal effect
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 2.4, delay: 1.0, ease: "easeOut" }} // Doubled into 2.4, delay 1.0
                    >
                        <img
                            src={HeroImage}
                            alt="Hero Sculpture"
                            className="h-full w-auto object-contain mix-blend-multiply contrast-110"
                        />
                    </motion.div>

                    {/* Desktop Navigation Layer (Overlay) */}
                    {!isMobile && (
                        <div className="absolute inset-0 z-20 w-full h-full">
                            {navItems.map((item) => (
                                <React.Fragment key={item.id}>
                                    {/* Line */}
                                    <ConnectorLine
                                        start={item.start}
                                        end={item.end}
                                        isHovered={hoveredLink === item.id}
                                        delay={item.delay + 1.0} // Base delay (doubled in navItems) + 1.0 (doubled overhead)
                                    />

                                    {/* Label Anchor */}
                                    <motion.div
                                        className="absolute transform -translate-y-1/2"
                                        style={{
                                            left: item.align === 'left' ? item.end.x : 'auto',
                                            right: item.align === 'right' ? `calc(100% - ${item.end.x})` : 'auto',
                                            top: item.end.y,
                                            transform: `translate(${item.align === 'left' ? '-100%' : '0%'}, -50%)`
                                        }}
                                        initial={{ opacity: 0, x: item.align === 'left' ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: item.delay + 2.0 }} // Base delay + 2.0 (doubled overhead)
                                    >
                                        <div className={`px-4 ${item.align === 'right' ? 'border-l border-geron-grey-mid/30 pl-4' : 'border-r border-geron-grey-mid/30 pr-4'}`}>
                                            <NavLabel
                                                label={item.label}
                                                labelRu={item.labelRu}
                                                number={item.number}
                                                to={item.to}
                                                align={item.align}
                                                isMobile={false}
                                                isHovered={hoveredLink === item.id}
                                                onHover={() => setHoveredLink(item.id)}
                                                onLeave={() => setHoveredLink(null)}
                                            />
                                        </div>
                                    </motion.div>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>

                {/* Mobile Navigation (Stacked below) */}
                {isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.0, duration: 1.6 }} // Doubled
                        className="absolute bottom-20 w-full px-8 flex flex-col items-center space-y-4 z-30 bg-white/90 backdrop-blur-md py-8 rounded-t-3xl border-t border-gray-200">
                        {navItems.map((item) => (
                            <NavLabel
                                key={item.id}
                                label={item.label}
                                labelRu={item.labelRu}
                                number={item.number}
                                to={item.to}
                                align="center"
                                isMobile={true}
                                isHovered={hoveredLink === item.id}
                                onHover={() => setHoveredLink(item.id)}
                                onLeave={() => setHoveredLink(null)}
                            />
                        ))}
                    </motion.div>
                )}
            </div>

            {/* 3. SYSTEM FOOTER - Fixed Bottom */}
            <Footer />
        </div>
    );
};

export default HeroContent;
