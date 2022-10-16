import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import ProjectListView from "../Project/ProjectListView";
import axios from 'axios';
import url from '../../constants/apiurl'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const StudentViewPage = (props) => {

    const user = props.user;

    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const navigateUploadProject = () => {
        navigate('../upload-project')
    }


    useEffect(() => {
        axios.get(url+"/get_student_projects", {params: {email: user.email}})
             .then((response) => {
                console.log(response)
                //setProjects here
                setProjects(response.data)
             })
    },[]) 


    return(
        <div>
            <h3>
                Student View Page
            </h3>
            <Box>
                <Button variant="contained" component="label" onClick={navigateUploadProject}>Upload</Button>
            </Box>
            {projects === undefined||projects.length===0 ? <div>Add projects!</div> : <ProjectListView projects={projects} user_type={"student"} />}
            
            
        </div>
    )
}

export default StudentViewPage