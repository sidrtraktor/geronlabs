import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import Aeolipile from '../assets/aeolipile_sketch.jpg';
import CoinMachine from '../assets/coin_machine_sketch.jpg';
import TempleColored from '../assets/temple_colored.jpg';
import HeronPortrait from '../assets/heron_portrait.jpg';

const TechnicalSpec = ({ title, id, mechanics, significance, quote, image, position, delay }) => (
    <motion.div
        className={`absolute ${position} w-32 md:w-36 lg:w-48 xl:w-64 flex flex-col gap-2 pointer-events-none md:pointer-events-auto z-10`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay, duration: 1 }}
    >
        {/* Image - Blended directly onto grid */}
        <div className="relative w-full aspect-square overflow-visible">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-contain mix-blend-multiply contrast-125 brightness-110 grayscale opacity-90 hover:scale-105 transition-transform duration-700"
            />
            {/* Technical Overlay - Float */}
            <div className="absolute top-0 right-0 text-[10px] font-mono text-geron-grey-mid tracking-tight z-30 opacity-60">
                TYPE: AUTO // REF: {id}
            </div>
        </div>

        {/* Text Details - Clean, no card */}
        <div className="font-mono text-[10px] text-geron-grey-dark leading-tight pl-2 border-l border-geron-grey-dark/30">
            <h3 className="font-bold text-xs uppercase tracking-widest text-geron-grey-dark mb-1">
                [{id}] {title}
            </h3>
            <div className="grid grid-cols-[35px_1fr] gap-2 opacity-80">
                <span className="opacity-50">MECH:</span>
                <span>{mechanics}</span>
            </div>
            <div className="grid grid-cols-[35px_1fr] gap-2 opacity-80">
                <span className="opacity-50">SIGN:</span>
                <span>{significance}</span>
            </div>
        </div>
    </motion.div>
);

const About = () => {
    return (
        <div className="min-h-screen bg-geron-white relative overflow-hidden flex items-center justify-center p-4">

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
                style={{ backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* Navigation Back - Centered Bottom - Lifted to avoid Footer */}
            <Link to="/" className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 text-geron-grey-mid hover:text-geron-grey-dark transition-colors font-mono text-xs uppercase tracking-widest bg-white/50 backdrop-blur px-3 py-1 border border-transparent hover:border-geron-grey-dark/20 rounded">
                <ArrowLeft size={14} /> Back to System
            </Link>

            {/* Central Narrative Block (The X Center) - No Card, Just Text */}
            <motion.div
                className="relative z-30 max-w-xl text-left p-8 md:p-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="text-xs font-mono text-geron-cyan mb-2 uppercase tracking-[0.3em] font-bold">Origins // v1.0</div>
                <h1 className="text-3xl md:text-5xl font-bold text-geron-grey-dark mb-6 tracking-tight leading-none uppercase font-sans">
                    ГЕРОН АЛЕКСАНДРИЙСКИЙ:<br />
                    ПЕРВЫЙ АРХИТЕКТОР <br /><span className="text-geron-grey-mid">АЛГОРИТМОВ</span>
                </h1>

                <div className="prose prose-sm text-geron-grey-dark/90 leading-relaxed font-sans text-justify">
                    <p className="mb-4">
                        В I веке н.э. Александрия была «Кремниевой долиной» античного мира, а Герон — её главным инженером.
                        Пока другие видели в механике магию, он видел <span className="font-bold border-b border-geron-grey-dark/20">программируемую логику</span>.
                    </p>
                    <div className="my-6 p-4 border border-dashed border-geron-grey-dark/30 font-mono text-xs text-geron-grey-mid/80 bg-transparent">
                        <p className="mb-2 font-bold opacity-100 text-geron-grey-dark">// FIRST PRINCIPLES OF AUTOMATION:</p>
                        <p>IF (fire_lit) THEN (pressure++);</p>
                        <p>IF (pressure &gt; threshold) THEN (doors.open());</p>
                    </div>
                    <p>
                        Мы не изобрели автоматизацию. Мы просто обновили технологии.
                        Принципы Герона живут в наших нейросетях: точный расчет, автономность и польза, извлекаемая из энергии.
                    </p>
                </div>
            </motion.div>

            {/* CONNECTING LINES (CSS/SVG) - Shortened to not cross text */}
            <div className="absolute inset-0 pointer-events-none z-10 hidden md:block opacity-20">
                <svg className="w-full h-full">
                    {/* Center area is roughly 30% to 70% width/height. We start lines from 35% / 65% to avoid crossing text */}
                    {/* Top Left */}
                    <line x1="35%" y1="35%" x2="15%" y2="15%" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="4 2" />
                    {/* Top Right */}
                    <line x1="65%" y1="35%" x2="85%" y2="15%" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="4 2" />
                    {/* Bottom Right */}
                    <line x1="65%" y1="65%" x2="85%" y2="85%" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="4 2" />
                    {/* Bottom Left */}
                    <line x1="35%" y1="65%" x2="15%" y2="85%" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="4 2" />
                </svg>
            </div>

            {/* 1. Top Left: Aeolipile */}
            <TechnicalSpec
                position="hidden md:flex top-2 left-2 lg:top-8 lg:left-8 xl:top-12 xl:left-12"
                title="ЭОЛИПИЛ"
                id="OBJ-01"
                image={Aeolipile}
                mechanics="Шар вращается за счет реактивной силы пара."
                significance="Прадедушка реактивного двигателя."
                delay={1}
            />

            {/* 2. Top Right: Temple Doors */}
            <TechnicalSpec
                position="hidden md:flex top-2 right-2 lg:top-8 lg:right-8 xl:top-12 xl:right-12"
                title="«УМНЫЙ ДОМ»"
                id="OBJ-03"
                image={TempleColored}
                mechanics="Нагретый воздух вытесняет воду, тянет тросы."
                significance="Первая система удаленного управления."
                delay={1.2}
            />

            {/* 3. Bottom Right: Vending Machine */}
            <TechnicalSpec
                position="hidden md:flex bottom-16 right-2 lg:bottom-16 lg:right-8 xl:bottom-24 xl:right-12"
                title="ПЕРВЫЙ ВЕНДИНГ"
                id="OBJ-02"
                image={CoinMachine}
                mechanics="Монета открывает клапан под своим весом."
                significance="Продажа товара без участия продавца."
                delay={1.4}
            />

            {/* 4. Bottom Left: Heron Portrait */}
            <TechnicalSpec
                position="hidden md:flex bottom-16 left-2 lg:bottom-16 lg:left-8 xl:bottom-24 xl:left-12"
                title="ГЕРОН (HERON-GAN)"
                id="ARCHITECT"
                image={HeronPortrait}
                mechanics="Нейросетевая реконструкция облика."
                significance="Автор трактатов «Пневматика» и «Механика»."
                delay={1.6}
            />

            <Footer />
        </div>
    );
};

export default About;
