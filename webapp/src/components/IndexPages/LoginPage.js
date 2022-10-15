import React, { useState } from "react";
import axios from 'axios';
import url from '../../constants/apiurl'

const LoginPage = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = props.loggedInAttributes

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    } 

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    } 

    const loginHandler = (event) => {

        axios.post(url+"/signin_contributor", 
                {password: password,email: email}, 
                {headers: { 
                      "Content-Type": "application/x-www-form-urlencoded"
                    }})
            .then((response) => {
                console.log(response)
                setIsLoggedIn(true)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                console.log("Request complete")
            })
        setIsLoggedIn(true)
        console.log(email)
        console.log(password)
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