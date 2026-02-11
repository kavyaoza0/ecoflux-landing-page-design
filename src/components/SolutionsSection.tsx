import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, BarChart3, Shield, Leaf } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

const solutions = [
  {
    icon: Zap,
    title: "Smart Grid Integration",
    description: "AI-powered grid management that optimizes energy distribution in real-time across your facilities.",
  },
  {
    icon: BarChart3,
    title: "Energy Analytics",
    description: "Deep insights into your energy consumption patterns with predictive modeling and cost optimization.",
  },
  {
    icon: Shield,
    title: "Carbon Compliance",
    description: "Automated carbon tracking and regulatory compliance reporting that keeps you ahead of mandates.",
  },
  {
    icon: Leaf,
    title: "Renewable Sourcing",
    description: "Direct access to renewable energy markets with transparent pricing and verified green certificates.",
  },
];

const iconVariants = {
  rest: { rotate: 0, scale: 1, z: 0 },
  hover: { rotate: 10, scale: 1.2, z: 30, transition: { type: "spring", stiffness: 400 } },
};

const glowVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.4 } },
};

const SolutionsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="solutions" ref={ref} className="section-padding relative overflow-hidden">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-primary mb-3 sm:mb-4 font-medium">What We Offer</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
            Smart Energy <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg px-2">
            End-to-end clean energy infrastructure designed for the demands of modern business.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {solutions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <TiltCard
                tiltStrength={10}
                className="glass rounded-2xl p-6 sm:p-8 group cursor-pointer overflow-hidden h-full"
              >
                <motion.div variants={glowVariants} initial="rest" whileHover="hover" className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />
                <motion.div variants={glowVariants} initial="rest" whileHover="hover" className="absolute inset-0 rounded-2xl border border-primary/30 pointer-events-none" />

                <div className="relative z-10" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                  <motion.div variants={iconVariants} initial="rest" whileHover="hover" className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:glow-soft transition-shadow duration-500">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{item.description}</p>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="mt-3 sm:mt-4 text-primary text-sm font-medium"
                  >
                    Learn more →
                  </motion.div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
