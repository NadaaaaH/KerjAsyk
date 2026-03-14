import React, { useState } from 'react';
import { BarChart, Scale, MessageCircle, Target, Frown, Equal, ArrowUpRight } from 'lucide-react';

const scripts = {
  s1: {
    title: 'Ketika HR langsung tanya ekspektasi gajimu',
    body: '"Berdasarkan tanggung jawab yang disebutkan, saya terbuka untuk mendiskusikan kompensasi yang sesuai. Boleh saya tanya dulu — apakah ada range yang sudah disiapkan dari perusahaan untuk posisi ini?"'
  },
  s2: {
    title: 'Ketika kamu ingin tanya duluan sebelum mereka tanya',
    body: '"Sebelum kita lanjut, boleh saya tanya soal kompensasi untuk posisi ini? Supaya kita bisa diskusi dengan ekspektasi yang selaras dari awal."'
  },
  s3: {
    title: 'Ketika kamu butuh waktu untuk mempertimbangkan tawaran',
    body: '"Terima kasih atas tawarannya. Ini sangat menarik buat saya. Boleh saya minta waktu 1–2 hari untuk mempertimbangkan semuanya sebelum memberikan jawaban resmi?"'
  },
  s4: {
    title: 'Ketika kamu mau melakukan counter-offer',
    body: '"Saya sangat tertarik dengan posisi ini dan perusahaannya. Berdasarkan pengalaman dan skill yang saya bawa, saya berharap bisa ada ruang untuk mendiskusikan angka yang sedikit lebih tinggi. Apakah itu memungkinkan?"'
  }
};

export default function SalaryFeature() {
    const [activeScript, setActiveScript] = useState('s1');

    return (
        <section className="section" id="gaji">
            <div className="container">
                <div className="salary-split">
                    <div className="sal-text">
                        <div className="eyebrow rv">Info Gaji</div>
                        <h2 className="sec-h rv">Tau nilaimu,<br/><span className="accent-em">nego dengan percaya diri.</span></h2>
                        <p className="sec-p rv">Banyak pencari kerja kalah di meja negosiasi bukan karena tidak layak — tapi karena tidak siap. Kami kasih data dan kalimat siap pakai.</p>

                        <div className="script-tabs rv" id="scriptTabs">
                            <button className={`st-tab ${activeScript === 's1' ? 'sel' : ''}`} onClick={() => setActiveScript('s1')}>Ketika HR tanya duluan</button>
                            <button className={`st-tab ${activeScript === 's2' ? 'sel' : ''}`} onClick={() => setActiveScript('s2')}>Tanya duluan sebelum offer</button>
                            <button className={`st-tab ${activeScript === 's3' ? 'sel' : ''}`} onClick={() => setActiveScript('s3')}>Butuh waktu pertimbangan</button>
                            <button className={`st-tab ${activeScript === 's4' ? 'sel' : ''}`} onClick={() => setActiveScript('s4')}>Counter-offer</button>
                        </div>

                        <div className="script-card rv">
                            <div className="sc-head">
                                <div className="sc-dots">
                                    <div className="sc-d" style={{ background: '#FFB3B3' }}></div>
                                    <div className="sc-d" style={{ background: '#FFD9A0' }}></div>
                                    <div className="sc-d" style={{ background: '#A3D9BC' }}></div>
                                </div>
                                <span>{scripts[activeScript].title}</span>
                            </div>
                            <div className="sc-body">{scripts[activeScript].body}</div>
                        </div>

                        <div className="salary-perks rv" style={{ transitionDelay: '.1s' }}>
                            <div className="sp-item">
                                <div className="sp-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BarChart size={24} color="var(--teal)" strokeWidth={1.5} /></div>
                                <div><div className="sp-label">Data Gaji Pasar</div><div className="sp-text">Perbandingan rentang gaji berdasarkan posisi, kota, dan level pengalaman.</div></div>
                            </div>
                            <div className="sp-item">
                                <div className="sp-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Scale size={24} color="var(--teal)" strokeWidth={1.5} /></div>
                                <div><div className="sp-label">Posisi Tawar</div><div className="sp-text">Kamu tahu seberapa kuat posisimu sebelum duduk di meja negosiasi.</div></div>
                            </div>
                            <div className="sp-item">
                                <div className="sp-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageCircle size={24} color="var(--teal)" strokeWidth={1.5} /></div>
                                <div><div className="sp-label">Kalimat Siap Pakai</div><div className="sp-text">Script yang sudah terbukti — dikembangkan bersama para profesional HR.</div></div>
                            </div>
                            <div className="sp-item">
                                <div className="sp-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Target size={24} color="var(--teal)" strokeWidth={1.5} /></div>
                                <div><div className="sp-label">Personalisasi</div><div className="sp-text">Rekomendasi berbeda untuk fresh grad, career switch, dan senior level.</div></div>
                            </div>
                        </div>
                    </div>

                    <div className="sal-visual">
                        <div className="sal-big-card rv">
                            <div className="sbc-label">Posisi tawar kamu · UI/UX Designer · Jakarta · 1 thn</div>
                            <div className="barg-wrap">
                                <div className="barg-track">
                                    <div className="barg-fill"></div>
                                    <div className="barg-thumb"></div>
                                </div>
                                <div className="barg-markers">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Frown size={14}/> Lemah</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Equal size={14}/> Netral</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowUpRight size={14}/> Kuat</span>
                                </div>
                            </div>
                            <div className="sal-pos">Berdasarkan deskripsi role dan skill yang kamu punya, posisimu <strong>netral cenderung kuat</strong>. Skill Figma adalah leverage nyata kamu.</div>
                        </div>

                        <div className="sal-big-card rv" style={{ transitionDelay: '.08s' }}>
                            <div className="sbc-label">Rentang gaji pasar untuk posisi ini</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
                                <div style={{ padding: '14px', background: 'var(--rose-bg)', borderRadius: '10px' }}>
                                    <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--rose)', letterSpacing: '-.03em' }}>3,5 jt</div>
                                    <div style={{ fontSize: '10.5px', color: 'var(--ink4)', marginTop: '3px' }}>Batas bawah</div>
                                </div>
                                <div style={{ padding: '14px', background: 'var(--teal-l)', borderRadius: '10px', border: '2px solid var(--teal-m)' }}>
                                    <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--teal)', letterSpacing: '-.03em' }}>5,5 jt</div>
                                    <div style={{ fontSize: '10.5px', color: 'var(--ink4)', marginTop: '3px' }}>Median pasar</div>
                                </div>
                                <div style={{ padding: '14px', background: 'var(--teal-l)', borderRadius: '10px' }}>
                                    <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--teal-d)', letterSpacing: '-.03em' }}>8 jt</div>
                                    <div style={{ fontSize: '10.5px', color: 'var(--ink4)', marginTop: '3px' }}>Batas atas</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
