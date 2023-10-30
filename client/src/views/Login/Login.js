import { useState } from "react";
import axios from"axios";
import "./Login.css"
import React from "react-dom/client";

const Login=(()=>{
const {email,setEmail}=useState('')
const {password,setPassword}=useState('')

const login = (async()=>{
  if (!email || !password ) {
    alert("All dields are required")
    return
}

const response = await axios.post('/Login', {
  email,
  password,
});

alert(response.data.message)
setEmail('')
setPassword('')
})

    return(
        
        <>
        <div className="form-design">
            <h1 className="text-center color">Login</h1>
       
        <div>
            <label htmlFor="email" className="color">Email: </label><br/>
            <input type="email" id="email" 
            value={email}
            className="box"
            placeholder="Enter Email"
            onChange={(e)=>{
              setEmail (e.target.value)
            }}/>
        </div>
        <div>
            <label htmlFor="password" className="color">Password:</label><br/>
            <input type="password" id="pasword" 
            value={password}
            className="box"
            placeholder="Enter Password"
            onChange={(e)=>{
              setPassword (e.target.value)
            }}/>
        </div>
       
        <button type="button"
        className="signup-btn"
        onClick={login}
        >Login</button>
        </div>
        </>
    )
})

export default Login