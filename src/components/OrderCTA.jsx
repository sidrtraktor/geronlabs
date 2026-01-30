import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderFormModal from './OrderFormModal';

const OrderCTA = ({ className = '', onClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClick}
                className={`
        relative overflow-hidden group
        border-2 border-geron-grey-dark
        bg-transparent
        font-mono font-bold text-sm text-geron-grey-dark uppercase tracking-widest
        px-10 py-4
        transition-colors duration-300
        hover:text-geron-cyan hover:border-black
        cursor-pointer
        ${className}
      `}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    ЗАКАЗАТЬ АВТОМАТИЗАЦИЮ [INIT]
                </span>
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
            </motion.button>
            <OrderFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default OrderCTA;
