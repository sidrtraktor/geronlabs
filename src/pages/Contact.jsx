import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import OrderCTA from '../components/OrderCTA';
import Footer from '../components/Footer';

// Import Social Icons from assets
import TelegramIcon from '../assets/telegram.png';
import LinkedInIcon from '../assets/linkedIN.png';
import InstagramIcon from '../assets/instagram.png';
import EmailIcon from '../assets/email.png';

const SOCIAL_LINKS = [
    {
        id: 'tg',
        icon: TelegramIcon,
        label: '[TELEGRAM]',
        link: 'https://t.me/Geronlabs_bot?start',
        color: 'shadow-cyan-500/50'
    },
    {
        id: 'li',
        icon: LinkedInIcon,
        label: '[LINKED_IN]',
        link: 'https://www.linkedin.com/company/geron-labs',
        color: 'shadow-blue-500/50'
    },
    {
        id: 'em',
        icon: EmailIcon,
        label: '[EMAIL]',
        link: 'mailto:contacts@geronlabs.xyz',
        color: 'shadow-orange-500/50'
    },
    {
        id: 'in',
        icon: InstagramIcon,
        label: '[INSTAGRAM]',
        link: 'https://www.instagram.com/geron_labs',
        color: 'shadow-purple-500/50'
    }
];

const Contact = () => {
    return (
        <div className="h-screen w-full bg-white relative flex flex-col items-center justify-center p-4 overflow-hidden">

            {/* 1. Global Engineering Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* 2. Navigation: Return to Base */}
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-geron-grey-dark hover:text-geron-cyan transition-colors font-mono text-xs uppercase tracking-widest z-50">
                <ArrowLeft size={14} /> // Return_to_Base
            </Link>

            {/* 3. Main Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col items-center gap-12"
            >
                {/* Header Text (Optional, keeping it clean as per specific request to focus on icons, but a title helps) */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold font-sans text-geron-grey-dark">КОНТАКТНЫЙ УЗЕЛ</h1>
                    <p className="font-mono text-xs text-geron-grey-mid uppercase tracking-[0.2em]">Выберите канал связи</p>
                </div>

                {/* 4. Social Icons Row */}
                <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                    {SOCIAL_LINKS.map((item, index) => (
                        <motion.a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="group flex flex-col items-center gap-4 cursor-pointer"
                        >
                            {/* Icon Wrapper */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-all duration-300"
                                />

                                {/* Wireframe Glow on Hover */}
                                <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${item.color} mix-blend-multiply`} />
                            </div>

                            {/* Label */}
                            <span className="font-mono text-xs font-bold text-geron-grey-mid group-hover:text-geron-grey-dark transition-colors uppercase tracking-wider">
                                {item.label}
                            </span>
                        </motion.a>
                    ))}
                </div>

                {/* 5. Order CTA Button */}
                <div className="mt-8">
                    <OrderCTA />
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default Contact;
