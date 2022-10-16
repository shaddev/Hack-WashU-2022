import React, { useState } from "react";
import axios from 'axios';
import url from '../../constants/apiurl'
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("student") // default to student
    const [user, setUser] = props.userAttributes
    const [isLoggedIn, setIsLoggedIn] = props.loggedInAttributes

    const navigate = useNavigate()

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    } 

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    } 

    const onChangeType = (event) => {
        console.log(event.target.value)
        setType(event.target.value)
    }

    const loginHandler = (event) => {

        let logInUrl;

        if (type === 'student'){
            logInUrl = url + "/signin_student"
        }
        else{
            logInUrl = url + "/signin_contributor"
        }

        axios.post(logInUrl, 
                {password: password,email: email}, 
                {headers: { 
                      "Content-Type": "application/x-www-form-urlencoded"
                    }})
            .then((response) => {
                console.log(response)
                setIsLoggedIn(true)
                setUser({email: response.data.email, type: type})
                if (type === "student") {
                    navigate("/student/view");
                  } else if (type === "contributor") {
                    navigate("/contributor/view");
                  }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                console.log("Request complete")
            })
    }

    
    return(
        <div className="basePage">
            <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
                <label>Email</label>
                <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange = {onChangeEmail}
                value={email}
                />
            </div>
            <div className="form-group mt-3">
                <label>Password</label>
                <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange = {onChangePassword}
                value={password}
                />
            </div>
            <div>
                    <input value="student" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={type === 'student'} onChange={onChangeType}/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                     Student
                    </label>
                    <input value="contributor" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={type === 'contributor'} onChange={onChangeType}/>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Contributor
                    </label>
            </div>
            <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary" onClick={loginHandler}>
                Log In
                </button>
            </div>
            </div>
        </div>
    )
}

export default LoginPage