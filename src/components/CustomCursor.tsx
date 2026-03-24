import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [label, setLabel] = useState("");
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const trailX = useSpring(0, { stiffness: 80, damping: 18 });
  const trailY = useSpring(0, { stiffness: 80, damping: 18 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        // Magnetic effect — trail pulled toward nearest [data-hover] button
        const hoverEl = document.querySelector<HTMLElement>(
          "button:hover, a:hover, [data-hover]:hover"
        );
        if (hoverEl) {
          const rect = hoverEl.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          trailX.set(cx + dx * 0.35);
          trailY.set(cy + dy * 0.35);
        } else {
          trailX.set(e.clientX);
          trailY.set(e.clientY);
        }
      });
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const btn = t.closest("button, a, [data-hover], [role=button], input, textarea");
      if (btn) {
        setIsHovering(true);
        setLabel(btn.getAttribute("data-label") || "");
      }
      if (t.closest("[data-warning]")) setIsWarning(true);
    };

    const out = () => {
      setIsHovering(false);
      setIsWarning(false);
      setLabel("");
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf.current);
    };
  }, [isMobile, cursorX, cursorY, trailX, trailY]);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Magnetic trail ring — bigger, slower */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          x: trailX,
          y: trailY,
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          translateX: "-50%",
          translateY: "-50%",
          border: `1.5px solid ${isWarning ? "hsl(0 84% 55% / 0.5)" : "hsl(217 91% 50% / 0.4)"}`,
          background: isHovering
            ? isWarning
              ? "hsl(0 84% 55% / 0.08)"
              : "hsl(217 91% 50% / 0.08)"
            : "transparent",
          transition: "width 0.3s, height 0.3s, background 0.3s, border-color 0.3s",
        }}
      >
        {label && (
          <span className="text-[9px] font-bold tracking-wide text-primary whitespace-nowrap">
            {label}
          </span>
        )}
      </motion.div>

      {/* Dot — snappy */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovering ? 6 : 5,
          height: isHovering ? 6 : 5,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: isWarning ? "hsl(0 84% 55%)" : "hsl(217 91% 50%)",
          opacity: isHovering ? 0 : 1,
          transition: "width 0.2s, height 0.2s, background-color 0.3s, opacity 0.2s",
        }}
      />
    </div>
  );
};

export default CustomCursor;
