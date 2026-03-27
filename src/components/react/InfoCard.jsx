import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Tarjeta de información animada (React/Client-side).
 * @param {Object} props
 * @param {string} props.title - Título de la tarjeta.
 * @param {string} props.description - Texto descriptivo.
 * @param {string} props.imageSrc - Ruta de la imagen (ej: /images/telecom.webp).
 * @param {'left' | 'right'} props.direction - Dirección de entrada.
 */
export default function InfoCard({ title, description, imageSrc, direction = 'left' }) {
    const ref = useRef(null);

    // Control de scroll suavizado para tarjetas integradas en el flujo
    const { scrollYProgress } = useScroll({
        target: ref,
        // offset: [entrada, salida].
        // Empieza a animar cuando el start de la tarjeta entra por el bottom del viewport.
        offset: ["start end", "end start"]
    });

    // Mapeo de animaciones físicas (Opacidad, Escala, Movimiento X)
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);
    const x = useTransform(
        scrollYProgress,
        [0, 0.3],
        [direction === 'left' ? -150 : 150, 0]
    );

    return (
        // El wrapper da la altura (40vh) para que haya espacio para scrollear
        <div ref={ref} className="card-wrapper" style={{ height: '45vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <motion.div
                className={`info-card ${direction}`}
                style={{
                    opacity,
                    x,
                    scale,
                }}
            >
                {/* NUEVA ESTRUCTURA INTERNA: Imagen + Texto */}
                <div className="card-inner-layout">

                    {imageSrc && (
                        <div className="card-image-container">
                            <img src={imageSrc} alt={`Ilustración para ${title}`} className="card-image" loading="lazy" />
                            {/* Efecto de brillo superpuesto */}
                            <div className="image-overlay-glow"></div>
                        </div>
                    )}

                    <div className="card-text-content">
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text">{description}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}