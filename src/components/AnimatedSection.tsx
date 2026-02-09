import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  parallax?: boolean;
  parallaxStrength?: number;
}

const AnimatedSection = ({
  children,
  className = "",
  parallax = false,
  parallaxStrength = 50,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={parallax ? { y, opacity, scale } : { opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
