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
    const [base64Image, setBase64Image] = useState("")

    const [emails, setEmails] = useState([])

    const [goal, setGoal] = useState(0)


    const uploadProjectHandler = () => {
        
        //const test = JSON.parse(`{"blocks":[{"key":"ct9nf","text":"asdj","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":1,"length":3,"style":"ITALIC"},{"offset":2,"length":2,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`);
        //setEditorState(EditorState.createWithContent(convertFromRaw(test)))
        //console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        const editorString = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        console.log(user.email)
        console.log(title)
        console.log(base64Image)
        console.log(editorString)
        console.log(emails)
        console.log(goal)

        axios.post(url+'/add_project', {title: title, description: editorString, member_emails:[...emails, user.email], goal:goal, image: base64Image})
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
        <h3>Upload Project here lmao</h3>
        <ProjectTitle titleAttributes={[title, setTitle]}/>
        <ProjectEditor editorAttributes={[editorState, setEditorState]}/>
        <ProjectImage uploadedImageAttributes={[uploadedImage, setUploadedImage]} base64ImageAttributes={[base64Image, setBase64Image]}/>
        <ProjectEmailEditor emailsAttributes={[emails, setEmails]}/>
        <ProjectGoal goalAttributes={[goal, setGoal]} />
        <button className="btn btn-primary" onClick={uploadProjectHandler}>Upload Project</button>
        </div>
    );
};

export default UploadProject;
