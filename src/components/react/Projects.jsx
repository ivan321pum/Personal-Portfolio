import {motion, scale, useScroll, useTransform, AnimatePresence} from "framer-motion"
import projectsData from "../../data/projects.json"
import '../../styles/global.css'
import {useRef, useState} from "react"

export default function BentoGrid ({lang, title}){
    const [selectedProject, setSelectedProject] = useState(null);
    const expandAnimation = {
        type: "tween",
        ease: "easeInOut",
        duration: 2
    }


    const containerRef = useRef(); // Para coger la referencia del contenedor
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
        <div ref={containerRef} className="h-[400vh] relative w-full bg-fondo">  {/*Contenedor padre */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"> {/*"Lente camara" */}
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
                    transition={expandAnimation}
                    className={`rounded-3xl p-6 ${sizeClasses[project.size]}`}
                    whileHover={{scale:1.05}}
                    layoutId={project.id}>
                        <h1>{project.title[lang]}</h1>
                        {/*<img src={project["image-src"]}></img>*/}
                        <p>{project.description[lang]}</p>
                    </motion.div>
                    ))}
                </motion.div>
                <AnimatePresence>
                    {selectedProject ? (
                        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm">
                            
                            {/* LA TARJETA GIGANTE */}
                            <motion.div 
                                layoutId={ selectedProject } 
                                className="bg-[var(--color-primario)] w-full max-w-4xl h-[80vh] rounded-3xl p-8 flex flex-col"
                                transition={expandAnimation}
                            >
                                <h2 className="text-4xl font-bold mb-4 text-[var(--color-secundario)]">
                                    ¡Proyecto Expandido!
                                </h2>
                                
                                {/* El botón para cerrar y resetear la memoria */}
                                <button 
                                    onClick={() => setSelectedProject(null)}
                                    className="mt-auto bg-black text-white py-3 px-6 rounded-full self-start"
                                >
                                    Cerrar
                                </button>
                            </motion.div>
                            
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
}