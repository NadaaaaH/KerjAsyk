import { motion } from "framer-motion";
import { Youtube, Instagram } from "lucide-react";

const quickLinks = [
  { label: "Scan Loker", href: "/#scan-loker" },
  { label: "Cek Gaji", href: "/#cek-gaji" },
  { label: "Deteksi Gambar", href: "/#scan-loker" },
  { label: "Cara Kerja", href: "/cara-kerja" },
  { label: "Tentang Kami", href: "/tentang" },
];

const team = [
  {
    name: "Nada Haifa Nurfadhillah",
    role: "Project Leader & Front End Dev",
    initial: "NH",
    avatarColors: ["hsl(217,91%,60%)", "hsl(217,91%,40%)"],
  },
  {
    name: "Nurafia Avanza",
    role: "UI Designer & Front End Dev",
    initial: "NA",
    avatarColors: ["hsl(160,65%,45%)", "hsl(160,65%,32%)"],
  },
];

// iOS-style SVG avatar generator
const IosAvatar = ({ colors, initial, size = 40 }) => {
  const gradId = `grad-${initial}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      {/* Base shape — rounded rect like iOS app icon */}
      <rect width="40" height="40" rx="13" fill={`url(#${gradId})`} />
      {/* Gloss highlight */}
      <ellipse cx="17" cy="11" rx="11" ry="6.5" fill="rgba(255,255,255,0.22)" />
      {/* Bottom subtle shadow */}
      <rect x="0" y="26" width="40" height="14" rx="0" fill="rgba(0,0,0,0.12)" />
      {/* Initial text */}
      <text
        x="20"
        y="26.5"
        textAnchor="middle"
        fontFamily="'Poppins', 'SF Pro Rounded', sans-serif"
        fontSize="13"
        fontWeight="800"
        fill="white"
        letterSpacing="-0.5"
      >
        {initial}
      </text>
    </svg>
  );
};

// X (formerly Twitter) icon
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// TikTok icon
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

const socials = [
  { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "#FF0000" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "#E1306C" },
  { icon: XIcon, href: "https://x.com", label: "X", color: "#e2e8f0" },
  { icon: TikTokIcon, href: "https://tiktok.com", label: "TikTok", color: "#69C9D0" },
];

const Footer = () => {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(220 25% 14%) 0%, hsl(222 30% 10%) 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Poppins', sans-serif",
      }}
    >
      {/* Top prismatic accent line */}
      <div
        className="w-full"
        style={{ height: 2, background: "linear-gradient(90deg, transparent 0%, hsl(217,91%,50%) 30%, hsl(217,91%,65%) 70%, transparent 100%)", opacity: 0.5 }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute pointer-events-none" style={{ width: 500, height: 400, top: -120, left: "5%", background: "radial-gradient(circle, hsl(217 91% 50% / 0.1), transparent 65%)", borderRadius: "50%" }} />
      <div className="absolute pointer-events-none" style={{ width: 360, height: 360, top: -40, right: "8%", background: "radial-gradient(circle, hsl(217 91% 50% / 0.07), transparent 65%)", borderRadius: "50%" }} />
      <div className="absolute pointer-events-none" style={{ width: 300, height: 300, bottom: 0, left: "45%", background: "radial-gradient(circle, hsl(160 65% 40% / 0.06), transparent 65%)", borderRadius: "50%" }} />

      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8">

        {/* ─── Main Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">

          {/* Brand */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/KerjaAsyik.png"
                alt="KerjaSyik"
                className="w-9 h-9 object-contain flex-shrink-0"
                style={{ filter: "drop-shadow(0 0 8px hsl(217 91% 50% / 0.3))" }}
              />
              <span
                className="font-extrabold text-white text-xl"
                style={{ letterSpacing: "-0.4px" }}
              >
                KerjaSyik
              </span>
            </div>

            <p
              className="text-sm leading-loose mb-7"
              style={{ color: "rgba(255,255,255,0.4)", maxWidth: 310 }}
            >
              Platform gratis yang membantu pencari kerja Indonesia mendeteksi lowongan palsu
              dan mendapatkan estimasi gaji yang realistis. Kami hadir agar kamu bisa mencari
              kerja dengan aman dan percaya diri.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.42)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                  whileHover={{
                    background: `${s.color}22`,
                    color: s.color,
                    borderColor: `${s.color}44`,
                    y: -3,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.18 }}
                >
                  <s.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="md:col-span-3 md:col-start-7"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-xs font-bold uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.17em" }}
            >
              Fitur & Halaman
            </p>
            <div className="flex flex-col gap-3.5">
              {quickLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-sm no-underline w-fit relative"
                  style={{ color: "rgba(255,255,255,0.36)" }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  whileHover={{ color: "hsl(217,91%,70%)", x: 6 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Team + Legal */}
          <motion.div
            className="md:col-span-4 md:col-start-10"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-xs font-bold uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.17em" }}
            >
              Tim Kami
            </p>

            <div className="flex flex-col gap-4 mb-9">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* iOS-style avatar */}
                  <div
                    className="flex-shrink-0"
                    style={{
                      borderRadius: 13,
                      overflow: "hidden",
                      boxShadow: `0 4px 18px ${member.avatarColors[0]}50`,
                      outline: `1.5px solid ${member.avatarColors[0]}30`,
                    }}
                  >
                    <IosAvatar colors={member.avatarColors} initial={member.initial} size={42} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.35 }}
                    >
                      {member.name}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(255,255,255,0.32)" }}
                    >
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Legal */}
            <div>
              <p
                className="text-xs font-bold uppercase mb-3"
                style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.17em" }}
              >
                Legal
              </p>
              <div className="flex flex-col gap-2">
                {["Kebijakan Privasi", "Syarat Penggunaan"].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="text-sm no-underline w-fit"
                    style={{ color: "rgba(255,255,255,0.32)" }}
                    whileHover={{ color: "hsl(217,91%,70%)", x: 4 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Divider ─── */}
        <div
          className="w-full mb-8"
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent 0%, hsl(217 91% 50% / 0.3) 30%, hsl(217 91% 60% / 0.3) 70%, transparent 100%)",
          }}
        />

        {/* ─── Bottom bar ─── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2026 KerjaSyik. Dibuat dengan niat baik untuk pencari kerja Indonesia.
          </p>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "#10b981",
                boxShadow: "0 0 7px #10b981",
                animation: "pulse 2s infinite",
              }}
            />
            <p className="text-xs font-medium" style={{ color: "rgba(16,185,129,0.82)" }}>
              Semua fitur gratis, tanpa iklan
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;