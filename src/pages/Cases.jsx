import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';

const categories = [
    { id: 1, title: 'AI Agents', desc: 'Business Assistants', color: 'from-blue-400 to-cyan-300' },
    { id: 2, title: 'Chatbots', desc: 'Support & Sales', color: 'from-purple-400 to-pink-300' },
    { id: 3, title: 'Video Gen', desc: 'Content Creation', color: 'from-orange-400 to-red-300' },
    { id: 4, title: 'Crypto & Web3', desc: 'Trading & Analysis', color: 'from-emerald-400 to-teal-300' },
];

const ArchFrame = ({ title, desc, color, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="relative flex-shrink-0 w-[80vw] md:w-[400px] h-[600px] bg-white group cursor-pointer"
        >
            {/* Arch Sketch SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 400 600" preserveAspectRatio="none">
                {/* Arch Outline - Pencil Style */}
                <path d="M 20 600 L 20 200 Q 200 0 380 200 L 380 600"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 2"
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                />
                {/* Inner Arch */}
                <path d="M 40 600 L 40 220 Q 200 40 360 220 L 360 600"
                    fill="none"
                    stroke="#666666"
                    strokeWidth="1"
                />
                {/* Base */}
                <line x1="10" y1="590" x2="390" y2="590" stroke="#1A1A1A" strokeWidth="2" />
            </svg>

            {/* Content Area (Inside Arch) */}
            <div className="absolute top-[40px] left-[40px] right-[40px] bottom-0 overflow-hidden z-10 rounded-t-[160px]">
                {/* Video Placeholder Gradient */}
                <div className={`w-full h-full bg-gradient-to-br ${color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                {/* Play Icon / Wireframe Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full border border-geron-grey-dark flex items-center justify-center bg-white/50 backdrop-blur">
                        <Play className="text-geron-grey-dark ml-1" size={24} />
                    </div>
                    <div className="mt-4 px-4 py-1 bg-geron-grey-dark text-white font-mono text-xs">VIEW CASE</div>
                </div>
            </div>

            {/* Wireframe Glow Effect on Hover */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
                    <path d="M 20 600 L 20 200 Q 200 0 380 200 L 380 600"
                        fill="none"
                        stroke="#00FFFF"
                        strokeWidth="2"
                        className="drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
                    />
                </svg>
            </div>

            {/* Title Below */}
            <div className="absolute bottom-4 left-0 right-0 text-center z-40">
                <h3 className="font-sans font-bold text-xl text-geron-grey-dark uppercase tracking-wide">{title}</h3>
                <p className="font-mono text-xs text-geron-grey-mid mt-1">{desc}</p>
            </div>
        </motion.div>
    );
};

const Cases = () => {
    const containerRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: containerRef });

    return (
        <div className="h-screen w-full bg-geron-white relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-8 pb-0 z-50 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-geron-grey-dark hover:text-geron-cyan transition-colors font-mono text-xs uppercase tracking-widest border border-geron-grey-dark/20 px-4 py-2 bg-white/50 backdrop-blur">
                    <ArrowLeft size={14} /> Back
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter">CASE STUDIES</h1>
                <div className="font-mono text-xs text-geron-grey-mid hidden md:block">SCROLL TO NAVIGATE -></div>
            </div>

            {/* Scrolling Container */}
            <div
                ref={containerRef}
                className="flex-1 flex items-center overflow-x-auto gap-8 sm:gap-20 px-8 sm:px-20 py-10 scrollbar-hide snap-x snap-mandatory"
            >
                {categories.map((cat, i) => (
                    <div key={cat.id} className="snap-center">
                        <ArchFrame index={i} {...cat} />
                    </div>
                ))}

                {/* End Spacer */}
                <div className="w-20 flex-shrink-0" />
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-geron-grey-light w-full">
                <motion.div
                    className="h-full bg-geron-cyan"
                    style={{ scaleX: scrollXProgress, transformOrigin: "0%" }}
                />
            </div>
        </div>
    );
}

export default Cases;
