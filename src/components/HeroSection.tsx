import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";
import { MagneticButton } from "@/components/MagneticButton";
import { TextReveal } from "@/components/TextReveal";
import EnergyLines from "@/components/EnergyLines";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const videoRotate = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.9]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video with scroll parallax + rotation */}
      <motion.div
        style={{ scale: videoScale, opacity: videoOpacity, rotate: videoRotate }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster=""
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </motion.div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')] animate-grain" />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(165 60% 45% / 0.1) 2px, hsl(165 60% 45% / 0.1) 4px)",
        }}
      />

      {/* Energy lines animation */}
      <EnergyLines />

      {/* Floating orbs with enhanced animation */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/8 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 20, 0], y: [0, 30, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-accent/6 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
      />

      {/* Content */}
      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-20 text-center max-w-4xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sm tracking-[0.3em] uppercase text-primary mb-8 font-medium"
        >
          Smart Energy for a Better World
        </motion.p>

        <TextReveal delay={0.4}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
            Powering a<br />
            <span className="text-gradient">Cleaner Tomorrow.</span>
          </h1>
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Intelligent clean energy solutions that help businesses reduce costs,
          cut emissions, and build a sustainable future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton strength={0.3}>
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              Power the Future
            </Button>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6">
              Learn More
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
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
