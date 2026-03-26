import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Upload, ScanSearch, ShieldCheck, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: Upload, label: "Upload Loker", desc: "Tempel link atau screenshot lowongan" },
  { icon: ScanSearch, label: "Scan Otomatis", desc: "AI menganalisis pola penipuan" },
  { icon: ShieldCheck, label: "Verifikasi", desc: "Cek database perusahaan resmi" },
  { icon: CheckCircle2, label: "Hasil Aman", desc: "Loker terverifikasi, siap lamar!" },
];

const SceneDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const dashRotateX = useTransform(smoothScroll, [0.15, 0.5], [14, 0]);
  const dashRotateY = useTransform(smoothScroll, [0.15, 0.5], [-8, 0]);
  const dashScale = useTransform(smoothScroll, [0.15, 0.5], [0.88, 1]);
  const dashY = useTransform(smoothScroll, [0.1, 0.5], [60, 0]);

  return (
    <section ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "130vh" }}>
      <div className="absolute inset-0 z-0 hope-gradient" />
      <div className="absolute inset-0 z-0 grid-pattern" />
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 50% 40%, hsl(217 91% 50% / 0.06), transparent 60%)",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-display text-foreground mb-4">
            Semudah <span className="text-primary">empat langkah.</span>
          </h2>
          <p className="text-body-scene text-muted-foreground mx-auto">
            Dari curiga jadi yakin, dalam hitungan detik.
          </p>
        </motion.div>

        {/* 3D Dashboard */}
        <motion.div
          className="glass-elevated rounded-[32px] p-8 md:p-12 mx-auto"
          style={{
            rotateX: dashRotateX,
            rotateY: dashRotateY,
            scale: dashScale,
            y: dashY,
            transformStyle: "preserve-3d",
            perspective: "1400px",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Mac-style top bar */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
            <div className="flex-1" />
            <div className="glass-surface rounded-full px-4 py-1 text-xs text-muted-foreground/60">kerjasyik.com/scan</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative flex flex-col items-center text-center gap-3 p-5 rounded-2xl"
                style={{ background: "hsl(var(--secondary) / 0.5)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.15 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: i === 3
                      ? "linear-gradient(135deg, hsl(var(--accent-mint)), hsl(160 65% 55%))"
                      : "linear-gradient(135deg, hsl(var(--primary)), hsl(217 91% 62%))",
                    boxShadow: i === 0 ? "0 8px 24px hsl(var(--primary) / 0.3)" : undefined,
                  }}
                  whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                >
                  <step.icon className="w-6 h-6 text-white" />
                </motion.div>
                <p className="font-semibold text-foreground text-sm">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-primary/20" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-8 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--secondary))" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent-mint)))" }}
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SceneDashboard;
