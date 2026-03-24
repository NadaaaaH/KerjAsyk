import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AlertTriangle, Ban, Skull, CircleAlert } from "lucide-react";

const pileCards = [
  { title: "Transfer dulu Rp 200rb", icon: Ban, rot: -8 },
  { title: "Data KTP & rekening", icon: Skull, rot: 5 },
  { title: "Training berbayar wajib", icon: CircleAlert, rot: -3 },
  { title: "Slot tinggal 2!", icon: AlertTriangle, rot: 7 },
  { title: "Hubungi via WA pribadi", icon: Ban, rot: -5 },
  { title: "Komisi langsung cair", icon: CircleAlert, rot: 4 },
];

const SceneFalling = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const pushZ = useTransform(scrollYProgress, [0.2, 0.7], [0.95, 1.06]);
  const clutterY = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);
  const bgIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.6]);

  return (
    <section ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "120vh" }}>
      <div className="absolute inset-0 z-0" style={{
        background: "linear-gradient(180deg, hsl(210 80% 97%) 0%, hsl(0 70% 97%) 40%, hsl(0 65% 96%) 60%, hsl(210 80% 97%) 100%)",
      }} />
      <div className="absolute inset-0 z-0 grid-pattern" />
      <motion.div className="absolute inset-0 z-0" style={{
        opacity: bgIntensity,
        background: "radial-gradient(ellipse at 50% 50%, hsl(0 84% 55% / 0.07), transparent 60%)",
      }} />

      <motion.div className="relative z-10 max-w-4xl mx-auto px-6" style={{ scale: pushZ, y: clutterY }}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-display text-foreground mb-4">
            Makin dalam,
            <br />
            <span style={{ color: "hsl(var(--danger))" }}>makin terjebak.</span>
          </h2>
          <p className="text-body-scene text-muted-foreground mx-auto">
            Penipuan berjajar, menyamar jadi peluang.
          </p>
        </motion.div>

        <div className="relative h-[400px] md:h-[450px] mx-auto max-w-lg">
          {pileCards.map((card, i) => (
            <motion.div
              key={i}
              data-warning
              className="absolute w-[260px] md:w-[300px] glass-surface rounded-2xl p-5 flex items-center gap-3"
              style={{
                borderColor: "hsl(var(--danger) / 0.12)",
                left: `${10 + (i % 3) * 14}%`,
                top: `${5 + i * 12}%`,
                rotate: card.rot,
                zIndex: pileCards.length - i,
              }}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20, transition: { duration: 0.2 } }}
            >
              <card.icon className="w-5 h-5 flex-shrink-0" style={{ color: "hsl(var(--danger) / 0.7)" }} />
              <span className="text-sm font-medium text-foreground">{card.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SceneFalling;
