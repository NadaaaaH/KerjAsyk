import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";
import MascotGuide from "@/components/MascotGuide";

const tips = [
  { icon: ShieldCheck, text: "Cek nama perusahaan di Google", color: "hsl(var(--accent-mint))" },
  { icon: AlertTriangle, text: "Gaji terlalu tinggi = waspada", color: "hsl(var(--accent-yellow))" },
  { icon: CheckCircle, text: "Minta surat kontrak resmi", color: "hsl(var(--primary))" },
  { icon: ShieldCheck, text: "Jangan transfer uang apapun", color: "hsl(var(--danger))" },
];

const SceneAdvice = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 15 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mascotScale = useTransform(scrollYProgress, [0.1, 0.5], [0.6, 1]);
  const mascotOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const mascotX = useTransform(smoothX, (v) => v * 20);
  const mascotY = useTransform(smoothY, (v) => v * 14);

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
    <section ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "130vh" }}>
      <div className="absolute inset-0 z-0" style={{
        background: "linear-gradient(180deg, hsl(210 80% 97%) 0%, hsl(160 60% 96%) 50%, hsl(210 80% 97%) 100%)",
      }} />
      <div className="absolute inset-0 z-0 dot-pattern" />
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 50% 60%, hsl(160 65% 40% / 0.07), transparent 60%)",
      }} />
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full" style={{
        background: "radial-gradient(circle, hsl(217 91% 50% / 0.06), transparent 70%)",
      }} />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full" style={{
        background: "radial-gradient(circle, hsl(160 65% 40% / 0.06), transparent 70%)",
      }} />

      <motion.div className="relative z-10 max-w-5xl mx-auto px-6 w-full" style={{ y: parallaxY }}>
       <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 min-h-[400px]">

          {/* Kiri: Maskot */}
          <motion.div
  className="flex-shrink-0"
  style={{
    scale: mascotScale,
    opacity: mascotOpacity,
    x: isMobile ? 0 : mascotX,
    y: isMobile ? 0 : mascotY,
  }}
>
  <div style={{ width: isMobile ? "240px" : "320px", height: isMobile ? "240px" : "340px", minWidth: isMobile ? "240px" : "320px", position: "relative" }}>
  {/* Fallback PNG */}
  <img
    src="/src/assets/guide-character.glb"
    alt="mascot"
    style={{
      position: "absolute", inset: 0,
      width: "100%", height: "100%",
      objectFit: "contain",
      filter: "drop-shadow(0 20px 40px hsl(160 65% 40% / 0.2))",
    }}
  />
</div>
</motion.div>

          {/* Kanan: Teks + tips */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <h2 className="text-display text-foreground mb-4">
                Tenang.
                <br />
                <span style={{ color: "hsl(var(--accent-mint))" }}>Ada yang bantu.</span>
              </h2>
              <p className="text-body-scene text-muted-foreground">
                KerjaSyik hadir sebagai pelindungmu dari lowongan palsu.
              </p>
            </motion.div>

            {/* Tips cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tips.map((tip, i) => (
                <motion.div
                  key={i}
                  className="glass-surface rounded-2xl px-4 py-3 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${tip.color}18` }}
                  >
                    <tip.icon className="w-4 h-4" style={{ color: tip.color }} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{tip.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SceneAdvice;