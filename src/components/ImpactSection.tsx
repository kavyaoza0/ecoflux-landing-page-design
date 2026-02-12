import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { TiltCard } from "@/components/TiltCard";

interface CounterProps {
  end: number;
  suffix: string;
  label: string;
  duration?: number;
  delay?: number;
}

const Counter = ({ end, suffix, label, duration = 2000, delay = 0 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      let start = 0;
      const step = end / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, end, duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay / 1000, type: "spring", stiffness: 200 }}
      className="text-center group"
    >
      <motion.div
        initial={{ filter: "blur(10px)" }}
        whileInView={{ filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay / 1000 }}
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gradient mb-1 sm:mb-2 cursor-default"
      >
        {count.toLocaleString()}{suffix}
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 + delay / 1000 }}
        className="text-muted-foreground text-[10px] sm:text-xs md:text-sm group-hover:text-foreground transition-colors duration-300"
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

const metrics = [
  { end: 500, suffix: "+", label: "Businesses Powered", delay: 0 },
  { end: 2, suffix: "M", label: "Tons CO₂ Offset", delay: 150 },
  { end: 99, suffix: "%", label: "Uptime Guarantee", delay: 300 },
  { end: 40, suffix: "%", label: "Average Cost Savings", delay: 450 },
];

const ImpactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="impact" ref={ref} className="section-padding relative overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full bg-primary/5 blur-[100px] sm:blur-[150px]" />
      </motion.div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] sm:text-xs md:text-sm uppercase text-primary mb-2 sm:mb-4 font-medium"
          >
            Our Impact
          </motion.p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6">
            Measurable <span className="text-shimmer">Results</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <TiltCard tiltStrength={6} className="glass rounded-xl sm:rounded-3xl p-5 sm:p-10 md:p-16 group overflow-hidden relative">
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-[inherit] p-[1px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, hsl(165 60% 45% / 0.3), hsl(175 70% 40% / 0.1), hsl(165 60% 45% / 0.3))",
                backgroundSize: "200% 100%",
                animation: "gradient-border 4s linear infinite",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-10 relative z-10">
              {metrics.map((m) => (
                <Counter key={m.label} {...m} />
              ))}
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
