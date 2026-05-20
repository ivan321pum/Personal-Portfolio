import {motion, useScroll, useTransform} from "framer-motion"
import projectsData from "../../data/projects.json"
import '../../styles/global.css'
import {useRef} from "react"

export default function BentoGrid ({lang, title}){
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
        medium : "md:col-span-2 md:row-span-1 bg-[var(--color-fondo-secundario)] text-[var(--color-secundario)]",
        large : "md:col-span-2 md:row-span-2 bg-[var(--color-primario)] text-[var(--color-secundario)]",
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
                    <div key = {project.id} className={`rounded-3xl p-6 ${sizeClasses[project.size]}`}>
                        <h1>{project.title[lang]}</h1>
                        <img src={project["image-src"]}></img>
                        <p>{project.description[lang]}</p>
                    </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}