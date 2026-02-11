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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="text-center group"
    >
      <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gradient mb-1 sm:mb-2 cursor-default">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm group-hover:text-foreground transition-colors duration-300">{label}</p>
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
          <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-primary mb-2 sm:mb-4 font-medium">Our Impact</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6">
            Measurable <span className="text-gradient">Results</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TiltCard tiltStrength={6} className="glass rounded-xl sm:rounded-3xl p-5 sm:p-10 md:p-16 group overflow-hidden">
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
