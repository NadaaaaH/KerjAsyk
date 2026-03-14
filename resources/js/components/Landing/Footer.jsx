import React from 'react';
import { Search, Mail, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <>
            {/* CTA Section */}
            <section className="section">
                <div className="container">
                    <div className="cta-wrap rv">
                        <h2 className="cta-h">Kerja lebih tenang.<br/><em>Kerja lebih syik.</em></h2>
                        <p className="cta-p">Ada lowongan yang bikin ragu? Tempel di sini, kita lihat bareng. Nggak ada salahnya double-check sebelum melamar.</p>
                        <div className="cta-btns">
                            <a className="cta-btn1" href="#scan" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <Search size={18} strokeWidth={2.5}/> Scan Lowongan Sekarang
                            </a>
                            <a className="cta-btn2" href="#perusahaan">Cari Info Perusahaan</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Footer */}
            <footer>
                <div className="footer-top">
                    <div>
                        <div className="f-brand">KerjaSyik</div>
                        <div className="f-desc">Platform keputusan untuk pencari kerja Indonesia. Gratis, tanpa akun, tanpa data tersimpan.</div>
                        <div className="f-social">
                            <a className="f-s" href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Twitter size={18} /></a>
                            <a className="f-s" href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Linkedin size={18} /></a>
                            <a className="f-s" href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mail size={18} /></a>
                        </div>
                    </div>
                    <div>
                        <div className="f-col-title">Fitur</div>
                        <div className="f-links">
                            <a className="f-link" href="#scan">Scan Lowongan</a>
                            <a className="f-link" href="#perusahaan">Profil Perusahaan</a>
                            <a className="f-link" href="#gaji">Info Gaji</a>
                        </div>
                    </div>
                    <div>
                        <div className="f-col-title">Info</div>
                        <div className="f-links">
                            <a className="f-link" href="#cara-kerja">Cara Kerja</a>
                            <a className="f-link" href="#">Metodologi</a>
                            <a className="f-link" href="#">Tentang Kami</a>
                        </div>
                    </div>
                    <div>
                        <div className="f-col-title">Lainnya</div>
                        <div className="f-links">
                            <a className="f-link" href="#">Privasi</a>
                            <a className="f-link" href="#">Syarat Pakai</a>
                            <a className="f-link" href="#">Laporkan Bug</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="f-copy">© 2025 KerjaSyik · Dibuat untuk Indonesia 🇮🇩</div>
                    <div className="f-disc">Hasil analisis bersifat indikatif. Kami menampilkan sinyal — bukan jaminan. Selalu gunakan penilaianmu sendiri.</div>
                </div>
            </footer>
        </>
    );
}
