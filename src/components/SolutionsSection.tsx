import { useRef } from "react";
import { motion } from "framer-motion";
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

const SolutionsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="solutions" ref={ref} className="section-padding relative overflow-hidden">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-primary/[0.04] blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full bg-accent/[0.03] blur-[60px] sm:blur-[100px]" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-primary mb-2 sm:mb-4 font-medium">What We Offer</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6">
            Smart Energy <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            End-to-end clean energy infrastructure designed for the demands of modern business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          {solutions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard
                tiltStrength={10}
                className="glass rounded-xl sm:rounded-2xl p-5 sm:p-8 group cursor-pointer overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 rounded-[inherit] border border-transparent group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-6 group-hover:glow-soft transition-shadow duration-500">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">{item.description}</p>
                  <div className="mt-3 sm:mt-4 text-primary text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more →
                  </div>
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
