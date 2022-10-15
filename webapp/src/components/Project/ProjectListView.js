import React from "react";
import {useNavigate} from "react-router-dom"
import ProjectCard from "./ProjectCard";

const ProjectListView = (props) => {

    
    const displayProjects = props.projects.map((project) => {
        return(
            <ProjectCard project={project} />
        )
    })

        return (

        <div>
            <h2>
                Your projects
            </h2>
            {displayProjects}
        </div>
        )

}

export default ProjectListView