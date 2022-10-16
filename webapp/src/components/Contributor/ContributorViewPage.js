import React, { useEffect, useState } from "react";
import axios from 'axios';
import url from '../../constants/apiurl'
import ProjectListView from "../Project/ProjectListView";

const ContributorViewPage = (props) => {

    const user = props.user
    const filterLiked = props.filterLiked
    const [projects, setProjects] =  useState([]);
    
    //const [liked_projects, setLikedProjects] =  useState([]);

    useEffect(() => {
        
        if (filterLiked){
            axios.get(url+"/get_liked_projects", {params: {email: user.email}})
                .then((response) => {
                    //setProjects here
                    console.log(response.data)
                    setProjects(response.data)
             })
        }else {
            axios.get(url+"/get_all_projects")
            .then((response) => {
                //setProjects here
                console.log(response.data)
                setProjects(response.data)
                })
        }

    },[filterLiked]) 
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
            {filterLiked? <h2>Liked</h2> : <h2>Feed</h2>}
            
            <ProjectListView projects={projects} user_type={"contributor"}/>
        </div>
    )
    
}

export default ContributorViewPage