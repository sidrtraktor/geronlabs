import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const WireframeButton = ({ to, children, className = '', direction = 'right' }) => {
    // Direction determines where the 'node' dot forms relative to the text
    const isRight = direction === 'right';

    return (
        <Link to={to} className={`group flex items-center gap-4 ${className} no-underline`}>
            {/* Line and Node (Left side if direction is left) */}
            {!isRight && (
                <div className="flex items-center">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-geron-grey-dark group-hover:bg-geron-cyan transition-colors duration-300"
                        layoutId={`node-${children}`}
                    />
                    <motion.div
                        className="h-[1px] w-12 bg-geron-grey-dark group-hover:bg-geron-cyan group-hover:shadow-[0_0_5px_rgba(0,255,255,0.7)] transition-all duration-300"
                    />
                </div>
            )}

            {/* Text Label */}
            <span className="font-mono text-sm uppercase tracking-widest text-geron-grey-dark group-hover:text-geron-grey-mid transition-colors">
                {children}
            </span>

            {/* Line and Node (Right side if direction is right) */}
            {isRight && (
                <div className="flex items-center">
                    <motion.div
                        className="h-[1px] w-12 bg-geron-grey-dark group-hover:bg-geron-cyan group-hover:shadow-[0_0_5px_rgba(0,255,255,0.7)] transition-all duration-300"
                    />
                    <motion.div
                        className="w-2 h-2 rounded-full bg-geron-grey-dark group-hover:bg-geron-cyan transition-colors duration-300"
                        layoutId={`node-${children}`}
                    />
                </div>
            )}
        </Link>
    );
};

export const WireframeNode = ({ label, x, y }) => {
    return (
        <div className="absolute" style={{ left: x, top: y }}>
            <div className="relative">
                <div className="w-3 h-3 bg-geron-grey-dark rounded-full hover:bg-geron-cyan transition-colors cursor-pointer" />
                <div className="opacity-0 hover:opacity-100 absolute top-4 left-0 text-xs font-mono whitespace-nowrap bg-white p-1 border border-geron-grey-dark">
                    {label}
                </div>
            </div>
        </div>
    )
}
