import { useRef, useEffect, useState } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;       // delay awal dalam detik
  stagger?: number;     // jarak antar kata dalam detik
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * TextReveal — setiap kata muncul dari bawah dengan clip animation.
 * Pakai di headline untuk efek premium kayak ifalf.com
 *
 * Contoh:
 *   <TextReveal as="h1" className="text-display" delay={0.2}>
 *     Cari kerja tak seharusnya jadi teka-teki
 *   </TextReveal>
 */
const TextReveal = ({
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
  as: Tag = "p",
}: TextRevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.split(" ");

  return (
    // @ts-ignore
    <Tag ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1.1 }}>
          <span
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0%)" : "translateY(110%)",
              transition: `transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)`,
              transitionDelay: `${delay + i * stagger}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
