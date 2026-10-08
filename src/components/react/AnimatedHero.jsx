import { motion } from "framer-motion";

export default function TitleAnimation({title, subtitle}) {
    const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

    return (
        <>
        <motion.h1
            initial={isMobile ? false : { opacity: 0.5, y: 450 }}
            animate={isMobile ? false : { opacity: 1, y: 0 }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="pointer-events-none select-none font-black text-primario m-0 inline-block leading-[0.9] tracking-[-0.05em] text-[clamp(3rem,12vw,7rem)] md:text-[6rem] lg:text-[8rem]"
        >
            {title}
        </motion.h1>
        <motion.h2
            initial={isMobile ? false : { opacity: 0, y: 0 }}
            animate={isMobile ? false : { opacity: 1, y: 0 }}
            transition={isMobile ? undefined : { delay: 0.8, duration: 0.6 }}
            className="pointer-events-none select-none text-secundario font-medium mt-4 inline-block max-w-[95%] text-[clamp(1.1rem,5vw,2.2rem)] leading-[1.2] md:text-[2rem] md:mt-6 lg:text-[3rem] lg:mt-4 lg:max-w-[800px]"
        >
            {subtitle}
        </motion.h2>
        </>
    );
}