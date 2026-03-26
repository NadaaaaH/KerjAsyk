import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Scan Loker", href: "/scan-loker" },
    { label: "Cek Gaji", href: "/cek-gaji" },
    { label: "Cara Kerja", href: "/cara-kerja" },
    { label: "Tentang", href: "/tentang" },
  ];

  // Warna navbar berdasarkan dark/light + scroll
  const navBg = isDark
    ? scrolled ? "rgba(14, 20, 36, 0.92)" : "rgba(14, 20, 36, 0.6)"
    : scrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.5)";

  const navShadow = isDark
    ? scrolled
      ? "0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(99,158,255,0.08)"
      : "0 2px 12px rgba(0,0,0,0.2), 0 0 0 1px rgba(99,158,255,0.06)"
    : scrolled
      ? "0 4px 24px rgba(30,64,175,0.08), 0 0 0 1px rgba(30,64,175,0.08)"
      : "0 2px 12px rgba(30,64,175,0.04), 0 0 0 1px rgba(30,64,175,0.06)";

  const mobileBg = isDark
    ? "rgba(14, 20, 36, 0.95)"
    : "rgba(255, 255, 255, 0.92)";

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[999] px-4 py-3"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <motion.div
        className="max-w-5xl mx-auto rounded-2xl px-5 py-3 flex items-center justify-between"
        animate={{ background: navBg, boxShadow: navShadow }}
        transition={{ duration: 0.3 }}
        style={{ backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)" }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline" data-hover>
          <img src="/KerjaAsyik.png" alt="KerjaSyik" className="w-7 h-7 rounded-lg object-cover" />
          <span className="font-bold text-sm text-foreground tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
            KerjaSyik
          </span>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                data-hover
                className="px-4 py-2 rounded-xl text-sm font-medium no-underline block transition-all duration-300"
                style={{
                  color: isActive ? "hsl(217 91% 50%)" : "hsl(var(--muted-foreground))",
                  background: isActive
                    ? isDark ? "hsl(217 91% 50% / 0.12)" : "hsl(217 91% 50% / 0.08)"
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side: Toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/scan-loker" data-hover className="no-underline">
            <motion.span
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white inline-block"
              style={{
                background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(217 91% 42%))",
                boxShadow: "0 2px 12px hsl(217 91% 50% / 0.25)",
              }}
              whileHover={{ y: -2, boxShadow: "0 6px 20px hsl(217 91% 50% / 0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              Mulai Gratis →
            </motion.span>
          </Link>
        </div>

        {/* Mobile: Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            data-hover
          >
            <motion.div className="w-5 h-0.5 rounded-full bg-foreground"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} transition={{ duration: 0.2 }} />
            <motion.div className="w-5 h-0.5 rounded-full bg-foreground"
              animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} />
            <motion.div className="w-5 h-0.5 rounded-full bg-foreground"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} transition={{ duration: 0.2 }} />
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden mx-4 mt-2 rounded-2xl overflow-hidden"
        style={{
          background: mobileBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: isDark
            ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,158,255,0.08)"
            : "0 8px 32px rgba(30,64,175,0.1), 0 0 0 1px rgba(30,64,175,0.08)",
        }}
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="p-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium no-underline transition-colors active:scale-95"
                style={{
                  background: isActive
                    ? isDark ? "hsl(217 91% 50% / 0.15)" : "hsl(217 91% 95%)"
                    : isDark ? "hsl(220 20% 16% / 0.6)" : "hsl(214 32% 95% / 0.6)",
                  color: isActive ? "hsl(217 91% 55%)" : "hsl(var(--foreground))",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/scan-loker"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white text-center no-underline"
            style={{ background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(217 91% 42%))" }}
          >
            Mulai Gratis →
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;