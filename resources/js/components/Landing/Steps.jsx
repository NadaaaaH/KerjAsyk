import React from 'react';
import { ClipboardList, Search, Activity, Briefcase } from 'lucide-react';

export default function Steps() {
    return (
        <section className="section" id="cara-kerja">
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 52px' }}>
                    <div className="eyebrow rv">Cara Kerja</div>
                    <h2 className="sec-h rv">Simpel, cepat, <em>dan jujur.</em></h2>
                    <p className="sec-p rv" style={{ margin: '0 auto' }}>Tidak perlu akun, tidak perlu install apapun. Tinggal tempel dan analisis.</p>
                </div>
                
                <div className="steps-row">
                    <div className="step rv">
                        <div className="step-n">01</div>
                        <span className="step-e" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ClipboardList size={32} color="var(--teal)" strokeWidth={1.5} /></span>
                        <div className="step-t">Tempel lowongan</div>
                        <div className="step-d">Copy-paste teks, link, atau upload foto screenshot dari WhatsApp, Jobstreet, Glints, apapun.</div>
                    </div>
                    <div className="step rv" style={{ transitionDelay: '.07s' }}>
                        <div className="step-n">02</div>
                        <span className="step-e" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Search size={32} color="var(--teal)" strokeWidth={1.5} /></span>
                        <div className="step-t">Kami baca sinyalnya</div>
                        <div className="step-d">Sistem kami cek pola bahasa, info kontak, profil perusahaan, dan puluhan indikator lainnya.</div>
                    </div>
                    <div className="step rv" style={{ transitionDelay: '.14s' }}>
                        <div className="step-n">03</div>
                        <span className="step-e" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Activity size={32} color="var(--teal)" strokeWidth={1.5} /></span>
                        <div className="step-t">Dapat laporan lengkap</div>
                        <div className="step-d">Kamu dapat skor kepercayaan, daftar temuan, dan penjelasan yang bisa dimengerti — bukan cuma label.</div>
                    </div>
                    <div className="step rv" style={{ transitionDelay: '.21s' }}>
                        <div className="step-n">04</div>
                        <span className="step-e" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Briefcase size={32} color="var(--teal)" strokeWidth={1.5} /></span>
                        <div className="step-t">Ambil keputusan</div>
                        <div className="step-d">Mau lanjut melamar atau tidak, keputusan tetap di tanganmu. Kami cuma bantu kamu lihat lebih jernih.</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
