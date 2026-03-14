import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link className="nav-cta" to="/scan">🔍 &nbsp;Scan Sekarang</Link>
        </nav>
    );
}
