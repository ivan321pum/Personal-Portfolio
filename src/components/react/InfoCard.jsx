import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "../../styles/global.css"

export default function InfoCard({
    title, subtitle, description, direction = 'left',
    videoSrc, bkcgroundColor, titleColor, subtitleColor,
}) {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false); // Default a false para que Astro renderice algo

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // useTransform coge un valor que está en constante cambio (en este caso el scroll en el eje Y)
    // y lo traduce a valores de diseño. El primer parametro en este caso será el scroll en Y, el segundo es
    // en el rango en el que quieres que actue de posición del contenedor, en el tercero es el rango en el que
    // quieres que transforme.

    // --- DURACIÓN DEL SCROLL SEGÚN DISPOSITIVOS ---
    const heightLong = isMobile ? '200vh' : '250vh';

    // --- TRANSFORMACIONES COMPARTIDAS ---
    const imgScale = useTransform(scrollYProgress, [0, 0.4], [1.1, 1]);
    const imgRadius = useTransform(scrollYProgress, [0, 0.4], ["0px", "24px"]);

    // --- LÓGICA DE VIDEO (Desktop vs Mobile) ---
    const imgWidth = useTransform(scrollYProgress, [0, 0.6], ["100vw", isMobile ? "90vw" : "40vw"]);
    const imgHeight = useTransform(scrollYProgress, [0, 0.9], ["100vh", isMobile ? "50vh" : "60vh"]);
    const imgTop = useTransform(scrollYProgress, [0, 0.9], ["0%", isMobile ? "5%" : "20%"]);
    const imgLeft = useTransform(scrollYProgress, [0, 0.9], ["0%", isMobile ? "5%" : (direction === 'left' ? "5%" : "55%")]);

    // --- LÓGICA DE TEXTO (Aparece después) ---
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.4, 0.6], [30, 0]);

    // Posición horizontal del texto
    const textLeft = isMobile ? "5%" : (direction === 'left' ? "50%" : "5%");
    // Posición vertical: En móvil lo bajamos para que empiece debajo del video (50vh + 5% top + margen)
    const textTop = isMobile ? "60%" : "25%";


    return (
        <section
            ref={containerRef}
            className="relative w-[99vw] left-1/2 ml-[-50vw] overflow-visible"
            style={{ height: heightLong, }}>
            <div
                className="sticky top-0 h-screen overflow-hidden"
                style={{ backgroundColor: bkcgroundColor }}>

                {/* CONTENEDOR DEL VIDEO */}
                <motion.div className="absolute overflow-hidden z-1 shadow-2xl"
                    style={{
                        left: imgLeft,
                        top: imgTop,
                        width: imgWidth,
                        height: imgHeight,
                        scale: imgScale,
                        borderRadius: imgRadius,
                    }}
                >
                    <video
                        src={videoSrc}
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover" />

                    <div className="absolute inset-0"
                        style={{
                            background: isMobile
                                ? 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))'
                                : 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)'
                        }} />
                </motion.div>

                {/* CONTENEDOR DEL TEXTO */}
                <motion.div
                    className="absolute z-10"
                    style={{
                        left: textLeft,
                        top: textTop,
                        width: isMobile ? "90%" : "45%",
                        opacity: textOpacity,
                        y: textY,
                        padding: isMobile ? '1.5rem' : '2rem'
                    }}
                >
                    <h3 className="font-black uppercase m-0 leading-none tracking-tight"
                        style={{
                            fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 4rem)',
                            color: titleColor,
                        }}>
                        {title}
                    </h3>
                    <p className="italic mt-2 mb-[1.2rem] mx-0"
                        style={{
                            fontSize: isMobile ? '1.2rem' : 'clamp(1.2rem, 1.5vw, 1.5rem)',
                            color: subtitleColor,
                        }}>
                        {subtitle}
                    </p>
                    <p className="leading-[1.7] max-w-2x1"
                        style={{
                            fontSize: isMobile ? '1rem' : 'clamp(1rem, 1.2vw, 1.2rem)',
                            color: 'var(--color-texto)',
                        }}>
                        {description}
                    </p>
                </motion.div>

            </div>
        </section>
    );
}