import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const suspiciousAreas = [
  { label: "Gaji fantastis", x: 12, y: 22, w: 72, h: 11, delay: 0.3 },
  { label: "Tanpa syarat", x: 8, y: 46, w: 52, h: 10, delay: 0.6 },
  { label: "No resmi?", x: 52, y: 68, w: 38, h: 10, delay: 0.9 },
  { label: "Logo palsu", x: 6, y: 6, w: 28, h: 14, delay: 1.2 },
];

const SceneImageDetect = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const imgScale = useTransform(scrollYProgress, [0.1, 0.4], [0.85, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const imgRotateY = useTransform(scrollYProgress, [0.1, 0.4], [-12, 0]);
  const imgRotateX = useTransform(scrollYProgress, [0.1, 0.4], [8, 0]);

  return (
    <section ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "120vh" }}>
      <div className="absolute inset-0 z-0" style={{
        background: "linear-gradient(180deg, hsl(210 80% 97%) 0%, hsl(214 80% 96%) 50%, hsl(210 80% 97%) 100%)",
      }} />
      <div className="absolute inset-0 z-0 grid-pattern" />
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 60% 40%, hsl(38 95% 50% / 0.06), transparent 50%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "hsl(var(--accent-yellow))" }}>Image Detection</p>
          <h2 className="text-display text-foreground mb-4">
            Screenshot juga <span style={{ color: "hsl(var(--accent-yellow))" }}>bisa discreening.</span>
          </h2>
          <p className="text-body-scene text-muted-foreground mx-auto">
            AI mendeteksi elemen mencurigakan dari gambar lowongan.
          </p>
        </motion.div>

        <motion.div
          className="relative glass-elevated rounded-3xl p-6 md:p-8 mx-auto max-w-lg overflow-hidden"
          style={{
            scale: imgScale,
            opacity: imgOpacity,
            rotateY: imgRotateY,
            rotateX: imgRotateX,
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden" style={{
            background: "linear-gradient(180deg, hsl(var(--secondary)), white)",
          }}>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl" style={{ background: "hsl(var(--primary) / 0.15)" }} />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3 rounded-full w-3/4" style={{ background: "hsl(var(--foreground) / 0.12)" }} />
                  <div className="h-2 rounded-full w-1/2" style={{ background: "hsl(var(--foreground) / 0.08)" }} />
                </div>
              </div>
              <div className="h-3 rounded-full w-full" style={{ background: "hsl(var(--accent-yellow) / 0.15)" }} />
              <div className="h-2 rounded-full w-5/6" style={{ background: "hsl(var(--foreground) / 0.08)" }} />
              <div className="h-2 rounded-full w-4/6" style={{ background: "hsl(var(--foreground) / 0.08)" }} />
              <div className="h-8" />
              <div className="h-3 rounded-full w-3/5" style={{ background: "hsl(var(--danger) / 0.12)" }} />
              <div className="h-2 rounded-full w-2/3" style={{ background: "hsl(var(--foreground) / 0.08)" }} />
            </div>

            {suspiciousAreas.map((area, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${area.x}%`, top: `${area.y}%`, width: `${area.w}%`, height: `${area.h}%` }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: area.delay }}
              >
                <div className="w-full h-full rounded-lg border-2" style={{
                  borderColor: "hsl(var(--danger) / 0.5)",
                  background: "hsl(var(--danger) / 0.06)",
                }} />
                <motion.div
                  className="absolute -top-7 left-0 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap"
                  style={{ background: "hsl(var(--danger))", color: "white" }}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: area.delay + 0.2 }}
                >
                  ⚠ {area.label}
                </motion.div>
              </motion.div>
            ))}

            {/* Scan line */}
            <motion.div
              className="absolute left-0 right-0 h-0.5"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
                boxShadow: "0 0 10px hsl(var(--primary) / 0.3)",
              }}
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SceneImageDetect;
