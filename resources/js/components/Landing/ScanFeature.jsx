import React, { useState, useRef, useEffect } from 'react';
import { 
    CheckCircle2, AlertTriangle, AlertCircle, Link as LinkIcon, 
    Clipboard, Image as ImageIcon, Camera, BookOpen, Search, 
    Building, Scale, MapPin, Briefcase 
} from 'lucide-react';

const scanResults = {
  safe: {
    verdict: 'safe', score: 87,
    verdictText: 'Tampak Aman',
    title: 'Lowongan ini terlihat kredibel dan wajar.',
    desc: 'Tidak ditemukan red flag signifikan. Kontak resmi, deskripsi kerja jelas, dan prosesnya sesuai standar rekrutmen normal.',
    fillPct: '87%',
    evidence: [
      {type:'good',icon:<CheckCircle2 size={18} color="var(--teal)" />,title:'Email domain perusahaan resmi',desc:'Menggunakan domain @perusahaan.co.id — bukan Gmail atau Yahoo gratis.',src:'Dari teks'},
      {type:'good',icon:<CheckCircle2 size={18} color="var(--teal)" />,title:'Deskripsi pekerjaan spesifik',desc:'Jobdesk, kualifikasi, dan benefit tertera jelas. Bukan sekadar "kerja mudah gaji gede".',src:'Analisis teks'},
      {type:'good',icon:<CheckCircle2 size={18} color="var(--teal)" />,title:'Tidak ada minta biaya apapun',desc:'Tidak ditemukan frasa yang meminta pembayaran, deposit, atau "biaya pendaftaran".',src:'Pola bahasa'},
      {type:'warn',icon:<AlertTriangle size={18} color="var(--amber)" />,title:'Deadline sangat singkat',desc:'Waktu melamar cukup pendek — bisa jadi teknik urgency, tapi bisa juga memang kebutuhan mendesak.',src:'Analisis konteks'}
    ]
  },
  risk: {
    verdict: 'risk', score: 18,
    verdictText: 'Risiko Tinggi',
    title: 'Banyak tanda-tanda yang sangat mencurigakan.',
    desc: 'Kami menemukan beberapa pola klasik penipuan kerja. Jangan transfer uang apapun, dan hindari memberikan data pribadi sebelum verifikasi lebih lanjut.',
    fillPct: '18%',
    evidence: [
      {type:'bad',icon:<AlertCircle size={18} color="var(--rose)" />,title:'Minta biaya registrasi / deposit',desc:'Lowongan kerja resmi tidak pernah meminta pembayaran apapun di awal proses.',src:'Pola bahasa'},
      {type:'bad',icon:<AlertCircle size={18} color="var(--rose)" />,title:'Klaim penghasilan tidak realistis',desc:'"Jutaan per hari" atau "gaji ratusan ribu per hari" hampir selalu indikator penipuan.',src:'Analisis klaim'},
      {type:'bad',icon:<AlertCircle size={18} color="var(--rose)" />,title:'Tidak ada identitas perusahaan jelas',desc:'Tidak ada nama PT/CV resmi, website, atau alamat kantor yang bisa diverifikasi.',src:'Verifikasi kontak'},
      {type:'warn',icon:<AlertTriangle size={18} color="var(--amber)" />,title:'Bahasa sangat provokatif & urgent',desc:'Banyak tanda seru, huruf kapital, dan tekanan waktu — taktik klasik untuk mengabaikan akal sehat.',src:'Pola bahasa'},
      {type:'warn',icon:<AlertTriangle size={18} color="var(--amber)" />,title:'Kontak hanya WA pribadi',desc:'Rekruter dari perusahaan resmi biasanya menggunakan email korporat, bukan nomor WA biasa.',src:'Info kontak'}
    ]
  },
  warn: {
    verdict: 'warn', score: 54,
    verdictText: 'Perlu Hati-hati',
    title: 'Ada beberapa hal yang sebaiknya kamu perhatikan.',
    desc: 'Lowongan ini punya sinyal campur — ada yang positif, ada yang perlu dicermati lebih jauh. Bukan berarti pasti penipuan, tapi lakukan verifikasi sebelum lanjut.',
    fillPct: '54%',
    evidence: [
      {type:'good',icon:<CheckCircle2 size={18} color="var(--teal)" />,title:'Email domain perusahaan',desc:'Menggunakan email @perusahaan.com — tanda yang cukup baik.',src:'Dari teks'},
      {type:'good',icon:<CheckCircle2 size={18} color="var(--teal)" />,title:'Deskripsi kerja masuk akal',desc:'Jobdesk spesifik dan ekspektasi tidak berlebihan.',src:'Analisis teks'},
      {type:'bad',icon:<AlertCircle size={18} color="var(--rose)" />,title:'Proses interview sangat cepat',desc:'Dipanggil dalam hitungan jam — sering jadi pola lowongan berisiko.',src:'Pola rekrutmen'},
      {type:'warn',icon:<AlertTriangle size={18} color="var(--amber)" />,title:'Info perusahaan minim',desc:'Tidak ditemukan website atau alamat kantor yang bisa dikonfirmasi secara mandiri.',src:'Verifikasi kontak'},
      {type:'warn',icon:<AlertTriangle size={18} color="var(--amber)" />,title:'Tidak ada info rentang gaji',desc:'Bukan red flag besar, tapi transparansi gaji adalah tanda perusahaan yang sehat.',src:'Analisis konten'}
    ]
  }
};

const examples = {
  link: { mode: 'link', val: 'https://www.jobstreet.co.id/lowongan/staff-marketing-pt-maju-bersama-digital-123456' },
  text: { mode: 'text', val: 'DIBUTUHKAN SEGERA!!!\n\nMarketing Executive — PT Karya Digital\nGaji: Rp 5.000.000 – Rp 8.000.000\nLokasi: Jakarta Selatan (WFO)\n\nKualifikasi:\n- Pendidikan min. D3/S1 semua jurusan\n- Komunikatif dan target oriented\n- Fresh graduate dipersilakan melamar\n\nKirim CV ke: hrd@karyadigital.co.id\nDeadline: 20 Maret 2025\n\nInfo: 0812-3456-7890 (WA only)' },
  text2: { mode: 'text', val: 'LOWONGAN KERJA SEGERA!!!\n\n🔥 PENGHASILAN JUTAAN/HARI 🔥\n\nCari agen freelance! Tidak perlu pengalaman!\nKerja dari rumah, jam bebas!\nGaji: Rp 300.000/HARI + bonus!\n\nSyarat: WA aktif, hp android, MAU KERJA KERAS\n\nDAFTAR SEKARANG! Biaya registrasi Rp 150.000 (refundable)\nHub WA: 0822-9999-1111\n\nSlot terbatas!! Jangan sampai ketinggalan!!' }
};

export default function ScanFeature() {
    const [scanMode, setScanMode] = useState('link'); // link, text, img
    const [scanState, setScanState] = useState('input'); // input, loading, result
    const [step, setStep] = useState(0); // for loading animation
    const [resultData, setResultData] = useState(scanResults.warn);
    const [barWidth, setBarWidth] = useState('0%');
    const [evIn, setEvIn] = useState([]);
    
    // Inputs
    const [inputLink, setInputLink] = useState('');
    const [inputText, setInputText] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [imgThumb, setImgThumb] = useState('');
    const fileRef = useRef(null);

    const handleImg = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImgFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setImgThumb(ev.target.result);
        reader.readAsDataURL(file);
    };

    const clearImg = () => {
        setImgFile(null);
        setImgThumb('');
        if (fileRef.current) fileRef.current.value = '';
    };

    const fillExample = (key) => {
        const ex = examples[key];
        setScanMode(ex.mode);
        if (ex.mode === 'link') setInputLink(ex.val);
        else setInputText(ex.val);
    };

    const runScan = () => {
        let rType = 'warn';
        const combined = (inputLink + inputText).toLowerCase();
        if (combined.includes('juta/hari') || combined.includes('300.000/hari') || combined.includes('refundable') || combined.includes('biaya registrasi')) {
            rType = 'risk';
        } else if (combined.includes('linkedin') || combined.includes('jobstreet') || combined.includes('.co.id') || combined.includes('@')) {
            rType = 'safe';
        }
        if (scanMode === 'img') rType = 'warn';

        setResultData(scanResults[rType]);
        setScanState('loading');
        setStep(0);
        setBarWidth('0%');
        setEvIn([]);

        // simulate steps
        setTimeout(() => setStep(1), 300);
        setTimeout(() => setStep(2), 1200);
        setTimeout(() => setStep(3), 2100);
        setTimeout(() => setStep(4), 3000);
        setTimeout(() => setStep(5), 3700);

        setTimeout(() => {
            setScanState('result');
            setTimeout(() => setBarWidth(scanResults[rType].fillPct), 300);
            scanResults[rType].evidence.forEach((_, i) => {
                setTimeout(() => {
                    setEvIn(prev => [...prev, i]);
                }, 500 + (120 * i));
            });
        }, 4300);
    };

    const resetScan = () => {
        setScanState('input');
        setInputLink('');
        setInputText('');
        clearImg();
        setStep(0);
        setBarWidth('0%');
        setEvIn([]);
        setTimeout(() => {
            document.getElementById('scan')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <section className="scan-section" id="scan">
            <div className="scan-inner">
                <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 52px' }}>
                    <div className="eyebrow rv">Scan Lowongan</div>
                    <h2 className="sec-h rv">Tempel lowongannya,<br/><em>kita cek bareng.</em></h2>
                    <p className="sec-p rv" style={{ margin: '0 auto' }}>Link, teks, atau foto dari WhatsApp — semua bisa. Kami baca sinyalnya, kamu yang putuskan.</p>
                </div>

                {scanState === 'input' && (
                    <div id="scanInputState">
                        <div className="scan-box rv">
                            <div className="scan-tabs">
                                <button className={`scan-tab ${scanMode === 'link' ? 'on' : ''}`} onClick={() => setScanMode('link')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><LinkIcon size={14}/> Link</button>
                                <button className={`scan-tab ${scanMode === 'text' ? 'on' : ''}`} onClick={() => setScanMode('text')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Clipboard size={14}/> Teks</button>
                                <button className={`scan-tab ${scanMode === 'img' ? 'on' : ''}`} onClick={() => setScanMode('img')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><ImageIcon size={14}/> Foto <span className="new-pill">BARU</span></button>
                            </div>

                            {scanMode === 'link' && (
                                <div className="scan-panel-d on">
                                    <div className="scan-textarea-wrap">
                                        <textarea className="scan-ta" value={inputLink} onChange={e => setInputLink(e.target.value)} placeholder="Tempel link lowongan di sini…&#10;(LinkedIn, Jobstreet, Glints, Kalibrr, dll)" />
                                    </div>
                                </div>
                            )}

                            {scanMode === 'text' && (
                                <div className="scan-panel-d on">
                                    <div className="scan-textarea-wrap">
                                        <textarea className="scan-ta" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Copy-paste teks lengkap lowongannya di sini…&#10;&#10;Contoh: 'Dibutuhkan Marketing Intern, gaji 3-4 jt, hubungi WA 0812...'" />
                                    </div>
                                </div>
                            )}

                            {scanMode === 'img' && (
                                <div className="scan-panel-d on">
                                    <div style={{ padding: '12px 16px 0', fontSize: '11.5px', color: 'rgba(255,255,255,.3)', lineHeight: '1.6' }}>
                                        💡 Kami analisis visual berdasarkan pola nyata dari foto yang kamu upload — bukan "AI deteksi" biasa.
                                    </div>
                                    {!imgFile ? (
                                        <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                                            <input type="file" ref={fileRef} accept="image/*" style={{ display: 'none' }} onChange={handleImg} />
                                            <div className="uz-icon" style={{ display: 'flex', justifyContent: 'center' }}><Camera size={32} color="var(--ink3)" /></div>
                                            <div className="uz-text">Seret foto ke sini, atau klik untuk upload</div>
                                            <div className="uz-sub">Screenshot WhatsApp, poster lowongan, foto flyer · JPG / PNG / WEBP</div>
                                            <div className="uz-btn">Pilih File</div>
                                        </div>
                                    ) : (
                                        <div className="upload-preview show">
                                            <img className="up-thumb" src={imgThumb} alt="thumbnail" />
                                            <div className="up-info">
                                                <div className="up-name">{imgFile.name}</div>
                                                <div className="up-size">{(imgFile.size / 1024).toFixed(0)} KB · Siap dianalisis</div>
                                            </div>
                                            <button className="up-rm" onClick={clearImg}>✕</button>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="scan-footer">
                                <div className="scan-meta">
                                    <span className="scan-pill"><span className="scan-pill-dot"></span>Data tidak disimpan</span>
                                    <span className="scan-pill"><span className="scan-pill-dot"></span>Gratis selamanya</span>
                                </div>
                                <button className="scan-submit" onClick={runScan}>
                                    <span>Scan Sekarang</span>
                                    <span style={{ fontSize: '16px' }}>→</span>
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }} className="rv">
                            <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,.28)', fontWeight: '500', paddingTop: '6px' }}>Coba contoh:</span>
                            <button className="ex-btn" onClick={() => fillExample('link')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><LinkIcon size={12}/> Link Jobstreet</button>
                            <button className="ex-btn" onClick={() => fillExample('text')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Clipboard size={12}/> Teks WhatsApp</button>
                            <button className="ex-btn" onClick={() => fillExample('text2')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={12}/> Lowongan Mencurigakan</button>
                        </div>
                    </div>
                )}

                {scanState === 'loading' && (
                    <div className="scan-loading on">
                        <div className="orbit-wrap" style={{ position: 'relative' }}>
                            <div className="o-ring"></div>
                            <div className="o-ring o-ring2"></div>
                            <div className="o-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', left: '16px', top: '16px', position: 'absolute' }}>{scanMode === 'img' ? <ImageIcon size={28} color="white"/> : <Search size={28} color="white" />}</div>
                        </div>
                        <div className="loading-steps">
                            <div className={`l-step ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`}><span className="l-step-icon"><BookOpen size={16}/></span><span>{scanMode === 'img' ? 'Membaca gambar yang kamu upload…' : 'Membaca informasi dari input kamu…'}</span><span className="l-step-dot"></span></div>
                            <div className={`l-step ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}><span className="l-step-icon"><Search size={16}/></span><span>Memeriksa pola bahasa dan frasa…</span><span className="l-step-dot"></span></div>
                            <div className={`l-step ${step === 3 ? 'active' : step > 3 ? 'done' : ''}`}><span className="l-step-icon"><Building size={16}/></span><span>Mencari info kontak dan perusahaan…</span><span className="l-step-dot"></span></div>
                            <div className={`l-step ${step === 4 ? 'active' : step > 4 ? 'done' : ''}`}><span className="l-step-icon"><Scale size={16}/></span><span>Menimbang semua indikator…</span><span className="l-step-dot"></span></div>
                        </div>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.25)', marginTop: '20px', fontStyle: 'italic' }}>Sebentar ya, lagi dicek dengan teliti…</p>
                    </div>
                )}

                {scanState === 'result' && (
                    <div className="scan-result on" style={{ display: 'block' }}>
                        <div className={`result-banner ${resultData.verdict}`}>
                            <div className="rb-top">
                                <div>
                                    <div className={`rb-verdict ${resultData.verdict}`}><span className="rb-v-dot"></span><span>{resultData.verdictText}</span></div>
                                </div>
                                <div className="rb-score-wrap">
                                    <div className={`rb-score ${resultData.verdict}`}>{resultData.score}</div>
                                    <div className="rb-score-lbl">dari 100</div>
                                </div>
                            </div>
                            <div className="rb-title">{resultData.title}</div>
                            <div className="rb-desc">{resultData.desc}</div>
                            <div className="rb-bar-wrap">
                                <div className="rb-bar-row">
                                    <span className="rb-bar-lbl">Indikator kepercayaan</span>
                                    <div className="rb-track"><div className={`rb-fill ${resultData.verdict}`} style={{ width: barWidth }}></div></div>
                                    <span className="rb-val">{resultData.fillPct}</span>
                                </div>
                            </div>
                        </div>

                        <div className="ev-section-title">Yang kami temukan</div>
                        <div className="ev-list">
                            {resultData.evidence.map((ev, i) => (
                                <div key={i} className={`ev-item ${ev.type} ${evIn.includes(i) ? 'in' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                                    <div className="ev-icon-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ev.icon}</div>
                                    <div className="ev-content">
                                        <div className="ev-title">{ev.title}</div>
                                        <div className="ev-desc">{ev.desc}</div>
                                        <span className="ev-src" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MapPin size={10} /> {ev.src}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="result-actions">
                            <button className="result-reset" onClick={resetScan}>← Scan lowongan lain</button>
                            <button className="result-salary-cta" onClick={() => document.getElementById('gaji')?.scrollIntoView({behavior: 'smooth'})} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Briefcase size={16}/> Cek posisi tawar gajimu</button>
                        </div>
                        <div className="result-disclaimer">
                            Hasil analisis bersifat indikatif berdasarkan pola yang kami kenali. Bukan jaminan. Selalu gunakan pertimbanganmu sendiri.
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
