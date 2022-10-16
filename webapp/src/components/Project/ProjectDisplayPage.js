import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Editor, EditorState, convertFromRaw} from 'draft-js';

const ProjectDisplayPage = (props) => {

    const { state } = useLocation()

    const readOnly = true;

    console.log(state)

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    useEffect(() => {
        const description = JSON.parse(state.description)
        setEditorState(EditorState.createWithContent(convertFromRaw(description)))
    }, [])

  return (
    <div>
      <h3>Capstone Projects</h3>
      <div>
        <img src={state.image} alt="not found" width={500}  className="center"/>
      </div>
      <Editor editorState={editorState} readOnly={readOnly}/>
    </div>
  );
};

export default ProjectDisplayPage ;
