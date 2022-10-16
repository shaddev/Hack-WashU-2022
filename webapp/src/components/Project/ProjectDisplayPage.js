import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Editor, EditorState, convertFromRaw} from 'draft-js';

const ProjectDisplayPage = (props) => {

    const { state } = useLocation()

    const project = state.project

    console.log(state)

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    useEffect(() => {
        const description = JSON.parse(project.description)
        setEditorState(EditorState.createWithContent(convertFromRaw(description)))
    }, editorState)

  return (
    <div>
      <h3>Capstone Projects</h3>
      <Editor editorState={editorState}/>
    </div>
  );
};

export default ProjectDisplayPage ;
