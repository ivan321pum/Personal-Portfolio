import { motion } from "framer-motion";

export default function TitleAnimation() {
    return (
        <>
        <motion.h1
            initial={{ opacity: 0.5, y: 450 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-title"
        >
            Iván Sevilla
        </motion.h1>
        <motion.h2
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="hero-subtitle"
        >
            Estudiante de ingenieria en telecomunicaciones en la UPV
        </motion.h2>
        </>
    );
}