import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Marquee from './Marquee';
import Steps from './Steps';
import WhyUs from './WhyUs';
import Testimonials from './Testimonials';
import Footer from './Footer';
import ScanFeature from './ScanFeature';
import CompanyProfile from './CompanyProfile';
import SalaryFeature from './SalaryFeature';

function PageLayout({ children }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

export function HomePage() {
    return (
        <PageLayout>
            <Hero />
            <Marquee />
            <Steps />
            <WhyUs />
            <Testimonials />
        </PageLayout>
    );
}

export function ScanPage() {
    return (
        <PageLayout>
            <div style={{ paddingTop: '80px' }}>
                <ScanFeature />
            </div>
        </PageLayout>
    );
}

export function CompanyPage() {
    return (
        <PageLayout>
            <div style={{ paddingTop: '80px' }}>
                <CompanyProfile />
            </div>
        </PageLayout>
    );
}

export function SalaryPage() {
    return (
        <PageLayout>
            <div style={{ paddingTop: '80px' }}>
                <SalaryFeature />
            </div>
        </PageLayout>
    );
}
