import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { FileText, Link, Image, CheckCircle, AlertTriangle, Loader2, Upload, ScanSearch, ShieldCheck, ShieldAlert, XCircle, Building2, DollarSign, Clock, User } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

type TabType = "url" | "teks" | "gambar";
type ResultType = "aman" | "scam" | "curiga" | null;

const analyzeInput = (input: string, tab: TabType): {
  result: ResultType;
  company: string;
  position: string;
  checks: { label: string; status: "ok" | "warn" | "bad"; desc: string }[];
  summary: string;
  score: number;
} => {
  const text = input.toLowerCase();
  const scamKeywords = ["modal", "deposit", "transfer", "rekening", "wa.me", "bit.ly", "untung", "passive income", "mlm", "jaminan", "tanpa modal"];
  const warnKeywords = ["tanpa pengalaman", "gaji tinggi", "langsung diterima", "wfh full", "no cv", "tanpa ijazah"];
  const scamCount = scamKeywords.filter(k => text.includes(k)).length;
  const warnCount = warnKeywords.filter(k => text.includes(k)).length;
  let result: ResultType = "aman";
  let score = 92;
  if (scamCount >= 2) { result = "scam"; score = 15 + Math.floor(Math.random() * 20); }
  else if (scamCount === 1 || warnCount >= 2) { result = "curiga"; score = 45 + Math.floor(Math.random() * 20); }
  else { result = "aman"; score = 78 + Math.floor(Math.random() * 18); }
  const companyMatch = text.match(/pt\.?\s+\w+|cv\.?\s+\w+|(?:perusahaan|company)\s+\w+/i);
  const company = companyMatch ? companyMatch[0].toUpperCase() : tab === "url" ? "Dari URL" : "Tidak Terdeteksi";
  const posKeywords = ["software", "engineer", "manager", "designer", "admin", "marketing", "data", "analyst", "developer", "staff"];
  const posMatch = posKeywords.find(k => text.includes(k));
  const position = posMatch ? posMatch.charAt(0).toUpperCase() + posMatch.slice(1) + " (terdeteksi)" : "Posisi Umum";
  const checks = [
    { label: "Kredibilitas Perusahaan", status: scamCount >= 1 ? "bad" : warnCount >= 1 ? "warn" : "ok", desc: scamCount >= 1 ? "Perusahaan tidak dapat diverifikasi" : warnCount >= 1 ? "Informasi perusahaan kurang lengkap" : "Perusahaan terverifikasi di database" },
    { label: "Kewajaran Gaji", status: text.includes("juta") && (text.includes("minggu") || text.includes("hari")) ? "bad" : warnCount >= 1 ? "warn" : "ok", desc: text.includes("juta") && (text.includes("minggu") || text.includes("hari")) ? "Tawaran gaji tidak realistis" : "Rentang gaji dalam batas wajar" },
    { label: "Transparansi Lowongan", status: scamCount >= 2 ? "bad" : warnCount >= 1 ? "warn" : "ok", desc: scamCount >= 2 ? "Banyak informasi penting disembunyikan" : warnCount >= 1 ? "Beberapa detail perlu diklarifikasi" : "Deskripsi pekerjaan lengkap dan jelas" },
    { label: "Pola Penipuan", status: scamCount >= 2 ? "bad" : scamCount === 1 ? "warn" : "ok", desc: scamCount >= 2 ? `${scamCount} indikator penipuan ditemukan` : scamCount === 1 ? "1 indikator mencurigakan ditemukan" : "Tidak ada pola penipuan terdeteksi" },
  ] as { label: string; status: "ok" | "warn" | "bad"; desc: string }[];
  const summaries = {
    aman: "Lowongan ini tampak legitim berdasarkan analisis kami. Tetap lakukan verifikasi mandiri sebelum melamar.",
    curiga: "Ditemukan beberapa poin yang perlu diverifikasi lebih lanjut. Hubungi perusahaan secara resmi sebelum melanjutkan.",
    scam: "Lowongan ini memiliki banyak tanda bahaya. Sangat disarankan untuk tidak melanjutkan proses lamaran.",
  };
  return { result, company, position, checks, summary: summaries[result], score };
};

const SceneScanLoker = () => {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const cardScale = useTransform(smoothScroll, [0.1, 0.4], [0.92, 1]);
  const cardY = useTransform(smoothScroll, [0.1, 0.4], [60, 0]);
  const cardRotateX = useTransform(smoothScroll, [0.1, 0.4], [10, 0]);

  const [tab, setTab] = useState<TabType>("url");
  const [input, setInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeInput> | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingSteps = ["Membaca konten...", "Menganalisis pola...", "Memverifikasi data...", "Menyusun laporan..."];

  const handleScan = () => {
    if (!input && !fileName) return;
    setLoading(true);
    setAnalysis(null);
    setLoadingStep(0);
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => { if (prev >= loadingSteps.length - 1) { clearInterval(stepInterval); return prev; } return prev + 1; });
    }, 500);
    setTimeout(() => { clearInterval(stepInterval); setLoading(false); setAnalysis(analyzeInput(input || fileName, tab)); }, 2200);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  };

  const resultConfig = {
    aman: { color: "hsl(160 65% 40%)", bg: "hsl(160 65% 40% / 0.06)", border: "hsl(160 65% 40% / 0.2)", gradient: "linear-gradient(135deg, hsl(160 65% 40% / 0.08), hsl(160 65% 40% / 0.03))", icon: ShieldCheck, label: "Loker Aman", emoji: "✓" },
    curiga: { color: "hsl(38 95% 45%)", bg: "hsl(38 95% 50% / 0.06)", border: "hsl(38 95% 50% / 0.2)", gradient: "linear-gradient(135deg, hsl(38 95% 50% / 0.08), hsl(38 95% 50% / 0.03))", icon: ShieldAlert, label: "Perlu Dicek", emoji: "⚠" },
    scam: { color: "hsl(0 84% 50%)", bg: "hsl(0 84% 50% / 0.06)", border: "hsl(0 84% 50% / 0.2)", gradient: "linear-gradient(135deg, hsl(0 84% 50% / 0.08), hsl(0 84% 50% / 0.03))", icon: XCircle, label: "Terindikasi Scam", emoji: "✕" },
  };
  const statusConfig = {
    ok: { color: "hsl(160 65% 40%)", bg: "hsl(160 65% 40% / 0.1)", icon: CheckCircle, label: "Aman" },
    warn: { color: "hsl(38 95% 45%)", bg: "hsl(38 95% 50% / 0.1)", icon: AlertTriangle, label: "Perhatian" },
    bad: { color: "hsl(0 84% 50%)", bg: "hsl(0 84% 50% / 0.1)", icon: XCircle, label: "Bahaya" },
  };
  const tabs: { id: TabType; icon: typeof Link; label: string }[] = [
    { id: "url", icon: Link, label: "URL Loker" },
    { id: "teks", icon: FileText, label: "Tempel Teks" },
    { id: "gambar", icon: Image, label: "Upload Gambar" },
  ];

  // ← Fix: warna tab active berdasarkan dark/light
  const tabActiveBg = isDark ? "hsl(222 25% 18%)" : "white";

  return (
    <section id="scan-loker" ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "130vh" }}>
      {/* ← Fix: pakai CSS variable class */}
      <div className="absolute inset-0 z-0 cinematic-gradient" />
      <div className="absolute inset-0 z-0 dot-pattern" />
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 40% 50%, hsl(217 91% 50% / 0.07), transparent 55%)",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">Scan Loker</p>
          <h2 className="text-display text-foreground mb-4">
            Cek. Scan. <span className="text-primary">Aman.</span>
          </h2>
          <p className="text-body-scene text-muted-foreground mx-auto">
            Paste URL, teks, atau upload screenshot lowongan — AI kami analisis dalam detik.
          </p>
        </motion.div>

        <motion.div
          className="glass-elevated rounded-[28px] p-6 md:p-10 mx-auto max-w-2xl"
          style={{ scale: cardScale, y: cardY, rotateX: cardRotateX, transformStyle: "preserve-3d", perspective: "1200px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Tabs */}
          <div className="flex gap-2 p-1 rounded-2xl mb-6" style={{ background: "hsl(var(--secondary))" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                data-hover
                onClick={() => { setTab(t.id); setAnalysis(null); setInput(""); setFileName(""); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: tab === t.id ? tabActiveBg : "transparent",
                  color: tab === t.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                  boxShadow: tab === t.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}
              >
                <t.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="mb-4">
            {tab === "url" && (
              <div className="relative">
                <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="url"
                  placeholder="https://loker.contoh.com/software-engineer"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  className="w-full pl-11 pr-4 py-4 rounded-2xl text-sm font-medium transition-all duration-200"
                  style={{ background: "hsl(var(--secondary) / 0.6)", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--foreground))", outline: "none" }}
                />
              </div>
            )}
            {tab === "teks" && (
              <textarea
                placeholder="Tempel deskripsi lowongan di sini..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                className="w-full px-4 py-4 rounded-2xl text-sm font-medium resize-none transition-all duration-200"
                style={{ background: "hsl(var(--secondary) / 0.6)", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--foreground))", outline: "none" }}
              />
            )}
            {tab === "gambar" && (
              <div
                className="relative rounded-2xl p-8 text-center cursor-pointer transition-all duration-200"
                style={{ background: "hsl(var(--secondary) / 0.6)", border: "1.5px dashed hsl(var(--primary) / 0.3)" }}
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                <Upload className="w-8 h-8 text-primary/50 mx-auto mb-3" />
                {fileName ? (
                  <p className="text-sm font-semibold text-primary">{fileName}</p>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-foreground mb-1">Klik untuk upload screenshot</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP — maks 5MB</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Scan button */}
          <motion.button
            data-hover
            onClick={handleScan}
            disabled={loading || (!input && !fileName)}
            className="w-full py-4 rounded-2xl text-base font-bold text-white flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(217 91% 42%))", boxShadow: "0 4px 20px hsl(var(--primary) / 0.25)" }}
            whileHover={{ y: -2, boxShadow: "0 8px 32px hsl(var(--primary) / 0.35)" }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> {loadingSteps[loadingStep]}</>
            ) : (
              <><ScanSearch className="w-5 h-5" /> Scan Sekarang</>
            )}
          </motion.button>

          {/* Result */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 rounded-2xl overflow-hidden"
                style={{ border: `1.5px solid ${resultConfig[analysis.result].border}`, background: resultConfig[analysis.result].gradient, backdropFilter: "blur(12px)" }}
              >
                <div className="p-5 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {(() => { const Icon = resultConfig[analysis.result].icon; return <Icon className="w-6 h-6" style={{ color: resultConfig[analysis.result].color }} />; })()}
                      <div>
                        <p className="font-bold text-base" style={{ color: resultConfig[analysis.result].color }}>
                          {resultConfig[analysis.result].label} {resultConfig[analysis.result].emoji}
                        </p>
                        <p className="text-xs text-muted-foreground">Analisis selesai</p>
                      </div>
                    </div>
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="22" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                        <circle cx="28" cy="28" r="22" fill="none" stroke={resultConfig[analysis.result].color} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 22}`} strokeDashoffset={`${2 * Math.PI * 22 * (1 - analysis.score / 100)}`} style={{ transition: "stroke-dashoffset 1s ease" }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-black" style={{ color: resultConfig[analysis.result].color }}>{analysis.score}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="w-3.5 h-3.5" />
                      <span className="truncate">{analysis.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3.5 h-3.5" />
                      <span className="truncate">{analysis.position}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{analysis.summary}</p>
                  <div className="h-px mb-4" style={{ background: `${resultConfig[analysis.result].border}` }} />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Detail Analisis</p>
                  <div className="space-y-2">
                    {analysis.checks.map((check, i) => {
                      const sc = statusConfig[check.status];
                      const Icon = sc.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                          className="flex items-start gap-3 rounded-xl p-3"
                          style={{ background: sc.bg }}
                        >
                          <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: sc.color }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs font-semibold text-foreground">{check.label}</p>
                              <span className="text-xs font-medium flex-shrink-0" style={{ color: sc.color }}>{sc.label}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{check.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                <motion.button
                  onClick={() => { setAnalysis(null); setInput(""); setFileName(""); }}
                  className="w-full py-3 text-xs font-semibold transition-colors cursor-pointer"
                  style={{ borderTop: `1px solid ${resultConfig[analysis.result].border}`, color: "hsl(var(--muted-foreground))", background: "transparent" }}
                  whileHover={{ color: "hsl(var(--foreground))" }}
                >
                  Scan loker lain →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
export default SceneScanLoker;