import {motion} from "framer-motion"
import projectsData from "../../data/projects.json"
import '../../styles/global.css'

export default function BentoGrid ({lang}){
    const projects = projectsData
    const sizeClasses = {
        small : "md:col-span-1 md:row-span-1 bg-[var(--color-fondo-secundario)] text-[var(--color-texto)]",
        medium : "md:col-span-2 md:row-span-1 bg-[var(--color-secundario)] text-[var(--color-texto)]",
        large : "md:col-span-2 md:row-span-2 bg-[var(--color-primario)] text-[var(--color-secundario)]",
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {projects.map((project) =>(
            <div key = {project.id} className={`rounded-3xl p-6 ${sizeClasses[project.size]}`}>
                <h1>{project.title[lang]}</h1>
            </div>
            ))}
        </div>
    );
}