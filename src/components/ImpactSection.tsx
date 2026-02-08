import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  end: number;
  suffix: string;
  label: string;
  duration?: number;
}

const Counter = ({ end, suffix, label, duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-gradient mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

const metrics = [
  { end: 500, suffix: "+", label: "Businesses Powered" },
  { end: 2, suffix: "M", label: "Tons CO₂ Offset" },
  { end: 99, suffix: "%", label: "Uptime Guarantee" },
  { end: 40, suffix: "%", label: "Average Cost Savings" },
];

const ImpactSection = () => {
  return (
    <section id="impact" className="section-padding relative">
      <div className="container mx-auto max-w-5xl">
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

        <div className="glass rounded-3xl p-12 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {metrics.map((m) => (
              <Counter key={m.label} {...m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
