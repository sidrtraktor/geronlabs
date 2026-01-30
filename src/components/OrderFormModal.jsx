import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader, CheckCircle } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

const TELEGRAM_TOKEN = '8598527123:AAHV75Jyy7oXHdqLzAq2pJo2Lo8Hrcpz6KY';
const CHAT_ID = '61532886';

const OrderFormModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        task: ''
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const text = `
⚡ ЗАКАЗ АВТОМАТИЗАЦИИ ⚡
--------------------------
👤 Имя: ${formData.name}
📱 Контакт: ${formData.contact}
📝 Тех. Задание: 
${formData.task}
--------------------------
[SYSTEM_INIT_SIGNAL]
`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setFormData({ name: '', contact: '', task: '' });
                }, 3000);
            } else {
                const errorData = await response.json();
                console.error('Telegram API Error Details:', errorData);
                throw new Error(errorData.description || 'Telegram API Error');
            }
        } catch (error) {
            console.error('Submission Failed:', error);
            alert(`Ошибка: ${error.message}`); // Show alert to user for immediate feedback
            setStatus('error');
        }
    };

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

                                {status === 'success' ? (
                                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                                            <CheckCircle size={32} />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-bold text-geron-grey-dark">СИГНАЛ ОТПРАВЛЕН</h3>
                                            <p className="text-xs font-mono text-geron-grey-mid mt-1">Ожидайте инициализации соединения.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-1">
                                            <label className="block text-xs font-mono font-bold text-geron-grey-dark uppercase">Имя [ID]</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-transparent border-b border-geron-grey-dark/20 py-2 font-mono text-sm focus:outline-none focus:border-geron-cyan focus:bg-geron-cyan/5 transition-colors placeholder:text-geron-grey-mid/50"
                                                placeholder="Введите имя..."
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-xs font-mono font-bold text-geron-grey-dark uppercase">Контакт [UPLINK]</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.contact}
                                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                                className="w-full bg-transparent border-b border-geron-grey-dark/20 py-2 font-mono text-sm focus:outline-none focus:border-geron-cyan focus:bg-geron-cyan/5 transition-colors placeholder:text-geron-grey-mid/50"
                                                placeholder="Telegram / Email / Phone"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-xs font-mono font-bold text-geron-grey-dark uppercase">Тех. Задание [DATA]</label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={formData.task}
                                                onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                                                className="w-full bg-transparent border border-geron-grey-dark/20 p-3 rounded-sm font-mono text-sm focus:outline-none focus:border-geron-cyan focus:bg-geron-cyan/5 transition-colors placeholder:text-geron-grey-mid/50 resize-none"
                                                placeholder="Опишите задачу..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-geron-grey-dark text-white py-3 font-mono font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {status === 'loading' ? (
                                                <Loader className="animate-spin" size={16} />
                                            ) : (
                                                <>
                                                    ОТПРАВИТЬ ЗАПРОС <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>

                                        {status === 'error' && (
                                            <p className="text-center text-xs text-red-500 font-mono">Ошибка соединения. Попробуйте позже.</p>
                                        )}
                                    </form>
                                )}
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OrderFormModal;
