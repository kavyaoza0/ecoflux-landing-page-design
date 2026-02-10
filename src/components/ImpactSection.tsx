import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

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
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotateY: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-5xl md:text-6xl font-bold text-gradient mb-2 cursor-default"
        style={{ perspective: "600px" }}
      >
        {count.toLocaleString()}{suffix}
      </motion.div>
      <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">{label}</p>
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
      {/* Soft centered glow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
      </motion.div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4 font-medium">Our Impact</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Measurable <span className="text-gradient">Results</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-12 md:p-16 relative overflow-hidden group"
        >
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ boxShadow: "inset 0 0 60px hsl(165 60% 45% / 0.08)" }}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {metrics.map((m) => (
              <Counter key={m.label} {...m} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
