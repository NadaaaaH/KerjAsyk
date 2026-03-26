import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShieldCheck, Zap, Heart, Lock } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Transparansi Penuh",
    desc: "Setiap hasil analisis disertai alasan yang jelas. Tidak ada black box, tidak ada jawaban asal.",
    color: "hsl(var(--primary))",
    bg: "hsl(var(--primary) / 0.08)",
  },
  {
    icon: Zap,
    title: "Cepat dan Ringkas",
    desc: "Dirancang untuk pencari kerja yang tidak punya banyak waktu. Hasil dalam hitungan detik.",
    color: "hsl(var(--accent-yellow))",
    bg: "hsl(var(--accent-yellow) / 0.08)",
  },
  {
    icon: Heart,
    title: "Gratis untuk Semua",
    desc: "Kami percaya perlindungan dari penipuan adalah hak semua orang, bukan hanya yang mampu bayar.",
    color: "hsl(var(--danger))",
    bg: "hsl(var(--danger) / 0.08)",
  },
  {
    icon: Lock,
    title: "Data Kamu Aman",
    desc: "Kami tidak menyimpan data pribadi kamu. Setiap analisis diproses dan langsung dihapus.",
    color: "hsl(var(--accent-mint))",
    bg: "hsl(var(--accent-mint) / 0.08)",
  },
];

const SceneTentang = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const floatY = useTransform(smoothScroll, [0, 1], ["4%", "-4%"]);

  return (
    <section
      id="tentang"
      ref={ref}
      className="relative w-full overflow-hidden flex items-center justify-center py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 hope-gradient" />
      <div className="absolute inset-0 z-0 dot-pattern" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, hsl(160 65% 40% / 0.06), transparent 65%)",
        }}
      />
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(217 91% 50% / 0.05), transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(160 65% 40% / 0.15), transparent)",
        }}
      />

    <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 w-full"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-sm font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "hsl(var(--accent-mint))" }}
          >
            Tentang KerjaSyik
          </p>
          <h2 className="text-display text-foreground mb-6">
            Dibuat karena{" "}
            <span style={{ color: "hsl(var(--accent-mint))" }}>
              kami peduli.
            </span>
          </h2>
          <p className="text-body-scene text-muted-foreground mx-auto">
            KerjaSyik lahir dari keresahan melihat banyaknya pencari kerja yang
            menjadi korban lowongan palsu. Kami hadir untuk mengubah itu.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {values.map((val, i) => (
            <motion.div
              key={i}
              className="glass-surface rounded-2xl p-6 flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: val.bg }}
              >
                <val.icon className="w-5 h-5" style={{ color: val.color }} />
              </div>
              <div>
                <h3
                  className="font-bold text-foreground mb-1 text-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {val.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          className="glass-elevated rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <p
            className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            "Tidak ada yang seharusnya kehilangan uang atau kesempatan karena
            lowongan palsu."
          </p>
          <p className="text-sm text-muted-foreground">Tim KerjaSyik</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SceneTentang;