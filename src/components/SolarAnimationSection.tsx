import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { label: "Sunlight is captured", range: [0.15, 0.3] as [number, number] },
  { label: "Energy is converted", range: [0.4, 0.55] as [number, number] },
  { label: "Clean power is delivered", range: [0.65, 0.8] as [number, number] },
];

const SolarAnimationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Sun descent
  const sunY = useTransform(scrollYProgress, [0, 0.6], [0, 220]);
  const sunScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);
  const sunGlow = useTransform(scrollYProgress, [0, 0.4], [40, 80]);

  // Rays
  const rayLength = useTransform(scrollYProgress, [0.1, 0.5], [0, 100]);
  const rayOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0, 0.6, 0.9]);

  // Panel glow
  const panelGlow = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const panelGlowSpread = useTransform(scrollYProgress, [0.45, 0.7], [0, 30]);

  // Energy lines
  const energyOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const energyWidth = useTransform(scrollYProgress, [0.55, 0.8], [0, 100]);

  // Pulse
  const pulseScale = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);
  const pulseOpacity = useTransform(scrollYProgress, [0.6, 0.75, 0.9], [0, 0.3, 0]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #e8f4fd 0%, #f0f9ff 40%, #f8fcff 100%)" }}
      >
        {/* Title */}
        <motion.div
          className="absolute top-8 sm:top-12 md:top-16 left-0 right-0 text-center z-20 px-4"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0]) }}
        >
          <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-emerald-600/70 mb-2 font-medium">The Process</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-800">
            How Solar Energy <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-emerald-500">Works</span>
          </h2>
        </motion.div>

        {/* Sun */}
        <motion.div
          className="absolute z-10"
          style={{
            top: "12%",
            y: sunY,
            scale: sunScale,
            willChange: "transform",
          }}
        >
          <motion.div
            className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full"
            style={{
              background: "radial-gradient(circle, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
              boxShadow: useTransform(sunGlow, (v) => `0 0 ${v}px ${v / 2}px rgba(251, 191, 36, 0.4), 0 0 ${v * 2}px ${v}px rgba(251, 191, 36, 0.15)`),
            }}
          />
        </motion.div>

        {/* Sun Rays */}
        {[...Array(7)].map((_, i) => {
          const angle = -30 + i * 10; // spread from -30 to 30 degrees
          return (
            <motion.div
              key={i}
              className="absolute z-[5] origin-top"
              style={{
                top: "28%",
                left: "50%",
                width: "2px",
                height: useTransform(rayLength, (v) => `${v * (0.7 + Math.random() * 0.6)}%`),
                opacity: rayOpacity,
                background: `linear-gradient(180deg, rgba(251, 191, 36, 0.8) 0%, rgba(251, 191, 36, 0.1) 60%, rgba(16, 185, 129, 0.3) 100%)`,
                transform: `translateX(-50%) rotate(${angle}deg)`,
                willChange: "height, opacity",
              }}
            />
          );
        })}

        {/* Solar Panels */}
        <div className="absolute bottom-[18%] sm:bottom-[20%] left-1/2 -translate-x-1/2 z-10 flex gap-2 sm:gap-3 md:gap-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="relative"
              style={{
                width: "clamp(40px, 10vw, 70px)",
                height: "clamp(50px, 12vw, 85px)",
              }}
            >
              {/* Panel body */}
              <div
                className="w-full h-full rounded-sm border border-slate-300/60"
                style={{
                  background: "linear-gradient(145deg, #1e3a5f 0%, #1a2d47 50%, #162436 100%)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {/* Grid lines */}
                <div className="absolute inset-[3px] grid grid-cols-3 grid-rows-4 gap-[1px] opacity-30">
                  {[...Array(12)].map((_, j) => (
                    <div key={j} className="border border-sky-400/20 rounded-[1px]" />
                  ))}
                </div>
              </div>

              {/* Panel glow overlay */}
              <motion.div
                className="absolute inset-0 rounded-sm"
                style={{
                  opacity: panelGlow,
                  background: "linear-gradient(145deg, rgba(16, 185, 129, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)",
                  boxShadow: useTransform(panelGlowSpread, (v) => `0 0 ${v}px ${v / 3}px rgba(16, 185, 129, 0.25)`),
                }}
              />

              {/* Panel stand */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[3px] h-3 bg-slate-400 rounded-b" />
            </motion.div>
          ))}
        </div>

        {/* Energy lines outward from panels */}
        <motion.div
          className="absolute bottom-[12%] sm:bottom-[14%] left-1/2 -translate-x-1/2 z-[6]"
          style={{ opacity: energyOpacity }}
        >
          {[...Array(3)].map((_, i) => {
            const offsetX = (i - 1) * 120;
            return (
              <motion.div
                key={i}
                className="absolute h-[2px] rounded-full"
                style={{
                  width: useTransform(energyWidth, (v) => `${v * 0.8}px`),
                  left: `${offsetX}px`,
                  top: `${i * 8}px`,
                  background: "linear-gradient(90deg, rgba(16, 185, 129, 0.8), rgba(16, 185, 129, 0))",
                  willChange: "width",
                }}
              />
            );
          })}
        </motion.div>

        {/* Pulse effect */}
        <motion.div
          className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-[4] rounded-full pointer-events-none"
          style={{
            width: useTransform(pulseScale, (v) => `${v * 600}px`),
            height: useTransform(pulseScale, (v) => `${v * 600}px`),
            opacity: pulseOpacity,
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
            willChange: "width, height, opacity",
          }}
        />

        {/* Step text */}
        <div className="absolute bottom-[4%] sm:bottom-[6%] left-0 right-0 z-20 flex justify-center gap-4 sm:gap-8 md:gap-16 px-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="text-center"
              style={{
                opacity: useTransform(scrollYProgress, [step.range[0] - 0.05, step.range[0], step.range[1], step.range[1] + 0.05], [0, 1, 1, 0.4]),
                y: useTransform(scrollYProgress, [step.range[0] - 0.05, step.range[0]], [20, 0]),
              }}
            >
              <div className="text-[10px] sm:text-xs font-semibold text-emerald-600/60 mb-1">Step {i + 1}</div>
              <p className="text-xs sm:text-sm md:text-base font-medium text-slate-700 max-w-[120px] sm:max-w-none">{step.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarAnimationSection;
