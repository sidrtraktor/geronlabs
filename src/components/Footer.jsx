import React from 'react';

const Footer = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full h-10 border-t border-gray-200 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-between px-6 md:px-12 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
            <div className="font-bold text-geron-grey-dark flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                SYSTEM: ONLINE // V.1.1
            </div>
            <div className="hidden md:block">
                ENGINEERED BY GERON LABS
            </div>
            <div>
                COPYRIGHT 2025-2026
            </div>
        </div>
    );
};

export default Footer;
