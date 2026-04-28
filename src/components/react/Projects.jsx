import {motion} from "framer-motion"
import projectsData from "../../data/projects.json"

export default function BentoGrid ({lang}){
    const projects = projectsData

    return(
        <div className="bento-grid-container">
            {projects.map((project) =>(
            <div key = {project.id} className={`bento-item ${project.size}`}>
                <h1>{project.title[lang]}</h1>
            </div>
            ))}
        </div>
    );
}