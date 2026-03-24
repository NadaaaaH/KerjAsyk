import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Link, Image, CheckCircle, AlertTriangle, Loader2, Upload, ScanSearch } from "lucide-react";

type TabType = "url" | "teks" | "gambar";
type ResultType = "aman" | "scam" | "curiga" | null;

const SceneScanLoker = () => {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const cardScale = useTransform(scrollYProgress, [0.1, 0.4], [0.92, 1]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);
  const cardRotateX = useTransform(scrollYProgress, [0.1, 0.4], [10, 0]);

  const [tab, setTab] = useState<TabType>("url");
  const [input, setInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType>(null);

  const handleScan = () => {
    if (!input && !fileName) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      const outcomes: ResultType[] = ["aman", "curiga", "scam"];
      setResult(outcomes[Math.floor(Math.random() * outcomes.length)]);
    }, 2200);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  };

  const resultConfig = {
    aman: { color: "hsl(var(--accent-mint))", bg: "hsl(160 65% 40% / 0.08)", border: "hsl(160 65% 40% / 0.2)", icon: CheckCircle, label: "Loker Aman ✓", desc: "Tidak ditemukan indikasi penipuan. Aman untuk dilamar!" },
    curiga: { color: "hsl(var(--accent-yellow))", bg: "hsl(38 95% 50% / 0.08)", border: "hsl(38 95% 50% / 0.2)", icon: AlertTriangle, label: "Perlu Dicek Lebih Lanjut", desc: "Ada beberapa poin yang perlu diverifikasi. Hati-hati sebelum melanjutkan." },
    scam: { color: "hsl(var(--danger))", bg: "hsl(var(--danger) / 0.08)", border: "hsl(var(--danger) / 0.2)", icon: AlertTriangle, label: "Terindikasi Penipuan!", desc: "Lowongan ini memiliki banyak tanda merah. Jangan transfer uang apapun!" },
  };

  const tabs: { id: TabType; icon: typeof Link; label: string }[] = [
    { id: "url", icon: Link, label: "URL Loker" },
    { id: "teks", icon: FileText, label: "Tempel Teks" },
    { id: "gambar", icon: Image, label: "Upload Gambar" },
  ];

  return (
    <section id="scan-loker" ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "130vh" }}>
      <div className="absolute inset-0 z-0" style={{
        background: "linear-gradient(180deg, hsl(210 80% 97%) 0%, hsl(214 85% 96%) 50%, hsl(210 80% 97%) 100%)",
      }} />
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
                onClick={() => { setTab(t.id); setResult(null); setInput(""); setFileName(""); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: tab === t.id ? "white" : "transparent",
                  color: tab === t.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                  boxShadow: tab === t.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}
              >
                <t.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Input area */}
          <div className="mb-4">
            {tab === "url" && (
              <div className="relative">
                <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="url"
                  placeholder="https://loker.contoh.com/software-engineer"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 rounded-2xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: "hsl(var(--secondary) / 0.6)",
                    border: "1.5px solid hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
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
                style={{
                  background: "hsl(var(--secondary) / 0.6)",
                  border: "1.5px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
              />
            )}
            {tab === "gambar" && (
              <div
                className="relative rounded-2xl p-8 text-center cursor-pointer transition-all duration-200"
                style={{
                  background: "hsl(var(--secondary) / 0.6)",
                  border: "1.5px dashed hsl(var(--primary) / 0.3)",
                }}
                onClick={() => fileRef.current?.click()}
                data-hover
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
              <><Loader2 className="w-5 h-5 animate-spin" /> Menganalisis...</>
            ) : (
              <><ScanSearch className="w-5 h-5" /> Scan Sekarang</>
            )}
          </motion.button>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 rounded-2xl p-5"
              style={{
                background: resultConfig[result].bg,
                border: `1.5px solid ${resultConfig[result].border}`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                {(() => { const Icon = resultConfig[result].icon; return <Icon className="w-5 h-5" style={{ color: resultConfig[result].color }} />; })()}
                <span className="font-bold text-sm" style={{ color: resultConfig[result].color }}>
                  {resultConfig[result].label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground ml-8">{resultConfig[result].desc}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SceneScanLoker;
