import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Hero() {
    const [c1, setC1] = useState(0);
    const [c2, setC2] = useState(0);
    const [c3, setC3] = useState(0);

    useEffect(() => {
        const animateValue = (setter, target, duration = 1400) => {
            let start = null;
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                setter(Math.floor(progress * target));
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };

        const t = setTimeout(() => {
            animateValue(setC1, 12400);
            animateValue(setC2, 890);
            animateValue(setC3, 4800);
        }, 700);
        return () => clearTimeout(t);
    }, []);

    const sC1 = c1.toLocaleString('id-ID') + (c1 >= 12400 ? '+' : '');
    const sC2 = c2.toLocaleString('id-ID') + (c2 >= 890 ? '+' : '');
    const sC3 = c3.toLocaleString('id-ID') + (c3 >= 4800 ? '+' : '');

    return (
        <section className="hero">
            <div className="hero-left">
                <div className="hero-badge"><span className="h-dot"></span>Untuk pencari kerja Indonesia 🇮🇩</div>
                <h1 className="hero-h1">
                    Kerja asik,<br/>
                    <span className="serif-italic">tanpa toxic.</span><br/>
                    <span className="light-w">Cek dulu, baru lamar.</span>
                </h1>
                <p className="hero-sub">
                    Pasar kerja bisa bising dan membingungkan. KerjaSyik bantu kamu cek lowongan, kenali perusahaan, dan siapkan negosiasi gaji — semuanya gratis, tanpa akun.
                </p>
                <div className="hero-btns">
                    <button className="btn-g" onClick={() => document.getElementById('scan')?.scrollIntoView({behavior:'smooth'})} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Search size={18} strokeWidth={2.5} /> Scan Lowongan
                    </button>
                    <button className="btn-o" onClick={() => document.getElementById('perusahaan')?.scrollIntoView({behavior:'smooth'})}>
                        Lihat Profil Perusahaan →
                    </button>
                </div>
                <div className="hero-stats">
                    <div className="hs"><div className="hs-num">{sC1}</div><div className="hs-lbl">Lowongan Dipantau</div></div>
                    <div className="hs"><div className="hs-num">{sC2}</div><div className="hs-lbl">Perusahaan Tercatat</div></div>
                    <div className="hs"><div className="hs-num">{sC3}</div><div className="hs-lbl">Pengguna Terbantu</div></div>
                </div>
            </div>

            <div className="hero-right">
                <div className="hero-cards">
                    {/* Main card: scan result */}
                    <div className="h-card h-card-main">
                        <div className="hc-label">Hasil Scan Lowongan</div>
                        <div className="hc-title">Marketing Intern · Via WhatsApp</div>
                        <div className="verdict-row">
                            <div className="v-chip v-warn"><span className="v-dot"></span>Perlu Hati-hati</div>
                            <div className="hc-score">54/100</div>
                        </div>
                        <div className="hc-bar-track"><div className="hc-bar-fill"></div></div>
                        <div className="hc-flags">
                            <div className="hc-flag"><span><AlertTriangle size={16} color="var(--rose)" /></span>Minta biaya seragam di depan</div>
                            <div className="hc-flag"><span><AlertCircle size={16} color="var(--amber)" /></span>Tidak ada info perusahaan jelas</div>
                            <div className="hc-flag"><span><CheckCircle2 size={16} color="var(--teal)" /></span>Deskripsi kerja cukup masuk akal</div>
                        </div>
                    </div>
                    {/* Mini card: salary */}
                    <div className="h-card h-card-mini">
                        <div className="sal-mini">
                            <div className="sm-tag">Posisi Tawarmu</div>
                            <div className="sm-val">Rp 5,2 jt</div>
                            <div className="sm-sub">UI/UX · Jakarta · 1 thn</div>
                            <div className="sm-bar"><div className="sm-fill"></div></div>
                            <div className="sm-conf">💪 Posisi kuat — bisa nego</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
