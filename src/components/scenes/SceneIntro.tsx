import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Model3D from "@/components/Model3D";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePageReady } from "@/App";
import { useTheme } from "@/hooks/useTheme";

const floatingCards = [
  { text: "Gaji 20jt/minggu", x: 8, y: 20, delay: 0 },
  { text: "Tanpa Interview", x: 70, y: 12, delay: 0.5 },
  { text: "Kerja dari rumah 50jt", x: 12, y: 55, delay: 1 },
  { text: "Bonus langsung cair", x: 74, y: 50, delay: 1.5 },
  { text: "Gaji harian 5jt", x: 46, y: 6, delay: 0.8 },
  { text: "Modal kecil untung besar", x: 60, y: 66, delay: 1.2 },
  { text: "Lowongan VIP eksklusif", x: 20, y: 74, delay: 0.3 },
  { text: "Langsung diterima!", x: 80, y: 36, delay: 0.7 },
  { text: "WFH gaji dollar", x: 36, y: 40, delay: 0.4 },
  { text: "Tanpa ijazah 15jt", x: 54, y: 80, delay: 1.1 },
];
const chatBubbles = [
  { text: "Kak mau kerja?", x: 6, y: 33, delay: 0.6 },
  { text: "Slot terbatas!", x: 83, y: 23, delay: 1.3 },
  { text: "DM aku ya kak", x: 16, y: 66, delay: 0.9 },
];

const FloatingCard = ({
  card, index, smoothX, smoothY, isMobile,
}: {
  card: typeof floatingCards[0];
  index: number;
  smoothX: any;
  smoothY: any;
  isMobile: boolean;
}) => {
  const x = useTransform(smoothX, (v: number) => isMobile ? 0 : v * (6 + index * 1.5));
  const y = useTransform(smoothY, (v: number) => isMobile ? 0 : v * (6 + index * 1.5));
  return (
    <motion.div
      className="absolute glass-surface rounded-2xl px-4 py-2.5 text-xs font-medium select-none"
      style={{ left: `${card.x}%`, top: `${card.y}%`, color: "hsl(var(--muted-foreground))", x, y }}
      animate={{ y: [0, -10 - index * 1.5, 0], rotate: [0, index % 2 === 0 ? 1.2 : -1.2, 0] }}
      transition={{ duration: 6 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
    >
      {card.text}
    </motion.div>
  );
};

const MascotWithParallax = ({
  smoothX, smoothY, isMobile, pageReady,
}: {
  smoothX: any;
  smoothY: any;
  isMobile: boolean;
  pageReady: boolean;
}) => {
  const x = useTransform(smoothX, (v: number) => isMobile ? 0 : v * -12);
  const y = useTransform(smoothY, (v: number) => isMobile ? 0 : v * -8);
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={pageReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{ x, y }}
    >
      <Model3D width={isMobile ? "280px" : "400px"} height={isMobile ? "280px" : "400px"} />
    </motion.div>
  );
};

const SceneIntro = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const pageReady = usePageReady();
  const { isDark } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const fgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-28%"]);
  const zoom = useTransform(scrollYProgress, [0, 0.8], [1, 1.06]);

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
    <section ref={ref} className="scene-container flex items-center justify-center" style={{ minHeight: "140vh" }}>
      {/* Background — pakai CSS variable gradient */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: zoom }}>
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 30%, hsl(217 91% 50% / 0.08) 0%, transparent 65%)",
        }} />
        <motion.div className="absolute rounded-full"
          style={{
            width: 500, height: 500, top: "-10%", right: "-10%",
            background: "radial-gradient(circle, hsl(217 91% 70% / 0.12), transparent 70%)"
          }}
          animate={{ scale: [1, 1.08, 1], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div className="absolute rounded-full"
          style={{
            width: 400, height: 400, bottom: "5%", left: "-8%",
            background: "radial-gradient(circle, hsl(160 65% 40% / 0.08), transparent 70%)"
          }}
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* Floating cards */}
      <motion.div className="absolute inset-0 z-10 pointer-events-none" style={{ y: midY }}>
        {floatingCards.map((card, i) => (
          <FloatingCard key={i} card={card} index={i} smoothX={smoothX} smoothY={smoothY} isMobile={isMobile} />
        ))}
        {chatBubbles.map((bubble, i) => (
          <motion.div key={`chat-${i}`}
            className="absolute glass-surface rounded-full px-4 py-2 text-xs font-medium select-none"
            style={{ left: `${bubble.x}%`, top: `${bubble.y}%`, color: "hsl(var(--accent-mint))" }}
            animate={{ y: [0, -7, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: bubble.delay }}
          >
            💬 {bubble.text}
          </motion.div>
        ))}
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-6 px-6"
        style={{ scale: fgScale, y: fgY }}
      >
        <motion.div style={{ opacity: textOpacity, y: textY }} className="text-center">
          <motion.p
            className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-primary"
            initial={{ opacity: 0, y: 40 }}
            animate={pageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0 }}
          >
            KerjaSyik
          </motion.p>
          <motion.h1
            className="text-display text-foreground mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={pageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Cari kerja tak seharusnya
            <br />
            <span className="text-primary">jadi teka-teki.</span>
          </motion.h1>
          <motion.p
            className="text-body-scene text-muted-foreground mx-auto mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={pageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            Deteksi penipuan. Bandingkan gaji. Melangkah pasti.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={pageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.a
              href="#scan-loker"
              className="relative px-8 py-4 rounded-full text-base font-semibold text-white overflow-hidden cursor-pointer inline-block"
              data-hover
              style={{
                background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(217 91% 42%))",
                boxShadow: "0 4px 24px hsl(217 91% 50% / 0.3)",
              }}
              whileHover={{ y: -3, boxShadow: "0 12px 40px hsl(217 91% 50% / 0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative z-10">Mulai Scan Loker →</span>
            </motion.a>
            {/* ← Fix: ganti "white" ke CSS variable */}
            <motion.a
              href="#cek-gaji"
              className="px-8 py-4 rounded-full text-base font-semibold cursor-pointer inline-block"
              data-hover
              style={{
                background: isDark ? "hsl(222 25% 14%)" : "white",
                color: "hsl(var(--primary))",
                border: "1.5px solid hsl(217 91% 50% / 0.2)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
              whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              Cek Gaji Kamu
            </motion.a>
          </motion.div>
        </motion.div>

        <MascotWithParallax smoothX={smoothX} smoothY={smoothY} isMobile={isMobile} pageReady={pageReady} />

        <motion.div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={pageReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium text-muted-foreground/60">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-primary/20 flex items-start justify-center p-1">
              <motion.div
                className="w-1 h-1 rounded-full bg-primary/60"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
export default SceneIntro;