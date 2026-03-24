import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Briefcase, MapPin, Search, TrendingUp, Loader2 } from "lucide-react";

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

const SceneSalary = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [jabatan, setJabatan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ min: number; mid: number; max: number; title: string } | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardRotateX = useTransform(scrollYProgress, [0.1, 0.4], [10, 0]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.4], [0.92, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
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

  return (
    <section id="cek-gaji" ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "140vh" }}>
      <div className="absolute inset-0 z-0" style={{
        background: "linear-gradient(180deg, hsl(210 80% 97%) 0%, hsl(160 60% 96%) 40%, hsl(210 80% 97%) 100%)",
      }} />
      <div className="absolute inset-0 z-0 dot-pattern" />
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, hsl(160 65% 40% / 0.07), transparent 60%)",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
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
        <motion.div className="mb-12" style={{ rotateX: cardRotateX, perspective: "1000px" }}>
          <div className="text-5xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-foreground leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>
            <span className="text-2xl md:text-4xl font-bold text-muted-foreground align-top">Rp</span>
            {" "}{formatRupiah(displayNumber)}
          </div>
          {result && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-muted-foreground mt-3 font-medium"
            >
              Estimasi gaji <strong className="text-foreground">{result.title}</strong>
            </motion.p>
          )}
        </motion.div>

        {/* Bar chart */}
        {!result && (
          <motion.div className="flex items-end justify-center gap-3 md:gap-8 h-40 mb-12" style={{ scale: cardScale }}>
            {barData.map((bar, i) => (
              <motion.div key={i} className="flex flex-col items-center gap-2"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <span className="text-xs text-muted-foreground font-medium">{bar.value}</span>
                <motion.div
                  className="w-8 md:w-14 rounded-t-xl"
                  style={{ background: i === 2 ? "linear-gradient(180deg, hsl(var(--accent-mint)), hsl(160 65% 55%))" : "hsl(var(--primary) / 0.12)" }}
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

        {/* Result range */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto"
          >
            {[
              { label: "Minimum", val: result.min, color: "hsl(var(--muted-foreground))" },
              { label: "Median", val: result.mid, color: "hsl(var(--accent-mint))" },
              { label: "Maksimum", val: result.max, color: "hsl(var(--primary))" },
            ].map((item, i) => (
              <div key={i} className="glass-surface rounded-2xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="text-sm font-bold" style={{ color: item.color }}>Rp {formatRupiah(item.val)}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Form cek gaji */}
        <motion.div
          className="glass-elevated rounded-[28px] p-6 md:p-8 mx-auto max-w-xl"
          style={{ scale: cardScale, rotateX: cardRotateX, transformStyle: "preserve-3d", perspective: "1000px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--accent-mint) / 0.12)" }}>
              <TrendingUp className="w-5 h-5" style={{ color: "hsl(var(--accent-mint))" }} />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground text-sm">Cek Estimasi Gaji</p>
              <p className="text-xs text-muted-foreground">Berdasarkan data pasar terkini</p>
            </div>
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
                }}
              />
            </div>
          </div>

          <motion.button
            data-hover
            onClick={handleCekGaji}
            disabled={loading || !jabatan}
            className="w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, hsl(var(--accent-mint)), hsl(160 65% 35%))", boxShadow: "0 4px 20px hsl(var(--accent-mint) / 0.25)" }}
            whileHover={{ y: -2, boxShadow: "0 8px 28px hsl(var(--accent-mint) / 0.35)" }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Menghitung...</> : <><Search className="w-4 h-4" /> Cek Gaji Sekarang</>}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SceneSalary;
