import React, {useState} from "react";

const ProjectTitle = (props) => {
  
    const [title, setTitle] = props.titleAttributes

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    return (
        <div className="titleUploadProject">
            <input value={props.titleText} onChange={onChangeTitle} placeholder="Title"></input>
        </div>
    );
};

export default ProjectTitle;
