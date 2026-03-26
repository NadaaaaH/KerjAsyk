import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Index from "./pages/Index.tsx";
import CaraKerja from "./pages/CaraKerja.tsx";
import Tentang from "./pages/Tentang";
import NotFound from "./pages/NotFound.tsx";
import ScanLoker from "./pages/ScanLoker";
import CekGaji from "./pages/CekGaji";

const queryClient = new QueryClient();

const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-6"
      style={{ background: "linear-gradient(180deg, hsl(210 80% 97%) 0%, hsl(214 90% 94%) 100%)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 dot-pattern" />
      <motion.div
        className="relative flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <motion.div className="absolute inset-0 rounded-full"
            style={{ border: "2px solid hsl(217 91% 50% / 0.15)" }} />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ borderTop: "2px solid hsl(217 91% 50%)", borderRight: "2px solid transparent", borderBottom: "2px solid transparent", borderLeft: "2px solid transparent" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-xl font-black text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>K</span>
        </div>
        <motion.p
          className="text-lg font-bold tracking-tight text-foreground"
          style={{ fontFamily: "'Poppins', sans-serif" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          KerjaSyik
        </motion.p>
        <motion.p
          className="text-xs text-muted-foreground font-light"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Deteksi penipuan. Bandingkan gaji.
        </motion.p>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, hsl(217 91% 50%), hsl(160 65% 40%))" }}
        initial={{ width: "0%" }} animate={{ width: "100%" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loader" onDone={() => setLoading(false)} />
          ) : (
            <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
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
            </motion.div>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;