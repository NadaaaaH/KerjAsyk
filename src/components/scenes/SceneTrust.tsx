import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Building2, Users, Award, Globe } from "lucide-react";

const stats = [
  { value: "500+", label: "Perusahaan Terverifikasi", icon: Building2, color: "hsl(var(--primary))" },
  { value: "10.000+", label: "Pencari Kerja Dilindungi", icon: Users, color: "hsl(var(--accent-mint))" },
  { value: "98%", label: "Akurasi Deteksi", icon: Award, color: "hsl(var(--accent-yellow))" },
  { value: "24/7", label: "Monitoring Aktif", icon: Globe, color: "hsl(var(--primary))" },
];

const companies = [
  { name: "Gojek", logo: "/src/assets/logos/gojek.png" },
  { name: "Tokopedia", logo: "/src/assets/logos/tokopedia.png" },
  { name: "Shopee", logo: "/src/assets/logos/shopee.png" },
  { name: "Bank BCA", logo: "/src/assets/logos/bca.png" },
  { name: "Telkom", logo: "/src/assets/logos/telkom.png" },
  { name: "Unilever", logo: "/src/assets/logos/unilever.png" },
  { name: "Traveloka", logo: "/src/assets/logos/traveloka.png" },
  { name: "Bukalapak", logo: "/src/assets/logos/bukalapak.png" },
  { name: "OVO", logo: "/src/assets/logos/ovo.png" },
  { name: "Grab", logo: "/src/assets/logos/grab.png" },
  { name: "Dana", logo: "/src/assets/logos/dana.png" },
  { name: "GoTo", logo: "/src/assets/logos/goto.png" },
];

const infiniteCompanies = [...companies, ...companies];

const SceneTrust = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const floatY = useTransform(smoothScroll, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "120vh" }}>
      <div className="absolute inset-0 z-0 cinematic-gradient" />
      <div className="absolute inset-0 z-0 dot-pattern" />
      <div className="absolute inset-0 z-0 grid-pattern" style={{ opacity: 0.5 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full" style={{
        background: "radial-gradient(ellipse, hsl(160 65% 40% / 0.06), transparent 65%)",
      }} />

      <motion.div className="relative z-10 w-full" style={{ y: floatY }}>
        {/* Header */}
        <motion.div
          className="text-center mb-16 px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "hsl(var(--accent-mint))" }}>
            Trust
          </p>
          <h2 className="text-display text-foreground mb-4">
            Dipercaya <span style={{ color: "hsl(var(--accent-mint))" }}>ribuan pengguna.</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24 max-w-5xl mx-auto px-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-surface rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.2 } }}
            >
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ background: `${stat.color}18` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl md:text-3xl font-black text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Carousel label */}
        <motion.p
          className="text-center text-sm text-muted-foreground mb-8 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Perusahaan yang sudah terverifikasi
        </motion.p>

        {/* Infinite carousel */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, hsl(210 80% 97%), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, hsl(210 80% 97%), transparent)" }} />

          <motion.div
            className="flex gap-12 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {infiniteCompanies.map((company, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-20 h-20 object-contain transition-all duration-300 group-hover:scale-110"
                  style={{ filter: "grayscale(100%) opacity(0.45)" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLImageElement).style.filter = "grayscale(0%) opacity(1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLImageElement).style.filter = "grayscale(100%) opacity(0.45)";
                  }}
                />
                <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SceneTrust;