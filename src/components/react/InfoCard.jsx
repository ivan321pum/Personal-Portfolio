import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Tarjeta de presentación inmersiva (Apple Style).
 * Comienza como fondo de pantalla completa y se contrae a un panel lateral.
 * @param {Object} props
 * @param {string} props.title - Título principal (ej: PERFIL PROFESIONAL).
 * @param {string} props.description - Texto de descripción (del copy de i18n).
 * @param {'left' | 'right'} props.direction - Dirección hacia la que se contrae la imagen.
 * @param {string} props.imageSrc - Ruta de la imagen (debe ser horizontal, alta calidad).
 */
export default function InfoCard({ title, description, direction = 'left', videoSrc }) {
    // 1. EL TRUCO DEL ESPACIO VERTICAL: Sección de 300vh para capturar el scroll
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    // --- FÍSICA DE LA IMAGEN (El Fondo Inmersivo de 100vwx100vh) ---
    // Mapeamos el progreso de scroll (0 a 1) a propiedades de transformación de la imagen.

    // 1. Scale: Empezamos en un zoom inmersivo (1.5) y pasamos a tamaño natural (1).
    const imgScale = useTransform(scrollYProgress, [0, 0.4], [1.5, 1]);

    // 2. Border Radius: De 0 (pantalla completa) a 24px (tarjeta).
    const imgRadius = useTransform(scrollYProgress, [0, 0.4], ["0px", "24px"]);

    // 3. Posición y Tamaño de la imagen (El "encogimiento").
    const imgWidth = useTransform(scrollYProgress, [0, 0.4], ["100vw", "40vw"]);
    const imgHeight = useTransform(scrollYProgress, [0, 0.4], ["100vh", "60vh"]);

    // Calculamos dónde aterriza según la dirección ('left' o 'right').
    const finalImgLeft = direction === 'left' ? "5%" : "55%";
    const imgLeft = useTransform(scrollYProgress, [0, 0.4], ["0%", finalImgLeft]);
    const imgTop = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]); // Centrado vertical (100-60)/2

    // --- FÍSICA DEL TEXTO (Aparece después) ---
    // Mapeamos de 0.4 a 0.7 del progreso de scroll.
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.4, 0.7], [40, 0]); // Sube ligeramente

    // Posicionamos el texto en el lado contrario a la imagen.
    const textLeft = direction === 'left' ? "50%" : "5%";

    // Placeholder Content from capture
    const pTitle = title || "PERFIL PROFESIONAL";
    const pSubTitle = "ESPECIALISTA EN IA & SOLUCIONES TECNOLÓGICAS";
    const pDescription = description || "Como ingeniero especializado, consensuando adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut rmanD over remaino professional solutions, involucren en computercientim allowanced personalitt: enhancíalatorarteriorer; dincumantartes and medies y conocen; astros los profetitatores concluraa en su corabo halo veir a personna enioado como auriticador en anticulto background.";

    return (
        // Contenedor gigante (300vh). Aquí obligamos al usuario a scrollear 3 pantallas completas.
        // !!! ROMPE-CONTENEDORES (Breakout Hack en React) !!!
        <section ref={containerRef} style={{
            height: '300vh',
            position: 'relative',
            // Hack matemático para ignorar el padding global
            width: '100vw',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            /* IMPORTANTE: Debe ser visible para que el sticky funcione. */
            overflow: 'visible'
        }}>

            {/* El pegamento visual (Sticky 100vh). Esto se queda congelado en la pantalla. */}
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', backgroundColor: 'var(--color-fondo)' }}>

                {/* LA IMAGEN ABSOLUTA (Fondo Inmersivo que se contrae) */}
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
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
                        zIndex: 1 // Aseguramos que esté en el fondo.
                    }}
                >
                    <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline /* <-- INNEGOCIABLE: Evita que iOS rompa la web */
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Capa oscura inmersiva (vignette) */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.3))' }}></div>
                </motion.div>

                {/* EL TEXTO FUERA DE LA IMAGEN (Aparece después) */}
                <motion.div
                    style={{
                        position: 'absolute',
                        left: textLeft,
                        top: '25%', // Alineación vertical del texto.
                        width: '45%', // Ocupa el 45% de la pantalla.
                        opacity: textOpacity,
                        y: textY,
                        padding: '2rem',
                        zIndex: 10 // Forzamos que esté MUY por encima.
                    }}
                >
                    <h3 style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', fontWeight: 900, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.1, textTransform: 'uppercase' }}>
                        {pTitle}
                    </h3>
                    <p style={{ fontSize: '1.25rem', color: '#a0aec0', marginBottom: '1.5rem', fontStyle: 'italic', maxWidth: '600px' }}>
                        {pSubTitle}
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#e0e0e0', lineHeight: 1.8, maxWidth: '700px' }}>
                        {pDescription}
                    </p>
                </motion.div>

            </div>
        </section>
    );
}