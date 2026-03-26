import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, useSpring } from "framer-motion";
import { Briefcase, MapPin, Search, TrendingUp, Loader2, Sparkles, ArrowRight } from "lucide-react";

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
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

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
    ? result.mid < 8000000
      ? { label: "Entry Level", color: "hsl(var(--accent-yellow))", pct: 25 }
      : result.mid < 14000000
      ? { label: "Mid Level", color: "hsl(var(--accent-mint))", pct: 60 }
      : { label: "Senior Level", color: "hsl(var(--primary))", pct: 90 }
    : null;

  return (
    <section id="cek-gaji" ref={ref} className="scene-container flex items-center justify-center py-24" style={{ minHeight: "140vh" }}>
      {/* ← Fix: pakai CSS variable gradient */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 hope-gradient" />
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(160 65% 40% / 0.08), transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, hsl(217 91% 50% / 0.06), transparent 55%)" }} />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, hsl(160 65% 40% / 0.06), transparent 65%)" }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, hsl(217 91% 50% / 0.06), transparent 65%)" }} />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Kolom kiri */}
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "hsl(var(--accent-mint))" }}>
                Salary Insight
              </p>
              <h2 className="text-display text-foreground mb-3">
                Tahu dulu
                <br />
                <span style={{ color: "hsl(var(--accent-mint))" }}>harga dirimu.</span>
              </h2>
              <p className="text-body-scene text-muted-foreground mb-10">
                Isi jabatan dan lokasi, kami estimasi rentang gaji realistisnya.
              </p>
            </motion.div>

            {/* Big number */}
            <motion.div className="mb-8" style={{ rotateX: cardRotateX, perspective: "1000px" }}>
              <div className="font-black tracking-tighter text-foreground leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontVariantNumeric: "tabular-nums" }}>
                <span className="text-xl md:text-3xl font-bold text-muted-foreground align-top mr-1">Rp</span>
                {formatRupiah(displayNumber)}
              </div>
              <AnimatePresence>
                {result && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 mt-3">
                    <Sparkles className="w-4 h-4" style={{ color: "hsl(var(--accent-mint))" }} />
                    <p className="text-sm text-muted-foreground font-medium">Estimasi untuk <strong className="text-foreground">{result.title}</strong></p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Bar chart */}
            <AnimatePresence>
              {!result && (
                <motion.div exit={{ opacity: 0, y: -10 }} className="flex items-end gap-2 md:gap-5 h-44" style={{ scale: cardScale }}>
                  {barData.map((bar, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center gap-2 cursor-pointer flex-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onHoverStart={() => setActiveBar(i)}
                      onHoverEnd={() => setActiveBar(null)}
                    >
                      <motion.span className="text-xs font-bold" animate={{ color: activeBar === i ? "hsl(var(--accent-mint))" : "hsl(var(--muted-foreground))" }}>{bar.value}</motion.span>
                      <motion.div
                        className="w-full rounded-t-2xl relative overflow-hidden"
                        animate={{ scale: activeBar === i ? [1, 1.05] : 1 }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${bar.height * 1.5}px` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.1 }}
                        style={{
                          background: i === 2 ? "linear-gradient(180deg, hsl(var(--accent-mint)), hsl(160 65% 55%))" : activeBar === i ? "hsl(var(--primary) / 0.3)" : "hsl(var(--primary) / 0.1)",
                          boxShadow: i === 2 ? "0 8px 24px hsl(var(--accent-mint) / 0.3)" : "none",
                        }}
                      >
                        {i === 2 && (
                          <motion.div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.2), transparent)" }} animate={{ y: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                        )}
                      </motion.div>
                      <span className="text-xs text-muted-foreground font-medium">{bar.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result range */}
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "Minimum", val: result.min, color: "hsl(var(--muted-foreground))", bg: "hsl(var(--secondary))" },
                      { label: "Median", val: result.mid, color: "hsl(var(--accent-mint))", bg: "hsl(var(--accent-mint) / 0.08)" },
                      { label: "Maksimum", val: result.max, color: "hsl(var(--primary))", bg: "hsl(var(--primary) / 0.08)" },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-4 text-center" style={{ background: item.bg, border: `1.5px solid ${item.color}20` }}>
                        <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                        <p className="text-sm font-bold" style={{ color: item.color }}>Rp {formatRupiah(item.val)}</p>
                      </motion.div>
                    ))}
                  </div>
                  {salaryLevel && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-surface rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" style={{ color: salaryLevel.color }} />
                          <span className="text-sm font-semibold text-foreground">{salaryLevel.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Posisi di pasar</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ background: "hsl(var(--secondary))" }}>
                        <motion.div className="h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${salaryLevel.color}, ${salaryLevel.color}aa)` }} initial={{ width: "0%" }} animate={{ width: `${salaryLevel.pct}%` }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }} />
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
          </div>

          {/* Kolom kanan: Form */}
          <motion.div
            className="w-full lg:w-[420px] flex-shrink-0"
            style={{ scale: cardScale, rotateX: cardRotateX, transformStyle: "preserve-3d", perspective: "1000px" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="glass-elevated rounded-[28px] p-7 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--accent-mint)), hsl(160 65% 35%))" }}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Cek Estimasi Gaji</p>
                  <p className="text-xs text-muted-foreground">Berdasarkan data pasar terkini</p>
                </div>
              </div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Pilih cepat</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {quickSuggestions.map((s, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setJabatan(s)}
                    className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer"
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
              <div className="w-full h-px mb-5" style={{ background: "hsl(var(--border))" }} />
              <div className="space-y-3 mb-5">
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Jabatan (mis. Software Engineer)" value={jabatan} onChange={(e) => setJabatan(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCekGaji()} className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--secondary) / 0.7)", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--foreground))", outline: "none", transition: "border-color 0.2s" }} onFocus={(e) => e.target.style.borderColor = "hsl(var(--accent-mint) / 0.5)"} onBlur={(e) => e.target.style.borderColor = "hsl(var(--border))"} />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Kota (mis. Jakarta, Bandung)" value={lokasi} onChange={(e) => setLokasi(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCekGaji()} className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--secondary) / 0.7)", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--foreground))", outline: "none", transition: "border-color 0.2s" }} onFocus={(e) => e.target.style.borderColor = "hsl(var(--accent-mint) / 0.5)"} onBlur={(e) => e.target.style.borderColor = "hsl(var(--border))"} />
                </div>
              </div>
              <motion.button
                data-hover onClick={handleCekGaji} disabled={loading || !jabatan}
                className="w-full py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, hsl(var(--accent-mint)), hsl(160 65% 32%))", boxShadow: "0 4px 20px hsl(var(--accent-mint) / 0.3)" }}
                whileHover={{ y: -2, boxShadow: "0 10px 32px hsl(var(--accent-mint) / 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Menghitung...</> : <><Search className="w-4 h-4" /> Cek Gaji Sekarang <ArrowRight className="w-4 h-4" /></>}
              </motion.button>
              {result && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { setResult(null); setJabatan(""); setLokasi(""); setDisplayNumber(0); }} className="w-full mt-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Reset pencarian
                </motion.button>
              )}
              <div className="mt-5 pt-4 border-t flex items-center gap-2" style={{ borderColor: "hsl(var(--border))" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--accent-mint))" }} />
                <p className="text-xs text-muted-foreground">Data estimasi berdasarkan riset pasar kerja Indonesia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default SceneSalary;