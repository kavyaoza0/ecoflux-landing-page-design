import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";

const CTASection = () => {
  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      {/* Animated glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-3xl animate-float-slow" />

      <div className="container mx-auto max-w-3xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Power<br />
            <span className="text-gradient">Your Future?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Join hundreds of forward-thinking businesses already saving costs and reducing emissions with EcoFlux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton strength={0.3}>
              <Button variant="hero" size="lg" className="text-base px-10 py-6">
                Get Started Today
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button variant="heroOutline" size="lg" className="text-base px-10 py-6">
                Schedule a Demo
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
