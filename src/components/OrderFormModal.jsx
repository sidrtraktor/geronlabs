import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import OrderForm from './OrderForm';

const OrderFormModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-white/50 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        className="relative w-full max-w-md"
                    >
                        <GlassCard className="relative overflow-hidden border border-geron-grey-dark/20 shadow-2xl">
                            {/* Grid Background inside Modal */}
                            <div className="absolute inset-0 z-0 opacity-[0.05]"
                                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                            />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-geron-grey-mid hover:text-geron-grey-dark transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative z-10 p-2">
                                <h2 className="text-2xl font-bold font-sans text-geron-grey-dark mb-1">ПРОТОКОЛ ЗАКАЗА</h2>
                                <p className="font-mono text-xs text-geron-grey-mid uppercase tracking-widest mb-6">Create New Instance</p>

                                <OrderForm onSuccess={() => setTimeout(onClose, 3000)} />
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OrderFormModal;
