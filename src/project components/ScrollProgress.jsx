import { motion, useScroll, useSpring } from "motion/react";

// Thin bar at the very top that fills as you scroll down the page
function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

    return (
        <motion.div
            className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left"
            style={{
                scaleX,
                background: "linear-gradient(to right, var(--accent), var(--accent-2), var(--accent-3))",
            }}
        />
    );
}

export default ScrollProgress;