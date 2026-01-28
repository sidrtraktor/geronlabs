import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Aeolipile from '../assets/aeolipile_sketch.jpg';
import CoinMachine from '../assets/coin_machine_sketch.jpg';

const About = () => {
    return (
        <div className="min-h-screen w-full bg-geron-white relative overflow-hidden flex flex-col justify-center items-center py-20 px-8">

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
            </div>

            {/* Navigation Back */}
            <Link to="/" className="absolute bottom-8 left-8 z-50 flex items-center gap-2 text-geron-grey-dark hover:text-geron-cyan transition-colors font-mono text-xs uppercase tracking-widest border border-geron-grey-dark/20 px-4 py-2 bg-white/50 backdrop-blur">
                <ArrowLeft size={14} /> Back to System
            </Link>

            {/* X-Layout Content */}
            <div className="w-full max-w-7xl relative min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">

                {/* Top Left: Invention (Aeolipile) */}
                <motion.div
                    initial={{ opacity: 0, x: -50, y: -50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative lg:absolute lg:top-0 lg:left-0 w-64 md:w-80 p-2 border border-geron-grey-dark/10 bg-white shadow-xl rotate-[-2deg]"
                >
                    <div className="absolute top-0 right-0 p-2 font-mono text-[10px] text-geron-grey-mid bg-white border-l border-b border-geron-grey-dark/20">FIG. 1: AEOLIPILE</div>
                    <img src={Aeolipile} alt="Heron's Aeolipile" className="w-full h-auto grayscale contrast-110" />
                    <div className="absolute inset-0 bg-geron-orange/10 mix-blend-multiply" />
                </motion.div>

                {/* Bottom Right: Invention (Coin Machine) */}
                <motion.div
                    initial={{ opacity: 0, x: 50, y: 50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative lg:absolute lg:bottom-0 lg:right-0 w-64 md:w-80 p-2 border border-geron-grey-dark/10 bg-white shadow-xl rotate-[3deg]"
                >
                    <div className="absolute top-0 right-0 p-2 font-mono text-[10px] text-geron-grey-mid bg-white border-l border-b border-geron-grey-dark/20">FIG. 2: COIN AUTOMATON</div>
                    <img src={CoinMachine} alt="Coin Operated Machine" className="w-full h-auto grayscale contrast-110" />
                    <div className="absolute inset-0 bg-geron-cyan/10 mix-blend-multiply" />
                </motion.div>

                {/* Center: Mission Text */}
                <div className="col-span-1 lg:col-span-2 flex items-center justify-center pointer-events-none z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="pointer-events-auto bg-white/80 backdrop-blur-md p-8 md:p-12 md:max-w-2xl text-center border-y border-geron-grey-dark/10"
                    >
                        <h2 className="text-sm font-mono text-geron-grey-mid mb-4 uppercase tracking-[0.2em]">Our Philosophy</h2>
                        <h1 className="text-3xl md:text-5xl font-bold text-geron-grey-dark mb-6 leading-tight">
                            One Impulse Starts<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-geron-grey-dark to-geron-cyan">The Entire System</span>
                        </h1>
                        <p className="text-lg text-geron-grey-mid font-light leading-relaxed">
                            Inspired by the mechanical inventions of Heron of Alexandria, we build digital automation systems for modern business.
                            Precision engineering meets scalable AI algorithms.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-4 text-left border-t border-geron-grey-dark/10 pt-6">
                            <div>
                                <h3 className="font-bold text-geron-grey-dark mb-1">Ancient Root</h3>
                                <p className="text-sm text-geron-grey-mid">Mechanical mastery and physical logic.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-geron-grey-dark mb-1">Digital Future</h3>
                                <p className="text-sm text-geron-grey-mid">Neural networks and infinite scaling.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Grid Lines connecting Layout */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                    <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="w-full h-full"
                    >
                        <svg className="w-full h-full">
                            <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="#1A1A1A" strokeWidth="0.5" strokeOpacity="0.2" />
                            <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="#1A1A1A" strokeWidth="0.5" strokeOpacity="0.2" />
                        </svg>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default About;
