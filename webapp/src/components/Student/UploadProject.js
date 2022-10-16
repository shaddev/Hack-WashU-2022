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
import { useLocation } from "react-router-dom";

const UploadProject = (props) => {

    const user = props.user;
    const editMode = props.editMode;

    // const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    //     const byteCharacters = Buffer.from(b64Data, 'base64');
    //     const byteArrays = [];
      
    //     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //       const slice = byteCharacters.subarray(offset, offset + sliceSize);
      
    //       const byteNumbers = new Array(slice.length);
    //       for (let i = 0; i < slice.length; i++) {
    //         byteNumbers[i] = slice.at(i);
    //       }
      
    //       const byteArray = new Uint8Array(byteNumbers);
    //       byteArrays.push(byteArray);
    //     }
      
    //     const blob = new Blob(byteArrays, {type: contentType});
    //     return blob;
    //   }

    const dataURLtoFile = (dataurl, filename) => {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = Buffer.from(arr[1],'base64').toString(), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    const {state} = useLocation();

    const [title, setTitle] = useState("");

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
        );
    
    const [uploadedImage, setUploadedImage] = useState(null)
    const [base64Image, setBase64Image] = useState("")

    const [emails, setEmails] = useState([])

    const [goal, setGoal] = useState(0)

    useEffect(() => {
        if(editMode){
            setTitle(state.title)
            const description = JSON.parse(state.description)
            setEditorState(EditorState.createWithContent(convertFromRaw(description)))
            //console.log(Buffer.from(state.image, 'ascii'))
            const file = new dataURLtoFile(state.image, 'image.png')
            console.log(URL.createObjectURL(file))
            
            setUploadedImage(file)
            setBase64Image(state.image)
            setEmails(state.member_emails.filter((ele) => ele !== user.email))
            setGoal(state.goal)        
        }
    }, [editMode, state.title, state.description, state.image, state.emails, state.goal, user.email])


    const uploadProjectHandler = () => {

        let projectUrl;
        let payload =  {title: title, description: editorString, member_emails:[...emails, user.email], goal:goal, image: base64Image};

        if(editMode){
            projectUrl = url + '/edit_project'
            payload._id = state._id
        } else{
            projectUrl = url + '/add_project'

        }
        
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
