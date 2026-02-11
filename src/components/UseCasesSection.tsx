import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Factory, Hotel, Store } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

const useCases = [
  {
    icon: Building2,
    title: "Corporate Offices",
    description: "Reduce operational energy costs by up to 45% with smart building energy management.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Power production lines with clean energy while meeting ESG reporting requirements.",
  },
  {
    icon: Hotel,
    title: "Hospitality",
    description: "Achieve green certifications and attract eco-conscious guests with verified clean energy.",
  },
  {
    icon: Store,
    title: "Retail Chains",
    description: "Standardize energy efficiency across hundreds of locations with centralized management.",
  },
];

const UseCasesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="use-cases" ref={ref} className="section-padding relative overflow-hidden">
      <motion.div
        style={{ x: bgX }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none"
      />
      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-primary/[0.03] blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-primary mb-2 sm:mb-4 font-medium">Industries</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6">
            Built for <span className="text-gradient">Business</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            From offices to factories, EcoFlux scales to meet the unique energy needs of any industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {useCases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltCard tiltStrength={14} className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center group cursor-pointer overflow-hidden h-full">
                <div className="absolute inset-0 rounded-[inherit] border border-transparent group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-5 group-hover:glow-soft transition-shadow duration-500"
                  >
                    <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                  </motion.div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-muted-foreground text-[11px] sm:text-xs md:text-sm leading-relaxed">{item.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
