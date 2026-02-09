import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Assess",
    description: "We analyze your current energy infrastructure, consumption patterns, and sustainability goals.",
  },
  {
    number: "02",
    title: "Design",
    description: "Our engineers create a custom clean energy roadmap tailored to your facilities and budget.",
  },
  {
    number: "03",
    title: "Implement",
    description: "Seamless integration of smart energy systems with zero disruption to your operations.",
  },
  {
    number: "04",
    title: "Optimize",
    description: "Continuous AI-driven optimization ensures maximum efficiency and cost savings over time.",
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={sectionRef} className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4 font-medium">The Process</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How EcoFlux <span className="text-gradient">Works</span>
          </h2>
        </motion.div>

        {/* Scroll-driven progress line (desktop only) */}
        <div className="hidden md:block relative mb-4">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-border/30" />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent"
          />
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative group cursor-default"
            >
              {/* Step number with hover morph */}
              <motion.div
                className="text-6xl font-black text-primary/10 mb-4 transition-colors duration-500 group-hover:text-primary/30"
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step.number}
              </motion.div>

              {/* Glow dot indicator */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300 }}
                className="w-3 h-3 rounded-full bg-primary mb-4 group-hover:glow-soft transition-shadow duration-500"
              />

              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
