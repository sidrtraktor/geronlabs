import React, { useState } from 'react';
import { Send, Loader, CheckCircle } from 'lucide-react';

const OrderForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        task: ''
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Call our new secure Vercel API
            const response = await fetch('/api/send-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', contact: '', task: '' });
                if (onSuccess) onSuccess();
            } else {
                throw new Error(data.error || 'Server Error');
            }
        } catch (error) {
            console.error('Submission Failed:', error);
            // Fallback for demo purposes if backend isn't configured yet (optional, or just error)
            // For now, let's treat it as a real error to prompt correct config
            alert('Ошибка отправки. Проверьте настройки сервера или попробуйте позже.');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                    <CheckCircle size={32} />
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-geron-grey-dark">СИГНАЛ ОТПРАВЛЕН</h3>
                    <p className="text-xs font-mono text-geron-grey-mid mt-1">Ожидайте инициализации соединения.</p>
                </div>
                {/* Reset button to send another */}
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-[10px] font-mono text-geron-grey-mid hover:text-geron-grey-dark underline decoration-dashed underline-offset-4"
                >
                    ОТПРАВИТЬ НОВЫЙ ЗАПРОС
                </button>
            </div>
        );
    }

    return (
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
    );
};

export default OrderForm;
