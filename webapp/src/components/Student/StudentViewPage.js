import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import ProjectListView from "../Project/ProjectListView";
import axios from 'axios';
import url from '../../constants/apiurl'

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
                //setProjects here
                for(let i = 0; i < response.data.length; i++){
                    var temp = projects.concat(response.data[i])
                    setProjects(temp)
                }
             })
    },[]) 
    
/*
    if (projects === undefined){
        return (
            <div>
                Loading...
            </div>
        )
    }

*/


    return(
        <div>
            <h3>
                Student View Page
            </h3>
            {projects === undefined ? <div>Add projects!</div> : <ProjectListView projects={projects} />}
            <button onClick={navigateUploadProject}>Upload Project</button>
        </div>
    )
}

export default StudentViewPage