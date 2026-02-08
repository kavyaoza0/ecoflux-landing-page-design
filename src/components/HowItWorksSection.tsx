import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
  return (
    <section id="how-it-works" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4 font-medium">The Process</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How EcoFlux <span className="text-gradient">Works</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              <div className="text-6xl font-black text-primary/10 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-8 -right-4 text-primary/20 w-6 h-6" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
