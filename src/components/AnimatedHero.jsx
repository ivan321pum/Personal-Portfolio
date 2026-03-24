import { motion } from "framer-motion";

export default function AnimatedHero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Estado inicial: invisible y un poco más abajo
            animate={{ opacity: 1, y: 0 }}  // Estado final: visible y en su sitio
            transition={{ duration: 0.8 }}   // Duración de la animación en segundos
        >
            <h1 style={{ color: '#D72638', fontSize: '4rem', margin: 0 }}>
                Iván Sevilla
            </h1>
            <h2 style={{ color: '#104547', fontSize: '1.5rem', fontWeight: 400 }}>
                Estudiante de ingeniería en telecomunicaciones en la UPV
            </h2>
        </motion.div>
    );
}