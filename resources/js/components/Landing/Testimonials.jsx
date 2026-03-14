import React from 'react';

export default function Testimonials() {
    return (
        <section className="section">
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 52px' }}>
                    <div className="eyebrow rv">Cerita Pengguna</div>
                    <h2 className="sec-h rv">Digunakan oleh <em>ribuan pencari kerja.</em></h2>
                </div>
                <div className="testi-grid">
                    <div className="testi rv">
                        <div className="t-stars">⭐⭐⭐⭐⭐</div>
                        <div className="t-text">"Hampir kena scam lowongan yang minta bayar 'seragam' dulu. Untung cek di KerjaSyik dulu dan langsung kelihatan red flag-nya."</div>
                        <div className="t-author">
                            <div className="t-avatar" style={{ background: 'linear-gradient(135deg,var(--teal),var(--teal-d))' }}>R</div>
                            <div><div className="t-name">Rizky A.</div><div className="t-role">Fresh Graduate · Teknik Informatika</div></div>
                        </div>
                    </div>
                    <div className="testi rv" style={{ transitionDelay: '.08s' }}>
                        <div className="t-stars">⭐⭐⭐⭐⭐</div>
                        <div className="t-text">"Fitur negosiasi gajinya ngebantu banget. Aku yang biasanya grogi langsung dikasih angka, sekarang bisa jawab dengan percaya diri."</div>
                        <div className="t-author">
                            <div className="t-avatar" style={{ background: 'linear-gradient(135deg,#7C3AED,#4F46E5)' }}>S</div>
                            <div><div className="t-name">Sari M.</div><div className="t-role">UI/UX Designer · 1 tahun pengalaman</div></div>
                        </div>
                    </div>
                    <div className="testi rv" style={{ transitionDelay: '.16s' }}>
                        <div className="t-stars">⭐⭐⭐⭐⭐</div>
                        <div className="t-text">"Penjelasannya nggak bikin parno, tapi tetap informatif. Kayak dikasih tahu sama teman yang udah lebih berpengalaman soal dunia kerja."</div>
                        <div className="t-author">
                            <div className="t-avatar" style={{ background: 'linear-gradient(135deg,#D97706,#B45309)' }}>A</div>
                            <div><div className="t-name">Andi K.</div><div className="t-role">Marketing · Baru kerja 6 bulan</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
