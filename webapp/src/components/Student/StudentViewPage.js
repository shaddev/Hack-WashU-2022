import React from "react";
import {useNavigate} from "react-router-dom"

const StudentViewPage = (props) => {

    const navigate = useNavigate();

    const navigateUploadProject = () => {
        navigate('../upload-project')
    }

    return(
        <div>
            <h3>
                Student View Page
            </h3>
            <button onClick={navigateUploadProject}>Upload Project</button>
        </div>
    )
}

export default StudentViewPage