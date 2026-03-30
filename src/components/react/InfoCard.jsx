import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Tarjeta de presentación inmersiva (Apple Style).
 * Comienza como fondo de pantalla completa y se contrae a un panel lateral.
 * @param {Object} props
 * @param {string} props.title - Título principal (ej: PERFIL PROFESIONAL).
 * @param {string} props.subtitle - Subtitulo de la tarjeta
 * @param {string} props.description - Texto de descripción (del copy de i18n).
 * @param {'left' | 'right'} props.direction - Dirección hacia la que se contrae la imagen.
 * @param {string} props.videoSrc - Ruta del video (debe ser horizontal, alta calidad).
 * @param {string} props.bkcgroundColor - Color del fondo de la tarjeta
 * @param {string} props.titleColor - Color del título
 * @param {string} props.subtitleColor - Color del subtítulo
 */
export default function InfoCard({   title,
                                     subtitle,
                                     description,
                                     direction = 'left',
                                     videoSrc,
                                     bkcgroundColor,
                                     titleColor,
                                     subtitleColor,
}) {


    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    // --- Movimiento de la imagen y fondo estático ---

    // 1. Scale: Empezamos en un zoom (1.5) y pasamos a tamaño natural (1).
    const imgScale = useTransform(scrollYProgress, [0, 0.4], [1.5, 1]);

    //el inputRange le indica la longitud de la trnasformación que quieres hacer, luego outputRange le dices el valor del que estás al que quiere pasar

    // 2. Border Radius: De 0 (pantalla completa) a 24px (tarjeta).
    const imgRadius = useTransform(scrollYProgress, [0, 0.4], ["0px", "24px"]);

    // 3. Tamaño de la imagen (El "encogimiento"). Le ponemos el tamaño rectangular de la tarjeta original
    const imgWidth = useTransform(scrollYProgress, [0, 0.4], ["100vw", "40vw"]);
    const imgHeight = useTransform(scrollYProgress, [0, 0.4], ["100vh", "60vh"]);

    // Calculamos dónde ponerlo según la dirección ('left' o 'right').
    const finalImgLeft = direction === 'left' ? "5%" : "55%";
    const imgLeft = useTransform(scrollYProgress, [0, 0.4], ["0%", finalImgLeft]);
    const imgTop = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);

    // --- TEXTO (Aparece después) ---
    // Mapea de 0.4 a 0.7 del progreso de scroll.
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.4, 0.7], [40, 0]); // Sube ligeramente

    // Posicionar el texto en el lado contrario a la imagen.
    const textLeft = direction === 'left' ? "50%" : "5%";

    return (
        <section ref={containerRef} style={{
            height: '300vh', // Esto hace que mida 3 veces el tamaño de la pantalla
            position: 'relative',
            width: '99vw',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            overflow: 'visible' //Importante
        }}>

            {/* El pegamento visual (Sticky 100vh). Esto se queda congelado en la pantalla. */}
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', backgroundColor: bkcgroundColor }}>

                {/* EL VIDEO (Fondo que se contrae) */}
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
                        zIndex: 1 // Asegura que esté en el fondo.
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
                    {/* EFECTO OSCURO */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.3))' }}></div>
                </motion.div>

                {/* EL TEXTO FUERA DE EL VIDEO (Aparece después) */}
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
                    <h3 style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', fontWeight: 900, color: titleColor, marginBottom: '0.5rem', lineHeight: 1.1, textTransform: 'uppercase' }}>
                        {title}
                    </h3>
                    <p style={{ fontSize: '1.25rem', color: subtitleColor, marginBottom: '1.5rem', fontStyle: 'italic', maxWidth: '600px' }}>
                        {subtitle}
                    </p>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-texto)', lineHeight: 1.8, maxWidth: '700px' }}>
                        {description}
                    </p>
                </motion.div>

            </div>
        </section>
    );
}