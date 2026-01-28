import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, BarChart3, Film, Zap } from 'lucide-react';
import GearImage from '../assets/geron_logo_g.png';

const ServiceBlock = ({ icon: Icon, title, text, subitems, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="mb-12 border-l-2 border-geron-grey-dark/20 pl-6 relative group"
        >
            <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-geron-grey-dark group-hover:bg-geron-cyan transition-colors" />

            <div className="flex items-center gap-3 mb-2">
                <Icon className="text-geron-grey-dark" size={24} />
                <h2 className="text-2xl font-bold text-geron-grey-dark uppercase">{title}</h2>
            </div>

            <p className="text-lg text-geron-grey-mid font-light mb-4">{text}</p>

            <div className="grid grid-cols-2 gap-2">
                {subitems.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm font-mono text-geron-grey-dark/80">
                        <div className="w-1 h-1 bg-geron-cyan rounded-full" />
                        {item}
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

const Solutions = () => {
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div className="min-h-screen w-full bg-geron-white relative flex">
            {/* Sticky Left Sidebar / Nav */}
            <div className="fixed top-0 left-0 h-full w-20 hidden lg:flex flex-col items-center justify-between py-8 border-r border-geron-grey-dark/10 z-50 bg-white/50 backdrop-blur">
                <Link to="/" className="text-geron-grey-dark hover:text-geron-cyan transition-colors transform -rotate-90 origin-center whitespace-nowrap mt-10">
                    BACK
                </Link>
                <div className="h-32 w-[1px] bg-geron-grey-dark/30" />
                <div className="font-mono text-xs rotate-[-90deg]">SOLUTIONS</div>
            </div>

            <div className="flex-1 lg:ml-20 flex flex-col lg:flex-row relative">
                {/* Content Section */}
                <div className="flex-1 p-8 lg:p-20 pt-24 lg:pt-32 z-10">
                    <div className="mb-16">
                        <Link to="/" className="lg:hidden flex items-center gap-2 text-geron-grey-dark hover:text-geron-cyan mb-8 font-mono text-xs uppercase">
                            <ArrowLeft size={14} /> Back
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">System Modules</h1>
                        <div className="h-1 w-20 bg-geron-cyan" />
                    </div>

                    <ServiceBlock
                        index={0}
                        icon={Cpu}
                        title="Operational Efficiency"
                        text="We remove routine. Algorithms that work while you sleep."
                        subitems={["Custom Chatbots", "Auto-Responders", "Data Parsers", "Workflow Automation"]}
                    />

                    <ServiceBlock
                        index={1}
                        icon={BarChart3}
                        title="Sales & Scale"
                        text="AI Agents that sell 24/7. Infinite scaling without hiring."
                        subitems={["Lead Generation", "AI Voice Calling", "CRM Integration", "Funnel Optimization"]}
                    />

                    <ServiceBlock
                        index={2}
                        icon={Film}
                        title="Generative Content"
                        text="Media creation without human intervention."
                        subitems={["Video Generation", "AI Avatars", "SEO Articles", "Social Posts"]}
                    />

                    <div className="mt-20">
                        <button className="group relative px-8 py-4 bg-geron-grey-dark text-white font-mono uppercase tracking-widest overflow-hidden hover:bg-geron-cyan hover:text-geron-grey-dark transition-colors duration-300">
                            <span className="relative z-10 flex items-center gap-2"><Zap size={16} /> Launch System</span>
                            <div className="absolute inset-0 top-full group-hover:top-0 bg-geron-cyan transition-all duration-300" />
                        </button>
                    </div>
                </div>

                {/* Mechanism Visualization (Standard Scroll Sticky) */}
                <div className="hidden lg:flex w-[40%] h-screen sticky top-0 items-center justify-center bg-geron-grey-light/30 border-l border-geron-grey-dark/10 overflow-hidden">
                    <motion.div
                        style={{ rotate }}
                        className="relative w-[500px] h-[500px]"
                    >
                        <img src={GearImage} alt="Mechanism" className="w-full h-full object-contain opacity-20 invert" />
                        {/* Overlay grid circles */}
                        <div className="absolute inset-0 border border-geron-grey-dark/20 rounded-full" />
                        <div className="absolute inset-[20%] border border-geron-grey-dark/20 rounded-full border-dashed" />
                        <div className="absolute inset-[40%] border border-geron-cyan/30 rounded-full" />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Solutions;
