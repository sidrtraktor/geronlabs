import React from 'react';

export const GlassCard = ({ children, className = '' }) => {
    return (
        <div className={`glass-panel rounded-xl p-6 border border-white/40 shadow-xl backdrop-blur-xl bg-white/30 text-geron-grey-dark ${className}`}>
            {children}
        </div>
    );
};
