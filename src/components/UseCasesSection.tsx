import { motion } from "framer-motion";
import { Building2, Factory, Hotel, Store } from "lucide-react";

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
  return (
    <section id="use-cases" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4 font-medium">Industries</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Built for <span className="text-gradient">Business</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From offices to factories, EcoFlux scales to meet the unique energy needs of any industry.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -12,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="glass rounded-2xl p-6 text-center group cursor-pointer relative overflow-hidden"
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:glow-soft transition-shadow duration-500"
                >
                  <item.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
