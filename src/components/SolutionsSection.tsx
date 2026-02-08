import { motion } from "framer-motion";
import { Zap, BarChart3, Shield, Leaf } from "lucide-react";

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

const cardVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -8,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 5, scale: 1.15, transition: { type: "spring", stiffness: 400 } },
};

const glowVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.4 } },
};

const SolutionsSection = () => {
  return (
    <section id="solutions" className="section-padding relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4 font-medium">What We Offer</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Smart Energy <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            End-to-end clean energy infrastructure designed for the demands of modern business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              variants={cardVariants}
              whileHover="hover"
              initial-state="rest"
              className="glass rounded-2xl p-8 group relative overflow-hidden cursor-pointer"
            >
              {/* Hover glow background */}
              <motion.div
                variants={glowVariants}
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none"
              />

              {/* Animated border on hover */}
              <motion.div
                variants={glowVariants}
                className="absolute inset-0 rounded-2xl border border-primary/30 pointer-events-none"
              />

              <div className="relative z-10">
                <motion.div
                  variants={iconVariants}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:glow-soft transition-shadow duration-500"
                >
                  <item.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
