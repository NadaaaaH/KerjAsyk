import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Paste Link atau Teks Loker",
    desc: "Salin URL lowongan atau tempel langsung teks deskripsi pekerjaan yang kamu temukan di mana saja.",
    color: "hsl(var(--primary))",
    bg: "hsl(var(--primary) / 0.06)",
  },
  {
    number: "02",
    title: "AI Menganalisis Otomatis",
    desc: "Sistem kami memeriksa pola bahasa, nama perusahaan, nominal gaji, dan ratusan indikator penipuan lainnya.",
    color: "hsl(var(--accent-mint))",
    bg: "hsl(var(--accent-mint) / 0.06)",
  },
  {
    number: "03",
    title: "Terima Hasil dalam Detik",
    desc: "Dapatkan laporan lengkap: aman, perlu dicek, atau terindikasi scam — beserta alasannya yang jelas.",
    color: "hsl(var(--accent-yellow))",
    bg: "hsl(var(--accent-yellow) / 0.06)",
  },
  {
    number: "04",
    title: "Lamar dengan Percaya Diri",
    desc: "Sudah terverifikasi? Lanjutkan proses lamaran tanpa rasa khawatir. Karir kamu ada di tangan yang tepat.",
    color: "hsl(var(--primary))",
    bg: "hsl(var(--primary) / 0.06)",
  },
];

const SceneCaraKerja = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const floatY = useTransform(smoothScroll, [0, 1], ["4%", "-4%"]);

  return (
    <section
      id="cara-kerja"
      ref={ref}
      className="scene-container flex items-center justify-center py-32"
      style={{ minHeight: "120vh" }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 cinematic-gradient" />
      <div className="absolute inset-0 z-0 grid-pattern" />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsl(217 91% 50% / 0.06), transparent 60%)",
        }}
      />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, hsl(217 91% 50% / 0.06), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 -right-32 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(160 65% 40% / 0.07), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 -left-32 w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(217 91% 50% / 0.05), transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(217 91% 50% / 0.15), transparent)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 w-full"
        style={{ y: floatY }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4"
          >
            Cara Kerja
          </p>
          <h2 className="text-display text-foreground mb-4">
            Empat langkah,{" "}
            <span className="text-primary">satu ketenangan.</span>
          </h2>
          <p className="text-body-scene text-muted-foreground mx-auto">
            Proses verifikasi yang cepat, transparan, dan mudah dipahami siapa saja.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Garis koneksi vertikal */}
          <div
            className="absolute left-[28px] md:left-1/2 top-8 bottom-8 w-px hidden sm:block"
            style={{
              background:
                "linear-gradient(180deg, hsl(217 91% 50% / 0.15), hsl(160 65% 40% / 0.15))",
              transform: "translateX(-50%)",
            }}
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.1,
                }}
              >
                {/* Nomor */}
                <div className="flex-shrink-0 flex items-center gap-4 md:w-[45%] md:justify-end"
                  style={{ flexDirection: i % 2 === 1 ? "row-reverse" : "row" }}
                >
                  <motion.div
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: step.bg, border: `1px solid ${step.color}20` }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      className="text-lg font-black"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                    {/* Dot pada garis */}
                    <div
                      className="absolute hidden md:block w-3 h-3 rounded-full"
                      style={{
                        background: step.color,
                        right: i % 2 === 1 ? "auto" : "-34px",
                        left: i % 2 === 1 ? "-34px" : "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        boxShadow: `0 0 12px ${step.color}`,
                      }}
                    />
                  </motion.div>
                </div>

                {/* Konten */}
                <motion.div
                  className="glass-surface rounded-2xl p-6 md:w-[45%]"
                  whileHover={{
                    y: -4,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    transition: { duration: 0.25 },
                  }}
                >
                  <h3
                    className="text-lg font-bold text-foreground mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA bawah */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <motion.a
            href="#scan-loker"
            data-hover
            className="inline-block px-10 py-4 rounded-full text-base font-semibold text-white no-underline"
            style={{
              background:
                "linear-gradient(135deg, hsl(217 91% 50%), hsl(217 91% 42%))",
              boxShadow: "0 4px 20px hsl(217 91% 50% / 0.25)",
            }}
            whileHover={{
              y: -3,
              boxShadow: "0 12px 36px hsl(217 91% 50% / 0.4)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Coba Sekarang
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SceneCaraKerja;