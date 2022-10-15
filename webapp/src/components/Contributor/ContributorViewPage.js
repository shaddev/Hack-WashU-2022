import React, { useEffect, useState } from "react";
import axios from 'axios';
import url from '../../constants/apiurl'
import ProjectListView from "../Project/ProjectListView";

const ContributorViewPage = (props) => {

    const user = props.user
    const [projects, setProjects] = useState()

    useEffect(() => {
        axios.get(url+"/get-projects", {params: {email: user.email}})
             .then((response) => {
                //setProjects here
             })

    }) 

    if (projects === undefined){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return(
        <div>
            <h3>Contributor main page</h3>
            <ProjectListView projects={projects}/>
        </div>
    )
}

export default ContributorViewPage