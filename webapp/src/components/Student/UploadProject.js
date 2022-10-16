import React, {useEffect, useState} from "react";
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
import Button from '@mui/material/Button';
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const UploadProject = (props) => {

    const user = props.user;
    const editMode = props.editMode;

    const {state} = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
        );
    
    const [uploadedImage, setUploadedImage] = useState(null)

    const [emails, setEmails] = useState([])

    const [goal, setGoal] = useState(0)

    useEffect(() => {
        if(editMode){
            console.log(state)
            setTitle(state.title)
            const description = JSON.parse(state.description)
            setEditorState(EditorState.createWithContent(convertFromRaw(description)))     
            setUploadedImage(state.image)
            setEmails(state.member_emails.filter((ele) => ele !== user.email))
            setGoal(state.goal)        
        }
    }, [])


    const uploadProjectHandler = () => {

        let projectUrl;
        const editorString = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        let payload =  {title: title, description: editorString, member_emails:[...emails, user.email], goal:goal, image: uploadedImage};

        if(editMode){
            projectUrl = url + '/edit_project'
            payload._id = state._id
        } else{
            projectUrl = url + '/add_project'

        }

        
        axios.post(projectUrl, payload)
             .then((response) => {
                console.log(response)
                navigate("../view")
             })
             .catch((err) => {
                console.log(err)
                alert("error lmao")
             })
             .finally()
        
    }
    return (
        <div className="uploadProject">
            <h3>Upload Project</h3>
            <ProjectTitle titleAttributes={[title, setTitle]}/>
            <ProjectEditor editorAttributes={[editorState, setEditorState]}/>
            <ProjectImage uploadedImageAttributes={[uploadedImage, setUploadedImage]} />
            <ProjectEmailEditor emailsAttributes={[emails, setEmails]}/>
            <ProjectGoal goalAttributes={[goal, setGoal]} />
            <Button className="uploadButton" variant="contained" component="label" onClick={uploadProjectHandler}>Upload</Button> 
        </div>
    );
};

export default UploadProject;
