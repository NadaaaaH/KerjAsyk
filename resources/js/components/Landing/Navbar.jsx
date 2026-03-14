import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Navbar() {
    return (
        <nav>
            <Link to="/" className="nav-brand">
                <div className="brand-pip"></div>KerjaSyik
            </Link>
            <div className="nav-links">
                <Link className="nav-a" to="/">Cara Kerja</Link>
                <Link className="nav-a" to="/scan">Scan Lowongan</Link>
                <Link className="nav-a" to="/perusahaan">Perusahaan</Link>
                <Link className="nav-a" to="/gaji">Info Gaji</Link>
                <Link className="nav-a" to="/">Kenapa Kami</Link>
            </div>
            <Link className="nav-cta" to="/scan" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Search size={16} strokeWidth={2.5} /> Scan Sekarang
            </Link>
        </nav>
    );
}
