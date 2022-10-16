import React, {useState} from "react";
import { EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import '../../css/UploadProject.css'
import axios from 'axios';
import url from '../../constants/apiurl'
import ProjectTitle from "./ProjectTitle";
import ProjectImage from "./ProjectImage";
import ProjectEditor from "./ProjectEditor";
import ProjectEmailEditor from "./ProjectEmailEditor";
import ProjectGoal from "./ProjectGoal";

const UploadProject = (props) => {

    const user = props.user;


    const [title, setTitle] = useState("");

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
        );
    
    const [uploadedImage, setUploadedImage] = useState(null)

    const [emails, setEmails] = useState([])

    const [goal, setGoal] = useState(0)

    const blobToBase64 = (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      };

    const uploadProjectHandler = () => {
        
        //const test = JSON.parse(`{"blocks":[{"key":"ct9nf","text":"asdj","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":1,"length":3,"style":"ITALIC"},{"offset":2,"length":2,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`);
        //setEditorState(EditorState.createWithContent(convertFromRaw(test)))
        //console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        const editorString = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        console.log(user.email)
        console.log(title)
        console.log(uploadedImage)
        console.log(editorString)
        console.log(emails)
        console.log(goal)

        blobToBase64(uploadedImage)
            .then(base64Image => 
                axios.post(url+'/add_project', {title: title, email:emails/*user.email*/, goal:goal, image: base64Image})
            )
        
    }
    return (
        <div>
        <h3>Upload Project here lmao</h3>
        <ProjectTitle titleAttributes={[title, setTitle]}/>
        <ProjectEditor editorAttributes={[editorState, setEditorState]}/>
        <ProjectImage uploadedImageAttributes={[uploadedImage, setUploadedImage]} />
        <ProjectEmailEditor emailsAttributes={[emails, setEmails]}/>
        <ProjectGoal goalAttributes={[goal, setGoal]} />
        <button className="btn btn-primary" onClick={uploadProjectHandler}>Upload Project</button>
        </div>
    );
};

export default UploadProject;
