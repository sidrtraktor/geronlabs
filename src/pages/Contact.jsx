import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Send, Github } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

const Contact = () => {
    return (
        <div className="h-screen w-full bg-geron-white relative flex items-center justify-center p-4">

            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-geron-cyan/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-geron-orange/5 rounded-full blur-[100px]" />
            </div>

            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-geron-grey-dark hover:text-geron-cyan transition-colors font-mono text-xs uppercase tracking-widest border border-geron-grey-dark/20 px-4 py-2 bg-white/50 backdrop-blur">
                <ArrowLeft size={14} /> System Root
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="w-full max-w-lg"
            >
                <GlassCard className="text-center relative overflow-hidden">
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-geron-cyan to-transparent opacity-50" />

                    <h1 className="text-3xl font-bold mb-2">Connect to Node</h1>
                    <p className="text-geron-grey-mid font-mono text-xs uppercase tracking-widest mb-8">Establish Uplink</p>

                    <div className="space-y-6">
                        <a href="mailto:hello@geronlabs.com" className="flex items-center gap-4 p-4 border border-geron-grey-dark/10 rounded-lg hover:border-geron-cyan hover:bg-geron-cyan/5 transition-all group">
                            <div className="w-10 h-10 bg-geron-grey-dark text-white flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                                <Mail size={18} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs font-mono text-geron-grey-mid uppercase">Email Frequency</div>
                                <div className="font-bold text-geron-grey-dark">hello@geronlabs.com</div>
                            </div>
                        </a>

                        <a href="#" className="flex items-center gap-4 p-4 border border-geron-grey-dark/10 rounded-lg hover:border-geron-cyan hover:bg-geron-cyan/5 transition-all group">
                            <div className="w-10 h-10 bg-geron-grey-dark text-white flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                                <Send size={18} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs font-mono text-geron-grey-mid uppercase">Telegram Signal</div>
                                <div className="font-bold text-geron-grey-dark">@geron_labs</div>
                            </div>
                        </a>

                        {/* Social Orb Row */}
                        <div className="flex justify-center gap-4 pt-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="w-2 h-2 rounded-full bg-geron-grey-dark/20 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                            ))}
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    )
}

export default Contact;
