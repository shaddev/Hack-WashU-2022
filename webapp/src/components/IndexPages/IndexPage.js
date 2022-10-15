import React from "react";
import {useNavigate} from "react-router-dom"

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
            <div>
                <button className="btn btn-primary" onClick={navigateSignUp}>
                    Sign Up
                </button>
                <button className="btn btn-primary" onClick={navigateLogIn}>
                    Log In
                </button>
            </div>
        </div>
    )
}

export default IndexPage