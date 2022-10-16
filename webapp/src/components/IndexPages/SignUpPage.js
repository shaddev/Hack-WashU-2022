import React, {useState} from "react";
import axios from 'axios';
import {Navigate, useNavigate} from "react-router-dom"
import url from '../../constants/apiurl'

const SignUpPage = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [type, setType] = useState("student") // default to student

    const navigate = useNavigate()

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    } 

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    } 

    const onChangeFullName = (event) => {
        setFullName(event.target.value)
    } 

    const onChangeType = (event) => {
        console.log(event.target.value)
        setType(event.target.value)
    }

    const signUpHandler = (event) => {

        let signUpUrl;

        if (type === 'student'){
            signUpUrl = url + "/add_student"
        }
        else{
            signUpUrl = url + "/add_contributor"
        }

        axios.post(signUpUrl, 
                {email: email, pass_hash: password, full_name: fullName})
            .then((response) => {
                console.log(response)
                navigate("/login")
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                console.log("Request complete")
            })
        
        console.log(email)
        console.log(password)
    }


    return(
        <div>
            <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
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
                <label>Full Name</label>
                <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter full name"
                onChange = {onChangeFullName}
                value={fullName}
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
                <button className="btn btn-primary" onClick={signUpHandler}>
                Sign Up
                </button>
            </div>
            </div>
        </div>
    )
}

export default SignUpPage