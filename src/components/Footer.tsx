import { motion } from "framer-motion";
import { Youtube, Instagram, Twitter } from "lucide-react";

const quickLinks = [
  { label: "Scan Loker", href: "/#scan-loker" },
  { label: "Cek Gaji", href: "/#cek-gaji" },
  { label: "Deteksi Gambar", href: "/#scan-loker" },
  { label: "Cara Kerja", href: "/cara-kerja" },
  { label: "Tentang Kami", href: "/tentang" },
];

const team = [
  { name: "Nuraf", role: "Founder & Developer" },
  { name: "Tim KerjaSyik", role: "Design & Research" },
];

const socials = [
  { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "#FF0000" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "#E1306C" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter / X", color: "#1DA1F2" },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
    href: "https://tiktok.com",
    label: "TikTok",
    color: "#010101",
  },
];

const Footer = () => {
  return (
    <footer
      className="relative w-full overflow-hidden pt-20 pb-8 px-6"
      style={{
        background: "linear-gradient(180deg, hsl(220 25% 14%) 0%, hsl(222 30% 10%) 100%)",
        borderTop: "none",
        marginTop: "-2px",
      }}
    >
      {/* Dot pattern gelap */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(217 91% 50% / 0.08), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Kolom 1: Brand + deskripsi */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
             <img src="public/KerjaAsyik.png" alt="KerjaSyik" className="w-8 h-8 rounded-xl object-cover" />
              <span className="font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                KerjaSyik
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              KerjaSyik adalah platform gratis yang membantu pencari kerja Indonesia mendeteksi lowongan palsu dan mendapatkan estimasi gaji yang realistis. Kami hadir agar kamu bisa mencari kerja dengan aman dan percaya diri.
            </p>

            {/* Sosial media */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center no-underline"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                  whileHover={{ background: s.color, color: "white", y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <s.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Kolom 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="text-xs font-bold tracking-[0.15em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Poppins', sans-serif" }}
            >
              Fitur & Halaman
            </p>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  data-hover
                  className="text-sm no-underline w-fit flex items-center gap-2 group"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  whileHover={{ color: "hsl(217 91% 70%)", x: 3 }}
                  transition={{ duration: 0.15 }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "hsl(217 91% 60%)" }}
                  />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Kolom 3: Tim */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="text-xs font-bold tracking-[0.15em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Poppins', sans-serif" }}
            >
              Tim Kami
            </p>
            <div className="flex flex-col gap-4">
              {team.map((member, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{
                      background: i === 0
                        ? "linear-gradient(135deg, hsl(217 91% 50%), hsl(217 91% 40%))"
                        : "linear-gradient(135deg, hsl(160 65% 40%), hsl(160 65% 32%))",
                    }}
                  >
                    {member.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{member.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Legal */}
            <div className="mt-8 flex flex-col gap-2">
              <p
                className="text-xs font-bold tracking-[0.15em] uppercase mb-1"
                style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Poppins', sans-serif" }}
              >
                Legal
              </p>
              <motion.a href="#" data-hover
                className="text-sm no-underline w-fit"
                style={{ color: "rgba(255,255,255,0.45)" }}
                whileHover={{ color: "hsl(217 91% 70%)", x: 3 }}
                transition={{ duration: 0.15 }}
              >
                Kebijakan Privasi
              </motion.a>
              <motion.a href="#" data-hover
                className="text-sm no-underline w-fit"
                style={{ color: "rgba(255,255,255,0.45)" }}
                whileHover={{ color: "hsl(217 91% 70%)", x: 3 }}
                transition={{ duration: 0.15 }}
              >
                Syarat Penggunaan
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* Bottom */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © 2026 KerjaSyik. Dibuat dengan niat baik untuk pencari kerja Indonesia.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(160 65% 45%)" }} />
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Semua fitur gratis, tanpa iklan</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;