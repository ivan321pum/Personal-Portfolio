import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function InfoCard({ title, description, direction = 'left' }) {
    const ref = useRef(null);

    // 1. Detectamos el progreso del scroll específicamente para esta tarjeta
    // 'target' es el elemento que vigilamos
    // 'offset' define cuándo empieza y termina la animación ([entrada, salida])
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end center"] // Empieza cuando el borde superior entra por abajo, termina cuando el borde inferior llega al centro
    });

    // 2. Mapeamos el progreso (0 a 1) a valores físicos
    // Cuando el scroll está al 0%, la opacidad es 0. Al 100%, es 1.
    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.5, 1]);

    // La posición X: si viene de la izquierda, va de -200px a 0px
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [direction === 'left' ? -200 : 200, 0]
    );

    // Efecto de escala para ese toque "premium" de Apple
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

    return (
        <div ref={ref} className="card-wrapper" style={{ height: '50vh', display: 'flex', alignItems: 'center' }}>
            <motion.div
                className={`info-card ${direction}`}
                style={{
                    opacity,
                    x,
                    scale,
                }}
            >
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{description}</p>
            </motion.div>
        </div>
    );
}