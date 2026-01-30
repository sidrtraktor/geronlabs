import React, { useRef, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, X, Cpu, Database, Activity, GitBranch } from 'lucide-react';
import ArchSketch from '../assets/archa.png';
import OrderCTA from '../components/OrderCTA';
import Footer from '../components/Footer';

// --- DATA: Engineering Cases ---
const CASES_DATA = [
    {
        id: 1,
        title: 'Быстрый старт: WEB + BOT',
        desc: 'Микро-сайт + Бронирование ↔ Telegram',
        specs: {
            TYPE: 'ЛОГИК_БОТ (CRM)',
            SPEED: 'МГНОВЕННО',
            LEVEL: 'L1: ЛОГИКА'
        },
        features: [
            'QR-Меню / Онлайн-Запись',
            'Синхронизация Google Sheets',
            'Уведомления владельцу',
            'Аналитика и Бух. учет',
            'Бот-оператор'
        ],
        videoColor: 'from-blue-500/20 to-cyan-400/20',
        glowColor: 'shadow-cyan-500/50',
    },
    {
        id: 2,
        title: 'Data Mining & Parsing',
        desc: 'Сбор лидов и аналитика в реальном времени',
        specs: {
            TYPE: 'ПАРСЕР_СИСТЕМА',
            SPEED: '3 СЕКУНДЫ',
            LEVEL: 'L2: BIG_DATA'
        },
        features: [
            'Мониторинг Twitter/X, Maps',
            'Сбор баз (Холодная база/Клиенты/Крипта)',
            'OCR счетов и документов',
        ],
        videoColor: 'from-emerald-500/20 to-teal-400/20',
        glowColor: 'shadow-emerald-500/50',
    },
    {
        id: 3,
        title: 'AI-Консьерж Сервис',
        desc: 'Автоматизация консьерж-сервиса для HoReCa и фитнеса',
        specs: {
            TYPE: 'AI_ASSISTANT',
            SPEED: 'ГОЛОС_ВВОД',
            LEVEL: 'L3: НЕЙРОСЕТЬ'
        },
        features: [
            'Заказ голосом / AI-Официант',
            'Подсчет калорий по фото',
            'Авто-отчеты тренеру',
            'Аналитика / Фиксация Прогресса'
        ],
        videoColor: 'from-orange-500/20 to-red-400/20',
        glowColor: 'shadow-orange-500/50',
    },
    {
        id: 4,
        title: 'Супер-Ассистент (Vision)',
        desc: 'Менеджер на стероидах: Автоматизация ',
        isComplex: true, // Special flag for modal
        specs: {
            TYPE: 'AGI_ARCHITECT',
            SPEED: 'ГЕНЕРАТИВНО',
            LEVEL: 'L4: ИНТЕЛЛЕКТ'
        },
        features: [
            'Анализ дефектов по фото',
            'Генерация чертежей/Решений',
            'Создание КП за 5 секунд',
            'Онлайн Визуализация Проекта'
        ],
        videoColor: 'from-indigo-500/20 to-purple-400/20',
        glowColor: 'shadow-indigo-500/50',
    },
];

// --- COMPONENT: Blueprint Modal (Glassmorphism) ---
const BlueprintModal = ({ isOpen, onClose, caseData }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // Prevent close on inner click
                    >
                        {/* Decorative Grid Background */}
                        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        />

                        {/* Close Button */}
                        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors z-50">
                            <X className="text-geron-grey-dark" size={24} />
                        </button>

                        {/* Content */}
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold font-sans text-geron-grey-dark mb-2">СИСТЕМНЫЙ ЧЕРТЕЖ</h2>
                            <p className="font-mono text-sm text-geron-grey-mid mb-8 uppercase tracking-wider">Объект: {caseData.title}</p>

                            <div className="space-y-6">
                                {/* Stage 1 */}
                                <div className="flex gap-4 items-start border-l-2 border-geron-grey-dark/20 pl-4 py-1">
                                    <div className="w-8 h-8 rounded-full bg-geron-grey-dark text-white flex items-center justify-center font-bold font-mono text-xs flex-shrink-0">01</div>
                                    <div>
                                        <h4 className="font-bold font-sans text-geron-grey-dark">Нейро-Анализ</h4>
                                        <p className="text-sm text-geron-grey-mid leading-relaxed">Система принимает ввод клиента, анализируя тональность и сложность требований через NLP-трансформеры.</p>
                                    </div>
                                </div>

                                {/* Stage 2 */}
                                <div className="flex gap-4 items-start border-l-2 border-geron-grey-dark/20 pl-4 py-1">
                                    <div className="w-8 h-8 rounded-full bg-geron-grey-dark text-white flex items-center justify-center font-bold font-mono text-xs flex-shrink-0">02</div>
                                    <div>
                                        <h4 className="font-bold font-sans text-geron-grey-dark">Рекурсивный Расчет</h4>
                                        <p className="text-sm text-geron-grey-mid leading-relaxed">Генерация технической сметы и ценовых моделей. Перекрестная проверка с внутренней базой компонентов.</p>
                                    </div>
                                </div>

                                {/* Stage 3 */}
                                <div className="flex gap-4 items-start border-l-2 border-geron-grey-dark/20 pl-4 py-1">
                                    <div className="w-8 h-8 rounded-full bg-geron-grey-dark text-white flex items-center justify-center font-bold font-mono text-xs flex-shrink-0">03</div>
                                    <div>
                                        <h4 className="font-bold font-sans text-geron-grey-dark">Генеративная Выдача</h4>
                                        <p className="text-sm text-geron-grey-mid leading-relaxed">Создание визуальных макетов (Image Gen) и финального КП в PDF. Отправка напрямую клиенту.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-black/10 flex justify-between items-center">
                                <span className="font-mono text-xs text-geron-grey-mid">СТАТУС: АКТИВНЫЙ ПРОДАКШН</span>
                                <button className="px-6 py-2 bg-geron-grey-dark text-white font-mono text-xs hover:bg-geron-cyan hover:text-black transition-colors">
                                    ЗАПУСТИТЬ ДЕМО_
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// --- COMPONENT: Arch Column ---
const ArchFrame = ({ item, index, onOpenModal }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "circOut" }}
            className="group relative flex flex-col items-center w-[340px] md:w-[400px] h-[700px] flex-shrink-0 cursor-pointer"
            onClick={() => item.isComplex && onOpenModal(item)}
        >
            {/* 1. ARCH VISUAL COMPOSITION */}
            <div className="relative w-full h-[520px] flex-shrink-0">

                {/* LAYER 1: VIDEO CONTENT (Behind everything) */}
                <div className="absolute inset-x-[15%] top-[12%] bottom-[5%] rounded-t-[180px] overflow-hidden z-10 bg-gray-100">
                    <div className="w-full h-full relative">
                        <div className={`absolute inset-0 bg-neutral-200 grayscale group-hover:grayscale-0 transition-all duration-700`}>
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                                    filter: 'contrast(120%) brightness(120%)'
                                }}
                            />
                            <div className="absolute top-[30%] left-[20%] w-32 h-32 bg-black/10 rounded-full blur-xl animate-pulse" />
                            <div className="absolute bottom-[20%] right-[20%] w-24 h-48 bg-black/10 rotate-12 blur-xl" />
                        </div>
                        <div className={`absolute inset-0 bg-gradient-to-t ${item.videoColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay`} />
                    </div>
                </div>

                {/* LAYER 2: ARCH SKETCH (The Mask) */}
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                    <img
                        src={ArchSketch}
                        alt="Architectural Blueprint"
                        className="w-[115%] h-[115%] object-cover opacity-90 group-hover:opacity-100 transition-all duration-300 mix-blend-multiply"
                    />
                </div>

                {/* LAYER 3: WIREFRAME GLOW (The Digital Twin) */}
                <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="w-full h-full" viewBox="0 0 400 520" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.8" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 25 520 L 25 180 Q 200 10 375 180 L 375 520"
                            fill="none"
                            stroke={`url(#grad-${index})`}
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            className="drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]"
                        />
                        <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={`url(#grad-${index})`} strokeWidth="0.5" opacity="0.3" />
                        </pattern>
                        <path
                            d="M 30 520 L 30 185 Q 200 20 370 185 L 370 520"
                            fill={`url(#grid-${index})`}
                            className="opacity-30"
                        />
                    </svg>
                </div>
            </div>

            {/* 2. TECHNICAL PASSPORT (Specs) */}
            <div className="w-full px-6 mt-6 z-40 relative py-4 border-t border-black/10">
                <div className="flex justify-between items-end border-b border-black/10 pb-2 mb-3">
                    <h3 className="font-sans font-bold text-lg text-geron-grey-dark uppercase leading-none max-w-[70%]">{item.title}</h3>
                    {item.isComplex && (
                        <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 animate-pulse">ЧЕРТЕЖ</span>
                    )}
                </div>

                {/* Description under Title */}
                <div className={`mb-3 text-geron-grey-mid ${item.isSmallDesc ? 'text-[10px] leading-tight' : 'text-xs'}`}>
                    {item.desc}
                </div>

                {/* Spec Grid */}
                <div className="grid grid-cols-2 gap-y-2 font-mono text-[11px] text-geron-grey-mid">
                    <div className="flex flex-col">
                        <span className="opacity-50">ТИП</span>
                        <span className="text-geron-grey-dark">{item.specs.TYPE}</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="opacity-50">СКОРОСТЬ</span>
                        <span className="text-geron-grey-dark">{item.specs.SPEED}</span>
                    </div>
                    {/* UPDATED: Added margin/padding to prevent overlap if content grows */}
                    <div className="flex flex-col col-span-2 mt-2 pt-2 border-t border-dashed border-gray-300">
                        <span className="opacity-50">УРОВЕНЬ_ПРОТОКОЛА</span>
                        <span className="text-geron-grey-dark font-bold">{item.specs.LEVEL}</span>
                    </div>
                </div>

                {/* Dynamic Feature List */}
                <ul className="mt-4 space-y-1 font-mono text-[10px] text-geron-grey-mid opacity-80">
                    {item.features && item.features.map((feature, i) => (
                        <li key={i} className="flex gap-2">
                            <span className="text-geron-cyan">-</span> {feature}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 3. ACTION BUTTON (Complex Case Only) */}
            {item.isComplex && (
                <div className="w-full px-6 pb-4 mt-[-10px] z-40 relative bg-white rounded-b-xl flex justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-center">
                        <div className="inline-block border border-black/20 text-[10px] font-mono hover:bg-black hover:text-white transition-colors uppercase tracking-widest px-8 py-2 cursor-pointer">
                            [ СМОТРЕТЬ_ЧЕРТЕЖ ]
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

// --- COMPONENT: Custom Interactive Scrollbar ---
const CustomScrollbar = ({ containerRef }) => {
    const [progress, setProgress] = useState(0);

    // Sync with scroll
    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateProgress = () => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (maxScroll <= 0) return;
            const current = container.scrollLeft;
            setProgress((current / maxScroll) * 100);
        };

        container.addEventListener('scroll', updateProgress);
        window.addEventListener('resize', updateProgress);
        return () => {
            container.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, [containerRef]);

    const handleSeek = (e) => {
        const container = containerRef.current;
        if (!container) return;

        const newValue = e.target.value;
        const maxScroll = container.scrollWidth - container.clientWidth;

        container.scrollTo({
            left: (newValue / 100) * maxScroll,
            behavior: 'auto'
        });
    };

    return (
        <div className="hidden md:flex absolute bottom-8 left-0 w-full z-100 items-center justify-center pointer-events-none">
            <div className="pointer-events-auto w-[40%] bg-white/10 backdrop-blur-md p-2 rounded-full border border-gray-200 shadow-xl flex items-center gap-4 z-50">
                <span className="text-[10px] font-mono text-gray-500 font-bold">0%</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="flex-grow h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black hover:accent-geron-cyan transition-colors"
                />
                <span className="text-[10px] font-mono text-gray-500 font-bold">100%</span>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---
const Cases = () => {
    const containerRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const [selectedCase, setSelectedCase] = useState(null);

    return (
        <div className="w-full bg-white relative flex flex-col md:h-screen md:overflow-hidden h-auto min-h-screen">
            {/* Background Grid - Very Subtle */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] fixed"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* Header */}
            <div className="flex-shrink-0 p-4 md:p-8 z-50 flex justify-between items-end border-b border-black/5 bg-white/90 backdrop-blur-sm sticky top-0 md:relative">
                <div>
                    <Link to="/" className="inline-flex items-center gap-2 text-geron-grey-dark hover:text-geron-cyan transition-colors font-mono text-xs uppercase tracking-widest mb-4">
                        <ArrowLeft size={14} /> // Return_to_Base
                    </Link>
                    <h1 className="text-xl md:text-5xl font-bold tracking-tighter text-geron-grey-dark break-words max-w-[80vw] leading-tight">ПРИМЕРЫ_АВТОМАТИЗАЦИЙ</h1>
                    <p className="font-mono text-[10px] md:text-xs text-geron-grey-mid mt-2 max-w-md">
                        АРХИТЕКТУРНЫЙ РАЗБОР ВНЕДРЕННЫХ АЛГОРИТМОВ.
                        АВТОМАТИЗИРУЕМ ЛЮБОЙ ПРОЦЕСС, ИМЕЮЩИЙ ЛОГИКУ.
                    </p>
                </div>
                <div className="hidden md:flex flex-col items-end text-right gap-4">
                    <div className="font-bold text-4xl text-black/5 font-sans leading-none">2025-26</div>
                    <OrderCTA />
                </div>
            </div>

            {/* Content Container */}
            <div
                ref={containerRef}
                className="flex-1 flex flex-col md:flex-row items-center md:items-start md:overflow-x-auto md:overflow-y-hidden overflow-y-visible gap-16 md:gap-24 px-4 md:px-24 py-10 md:pb-16 md:snap-x md:snap-mandatory scrollbar-visible-always w-full"
            >
                {CASES_DATA.map((item, i) => (
                    <div key={item.id} className="snap-center pt-0 md:pt-10 flex-shrink-0 mb-8 md:mb-0">
                        <ArchFrame item={item} index={i} onOpenModal={setSelectedCase} />
                    </div>
                ))}

                {/* End Spacer for Desktop */}
                <div className="hidden md:block w-40 flex-shrink-0" />
            </div>

            {/* CUSTOM INTERACTIVE SCROLLBAR (Desktop Only) */}
            <CustomScrollbar containerRef={containerRef} />

            {/* MODAL */}
            <BlueprintModal
                isOpen={!!selectedCase}
                onClose={() => setSelectedCase(null)}
                caseData={selectedCase || {}}
            />
            <Footer />
        </div>
    );
};

export default Cases;
