import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, useSpring } from "framer-motion";
import { Briefcase, MapPin, Search, TrendingUp, Loader2, Sparkles, ChevronRight } from "lucide-react";

const barData = [
  { label: "Junior", height: 35, value: "5.5jt" },
  { label: "Mid", height: 55, value: "8.2jt" },
  { label: "Senior", height: 75, value: "12.5jt" },
  { label: "Lead", height: 90, value: "18jt" },
  { label: "Manager", height: 100, value: "25jt" },
];

const salaryEstimates: Record<string, Record<string, number>> = {
  "software engineer": { jakarta: 14000000, bandung: 10000000, surabaya: 11000000, default: 12000000 },
  "data analyst": { jakarta: 11000000, bandung: 8000000, surabaya: 9000000, default: 9500000 },
  "product manager": { jakarta: 18000000, bandung: 13000000, surabaya: 14000000, default: 15000000 },
  "ui/ux designer": { jakarta: 10000000, bandung: 7500000, surabaya: 8000000, default: 8500000 },
  "marketing": { jakarta: 8000000, bandung: 6000000, surabaya: 7000000, default: 7000000 },
};

const quickSuggestions = ["Software Engineer", "Data Analyst", "Product Manager", "UI/UX Designer", "Marketing"];

const SceneSalary = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [jabatan, setJabatan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ min: number; mid: number; max: number; title: string } | null>(null);
  const [activeBar, setActiveBar] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const cardRotateX = useTransform(smoothScroll, [0.1, 0.4], [10, 0]);
  const cardScale = useTransform(smoothScroll, [0.1, 0.4], [0.92, 1]);

  useMotionValueEvent(smoothScroll, "change", (v) => {
    if (result) return;
    const progress = Math.min(Math.max((v - 0.2) / 0.4, 0), 1);
    setDisplayNumber(Math.round(progress * 12500000));
  });

  const formatRupiah = (n: number) => new Intl.NumberFormat("id-ID").format(n);

  const handleCekGaji = () => {
    if (!jabatan) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      const key = Object.keys(salaryEstimates).find(k => jabatan.toLowerCase().includes(k)) || "software engineer";
      const locKey = lokasi.toLowerCase().replace(/\s/g, "") || "default";
      const base = salaryEstimates[key][locKey] || salaryEstimates[key].default;
      setResult({ min: Math.round(base * 0.75), mid: base, max: Math.round(base * 1.4), title: jabatan });
      setDisplayNumber(base);
    }, 1800);
  };

  const salaryLevel = result
    ? result.mid < 8000000 ? { label: "Entry Level", color: "hsl(var(--accent-yellow))", pct: 30 }
    : result.mid < 14000000 ? { label: "Mid Level", color: "hsl(var(--accent-mint))", pct: 60 }
    : { label: "Senior Level", color: "hsl(var(--primary))", pct: 90 }
    : null;

  return (
    <section id="cek-gaji" ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "140vh" }}>
      {/* Background */}
      <div className="absolute inset-0 z-0 hope-gradient" />
      <div className="absolute inset-0 z-0 dot-pattern" />
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, hsl(160 65% 40% / 0.07), transparent 60%)",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "hsl(var(--accent-mint))" }}>Salary Insight</p>
          <h2 className="text-display text-foreground mb-4">
            Tahu dulu <span style={{ color: "hsl(var(--accent-mint))" }}>harga dirimu.</span>
          </h2>
          <p className="text-body-scene text-muted-foreground mx-auto mb-12">
            Isi jabatan dan lokasi, kami estimasi rentang gaji realistisnya.
          </p>
        </motion.div>

        {/* Salary counter */}
        <motion.div className="mb-8" style={{ rotateX: cardRotateX, perspective: "1000px" }}>
          <div className="text-5xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-foreground leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>
            <span className="text-2xl md:text-4xl font-bold text-muted-foreground align-top">Rp</span>
            {" "}{formatRupiah(displayNumber)}
          </div>
          <AnimatePresence>
            {result && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground mt-3 font-medium"
              >
                Estimasi gaji <strong className="text-foreground">{result.title}</strong>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bar chart */}
        <AnimatePresence>
          {!result && (
            <motion.div
              exit={{ opacity: 0, y: -10 }}
              className="flex items-end justify-center gap-3 md:gap-8 h-40 mb-12"
              style={{ scale: cardScale }}
            >
              {barData.map((bar, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onHoverStart={() => setActiveBar(i)}
                  onHoverEnd={() => setActiveBar(null)}
                >
                  <motion.span
                    className="text-xs font-medium"
                    animate={{ color: activeBar === i ? "hsl(var(--accent-mint))" : "hsl(var(--muted-foreground))" }}
                  >
                    {bar.value}
                  </motion.span>
                  <motion.div
                    className="w-8 md:w-14 rounded-t-xl relative overflow-hidden"
                    style={{
                      background: i === 2
                        ? "linear-gradient(180deg, hsl(var(--accent-mint)), hsl(160 65% 55%))"
                        : "hsl(var(--primary) / 0.12)"
                    }}
                    animate={{
                      scale: activeBar === i ? 1.08 : 1,
                      background: activeBar === i && i !== 2
                        ? "hsl(var(--primary) / 0.25)"
                        : i === 2
                        ? "linear-gradient(180deg, hsl(var(--accent-mint)), hsl(160 65% 55%))"
                        : "hsl(var(--primary) / 0.12)"
                    }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${bar.height * 1.4}px` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.1 }}
                  />
                  <span className="text-xs text-muted-foreground font-medium">{bar.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result panel */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 max-w-2xl mx-auto"
            >
              {/* Range cards */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Minimum", val: result.min, color: "hsl(var(--muted-foreground))", bg: "hsl(var(--secondary))" },
                  { label: "Median", val: result.mid, color: "hsl(var(--accent-mint))", bg: "hsl(var(--accent-mint) / 0.08)" },
                  { label: "Maksimum", val: result.max, color: "hsl(var(--primary))", bg: "hsl(var(--primary) / 0.08)" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl p-4 text-center"
                    style={{ background: item.bg, border: `1.5px solid ${item.color}20` }}
                  >
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-sm font-bold" style={{ color: item.color }}>
                      Rp {formatRupiah(item.val)}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Level indicator */}
              {salaryLevel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="glass-surface rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" style={{ color: salaryLevel.color }} />
                      <span className="text-sm font-semibold text-foreground">{salaryLevel.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Posisi di pasar</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full" style={{ background: "hsl(var(--secondary))" }}>
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${salaryLevel.color}, ${salaryLevel.color}aa)` }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${salaryLevel.pct}%` }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Entry</span>
                    <span className="text-xs text-muted-foreground">Mid</span>
                    <span className="text-xs text-muted-foreground">Senior</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.div
          className="glass-elevated rounded-[28px] p-6 md:p-8 mx-auto max-w-xl"
          style={{ scale: cardScale, rotateX: cardRotateX, transformStyle: "preserve-3d", perspective: "1000px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--accent-mint) / 0.12)" }}>
              <TrendingUp className="w-5 h-5" style={{ color: "hsl(var(--accent-mint))" }} />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground text-sm">Cek Estimasi Gaji</p>
              <p className="text-xs text-muted-foreground">Berdasarkan data pasar terkini</p>
            </div>
          </div>

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickSuggestions.map((s, i) => (
              <motion.button
                key={i}
                onClick={() => setJabatan(s)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer"
                style={{
                  background: jabatan === s ? "hsl(var(--accent-mint) / 0.15)" : "hsl(var(--secondary))",
                  color: jabatan === s ? "hsl(var(--accent-mint))" : "hsl(var(--muted-foreground))",
                  border: jabatan === s ? "1.5px solid hsl(var(--accent-mint) / 0.3)" : "1.5px solid transparent",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {s}
              </motion.button>
            ))}
          </div>

          <div className="space-y-3 mb-4">
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Jabatan (mis. Software Engineer)"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCekGaji()}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: "hsl(var(--secondary) / 0.7)",
                  border: "1.5px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  outline: "none",
                }}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Kota (mis. Jakarta, Bandung)"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCekGaji()}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: "hsl(var(--secondary) / 0.7)",
                  border: "1.5px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <motion.button
            data-hover
            onClick={handleCekGaji}
            disabled={loading || !jabatan}
            className="w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, hsl(var(--accent-mint)), hsl(160 65% 35%))",
              boxShadow: "0 4px 20px hsl(var(--accent-mint) / 0.25)"
            }}
            whileHover={{ y: -2, boxShadow: "0 8px 28px hsl(var(--accent-mint) / 0.35)" }}
            whileTap={{ scale: 0.98 }}
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Menghitung...</>
              : <><Search className="w-4 h-4" /> Cek Gaji Sekarang <ChevronRight className="w-4 h-4" /></>
            }
          </motion.button>

          {result && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => { setResult(null); setJabatan(""); setLokasi(""); setDisplayNumber(0); }}
              className="w-full mt-2 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Reset pencarian
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SceneSalary;