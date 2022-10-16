import React, {useEffect, useReducer, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Editor, EditorState, convertFromRaw} from 'draft-js';
import url from '../../constants/apiurl'
import axios from 'axios';

const ProjectDisplayPage = (props) => {

    const { state } = useLocation()

    const user = props.user
    const readOnly = true;

    console.log(state)

    const [buttonText, setButtonText] = useState("Next"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
    const changeText = (text) => setButtonText(text);

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    useEffect(() => {
        const description = JSON.parse(state.description)
        setEditorState(EditorState.createWithContent(convertFromRaw(description)))
        if(state.likers.includes(user.email)){
          changeText("Unlike")
        }
        else{
          changeText("Like")
        }
    }, [])
    

    const likeProjectHandler = () => {
      let projectUrl;
      let payload = {
        project_id:state._id,
        email:user.email
      }
      console.log(payload)
      projectUrl=""
      if(state.likers.includes(user.email)){

        projectUrl = url + '/unlike_project'
        changeText("Like")
      }
      else{
        
        projectUrl = url + '/like_project'
        changeText("Unlike")
      }

  
      axios.post(projectUrl, payload)
           .then((response) => {
              console.log(response)
           })
           .catch((err) => {
              console.log(err)
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
      <button className="btn btn-primary" onClick={likeProjectHandler}>{buttonText}</button>
    </div>
  );
};

export default ProjectDisplayPage ;
