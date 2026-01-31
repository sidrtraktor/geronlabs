import React from 'react';
import OrderForm from '../components/OrderForm';
import Logo from '../assets/geron_logo_g.png';

const TelegramOrder = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Grid - Subtler for mobile */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }}
            />

            <div className="relative z-10 w-full max-w-sm">

                {/* Header */}
                <div className="text-center mb-8">
                    <img src={Logo} alt="Geron Logo" className="w-16 h-16 mx-auto mb-4 opacity-90 contrast-125 mix-blend-multiply" />
                    <h1 className="text-2xl font-bold font-sans text-geron-grey-dark">GERON LABS</h1>
                    <p className="font-mono text-[10px] text-geron-grey-mid uppercase tracking-widest mt-1">
                        SECURE UPLINK // BOT_MODE
                    </p>
                </div>

                {/* The Form */}
                <div className="bg-white/80 backdrop-blur-sm p-1 rounded-lg">
                    <OrderForm />
                </div>

                {/* Footer hint */}
                <div className="mt-8 text-center">
                    <p className="font-mono text-[9px] text-geron-grey-mid/60">
                        SESSION_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TelegramOrder;
