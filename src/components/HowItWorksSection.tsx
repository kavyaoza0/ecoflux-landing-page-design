import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TiltCard } from "@/components/TiltCard";

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

const stepVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, hsl(var(--primary) / 0.5) 0px, hsl(var(--primary) / 0.5) 1px, transparent 1px, transparent 80px)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto max-w-6xl relative z-10">
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
            The Process
          </motion.p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6">
            How GreenPulse <span className="text-shimmer">Works</span>
          </h2>
        </motion.div>

        {/* Scroll-driven progress line - desktop only */}
        <div className="hidden md:block relative mb-4">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-border/30" />
          <motion.div
            style={{ width: lineWidth, willChange: "width" }}
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent"
          />
        </div>

        {/* Mobile vertical progress line */}
        <div className="md:hidden relative">
          <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-border/20" />
          <motion.div
            style={{ height: lineWidth, willChange: "height" }}
            className="absolute left-5 top-0 w-[2px] bg-gradient-to-b from-primary to-accent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={stepVariants}
            >
              <TiltCard tiltStrength={12} glareEnabled={false} className="group cursor-default p-2">
                <motion.div
                  initial={{ opacity: 0.05 }}
                  whileInView={{ opacity: [0.05, 0.3, 0.1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-2 sm:mb-4 transition-colors duration-500 group-hover:text-primary/30"
                >
                  {step.number}
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 300 }}
                  className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 mb-2 sm:mb-4"
                >
                  <div className="absolute inset-0 rounded-full bg-primary" />
                  <div className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring" />
                </motion.div>

                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 sm:mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[11px] sm:text-xs md:text-sm">{step.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
