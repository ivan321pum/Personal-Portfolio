import {motion, useScroll, useTransform, AnimatePresence} from "framer-motion"
import projectsData from "../../data/projects.json"
import '../../styles/global.css'
import {useRef, useState} from "react"

export default function BentoGrid ({lang, title}){
    const [selectedProject, setSelectedProject] = useState(null);
    
    // Animación suave para transiciones
    const cardAnimation = {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
    }

    const containerRef = useRef();
    const { scrollYProgress } = useScroll(
        {
            target: containerRef,
            offset: ["start start", "end end"]
        }
    );
    const gridMovement = useTransform(scrollYProgress, [0, 0.9], ["100vw", "0vw"])
    const titleMovement = useTransform(scrollYProgress, [0, 0.4], ["0vw", "-100vw"])

    const projects = projectsData
    const sizeClasses = {
        medium : "md:col-span-2 md:row-span-1 bg-[var(--color-fondo-secundario)] text-[var(--color-texto)]",
        large : "md:col-span-2 md:row-span-2 bg-[var(--color-primario)] text-[var(--color-texto)]",
    }

    return(
        <div ref={containerRef} className="h-[400vh] relative w-full bg-fondo">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <motion.div style = {{x:titleMovement}} 
                    className="absolute z-10 flex items-center justify-center pointer-events-none">

                    <h1 className="text-5xl md:text-9xl font-black color-primario text-center tracking-tighter uppercase">
                        {title}
                    </h1>

                </motion.div>

                <motion.div style = {{x:gridMovement}} className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full px-8">
                    {projects.map((project) =>(
                    <motion.div 
                    onClick ={() => setSelectedProject(project.id)} 
                    key = {project.id}
                    className={`rounded-3xl p-6 cursor-pointer ${sizeClasses[project.size]}`}
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    transition={cardAnimation}>
                        <h1>{project.title[lang]}</h1>
                        {/*<img src={project["image-src"]}></img>*/}
                        <p>{project.description[lang]}</p>
                    </motion.div>
                    ))}
                </motion.div>

                <AnimatePresence>
                    {selectedProject ? (
                        <>
                            {/* Backdrop con animación suave */}
                            <motion.div 
                                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setSelectedProject(null)}
                            />
                            
                            {/* LA TARJETA EXPANDIDA */}
                            <motion.div 
                                className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div 
                                    className="bg-[var(--color-primario)] w-full max-w-4xl h-[80vh] rounded-3xl p-8 flex flex-col pointer-events-auto"
                                    initial={{ scale: 0.8, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.8, y: 20 }}
                                    transition={cardAnimation}
                                >
                                    <h2 className="text-4xl font-bold mb-4 text-[var(--color-secundario)]">
                                        ¡Proyecto Expandido!
                                    </h2>
                                    
                                    <p className="text-lg mb-6 flex-1 overflow-y-auto text-[var(--color-texto)]">
                                        Contenido del proyecto expandido...
                                    </p>
                                    
                                    {/* Botón para cerrar */}
                                    <motion.button 
                                        onClick={() => setSelectedProject(null)}
                                        className="mt-auto bg-black text-white py-3 px-6 rounded-full self-start font-semibold"
                                        whileHover={{ scale: 1.05, backgroundColor: "#1a1a1a" }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={cardAnimation}
                                    >
                                        Cerrar
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
}