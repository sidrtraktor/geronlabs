import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors } from 'lucide-react';
import OrderCTA from '../components/OrderCTA';
import Footer from '../components/Footer';

// Import generated assets
import Level1Image from '../assets/level_1_gear.png';
import Level2Image from '../assets/level_2_mechanism.png';
import Level3Image from '../assets/level_3_ai_head.png';

const SystemLevelRow = ({ level, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.2 }}
            className="group relative w-full border-b border-geron-grey-dark/10 py-20 last:border-b-0"
        >
            {/* Hover Glow Effect Area - More subtle now */}
            <div className="absolute inset-0 bg-geron-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Dashed Separator Visual */}
            {index > 0 && (
                <div className="absolute top-0 left-0 w-full flex items-center justify-center -translate-y-1/2 z-20">
                    <div className="w-full border-t border-dashed border-geron-grey-dark/20" />
                    <div className="absolute bg-white/80 backdrop-blur-sm p-2 border border-geron-grey-dark/10 rounded-full">
                        <Scissors size={14} className="text-geron-grey-dark/40" />
                    </div>
                </div>
            )}


            <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start lg:items-center relative z-10">
                {/* 1. SKETCH (Left) - Larger and blended */}
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                    <div className="relative w-64 h-64 lg:w-80 lg:h-80 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                        <img
                            src={level.image}
                            alt={`${level.title} Sketch`}
                            className="w-full h-full object-contain mix-blend-multiply contrast-125 brightness-110"
                        />
                        <div className="absolute bottom-0 right-0 font-mono text-[10px] text-geron-grey-mid opacity-40">FIG.{index + 1}.0</div>
                    </div>
                </div>

                {/* 2. SPECIFICATION (Center) */}
                <div className="flex-1 space-y-6">
                    {/* Muted Level Tag */}
                    <div className="inline-block px-2 py-1 bg-geron-grey-light/50 border border-geron-grey-dark/20 text-geron-grey-dark/70 font-mono text-[10px] md:text-xs tracking-wider">
                        [{level.tag}]
                    </div>

                    <div>
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-geron-grey-dark uppercase leading-none tracking-tight mb-3">
                            {level.title}
                        </h2>
                        <p className="text-geron-grey-dark/80 text-sm md:text-lg leading-relaxed max-w-xl font-light">
                            {level.bait}
                        </p>
                    </div>

                    <div className="bg-white/50 p-5 border-l-2 border-geron-grey-dark/30 group-hover:border-geron-cyan transition-colors backdrop-blur-sm">
                        <h4 className="font-mono text-[10px] text-geron-grey-dark/40 mb-3 uppercase tracking-widest">System Modules:</h4>
                        <ul className="space-y-2">
                            {level.specs.map((spec, i) => (
                                <li key={i} className="font-mono text-[11px] md:text-xs lg:text-sm text-geron-grey-dark flex items-start gap-3">
                                    <span className="text-geron-cyan shrink-0 text-[10px] mt-1">●</span>
                                    <span>
                                        <span className="font-bold text-geron-grey-dark/90">{spec.label}:</span> <span className="text-geron-grey-dark/70">{spec.desc}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 3. COST ESTIMATE (Right) - Spec Sheet Style */}
                <div className="w-full lg:w-1/4 flex flex-col items-end">
                    <div className="bg-white/80 border border-geron-grey-dark/10 p-6 shadow-sm w-full max-w-xs relative hover:shadow-md transition-shadow backdrop-blur-sm">

                        <div className="font-mono text-xs text-geron-grey-mid uppercase border-b border-dashed border-geron-grey-dark/20 pb-2 mb-4 w-full text-right tracking-tight">
                            Bill of Materials
                        </div>

                        <div className="flex justify-between items-end mb-2 font-mono text-xs md:text-sm border-b border-dashed border-geron-grey-dark/10 pb-1">
                            <span className="text-geron-grey-dark/50">DEV COST:</span>
                            <span className="font-bold text-geron-grey-dark">{level.costs.dev}</span>
                        </div>
                        <div className="flex justify-between items-end mb-4 font-mono text-xs md:text-sm border-b border-dashed border-geron-grey-dark/10 pb-1">
                            <span className="text-geron-grey-dark/50">OPS/MO:</span>
                            <span className="font-bold text-geron-grey-dark">{level.costs.ops}</span>
                        </div>

                        <div className="pt-2 text-right">
                            <div className="font-mono text-[10px] text-geron-grey-dark/40 mb-3 uppercase">Status: Ready</div>
                            {/* Wireframe Button */}
                            {/* Wireframe Button replaced by OrderCTA */}
                            <OrderCTA className="w-full text-xs" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- DATA ---
const LEVELS = [
    {
        tag: 'SYS_LEVEL_01',
        title: 'WEB-PORTAL + BOT',
        image: Level1Image,
        bait: 'Ваш менеджер спит, а бот продает. Идеальный старт для приема заказов без раздувания штата.',
        specs: [
            { label: 'INTERFACE', desc: 'Landing Page (React/Tilda)' },
            { label: 'LOGIC', desc: 'Telegram Bot (Orders -> Google Sheets)' },
            { label: 'NOTIFICATIONS', desc: 'Instant Admin Alerts' },
        ],
        costs: {
            dev: '$200 - $350',
            ops: '$15 / mo'
        }
    },
    {
        tag: 'SYS_LEVEL_02',
        title: 'PROCESS AUTOMATION',
        image: Level2Image,
        bait: 'Машины быстрее людей. Системы, которые парсят конкурентов и управляют заказами быстрее, чем вы моргнете.',
        specs: [
            { label: 'SPEED', desc: 'Real-time monitoring (Parsers)' },
            { label: 'INTEGRATION', desc: 'CRM / POS connection' },
            { label: 'DATA', desc: 'Auto-filling databases (SQL/Redis)' },
        ],
        costs: {
            dev: '$500 - $900',
            ops: '$30 - $50 / mo'
        }
    },
    {
        tag: 'SYS_LEVEL_03',
        title: 'AI ARCHITECT (AGENT)',
        image: Level3Image,
        bait: 'Полноценный цифровой сотрудник. Помнит контекст, создает КП и ведет клиента. Без больничных и выходных.',
        specs: [
            { label: 'BRAIN', desc: 'LLM (Gemini/GPT-4) + RAG' },
            { label: 'MEMORY', desc: 'Vector Storage (Entire Catalog)' },
            { label: 'ACTION', desc: 'Doc Gen (PDF) + Vision Analysis' },
        ],
        costs: {
            dev: 'from $1500',
            ops: 'Pay-as-you-go'
        }
    }
];

const Solutions = () => {
    return (
        // GLOBAL BACKGROUND: Graph Paper Grid
        <div className="min-h-screen w-full relative bg-geron-white">
            {/* Simple CSS Grid Patter for "Graph Paper" look */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage: 'radial-gradient(#a3a3a3 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <div className="flex flex-col relative z-10 pb-20">

                {/* PAGE HEADER - Cases Style */}
                <div className="flex-shrink-0 p-8 lg:px-20 z-50 flex justify-between items-end border-b border-geron-grey-dark/10 bg-white/60 backdrop-blur-sm">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 text-geron-grey-dark hover:text-geron-cyan transition-colors font-mono text-xs uppercase tracking-widest mb-4">
                            <ArrowLeft size={14} /> // Return_to_Base
                        </Link>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-geron-grey-dark">
                            АРХИТЕКТУРА СИСТЕМЫ
                        </h1>
                        <p className="font-mono text-[10px] md:text-xs text-geron-grey-mid mt-2 max-w-xl uppercase tracking-wider">
                            ВЫБЕРИТЕ УРОВЕНЬ АВТОМАТИЗАЦИИ.<br />
                            ПРОЗРАЧНЫЕ ЦЕНЫ. ИНЖЕНЕРНАЯ ТОЧНОСТЬ.
                        </p>
                    </div>
                    {/* Optional Right Side Data like Year or Status */}
                    <div className="hidden md:block text-right">
                        <div className="font-bold text-4xl text-black/5 font-sans">v.2.5</div>
                    </div>
                </div>

                {/* LEVELS GRID */}
                <div className="bg-transparent">
                    {LEVELS.map((level, index) => (
                        <SystemLevelRow key={level.tag} level={level} index={index} />
                    ))}
                </div>

                {/* ROI CALCULATOR - GLASS PANEL DESIGN */}
                <div className="py-20 px-6 lg:px-20">
                    <div className="container mx-auto max-w-6xl relative">
                        {/* Glass Panel Container */}
                        <div className="relative bg-white/40 backdrop-blur-md border border-geron-grey-dark/20 p-8 lg:p-12 rounded-sm shadow-sm overflow-hidden">
                            {/* Decorative "Tape" or Pin */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-geron-grey-dark/20" />
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Scissors size={100} />
                            </div>

                            <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                                <div className="flex-1">
                                    <div className="inline-block border border-geron-grey-dark/30 px-3 py-1 text-[10px] font-mono text-geron-grey-dark/60 mb-4 uppercase bg-white/50">
                                        Economic Efficiency Report
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-4 font-mono text-geron-grey-dark">ROI CALCULATION PROTOCOL</h3>
                                    <p className="text-geron-grey-dark/70 mb-8 font-light max-w-md text-sm md:text-base">
                                        В чем выгода цифрового сотрудника? Сравните ежемесячные расходы на менеджера и эффективность автономной системы.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-geron-grey-dark/20 bg-white/60">
                                        <div className="p-6 border-b md:border-b-0 md:border-r border-geron-grey-dark/20">
                                            <div className="text-geron-grey-dark/40 mb-2 font-mono text-xs">HUMAN MANAGER</div>
                                            <div className="text-2xl text-geron-grey-dark font-bold font-mono">$1000<span className="text-sm font-normal text-geron-grey-dark/50">/mo</span></div>
                                            <div className="text-[10px] text-geron-grey-dark/40 mt-1 uppercase">+ НАЛОГИ + ОШИБКИ</div>
                                        </div>
                                        <div className="flex items-center justify-center p-4 bg-geron-grey-dark/5">
                                            <span className="font-mono text-geron-grey-dark/30 text-sm">VS</span>
                                        </div>
                                        <div className="p-6">
                                            <div className="text-geron-cyan mb-2 font-mono text-xs font-bold">AI SYSTEM (L3)</div>
                                            <div className="text-2xl text-geron-grey-dark font-bold font-mono">$50<span className="text-sm font-normal text-geron-grey-dark/50">/mo</span></div>
                                            <div className="text-[10px] text-geron-grey-dark/40 mt-1 uppercase">+ Единоразовая настройка</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Result Circle/Badge */}
                                <div className="text-center">
                                    <div className="w-48 h-48 rounded-full border-2 border-dashed border-geron-grey-dark/20 flex flex-col items-center justify-center bg-white/40 mb-6 relative group cursor-default">
                                        <div className="absolute inset-2 border border-geron-cyan/20 rounded-full group-hover:scale-105 transition-transform duration-500" />
                                        <div className="text-4xl font-bold text-geron-grey-dark tracking-tighter">1.5</div>
                                        <div className="text-xs font-mono text-geron-grey-dark/50 uppercase mt-1">Мес. Окупаемость</div>
                                    </div>
                                    <button className="text-geron-grey-dark hover:text-geron-cyan font-mono text-xs uppercase border-b border-geron-grey-dark/30 hover:border-geron-cyan transition-colors pb-0.5 mb-6">
                                        Подробный отчет
                                    </button>
                                    <div className="flex justify-center">
                                        <OrderCTA />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Solutions;
