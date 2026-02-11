import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";
import { MagneticButton } from "@/components/MagneticButton";
import { TextReveal } from "@/components/TextReveal";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.9]);

  return (
    <section id="hero" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background video with scroll parallax */}
      <motion.div
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </motion.div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-20 text-center max-w-5xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary mb-6 sm:mb-8 font-medium"
        >
          Smart Energy for a Better World
        </motion.p>

        <TextReveal delay={0.4}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 sm:mb-8">
            Powering a<br />
            <span className="text-gradient">Cleaner Tomorrow.</span>
          </h1>
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
        >
          Intelligent clean energy solutions that help businesses reduce costs,
          cut emissions, and build a sustainable future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <MagneticButton strength={0.3}>
            <Button variant="hero" size="lg" className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto">
              Power the Future
            </Button>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Button variant="heroOutline" size="lg" className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto">
              Learn More
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
