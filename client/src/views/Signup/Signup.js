import { useState } from "react";
// import sign from "./sign.png"
import axios from"axios";
import "./signup.css"
import React from "react-dom/client";

const Signup=(()=>{
const {name,setName}=useState('')
const {email,setEmail}=useState('')
const {password,setPassword}=useState('')
const {mobile,setMobile}=useState([''])
const {address,setAddress}=useState('')
// const {gender, setGender}=useState(['Male'])

const signup = (async()=>{
  if (!name || !email || !password || !mobile || !address ) {
    alert("All dields are required")
    return
}
const response = await axios.post('/signup', {
  name,
  email,
  password,
  mobile,
  address,

});
alert(response.data.message)

setName('')
setEmail('')
setPassword('')
setMobile('')
setAddress('')
})

    return(
        
        <>
        <div className="form-design">
            <h1 className="text-center color">SignUp</h1>
        <div>

            <label htmlFor="name" className="color">Name: </label><br/>
            <input type="text" id="name" 
            value={name}
            className="box"
            placeholder="Enter Name"
            onChange={(e)=>{
              setName (e.target.value)
            }}/>
        </div>
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
        <div>
            <label htmlFor="mobile" className="color">Mobile:</label><br/>
            <input type="text" id="mobile" 
            value={mobile}
            className="box"
            placeholder="Enter Mobile"
            onChange={(e)=>{
              setMobile (e.target.value)
            }}/>
        </div>
        <div>
            <label htmlFor="address" className="color">Address:</label><br/>
            <input type="text" id="address" 
            value={address}
            className="box"
            placeholder="Enter Address"
            onChange={(e)=>{
              setAddress (e.target.value)
            }}/>
        </div>
        <div>
          <h4 className="color">Gender:</h4>
          <input type="radio" id="gender"
          className="color"
          // value={gender}
          // // onChange={(e)=>{
          // //  setGender(e.target.value)
          // // }}
           />
          <label htmlFor="gender" className="color">Male</label>

          <input type="radio" id="gender"
          //  value={gender}
          //  onChange={(e)=>{
          //   setGender(e.target.value)
          //  }}
           />
          <label htmlFor="gender" className="color">Female</label>
        </div>

        <button type="button"
        className="signup-btn"
        onClick={signup}
        >Signup</button>
        </div>
        </>
    )

})

export default Signup