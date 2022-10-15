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
            <h3>
                Home Page here
            </h3>
            <img src="https://cdn.discordapp.com/attachments/1030279651504955453/1030922978428457013/unknown.png" className="rounded mx-auto d-block"alt="Responsive image" height='400' width="400"/>
            
            <div className="text-center">
                <button className="btn btn-primary" href="#" role="button" onClick={navigateSignUp}>
                    Sign Up
                </button>
                <button className="btn btn-primary" href="#" role="button" onClick={navigateLogIn}>
                    Log In
                </button>
            </div>
        </div>
    )
}

export default IndexPage