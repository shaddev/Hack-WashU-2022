import React from "react";
import {useNavigate} from "react-router-dom"
import ProjectCard from "./ProjectCard";

const ProjectListView = (props) => {

    
    const displayProjects = props.projects.map((project) => {
        return(
            <ProjectCard project={project} user_type={props.user_type} />
        )
    })

        return (

        <div>
            <h2>
                Projects
            </h2>
            {displayProjects}
        </div>
        )

}

export default ProjectListView