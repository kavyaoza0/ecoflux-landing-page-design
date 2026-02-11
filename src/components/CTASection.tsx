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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-primary/[0.04] blur-[100px] sm:blur-[150px] pointer-events-none" />

      <motion.div style={{ scale, opacity }} className="container mx-auto max-w-3xl relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6 leading-tight">
            Ready to Power<br />
            <span className="text-gradient">Your Future?</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 sm:mb-10 px-2">
            Join hundreds of forward-thinking businesses already saving costs and reducing emissions with EcoFlux.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
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
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
