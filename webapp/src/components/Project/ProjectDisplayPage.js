import React, {useEffect, useReducer, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Editor, EditorState, convertFromRaw} from 'draft-js';
import url from '../../constants/apiurl'
import axios from 'axios';

const ProjectDisplayPage = (props) => {

    const { state } = useLocation()

    const user = props.user
    const readOnly = true;

    //console.log(state)

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    useEffect(() => {
        const description = JSON.parse(state.description)
        setEditorState(EditorState.createWithContent(convertFromRaw(description)))
    }, [])
    

    const likeProjectHandler = () => {
      let projectUrl;
      let payload = {
        project_id:state._id,
        email:user.email
      }
      console.log(payload)
      projectUrl = url + '/like_project'
      axios.post(projectUrl, payload)
           .then((response) => {
              console.log(response)
           })
           .catch((err) => {
          //    console.log(err)
           })
           .finally()
    }
    const unlikeProjectHandler = () => {
      let projectUrl;
      let payload = {
        project_id:state._id,
        email:user.email
      }
      console.log(payload)
      projectUrl = url + '/unlike_project'
      axios.post(projectUrl, payload)
           .then((response) => {
              console.log(response)
           })
           .catch((err) => {
      //        console.log(err)
           })
           .finally()
      
  }
  
  return (
    <div>
      <h3>Capstone Projects</h3>
      <div>
        <img src={state.image} alt="not found" width={500}  className="center"/>
      </div>
      <Editor editorState={editorState} readOnly={readOnly}/>
      <button className="btn btn-primary" onClick={likeProjectHandler}>Like</button>
      <button className="btn btn-primary" onClick={unlikeProjectHandler}>Unlike</button>
    </div>
  );
};

export default ProjectDisplayPage ;
