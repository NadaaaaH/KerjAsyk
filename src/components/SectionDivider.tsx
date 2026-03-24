interface SectionDividerProps {
  fromColor?: string;  // warna section di atas
  toColor?: string;    // warna section di bawah
  flip?: boolean;      // balik arah wave
  variant?: "wave" | "tilt" | "curve";
}

/**
 * SectionDivider — SVG pemisah antar scene.
 * Taruh di antara dua <section>.
 *
 * Contoh:
 *   <SectionDivider fromColor="#f0f6ff" toColor="#f0faf6" />
 */
const SectionDivider = ({
  fromColor = "hsl(210,80%,97%)",
  toColor = "hsl(214,80%,95%)",
  flip = false,
  variant = "wave",
}: SectionDividerProps) => {
  const paths = {
    wave: "M0,32 C360,90 720,-20 1440,40 L1440,0 L0,0 Z",
    tilt: "M0,0 L1440,60 L1440,0 Z",
    curve: "M0,0 Q720,80 1440,0 L1440,0 L0,0 Z",
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: "-2px",
        marginBottom: "-2px",
        background: toColor,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: 60 }}
      >
        <path d={paths[variant]} fill={fromColor} />
      </svg>
    </div>
  );
};

export default SectionDivider;
