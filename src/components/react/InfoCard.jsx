import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

    // --- TRANSFORMACIONES COMPARTIDAS ---
    const imgScale = useTransform(scrollYProgress, [0, 0.4], [1.1, 1]);
    const imgRadius = useTransform(scrollYProgress, [0, 0.4], ["0px", "24px"]);

    // --- LÓGICA DE VIDEO (Desktop vs Mobile) ---
    const imgWidth = useTransform(scrollYProgress, [0, 0.4], ["100vw", isMobile ? "90vw" : "40vw"]);
    const imgHeight = useTransform(scrollYProgress, [0, 0.4], ["100vh", isMobile ? "50vh" : "60vh"]);
    const imgTop = useTransform(scrollYProgress, [0, 0.4], ["0%", isMobile ? "5%" : "20%"]);
    const imgLeft = useTransform(scrollYProgress, [0, 0.4], ["0%", isMobile ? "5%" : (direction === 'left' ? "5%" : "55%")]);

    // --- LÓGICA DE TEXTO (Aparece después) ---
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.4, 0.6], [30, 0]);

    // Posición horizontal del texto
    const textLeft = isMobile ? "5%" : (direction === 'left' ? "50%" : "5%");
    // Posición vertical: En móvil lo bajamos para que empiece debajo del video (50vh + 5% top + margen)
    const textTop = isMobile ? "60%" : "25%";

    return (
        <section ref={containerRef} style={{
            height: '300vh',
            position: 'relative',
            width: '99vw',
            left: '50%',
            marginLeft: '-50vw',
            overflow: 'visible' // Permitimos que el sticky respire
        }}>
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: bkcgroundColor
            }}>

                {/* CONTENEDOR DEL VIDEO */}
                <motion.div
                    style={{
                        position: 'absolute',
                        left: imgLeft,
                        top: imgTop,
                        width: imgWidth,
                        height: imgHeight,
                        scale: imgScale,
                        borderRadius: imgRadius,
                        overflow: 'hidden',
                        zIndex: 1,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                >
                    <video
                        src={videoSrc}
                        autoPlay loop muted playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Gradiente para mejorar legibilidad del texto en móvil */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: isMobile
                            ? 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))'
                            : 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)'
                    }} />
                </motion.div>

                {/* CONTENEDOR DEL TEXTO */}
                <motion.div
                    style={{
                        position: 'absolute',
                        left: textLeft,
                        top: textTop,
                        width: isMobile ? "90%" : "45%",
                        opacity: textOpacity,
                        y: textY,
                        zIndex: 10,
                        // Subimos el padding en móvil para que respire más
                        padding: isMobile ? '1.5rem' : '2rem'
                    }}
                >
                    <h3 style={{
                        // 🔥 Tamaño equilibrado para título en móvil
                        fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 4rem)',
                        fontWeight: 900,
                        color: titleColor,
                        textTransform: 'uppercase',
                        margin: 0,
                        lineHeight: 1, // Tipografía compacta e impactante
                        letterSpacing: '-0.03em' // Toque premium
                    }}>
                        {title}
                    </h3>
                    <p style={{
                        // 🔥 Tamaño normal para subtítulo
                        fontSize: isMobile ? '1.2rem' : 'clamp(1.2rem, 1.5vw, 1.5rem)',
                        color: subtitleColor,
                        fontStyle: 'italic',
                        margin: '0.5rem 0 1.2rem 0'
                    }}>
                        {subtitle}
                    </p>
                    <p style={{
                        // 🔥 Tamaño estándar y legible para descripción en móvil
                        fontSize: isMobile ? '1rem' : 'clamp(1rem, 1.2vw, 1.2rem)',
                        color: 'var(--color-texto)',
                        lineHeight: 1.7, // Más interlineado para lectura fácil
                        maxWidth: '650px'
                    }}>
                        {description}
                    </p>
                </motion.div>

            </div>
        </section>
    );
}