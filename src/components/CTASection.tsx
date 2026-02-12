import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="cta" ref={ref} className="section-padding relative overflow-hidden">
      {/* Animated glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-primary blur-[100px] sm:blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 left-1/3 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full bg-accent blur-[80px] sm:blur-[120px] pointer-events-none"
      />

      <motion.div style={{ scale, opacity }} className="container mx-auto max-w-3xl relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6 leading-tight"
          >
            Ready to Power<br />
            <span className="text-shimmer">Your Future?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 sm:mb-10 px-2"
          >
            Join hundreds of forward-thinking businesses already saving costs and reducing emissions with EcoFlux.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          >
            <MagneticButton strength={0.3}>
              <Button variant="hero" size="lg" className="text-sm sm:text-base px-6 sm:px-10 py-4 sm:py-6 w-full sm:w-auto">
                Get Started Today
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button variant="heroOutline" size="lg" className="text-sm sm:text-base px-6 sm:px-10 py-4 sm:py-6 w-full sm:w-auto">
                Schedule a Demo
              </Button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
