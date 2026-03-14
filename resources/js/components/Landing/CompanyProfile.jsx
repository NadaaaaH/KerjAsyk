import React, { useState } from 'react';
import { 
    Search, Building, ShoppingCart, Truck, XOctagon, Rocket, 
    Package, AlertTriangle, CheckCircle2, AlertCircle, Zap, 
    DollarSign, FileText, Lock 
} from 'lucide-react';

export default function CompanyProfile() {
    const [showDetail, setShowDetail] = useState(false);
    const [searchVal, setSearchVal] = useState('');

    const toggleDetail = () => {
        setShowDetail(true);
        setTimeout(() => {
            const detail = document.getElementById('coDetail');
            if (detail) {
                detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
                detail.classList.add('in');
            }
        }, 100);
    };

    return (
        <section className="section alt" id="perusahaan">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
                    <div>
                        <div className="eyebrow rv">Profil Perusahaan</div>
                        <h2 className="sec-h rv">Kenali dulu, <span className="accent-em">baru melamar.</span></h2>
                        <p style={{ fontSize: '15px', color: 'var(--ink3)', fontWeight: '400', lineHeight: '1.7', maxWidth: '460px' }} className="rv">
                            Cari nama perusahaan atau domain email. Kami tampilkan pola, laporan pengguna, dan sinyal yang perlu kamu tahu.
                        </p>
                    </div>
                </div>

                <div className="perus-search rv">
                    <span style={{ fontSize: '16px', display: 'flex', alignItems: 'center', color: 'var(--ink4)' }}><Search size={20} /></span>
                    <input 
                        className="perus-input" 
                        placeholder="Cari perusahaan… (contoh: PT Maju Bersama, tokopedia.com)" 
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && toggleDetail()}
                    />
                    <button className="perus-btn" onClick={toggleDetail}>Cari</button>
                </div>

                {/* Company cards */}
                <div className="co-grid" id="coGrid">
                    <div className="co-card rv" onClick={toggleDetail}>
                        <div className="co-logo-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Building size={24} color="var(--teal)" /></div>
                        <div className="co-name">PT Maju Bersama Digital</div>
                        <div className="co-loc">📍 Jakarta Selatan · Teknologi</div>
                        <div className="co-chips">
                            <span className="co-chip cc-warn" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={12}/> Perlu Hati-hati</span>
                            <span className="co-chip cc-safe" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={12}/> Terverifikasi</span>
                        </div>
                        <div className="co-score-row">
                            <div className="co-bar"><div className="co-fill" style={{ width: '54%', background: 'var(--amber)' }}></div></div>
                            <div className="co-score-num" style={{ color: 'var(--amber)' }}>54</div>
                        </div>
                    </div>
                    <div className="co-card rv" style={{ transitionDelay: '.07s' }}>
                        <div className="co-logo-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShoppingCart size={24} color="var(--teal)" /></div>
                        <div className="co-name">Tokopedia</div>
                        <div className="co-loc">📍 Jakarta · E-commerce</div>
                        <div className="co-chips">
                            <span className="co-chip cc-safe" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={12}/> Aman</span>
                            <span className="co-chip cc-safe" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={12}/> Unicorn</span>
                        </div>
                        <div className="co-score-row">
                            <div className="co-bar"><div className="co-fill" style={{ width: '94%', background: 'var(--teal)' }}></div></div>
                            <div className="co-score-num" style={{ color: 'var(--teal)' }}>94</div>
                        </div>
                    </div>
                    <div className="co-card rv" style={{ transitionDelay: '.14s' }}>
                        <div className="co-logo-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Truck size={24} color="var(--teal)" /></div>
                        <div className="co-name">Gojek</div>
                        <div className="co-loc">📍 Jakarta · Super App</div>
                        <div className="co-chips">
                            <span className="co-chip cc-safe" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={12}/> Aman</span>
                            <span className="co-chip cc-safe" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={12}/> Verified</span>
                        </div>
                        <div className="co-score-row">
                            <div className="co-bar"><div className="co-fill" style={{ width: '91%', background: 'var(--teal)' }}></div></div>
                            <div className="co-score-num" style={{ color: 'var(--teal)' }}>91</div>
                        </div>
                    </div>
                    <div className="co-card rv" style={{ transitionDelay: '.21s' }}>
                        <div className="co-logo-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XOctagon size={24} color="var(--rose)" /></div>
                        <div className="co-name">MLM Cepat Kaya</div>
                        <div className="co-loc">📍 Tidak Dikenal · MLM</div>
                        <div className="co-chips">
                            <span className="co-chip cc-risk" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={12}/> Risiko Tinggi</span>
                        </div>
                        <div className="co-score-row">
                            <div className="co-bar"><div className="co-fill" style={{ width: '12%', background: 'var(--rose)' }}></div></div>
                            <div className="co-score-num" style={{ color: 'var(--rose)' }}>12</div>
                        </div>
                    </div>
                    <div className="co-card rv" style={{ transitionDelay: '.28s' }}>
                        <div className="co-logo-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Rocket size={24} color="var(--teal)" /></div>
                        <div className="co-name">CV Digital Solusi</div>
                        <div className="co-loc">📍 Bandung · Startup</div>
                        <div className="co-chips">
                            <span className="co-chip cc-safe" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={12}/> Aman</span>
                        </div>
                        <div className="co-score-row">
                            <div className="co-bar"><div className="co-fill" style={{ width: '85%', background: 'var(--teal)' }}></div></div>
                            <div className="co-score-num" style={{ color: 'var(--teal)' }}>85</div>
                        </div>
                    </div>
                    <div className="co-card rv" style={{ transitionDelay: '.35s' }}>
                        <div className="co-logo-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={24} color="var(--teal)" /></div>
                        <div className="co-name">PT Karya Muda Nusantara</div>
                        <div className="co-loc">📍 Surabaya · Jasa</div>
                        <div className="co-chips">
                            <span className="co-chip cc-warn" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={12}/> Cek Dulu</span>
                        </div>
                        <div className="co-score-row">
                            <div className="co-bar"><div className="co-fill" style={{ width: '62%', background: 'var(--amber)' }}></div></div>
                            <div className="co-score-num" style={{ color: 'var(--amber)' }}>62</div>
                        </div>
                    </div>
                </div>

                {/* Company detail (expanded) */}
                {showDetail && (
                    <div className="company-detail rv in" id="coDetail">
                        <div className="cd-header">
                            <div className="cd-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Building size={40} color="var(--teal)" /></div>
                            <div className="cd-meta">
                                <div className="cd-name">PT Maju Bersama Digital</div>
                                <div className="cd-industry">Teknologi · Jasa Profesional · Jakarta Selatan</div>
                                <div className="cd-chips">
                                    <span className="cd-chip chip-amber" style={{ display: 'inline-flex', gap: '4px' }}><AlertTriangle size={14}/> Perlu Perhatian</span>
                                    <span className="cd-chip chip-teal" style={{ display: 'inline-flex', gap: '4px' }}><CheckCircle2 size={14}/> Kontak Terverifikasi</span>
                                    <span className="cd-chip chip-ink">📍 Jakarta</span>
                                    <span className="cd-chip chip-ink">📅 Aktif 2019–2025</span>
                                </div>
                            </div>
                            <div className="cd-trust">
                                <div className="ts-label">Trust Score</div>
                                <div className="ts-ring">
                                    <svg className="ts-svg" viewBox="0 0 64 64">
                                        <circle className="ts-bg" cx="32" cy="32" r="26"/>
                                        <circle className="ts-fill-amber" cx="32" cy="32" r="26" transform="rotate(-90 32 32)"/>
                                    </svg>
                                    <div className="ts-num">54</div>
                                </div>
                                <div className="ts-verdict" style={{ color: 'var(--amber)' }}>Perlu Hati-hati</div>
                            </div>
                        </div>
                        <div className="cd-body">
                            <div className="cd-stats">
                                <div className="stat-box"><div className="stat-num">47</div><div className="stat-lbl">Lowongan Dipantau</div></div>
                                <div className="stat-box"><div className="stat-num" style={{ color: 'var(--amber)' }}>23</div><div className="stat-lbl">Laporan Pengguna</div></div>
                                <div className="stat-box"><div className="stat-num" style={{ color: 'var(--rose)' }}>3</div><div className="stat-lbl">Red Flag Aktif</div></div>
                                <div className="stat-box"><div className="stat-num" style={{ color: 'var(--ink3)' }}>6</div><div className="stat-lbl">Bulan Aktif</div></div>
                            </div>

                            <div className="r-label">Pola Lowongan yang Kami Observasi</div>
                            <div className="pattern-grid-2">
                                <div className="pattern-card">
                                    <span className="pc-icon" style={{ display: 'flex', justifyContent: 'center' }}><Zap size={22} color="var(--amber)" /></span>
                                    <div className="pc-title">Proses interview sangat cepat</div>
                                    <div className="pc-desc">Dipanggil dalam hitungan jam setelah apply — pola yang sering muncul di lowongan berisiko.</div>
                                    <span className="pc-badge" style={{ background: 'var(--amber-bg)', color: 'var(--amber)' }}>Perlu Dicermati</span>
                                </div>
                                <div className="pattern-card">
                                    <span className="pc-icon" style={{ display: 'flex', justifyContent: 'center' }}><DollarSign size={22} color="var(--rose)" /></span>
                                    <div className="pc-title">Minta biaya awal</div>
                                    <div className="pc-desc">Beberapa laporan menyebut diminta beli "starter kit" atau "seragam" sebelum mulai kerja.</div>
                                    <span className="pc-badge" style={{ background: 'var(--rose-bg)', color: 'var(--rose)' }}>Red Flag</span>
                                </div>
                                <div className="pattern-card">
                                    <span className="pc-icon" style={{ display: 'flex', justifyContent: 'center' }}><FileText size={22} color="var(--amber)" /></span>
                                    <div className="pc-title">Deskripsi pekerjaan bervariasi</div>
                                    <div className="pc-desc">Job desc kadang berubah setelah apply — beda dari yang diiklankan.</div>
                                    <span className="pc-badge" style={{ background: 'var(--amber-bg)', color: 'var(--amber)' }}>Waspadai</span>
                                </div>
                                <div className="pattern-card">
                                    <span className="pc-icon" style={{ display: 'flex', justifyContent: 'center' }}><CheckCircle2 size={22} color="var(--teal)" /></span>
                                    <div className="pc-title">Email rekrutmen resmi</div>
                                    <div className="pc-desc">Menggunakan domain email perusahaan sendiri, bukan Gmail atau Yahoo.</div>
                                    <span className="pc-badge" style={{ background: 'var(--teal-l)', color: 'var(--teal-d)' }}>Positif</span>
                                </div>
                            </div>

                            <div className="r-label">Laporan dari Pengguna</div>
                            <div className="report-stack">
                                <div className="report-card">
                                    <div className="rc-top">
                                        <div className="rc-avatar">R</div>
                                        <div className="rc-name">Rizky A.</div>
                                        <span className="rc-verdict v-warn-badge">Perlu Hati-hati</span>
                                        <div className="rc-date">2 minggu lalu</div>
                                    </div>
                                    <div className="rc-text">"Dipanggil interview keesokan harinya setelah apply. Begitu sampai, langsung disuruh beli 'starter kit' seharga Rp 500rb. Langsung pulang."</div>
                                </div>
                                <div className="report-card">
                                    <div className="rc-top">
                                        <div className="rc-avatar" style={{ background: 'linear-gradient(135deg,#7C3AED,#4F46E5)' }}>S</div>
                                        <div className="rc-name">Sari M.</div>
                                        <span className="rc-verdict v-ok">Aman</span>
                                        <div className="rc-date">1 bulan lalu</div>
                                    </div>
                                    <div className="rc-text">"Saya apply ke posisi Admin dan prosesnya oke. Tidak ada minta biaya apapun. Gajinya sesuai UMR. Mungkin tergantung divisi."</div>
                                </div>
                            </div>

                            <div style={{ marginTop: '18px' }}>
                                <button onClick={() => setShowDetail(false)} style={{ fontSize: '13px', color: 'var(--ink3)', background: 'none', border: 'none', fontFamily: 'var(--f-body)', fontWeight: '500', padding: '0' }}>← Tutup detail</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="trust-note rv" style={{ marginTop: '28px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div className="tn-icon" style={{ display: 'flex', marginTop: '2px' }}><Lock size={20} color="var(--teal)" /></div>
                    <div>Data profil perusahaan dikumpulkan dari laporan pengguna, pola lowongan publik, dan sinyal digital. <strong>Bersifat indikatif</strong> — bukan jaminan keamanan. Selalu gunakan pertimbanganmu sendiri.</div>
                </div>
            </div>
        </section>
    );
}
