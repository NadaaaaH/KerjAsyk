import React from 'react';

export default function WhyUs() {
    return (
        <section className="section alt" id="kenapa">
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 52px' }}>
                    <div className="eyebrow rv">Kenapa KerjaSyik?</div>
                    <h2 className="sec-h rv">Dibangun <em>untuk kamu,</em><br/>bukan untuk perusahaan.</h2>
                </div>
                <div className="why-grid">
                    <div className="why-card rv">
                        <div className="wc-icon">🔍</div>
                        <div>
                            <div className="wc-title">Bukan AI kotak hitam</div>
                            <div className="wc-desc">Setiap kesimpulan bisa kamu telusuri. Kami tunjukkan indikatornya, bukan cuma labelnya.</div>
                        </div>
                    </div>
                    <div className="why-card rv" style={{ transitionDelay: '.07s' }}>
                        <div className="wc-icon">🤝</div>
                        <div>
                            <div className="wc-title">Bukan AI yang menghakimi</div>
                            <div className="wc-desc">Bahasanya kayak senior teman yang jujur — bukan sistem yang dingin dan kaku.</div>
                        </div>
                    </div>
                    <div className="why-card rv" style={{ transitionDelay: '.14s' }}>
                        <div className="wc-icon">🔒</div>
                        <div>
                            <div className="wc-title">Privasi adalah default</div>
                            <div className="wc-desc">Tidak perlu akun. Tidak ada data yang disimpan. Pakai, selesai, pergi.</div>
                        </div>
                    </div>
                    <div className="why-card rv" style={{ transitionDelay: '.21s' }}>
                        <div className="wc-icon">🎯</div>
                        <div>
                            <div className="wc-title">Fokus, tidak lebay</div>
                            <div className="wc-desc">Kami sengaja tidak bikin fitur yang ribet. Fokus di yang penting dan benar-benar berguna.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
