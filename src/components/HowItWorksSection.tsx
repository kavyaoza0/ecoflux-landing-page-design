import { motion } from "framer-motion";

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

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Step number with hover effect */}
              <motion.div
                className="text-6xl font-black text-primary/10 mb-4 transition-colors duration-500 group-hover:text-primary/25"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step.number}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>

              {/* Connecting line */}
              {i < steps.length - 1 && (
                <motion.div
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="hidden md:block absolute top-10 -right-4 w-8 h-[2px] bg-gradient-to-r from-primary/30 to-primary/5 origin-left"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
