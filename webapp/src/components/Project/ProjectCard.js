import React from "react";
import {useNavigate} from "react-router-dom";

const ProjectCard = (props) => {

  const project = props.project

  const navigate = useNavigate()

  const navigateProject = () => {
    console.log(project)
    navigate('/student/edit-project', {state: project})
  }

  return (
    <div>
      <div>Project card</div>
      <button onClick={navigateProject}>View Project</button>
      <img src={project.image} alt="not found"/>
    </div>
  );
};

export default ProjectCard;
