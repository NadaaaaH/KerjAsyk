import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl"
      animate={{
        background: isDark ? "hsl(220 20% 18%)" : "hsl(214 32% 93%)",
        borderColor: isDark ? "hsl(220 18% 24%)" : "hsl(214 20% 86%)",
      }}
      style={{ border: "1px solid" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.2 }}
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.svg
            key="moon"
            xmlns="http://www.w3.org/2000/svg"
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="hsl(38 95% 60%)"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ opacity: 0, rotate: -40, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 40, scale: 0.7 }}
            transition={{ duration: 0.22 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            xmlns="http://www.w3.org/2000/svg"
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="hsl(38 95% 48%)"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ opacity: 0, rotate: 40, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -40, scale: 0.7 }}
            transition={{ duration: 0.22 }}
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
};