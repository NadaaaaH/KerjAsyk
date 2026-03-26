import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ThemeContext } from "@/hooks/useTheme";
import Index from "./pages/Index.tsx";
import CaraKerja from "./pages/CaraKerja.tsx";
import Tentang from "./pages/Tentang";
import NotFound from "./pages/NotFound.tsx";
import ScanLoker from "./pages/ScanLoker";
import CekGaji from "./pages/CekGaji";

const queryClient = new QueryClient();

export const PageReadyContext = createContext(false);
export const usePageReady = () => useContext(PageReadyContext);

// ─── Theme Provider ───────────────────────────────────────────
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("kerjasyik-theme") as "light" | "dark" | null;
    if (stored) return stored;
    return "light"; // ← default selalu light
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("kerjasyik-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ─── Loading Screen ───────────────────────────────────────────
const loadingPhrases = [
  "MEMUAT SISTEM...",
  "MENYIAPKAN DATA...",
  "MENGHUBUNGKAN...",
  "HAMPIR SIAP...",
];
const CURTAIN_COUNT = 5;
const CURTAIN_COLORS = [
  "hsl(214 90% 95%)",
  "hsl(217 91% 60%)",
  "hsl(217 91% 55%)",
  "hsl(217 91% 50%)",
  "hsl(217 91% 45%)",
];
const CURTAIN_DONE_MS = 1300;

const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [percent, setPercent] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const tick = () => {
      setPercent((prev) => {
        if (prev >= 100) return 100;
        let increment;
        if (prev < 30) increment = 0.8 + Math.random() * 0.6;
        else if (prev < 60) increment = 0.4 + Math.random() * 0.4;
        else if (prev < 80) increment = 0.15 + Math.random() * 0.2;
        else if (prev < 92) increment = 0.08 + Math.random() * 0.1;
        else increment = 0.3 + Math.random() * 0.3;
        const next = Math.min(prev + increment, 100);
        if (next < 30) setPhraseIndex(0);
        else if (next < 60) setPhraseIndex(1);
        else if (next < 85) setPhraseIndex(2);
        else setPhraseIndex(3);
        return next;
      });
    };
    const interval = setInterval(tick, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent >= 100) {
      const t = setTimeout(() => setExiting(true), 300);
      return () => clearTimeout(t);
    }
  }, [percent]);

  useEffect(() => {
    if (exiting) {
      const t = setTimeout(onDone, CURTAIN_DONE_MS);
      return () => clearTimeout(t);
    }
  }, [exiting, onDone]);

  const displayPercent = Math.floor(percent);

  return (
    <>
      {Array.from({ length: CURTAIN_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0"
          style={{
            left: `${(i / CURTAIN_COUNT) * 100}%`,
            width: `${100 / CURTAIN_COUNT}%`,
            height: "100%",
            zIndex: 99999,
            background: CURTAIN_COLORS[i],
            willChange: "transform",
          }}
          animate={exiting ? { y: "-100%" } : { y: "0%" }}
          transition={
            exiting
              ? { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: i * 0.07 }
              : { duration: 0 }
          }
        />
      ))}
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 100000 }}
        animate={exiting ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
        transition={exiting ? { duration: 0.3, ease: "easeIn" } : { duration: 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(210 80% 98%) 0%, hsl(214 90% 95%) 50%, hsl(200 70% 97%) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(217 91% 50% / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 50% / 0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 dot-pattern" />
        <div
          className="absolute"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(circle, hsl(217 91% 50% / 0.06), transparent 70%)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <motion.div
          className="relative flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-xs font-semibold tracking-[0.4em] uppercase"
            style={{ color: "hsl(217 91% 55%)", fontFamily: "'Poppins', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            KERJASYIK
          </motion.p>
          <div className="flex items-end gap-1">
            <span
              className="font-black leading-none"
              style={{
                fontSize: "clamp(80px, 18vw, 160px)",
                color: "hsl(215 25% 15%)",
                fontFamily: "'Poppins', sans-serif",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.04em",
              }}
            >
              {displayPercent}
            </span>
            <span
              className="font-bold mb-4"
              style={{
                fontSize: "clamp(20px, 4vw, 36px)",
                color: "hsl(217 91% 50%)",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              %
            </span>
          </div>
          <div className="relative w-64 md:w-96">
            <div className="w-full h-px" style={{ background: "hsl(217 91% 50% / 0.15)" }} />
            <div
              className="absolute top-0 left-0 h-px"
              style={{
                background: "linear-gradient(90deg, hsl(217 91% 50%), hsl(160 65% 45%))",
                width: `${percent}%`,
                boxShadow: "0 0 8px hsl(217 91% 50% / 0.4)",
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                background: "hsl(217 91% 50%)",
                left: `calc(${percent}% - 3px)`,
                boxShadow: "0 0 6px hsl(217 91% 50% / 0.6)",
              }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              className="text-xs tracking-[0.3em] font-medium"
              style={{ color: "hsl(217 91% 50% / 0.5)", fontFamily: "'Poppins', sans-serif" }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {loadingPhrases[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
        <div className="absolute top-8 left-8 w-8 h-8" style={{ borderTop: "1.5px solid hsl(217 91% 50% / 0.25)", borderLeft: "1.5px solid hsl(217 91% 50% / 0.25)" }} />
        <div className="absolute top-8 right-8 w-8 h-8" style={{ borderTop: "1.5px solid hsl(217 91% 50% / 0.25)", borderRight: "1.5px solid hsl(217 91% 50% / 0.25)" }} />
        <div className="absolute bottom-8 left-8 w-8 h-8" style={{ borderBottom: "1.5px solid hsl(217 91% 50% / 0.25)", borderLeft: "1.5px solid hsl(217 91% 50% / 0.25)" }} />
        <div className="absolute bottom-8 right-8 w-8 h-8" style={{ borderBottom: "1.5px solid hsl(217 91% 50% / 0.25)", borderRight: "1.5px solid hsl(217 91% 50% / 0.25)" }} />
      </motion.div>
    </>
  );
};

// ─── App ──────────────────────────────────────────────────────
const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [pageReady, setPageReady] = useState(false);

  const handleDone = () => {
    setShowLoader(false);
    setPageReady(true);
  };

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <PageReadyContext.Provider value={pageReady}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/scan-loker" element={<ScanLoker />} />
                <Route path="/cek-gaji" element={<CekGaji />} />
                <Route path="/cara-kerja" element={<CaraKerja />} />
                <Route path="/tentang" element={<Tentang />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </PageReadyContext.Provider>
          {showLoader && <LoadingScreen onDone={handleDone} />}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;