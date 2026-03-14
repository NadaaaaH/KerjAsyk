import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage, ScanPage, CompanyPage, SalaryPage } from './Pages';

export default function Landing() {
    const location = useLocation();

    useEffect(() => {
        // Scroll reveal logic
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });
        
        const initDOM = () => {
            document.querySelectorAll('.rv').forEach(el => obs.observe(el));
            window.scrollTo(0, 0);
        };

        // Wait a small tick so children render after route change
        const timeoutId = setTimeout(initDOM, 300);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [location.pathname]); // Re-run effect on route change

    return (
        <div className="bg-dots-container relative">
            <div className="bg-dots"></div>
            <div className="orb o1"></div>
            <div className="orb o2"></div>
            <div className="orb o3"></div>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/scan" element={<ScanPage />} />
                <Route path="/perusahaan" element={<CompanyPage />} />
                <Route path="/gaji" element={<SalaryPage />} />
            </Routes>
        </div>
    );
}
