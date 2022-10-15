import React, { useState } from "react";
import axios from 'axios';
import url from '../../constants/apiurl'

const LoginPage = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = props.loggedInAttributes

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    } 

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    } 

    const loginHandler = async (event) => {

        axios.get(url+"/get-username", 
                {params: {
                    username: username,
                    password: password
                }})
            .then((response) => {
                setIsLoggedIn(true)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                console.log("Request complete")
            })
        setIsLoggedIn(true)
        console.log(username)
        console.log(password)
    }

    
    return(
        <div className="basePage">
            <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
                <label>Username</label>
                <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
                onChange = {onChangeUsername}
                value={username}
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