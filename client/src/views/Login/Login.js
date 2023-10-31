import { useState } from "react";
import axios from "axios";
import "./Login.css"
import React from "react-dom/client";
import Navbar from "./../../component/Navbar/Navbar"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = (async () => {
    if (!email || !password) {
      alert("All dields are required")
      return
    }

    const response = await axios.post('/login', {
      email,
      password,
    });

    if (response?.data?.success) {
      alert(response?.data?.message)
      window.location.href = "/";
    }
    else {
      alert(response?.data?.message);
    }
  })

  return (

    <>
    <Navbar/>

      <div className="login-form-design">
        <h1 className="text-center color">Login</h1>

        <div>
          <label htmlFor="email" className="color">Email: </label><br />
          <input type="email" id="email"
            value={email}
            className="box"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value)
            }} />
        </div>
        <div>
          <label htmlFor="password" className="color">Password:</label><br />
          <input type="password" id="pasword"
            value={password}
            className="box"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }} />
        </div>

        <button type="button"
          className="login-btn"
          onClick={login}
        >Login</button>
      </div>
    </>
  )
}

export default Login