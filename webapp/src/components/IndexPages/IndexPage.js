import React from "react";
import {useNavigate} from "react-router-dom"
import "../../css/index.css"
// import app.css
import "../../css/Heading.css"

const IndexPage = () => {

    const navigate = useNavigate()

    const navigateLogIn = () => {
        navigate("/login")
    }

    const navigateSignUp = () => {
        navigate("/signup")
    }

    return(
        <div>
            <img src="https://cdn.discordapp.com/attachments/1030279651504955453/1031004643561590834/Natural_Resource_Depletion-amico.png" class="rounded mx-auto d-block"alt="Responsive image" height='400' width="400"/>            
            <div className="text-center">
                <button className="btn btn-primary" href="#" role="button" onClick={navigateSignUp}>
                    Sign Up
                </button>
                <button className="btn btn-primary" href="#" role="button" onClick={navigateLogIn}>
                    Log In
                </button>
            </div>
            <div>
                <img src="https://cdn.discordapp.com/attachments/1030279651504955453/1031183224736583740/unknown.png" class="bottom" alt="" height='100' width="100" align="right"/>
            </div>
        </div>
    )
}

export default IndexPage