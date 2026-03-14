import React from 'react';
import { motion } from 'framer-motion';

export default function Problem() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Left: Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="aspect-w-4 aspect-h-3">
                            <img 
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" 
                                alt="Stressed person looking at laptop" 
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                        </div>
                    </motion.div>

                    {/* Right: Text */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-lg"
                    >
                        <h2 className="text-4xl font-extrabold text-slate-800 mb-6 leading-tight">
                            Pasar kerja itu bising. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                                Kami sediakan kejelasan.
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Banyak lowongan palsu, tidak ada info gaji, dan lingkungan kerja yang ternyata toxic. Jangan buang waktu kamu untuk melamar ke tempat yang salah.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Filter ketat untuk lowongan bodong", 
                                "Estismasi gaji yang realistis", 
                                "Review budaya kerja asli"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
