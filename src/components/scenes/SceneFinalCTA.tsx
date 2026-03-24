import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScanSearch, TrendingUp, Image, ArrowRight } from "lucide-react";
import MascotGuide from "@/components/MascotGuide";

const ctaLinks = [
  { icon: ScanSearch, label: "Scan Lowongan", desc: "Cek loker langsung", href: "#scan-loker", color: "hsl(var(--primary))", bg: "hsl(var(--primary) / 0.08)" },
  { icon: TrendingUp, label: "Cek Gaji", desc: "Estimasi gaji realistis", href: "#cek-gaji", color: "hsl(var(--accent-mint))", bg: "hsl(var(--accent-mint) / 0.08)" },
  { icon: Image, label: "Scan Screenshot", desc: "Upload gambar loker", href: "#scan-loker", color: "hsl(var(--accent-yellow))", bg: "hsl(var(--accent-yellow) / 0.08)" },
];

const SceneFinalCTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 15 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mascotScale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const mascotX = useTransform(smoothX, (v) => v * 14);
  const mascotY = useTransform(smoothY, (v) => v * 10);

  useEffect(() => {
    if (isMobile) return;
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [isMobile, mouseX, mouseY]);

  return (
    <section ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "110vh" }}>
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, hsl(210 80% 97%) 0%, hsl(214 90% 95%) 50%, hsl(210 80% 97%) 100%)",
        }} />
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 70%, hsl(217 91% 50% / 0.08), transparent 55%)",
        }} />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center w-full">
        {/* Mascot tengah */}
        <motion.div
          style={{
            scale: mascotScale,
            x: isMobile ? 0 : mascotX,
            y: isMobile ? 0 : mascotY,
          }}
          className="mb-4"
        >
          <MascotGuide
            width={isMobile ? "260px" : "380px"}
            height={isMobile ? "260px" : "400px"}
          />
        </motion.div>

        <motion.h2
          className="text-display text-foreground mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Siap melangkah
          <br />
          <span className="text-primary">dengan pasti?</span>
        </motion.h2>

        <motion.p
          className="text-body-scene text-muted-foreground mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          Mulai lindungi karirmu dari penipuan. Gratis, cepat, dan terpercaya.
        </motion.p>

        {/* CTA cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          {ctaLinks.map((cta, i) => (
            <motion.a
              key={i}
              href={cta.href}
              data-hover
              className="glass-surface rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer group no-underline"
              whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: cta.bg }}>
                <cta.icon className="w-6 h-6" style={{ color: cta.color }} />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{cta.label}</p>
                <p className="text-xs text-muted-foreground">{cta.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: cta.color }} />
            </motion.a>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.a
            href="#scan-loker"
            className="relative inline-block px-12 py-5 rounded-full text-lg font-bold text-white overflow-hidden cursor-pointer no-underline"
            data-hover
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(217 91% 42%))",
              boxShadow: "0 8px 40px hsl(var(--primary) / 0.3)",
            }}
            whileHover={{ y: -4, boxShadow: "0 20px 60px hsl(var(--primary) / 0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative z-10">Mulai Sekarang — Gratis</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-20 pt-8 border-t w-full max-w-xl"
          style={{ borderColor: "hsl(var(--border))" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-sm text-muted-foreground font-medium">
            © 2026 KerjaSyik · Deteksi penipuan. Bandingkan gaji. Melangkah pasti.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SceneFinalCTA;