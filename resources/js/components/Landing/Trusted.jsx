import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';

const companies = [
    { name: 'Tokopedia', logo: 'T', rating: '4.8', bgColor: 'bg-green-100', color: 'text-green-600' },
    { name: 'Gojek', logo: 'G', rating: '4.7', bgColor: 'bg-emerald-100', color: 'text-emerald-600' },
    { name: 'Traveloka', logo: 'Tr', rating: '4.6', bgColor: 'bg-blue-100', color: 'text-blue-600' },
    { name: 'Shopee', logo: 'S', rating: '4.5', bgColor: 'bg-orange-100', color: 'text-orange-600' },
    { name: 'Tiket.com', logo: 'Ti', rating: '4.6', bgColor: 'bg-yellow-100', color: 'text-yellow-600' },
    { name: 'Ruangguru', logo: 'R', rating: '4.5', bgColor: 'bg-cyan-100', color: 'text-cyan-600' },
];

export default function Trusted() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-blue-500 font-semibold tracking-wide uppercase text-sm mb-3">Partner</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                        Perusahaan terpercaya,<br/> sudah terverifikasi
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {companies.map((company, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className={`w-14 h-14 rounded-full ${company.bgColor} ${company.color} flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform`}>
                                {company.logo}
                            </div>
                            <h4 className="font-semibold text-slate-800 text-sm mb-1">{company.name}</h4>
                            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                <BadgeCheck className="w-3 h-3" />
                                Verified {company.rating}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
