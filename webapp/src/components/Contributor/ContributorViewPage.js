import React, { useEffect, useState } from "react";
import axios from 'axios';
import url from '../../constants/apiurl'
import ProjectListView from "../Project/ProjectListView";

const ContributorViewPage = (props) => {

    const user = props.user
    const [projects, setProjects] =  useState([]);
    
    const [liked_projects, setLikedProjects] =  useState([]);

    useEffect(() => {
        axios.get(url+"/get_all_projects")
             .then((response) => {
                //setProjects here
                setProjects(response.data)
             })
        
        axios.get(url+"/get_liked_projects", {params: {email: user.email}})
             .then((response) => {
                //setProjects here
                setLikedProjects(response.data)
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
            <h3>Contributor main page</h3>
            <h2>Feed</h2>
            <ProjectListView projects={projects}/>
            {/*liked_projects.length===0*/1!=1 ? <h2>Start liking projects!</h2> : <div><h2>Liked</h2><ProjectListView projects={liked_projects} user_type={"contributor"}/></div>}
        </div>
    )
    
}

export default ContributorViewPage