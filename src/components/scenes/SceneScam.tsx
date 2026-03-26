import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { AlertTriangle, ShieldAlert, XCircle } from "lucide-react";

const scamCards = [
  { title: "Marketing Manager", company: "PT Sukses Bersama", salary: "Rp 20.000.000/minggu", flag: "Gaji tidak realistis", icon: AlertTriangle },
  { title: "Admin Online Shop", company: "CV Maju Jaya", salary: "Tanpa pengalaman, langsung kerja", flag: "Tidak ada detail pekerjaan", icon: ShieldAlert },
  { title: "Data Entry Specialist", company: "Global Corp Ltd", salary: "Modal Rp 500rb, untung 10x lipat", flag: "Minta uang di depan", icon: XCircle },
];

const SceneScam = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const fgSpeed = useTransform(smoothScroll, [0, 1], ["0%", "-15%"]);
  const bgSpeed = useTransform(smoothScroll, [0, 1], ["0%", "-5%"]);
  const bgLayer = useTransform(smoothScroll, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "130vh" }}>
      <motion.div className="absolute inset-0 z-0" style={{ y: bgSpeed }}>
        <div className="absolute inset-0 danger-gradient" />
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute -left-32 top-1/4 w-96 h-96 rounded-full" style={{
          background: "radial-gradient(circle, hsl(0 84% 55% / 0.07), transparent 70%)",
        }} />
        <div className="absolute -right-24 bottom-1/4 w-80 h-80 rounded-full" style={{
          background: "radial-gradient(circle, hsl(0 84% 55% / 0.05), transparent 70%)",
        }} />
        <motion.div className="absolute inset-0" style={{
          opacity: bgLayer,
          background: "radial-gradient(ellipse at 50% 50%, hsl(0 84% 55% / 0.06) 0%, transparent 65%)",
        }} />
      </motion.div>

      <motion.div className="relative z-10 max-w-5xl mx-auto px-6 w-full" style={{ y: fgSpeed }}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-display text-foreground mb-4">
            Tapi di luar sana,
            <br />
            <span style={{ color: "hsl(var(--danger))" }}>banyak jebakan.</span>
          </h2>
          <p className="text-body-scene text-muted-foreground mx-auto">
            Lowongan palsu makin sulit dibedakan dari yang asli.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {scamCards.map((card, i) => (
            <motion.div
              key={i}
              className="relative rounded-3xl p-6 glass-surface group"
              data-warning
              style={{ borderColor: "hsl(var(--danger) / 0.15)", transformStyle: "preserve-3d", perspective: "800px" }}
              initial={{ opacity: 0, y: 60, rotateX: 8, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 40px hsl(0 84% 55% / 0.1)", transition: { duration: 0.3 } }}
            >
              <div className="mb-4">
                <p className="font-semibold text-foreground">{card.title}</p>
                <p className="text-sm text-muted-foreground">{card.company}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{card.salary}</p>
              <motion.div
                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ background: "hsl(var(--danger) / 0.08)", color: "hsl(var(--danger))", border: "1px solid hsl(var(--danger) / 0.15)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <card.icon className="w-3.5 h-3.5" />
                {card.flag}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SceneScam;