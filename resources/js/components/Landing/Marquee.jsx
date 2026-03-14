import React from 'react';

const companies = [
  {n:'PT Maju Bersama',v:'Perlu Hati-hati',c:'w'},
  {n:'Tokopedia',v:'Aman',c:'s'},
  {n:'CV Digital Nusa',v:'Aman',c:'s'},
  {n:'PT Sukses Cepat',v:'Risiko Tinggi',c:'r'},
  {n:'Gojek',v:'Aman',c:'s'},
  {n:'Startup Bersama',v:'Aman',c:'s'},
  {n:'MLM Maju Jaya',v:'Risiko Tinggi',c:'r'},
  {n:'PT Karya Muda',v:'Aman',c:'s'},
  {n:'CV Jasa Terpadu',v:'Perlu Hati-hati',c:'w'},
  {n:'PT Inovasi Hijau',v:'Aman',c:'s'},
  {n:'Bukalapak',v:'Aman',c:'s'},
  {n:'PT Rekrutmen Cepat',v:'Perlu Hati-hati',c:'w'},
];

const cMap = { s: 'mb-s', w: 'mb-w', r: 'mb-r' };
// Duplicate the list so it scrolls seamlessly
const items = [...companies, ...companies];

export default function Marquee() {
    return (
        <div className="marquee-wrap">
            <div className="m-label">Baru-baru ini dicek pengguna</div>
            <div style={{ overflow: 'hidden' }}>
                <div className="m-track" id="mTrack">
                    {items.map((c, idx) => (
                        <div className="m-item" key={idx}>
                            <div className="m-sep"></div>
                            {c.n}
                            <span className={`m-badge ${cMap[c.c]}`}>{c.v}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
