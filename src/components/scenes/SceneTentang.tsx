import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  animate,
} from "framer-motion";
import { ShieldCheck, Zap, Heart, Lock } from "lucide-react";

// ─── Animated counter ───────────────────────────────────────────────────────
function useCounter(target: number, duration = 1.8, shouldStart = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const ctrl = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return ctrl.stop;
  }, [shouldStart, target, duration]);
  return value;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const stats = [
  {
    value: 12000,
    display: null,
    suffix: "+",
    prefix: "",
    label: "lowongan dianalisis",
  },
  {
    value: 94,
    display: null,
    suffix: "%",
    prefix: "",
    label: "tingkat akurasi deteksi",
  },
  {
    value: 0,
    display: "Rp0",
    suffix: "",
    prefix: "",
    label: "biaya untuk pengguna",
  },
];

const principles = [
  {
    icon: ShieldCheck,
    index: "01",
    title: "Alasan, bukan label",
    body: "Hasil analisis bukan sekadar stempel 'aman' atau 'berbahaya'. Setiap kesimpulan punya penjelasan — karena kamu berhak mengerti, bukan sekadar patuh.",
    color: "hsl(var(--primary))",
    tint: "hsl(var(--primary) / 0.08)",
  },
  {
    icon: Zap,
    index: "02",
    title: "Kecepatan adalah bentuk hormat",
    body: "Waktu pencari kerja sudah cukup banyak tersita. Kami memastikan hasil ada dalam hitungan detik — bukan karena malas menjelaskan, tapi karena menghargai waktumu.",
    color: "hsl(var(--accent-yellow))",
    tint: "hsl(var(--accent-yellow) / 0.08)",
  },
  {
    icon: Heart,
    index: "03",
    title: "Perlindungan bukan produk premium",
    body: "Ada yang bilang gratis tidak bisa bagus. Kami tidak setuju. Keamanan dalam mencari kerja seharusnya tidak bergantung pada tebal tipisnya dompet seseorang.",
    color: "hsl(var(--danger))",
    tint: "hsl(var(--danger) / 0.08)",
  },
  {
    icon: Lock,
    index: "04",
    title: "Data yang tidak disimpan adalah data yang aman",
    body: "Kami sengaja tidak membangun database pengguna. Bukan karena tidak bisa — tapi karena kepercayaan lebih mudah dijaga kalau tidak ada yang bisa bocor.",
    color: "hsl(var(--accent-mint))",
    tint: "hsl(var(--accent-mint) / 0.08)",
  },
];

// ─── Stat item ───────────────────────────────────────────────────────────────
const StatItem = ({
  stat,
  i,
}: {
  stat: (typeof stats)[0];
  i: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(stat.value, 1.8, inView);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="font-bold leading-none"
        style={{
          fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
          letterSpacing: "-1px",
          color: "hsl(var(--accent-mint))",
          fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
        }}
      >
        {stat.display
          ? stat.display
          : `${stat.prefix}${count.toLocaleString("id-ID")}${stat.suffix}`}
      </div>
      <p
        className="text-sm"
        style={{
          color: "hsl(var(--muted-foreground))",
          fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
};

// ─── Principle card ──────────────────────────────────────────────────────────
const PrincipleCard = ({
  p,
  i,
}: {
  p: (typeof principles)[0];
  i: number;
}) => {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl p-7 overflow-hidden cursor-default select-none"
      style={{
        background: active ? p.tint : "hsl(var(--surface, var(--card)))",
        border: `1.5px solid ${active ? p.color + "55" : "hsl(var(--border))"}`,
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      whileHover={{ y: -4 }}
    >
      {/* Index watermark */}
      <span
        className="absolute right-5 top-4 font-black select-none pointer-events-none"
        style={{
          fontSize: 64,
          lineHeight: 1,
          letterSpacing: "-4px",
          color: p.color,
          opacity: active ? 0.13 : 0.045,
          fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
          transition: "opacity 0.35s ease",
        }}
      >
        {p.index}
      </span>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: active ? p.color + "25" : "hsl(var(--muted) / 0.4)",
          transition: "background 0.3s ease",
        }}
      >
        <p.icon
          className="w-[18px] h-[18px]"
          style={{ color: p.color, strokeWidth: 2 }}
        />
      </div>

      <h3
        className="font-bold text-sm mb-2.5 leading-snug"
        style={{
          color: "hsl(var(--foreground))",
          fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
          letterSpacing: "-0.15px",
        }}
      >
        {p.title}
      </h3>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {p.body}
      </p>
    </motion.div>
  );
};

// ─── Main scene ──────────────────────────────────────────────────────────────
const SceneTentang = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const blobY = useTransform(smooth, [0, 1], ["0%", "8%"]);

  return (
    <section
      id="tentang"
      ref={ref}
      className="relative w-full overflow-hidden py-32"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 z-0 hope-gradient" />
      <div className="absolute inset-0 z-0 dot-pattern" />

      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 640,
          height: 640,
          top: "-5%",
          left: "-12%",
          background:
            "radial-gradient(circle, hsl(160 65% 40% / 0.07), transparent 65%)",
          y: blobY,
        }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 400,
          height: 400,
          bottom: "5%",
          right: "-8%",
          background:
            "radial-gradient(circle, hsl(217 91% 50% / 0.06), transparent 65%)",
          y: useTransform(smooth, [0, 1], ["0%", "-6%"]),
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">

        {/* ── Header — split asymmetric ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 items-end">

          <motion.div
            className="md:col-span-6"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Label */}
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="h-px w-6 flex-shrink-0"
                style={{ background: "hsl(var(--accent-mint))" }}
              />
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{
                  color: "hsl(var(--accent-mint))",
                  fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
                }}
              >
                Tentang KerjaSyik
              </p>
            </div>

            <h2
              className="font-bold leading-[1.08]"
              style={{
                fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
                fontSize: "clamp(2rem, 4.2vw, 3rem)",
                letterSpacing: "-0.8px",
                color: "hsl(var(--foreground))",
              }}
            >
              Dibuat karena{" "}
              <br />
              <em
                className="not-italic"
                style={{ color: "hsl(var(--accent-mint))" }}
              >
                ada yang salah.
              </em>
            </h2>
          </motion.div>

          <motion.div
            className="md:col-span-6"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-sm leading-[1.85] mb-4"
              style={{
                color: "hsl(var(--muted-foreground))",
                fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
              }}
            >
              Bukan dari ruangan ber-AC dengan papan tulis penuh sticky note.
              KerjaSyik lahir dari keresahan yang terlalu sering diabaikan,
              bahwa mencari kerja di Indonesia bisa terasa seperti berjalan
              di tambang ranjau, dan kebanyakan orang berjalan sendirian.
            </p>
            <p
              className="text-sm leading-[1.85]"
              style={{
                color: "hsl(var(--muted-foreground))",
                fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
              }}
            >
              Kami tidak punya solusi untuk semua masalah. Tapi untuk yang
              satu ini dapat mendeteksi lowongan palsu, kami bisa membantu.
            </p>
          </motion.div>
        </div>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <motion.div
          className="rounded-2xl p-8 mb-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
          style={{
            background: "hsl(var(--surface, var(--card)))",
            border: "1.5px solid hsl(var(--border))",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={
                i > 0
                  ? "sm:pl-8 sm:border-l border-[hsl(var(--border))]"
                  : ""
              }
            >
              <StatItem stat={s} i={i} />
            </div>
          ))}
        </motion.div>

        {/* ── Principles grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {principles.map((p, i) => (
            <PrincipleCard key={i} p={p} i={i} />
          ))}
        </div>

        {/* ── Closing statement — not a generic quote box ───────────────────── */}
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "hsl(var(--surface, var(--card)))",
            border: "1.5px solid hsl(var(--border))",
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--accent-mint)), hsl(var(--primary)))",
              borderRadius: "3px 0 0 3px",
            }}
          />

          <div className="px-10 md:px-14 py-12">
            {/* Decorative large quote */}
            <div
              className="font-black leading-none mb-1 select-none"
              style={{
                fontSize: 96,
                color: "hsl(var(--accent-mint) / 0.1)",
                fontFamily: "'Georgia', serif",
                lineHeight: 0.75,
              }}
            >
              "
            </div>

            <p
              className="text-base md:text-lg font-semibold leading-[1.75] mb-7"
              style={{
                color: "hsl(var(--foreground))",
                fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
                letterSpacing: "-0.2px",
                maxWidth: "680px",
              }}
            >
              Setiap lowongan palsu yang lolos tidak hanya merugikan satu orang.
              Ia merusak kepercayaan, kepercayaan terhadap proses, terhadap
              perusahaan, terhadap kemungkinan bahwa usaha akan membuahkan hasil.
              KerjaSyik ada karena kepercayaan itu layak dijaga.
            </p>

            <div className="flex items-center gap-3">
              <div
                className="w-7 h-px"
                style={{ background: "hsl(var(--accent-mint))" }}
              />
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{
                  color: "hsl(var(--muted-foreground))",
                  fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
                }}
              >
                Tim KerjaSyik
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SceneTentang;