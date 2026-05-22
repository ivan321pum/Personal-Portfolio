import {motion, useScroll, useTransform, AnimatePresence} from "framer-motion"
import projectsData from "../../data/projects.json"
import '../../styles/global.css'
import {useRef, useState} from "react"

export default function BentoGrid ({lang, title}){
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedRect, setSelectedRect] = useState(null);
    
    const cardAnimation = {
        type: "spring",
        stiffness: 400,
        damping: 50
    }

    const containerRef = useRef();
    const { scrollYProgress } = useScroll(
        {
            target: containerRef,
            offset: ["start start", "end end"]
        }
    );
    const gridMovement = useTransform(scrollYProgress, [0.2, 0.9], ["100vw", "-100%"])
    const titleMovement = useTransform(scrollYProgress, [0, 0.4], ["0vw", "-100vw"])

    const projects = projectsData
    const sizeClasses = {
        medium : "w-[85vw] md:w-[400px] shrink-0 bg-[var(--color-fondo-secundario)] text-[var(--color-texto)]",
        large : "w-[85vw] md:w-[600px] shrink-0 bg-[var(--color-primario)] text-[var(--color-texto)]",
    }

    const handleCardClick = (projectId, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setSelectedRect(rect);
        setSelectedProject(projectId);
    }

    return(
        <div ref={containerRef} className="h-[600vh] relative w-full bg-fondo">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <motion.div style = {{x:titleMovement}} 
                    className="absolute z-10 flex items-center justify-center pointer-events-none">

                    <h1 className="text-5xl md:text-9xl font-black color-primario text-center tracking-tighter uppercase">
                        {title}
                    </h1>

                </motion.div>

                <motion.div style = {{x:gridMovement}} className="flex w-max gap-6 px-8">
                    {projects.map((project) =>(
                    <motion.div 
                    onClick={(e) => handleCardClick(project.id, e)} 
                    key = {project.id}
                    layoutId={`card-${project.id}`}
                    className={`rounded-3xl p-6 cursor-pointer ${sizeClasses[project.size]} ${selectedProject === project.id ? 'invisible' : ''}`}
                    whileHover={selectedProject === null ? {scale:1.05} : {}}
                    transition={cardAnimation}>
                        <img src={project["image-src"]}/>
                        <h1>{project.title[lang]}</h1>
                        <p>{project.description[lang]}</p>
                    </motion.div>
                    ))}
                </motion.div>

                <AnimatePresence>
                    {selectedProject && selectedRect && (
                        <>
                            {/* Backdrop */}
                            <motion.div 
                                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={cardAnimation}
                                onClick={() => setSelectedProject(null)}
                            />
                            
                            {/* LA TARJETA EXPANDIDA - Animación desde posición original */}
                            <motion.div 
                                layoutId={`card-${selectedProject}`}
                                className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none"
                                initial={{
                                    x: selectedRect.left + selectedRect.width / 2 - window.innerWidth / 2,
                                    y: selectedRect.top + selectedRect.height / 2 - window.innerHeight / 2,
                                    scale: 1
                                }}
                                animate={{
                                    x: 0,
                                    y: 0,
                                    scale: 1
                                }}
                                exit={{
                                    x: selectedRect.left + selectedRect.width / 2 - window.innerWidth / 2,
                                    y: selectedRect.top + selectedRect.height / 2 - window.innerHeight / 2,
                                    scale: 1
                                }}
                                transition={cardAnimation}
                            >
                                <motion.div 
                                    layoutId={`card-content-${selectedProject}`}
                                    initial={{
                                        width: selectedRect.width,
                                        height: selectedRect.height
                                    }}
                                    animate={{
                                        width: window.innerWidth - 64,
                                        height: window.innerHeight * 0.8
                                    }}
                                    exit={{
                                        width: selectedRect.width,
                                        height: selectedRect.height,
                                        opacity: 0
                                    }}
                                    transition={{
                                        ...cardAnimation,
                                        opacity: { delay: 0.2, duration: 0.3 }
                                    }}
                                    className="bg-[var(--color-primario)] rounded-3xl p-8 flex flex-col pointer-events-auto relative"
                                >
                                    <motion.h2 
                                        layoutId={`card-title-${selectedProject}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            ...cardAnimation,
                                            opacity: { delay: 0.2, duration: 0.3 }
                                        }}
                                        className="text-4xl font-bold mb-4 text-[var(--color-secundario)]"
                                    >
                                        ¡Proyecto Expandido!
                                    </motion.h2>
                                    
                                    <motion.p 
                                        layoutId={`card-description-${selectedProject}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            ...cardAnimation,
                                            opacity: { delay: 0.2, duration: 0.3 }
                                        }}
                                        className="text-lg mb-6 flex-1 overflow-y-auto text-[var(--color-texto)]"
                                    >
                                        Contenido del proyecto expandido...
                                    </motion.p>
                                    
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
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}