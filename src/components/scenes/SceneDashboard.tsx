import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Upload, ScanSearch, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    label: "Upload Loker",
    desc: "Tempel link atau screenshot lowongan",
    number: "01",
    color: "hsl(var(--primary))",
    bg: "hsl(var(--primary) / 0.06)",
    hint: "URL · Teks · Gambar",
    image: "/steps/step-upload.png",
  },
  {
    icon: ScanSearch,
    label: "Scan Otomatis",
    desc: "AI menganalisis pola penipuan secara mendalam",
    number: "02",
    color: "hsl(217 91% 55%)",
    bg: "hsl(217 91% 55% / 0.06)",
    hint: "< 3 detik",
    image: "/steps/step-scan.png",
  },
  {
    icon: ShieldCheck,
    label: "Verifikasi",
    desc: "Cek database perusahaan resmi & terpercaya",
    number: "03",
    color: "hsl(var(--accent-mint))",
    bg: "hsl(var(--accent-mint) / 0.06)",
    hint: "500+ perusahaan",
    image: "/steps/step-verify.png",
  },
  {
    icon: CheckCircle2,
    label: "Hasil Aman",
    desc: "Loker terverifikasi, siap lamar dengan percaya diri!",
    number: "04",
    color: "hsl(160 65% 40%)",
    bg: "hsl(160 65% 40% / 0.06)",
    hint: "98% akurasi",
    image: "/steps/step-safe.png",
  },
];

// Floating image pakai portal — render langsung ke body biar tidak ketahan overflow
const FloatingImage = ({
  image, color, hovered, mouseX, mouseY,
}: {
  image: string;
  color: string;
  hovered: boolean;
  mouseX: number;
  mouseY: number;
}) => {
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.8 });
  const springScale = useSpring(hovered ? 1 : 0, { stiffness: 200, damping: 22 });

  useEffect(() => { springX.set(mouseX); }, [mouseX]);
  useEffect(() => { springY.set(mouseY); }, [mouseY]);
  useEffect(() => { springScale.set(hovered ? 1 : 0); }, [hovered]);

  return createPortal(
    <motion.div
      className="fixed pointer-events-none z-[99998]"
      style={{
        left: springX,
        top: springY,
        x: "-50%",
        y: "-60%",
        scale: springScale,
      }}
    >
      <motion.div
        className="rounded-2xl overflow-hidden"
        style={{
          width: 280,
          height: 170,
          boxShadow: `0 24px 60px ${color}40, 0 8px 24px rgba(0,0,0,0.2)`,
        }}
        animate={{ rotate: hovered ? [-1, 1, -0.5, 0] : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0" style={{ background: `${color}0d` }} />
      </motion.div>
    </motion.div>,
    document.body
  );
};

const StepItem = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const Icon = step.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <motion.div
      className="relative border-b flex items-center justify-between py-6 md:py-9 cursor-pointer"
      style={{ borderColor: "hsl(var(--border))" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Hover background fill */}
      <motion.div
        className="absolute inset-0 z-0 rounded-sm"
        style={{ background: step.bg }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating image via portal */}
      <FloatingImage
        image={step.image}
        color={step.color}
        hovered={hovered}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
      />

      {/* Left: number + content */}
      <div className="relative z-10 flex items-center gap-6 md:gap-10">
        <motion.span
          className="text-xs font-bold tabular-nums flex-shrink-0 w-6"
          animate={{ color: hovered ? step.color : "hsl(var(--muted-foreground) / 0.35)" }}
          transition={{ duration: 0.3 }}
        >
          {step.number}
        </motion.span>

        <div>
          <motion.p
            className="text-2xl md:text-4xl font-bold tracking-tight"
            animate={{
              color: hovered ? step.color : "hsl(var(--foreground))",
              x: hovered ? 6 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.label}
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground mt-1"
            animate={{ opacity: hovered ? 1 : 0.5, x: hovered ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {step.desc}
          </motion.p>
        </div>
      </div>

      {/* Right */}
      <div className="relative z-10 flex items-center gap-3 flex-shrink-0 ml-4">
        <motion.span
          className="hidden md:block text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: step.bg, color: step.color }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 12 }}
          transition={{ duration: 0.3 }}
        >
          {step.hint}
        </motion.span>

        <motion.div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          animate={{
            background: hovered ? step.color : step.bg,
            scale: hovered ? 1.12 : 1,
            rotate: hovered ? 45 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div animate={{ rotate: hovered ? -45 : 0 }} transition={{ duration: 0.35 }}>
            {hovered
              ? <ArrowRight className="w-4 h-4 text-white" />
              : <Icon className="w-4 h-4" style={{ color: step.color }} />
            }
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SceneDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const y = useTransform(smoothScroll, [0, 1], ["3%", "-3%"]);

  return (
    <section ref={ref} className="scene-container flex items-center justify-center py-32" style={{ minHeight: "130vh" }}>
      <div className="absolute inset-0 z-0 hope-gradient" />
      <div className="absolute inset-0 z-0 grid-pattern" />
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 50% 40%, hsl(217 91% 50% / 0.06), transparent 60%)",
      }} />

      <motion.div className="relative z-10 max-w-4xl mx-auto px-6 w-full" style={{ y }}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">Cara Kerja</p>
          <h2 className="text-display text-foreground mb-4">
            Semudah <span className="text-primary">empat langkah.</span>
          </h2>
          <p className="text-body-scene text-muted-foreground">
            Dari curiga jadi yakin, dalam hitungan detik.
          </p>
        </motion.div>

        <div className="border-t" style={{ borderColor: "hsl(var(--border))" }}>
          {steps.map((step, i) => (
            <StepItem key={i} step={step} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-12 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            Sudah <span className="font-bold text-foreground">10.000+</span> loker dianalisis
          </p>
          <motion.a
            href="#scan-loker"
            className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full text-white cursor-pointer"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(217 91% 42%))" }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 24px hsl(var(--primary) / 0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            Coba Sekarang <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SceneDashboard;