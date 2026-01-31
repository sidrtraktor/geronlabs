import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/geron_logo_g.png';

// --- SCRAMBLE TEXT COMPONENT (Individual Colored Letters) ---
const ScrambleExitText = ({ text, isScrambling, className }) => {
    // If not scrambling, just show text static
    // If scrambling, show random chars with random colors
    const [displayContent, setDisplayContent] = useState(
        text.split('').map((char) => ({ char, color: 'text-gray-400' }))
    );
    const intervalRef = useRef(null);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>';
    const colors = [
        'text-cyan-600',
        'text-cyan-500',
        'text-cyan-400',
        'text-teal-400',
        'text-gray-300' // Occasional grey for contrast
    ];

    useEffect(() => {
        if (!isScrambling) return;

        let iteration = 0;

        intervalRef.current = setInterval(() => {
            setDisplayContent((prev) =>
                prev.map((item, index) => {
                    // Randomize char and color
                    if (Math.random() > 0.5) {
                        return {
                            char: chars[Math.floor(Math.random() * chars.length)],
                            color: colors[Math.floor(Math.random() * colors.length)]
                        };
                    }
                    return item;
                })
            );
            iteration++;
        }, 50);

        return () => clearInterval(intervalRef.current);
    }, [isScrambling]);

    // Render span array
    return (
        <span className={className}>
            {displayContent.map((item, i) => (
                <span key={i} className={isScrambling ? item.color : ''}>
                    {item.char}
                </span>
            ))}
        </span>
    );
};

const StubPage = ({ onLaunch }) => {
    const [status, setStatus] = useState('idle'); // idle, initializing, scrambling, launching
    const [buttonText, setButtonText] = useState('INITIALIZING...');

    const handleLaunch = () => {
        if (status !== 'idle') return;

        setStatus('initializing');

        // SEQUENCE:
        // 0ms: Start Initializing (Expand button)
        // 0-600ms: Blinking Cursor "> _"
        // 600ms+: "INITIALIZING..."

        // 1. Blinking Dot Phase
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
            blinkCount++;
            setButtonText(blinkCount % 2 === 0 ? '> _' : '>  ');

            if (blinkCount >= 6) { // 3 blinks (~1.2s at 200ms)
                clearInterval(blinkInterval);
                setButtonText('> INITIALIZING...');

                // 2. Wait for "Initialization" to "finish"
                setTimeout(() => {
                    // 3. Start Text Scramble
                    setStatus('scrambling');

                    // 4. Wait for scramble effect, then Launch
                    setTimeout(() => {
                        setStatus('launching');
                        onLaunch();
                    }, 1200); // 1.2s of scrambling

                }, 1000); // 1s of "INITIALIZING..." text
            }
        }, 200);
    };

    return (
        <motion.div
            className="h-screen w-full relative bg-white flex flex-col items-center justify-center overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >

            {/* CENTRAL LOGO - The Hero of Shared Layout */}
            <motion.div
                layoutId="main-logo"
                className="relative z-50 mb-12 mix-blend-multiply"
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <img
                    src={Logo}
                    alt="Geron Labs"
                    className="h-48 md:h-64 w-auto opacity-90 contrast-125 saturate-0"
                />
            </motion.div>

            {/* SPLIT CONTENT CONTAINER */}
            <AnimatePresence>
                {status !== 'launching' && (
                    <motion.div
                        className="flex flex-col items-center space-y-8 z-10 max-w-md w-full px-6"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 1.1, // Slight expansion
                            filter: "blur(20px)", // Blur out
                            transition: { duration: 0.8, ease: "easeInOut" }
                        }}
                    >
                        {/* Title / Description */}
                        <motion.div
                            className="text-center space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2.0, delay: 0.5, ease: "easeOut" }} // SLOWER REVEAL
                        >
                            <h1 className="text-3xl md:text-4xl font-bold tracking-[0.2em] text-gray-800 uppercase">
                                <ScrambleExitText
                                    text="GERON LABS"
                                    isScrambling={status === 'scrambling'}
                                />
                            </h1>
                            <p className="text-xs md:text-sm font-mono text-gray-500 tracking-widest">
                                <ScrambleExitText
                                    text="SYSTEMS ARCHITECTURE // AI AGENTS // B2B"
                                    isScrambling={status === 'scrambling'}
                                />
                            </p>
                            <div className="max-w-sm mx-auto text-[10px] font-mono font-thin text-gray-400 tracking-widest leading-relaxed mt-4 opacity-80 text-justify">
                                <ScrambleExitText
                                    text="Вдохновлённые механическими изобретениями Герона, где один импульс запускал целую систему, мы в Geron Labs строим автоматизацию для бизнеса: точные конструкции, которые снимают операционную нагрузку, ускоряют решения и открывают путь к масштабированию."
                                    isScrambling={status === 'scrambling'}
                                />
                            </div>
                        </motion.div>


                    </motion.div>
                )}
            </AnimatePresence>

            {/* THE BUTTON */}
            <AnimatePresence>
                {status !== 'launching' && (
                    <motion.div
                        className="mt-8 z-20"
                        exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
                    >
                        <motion.button
                            onClick={handleLaunch}
                            className={`
                                relative overflow-hidden px-8 py-4 
                                font-mono text-xs md:text-sm font-bold tracking-[0.2em] uppercase 
                                transition-all duration-300
                                ${status === 'initializing' || status === 'scrambling' ? 'bg-black text-green-500 w-64' : 'bg-gray-900 text-white hover:bg-gray-800 w-auto'}
                            `}
                            animate={status === 'initializing' || status === 'scrambling' ? { width: '280px' } : {}}
                        >
                            {status === 'idle' && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    УЗНАТЬ ПЕРВЫМ
                                </motion.span>
                            )}

                            {(status === 'initializing' || status === 'scrambling') && (
                                <motion.div
                                    className="flex items-center justify-center space-x-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <span>{buttonText}</span>
                                    {buttonText.includes('INITIALIZING') && (
                                        <motion.span
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                            className="h-3 w-2 bg-green-500 block"
                                        />
                                    )}
                                </motion.div>
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DECORATIVE LINES (To match current aesthetic) */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gray-100" />
            <div className="absolute inset-x-0 top-0 h-px bg-gray-100" />
        </motion.div>
    );
};

export default StubPage;
