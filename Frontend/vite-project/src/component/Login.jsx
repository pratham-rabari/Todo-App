import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'


const Login = () => {
    const[username,setUsername]=useState("")
   
    const[password,setPassword]=useState("")
    const navigate = useNavigate()

    const post = async(e)=>{
        e.preventDefault()
        try{
       const res = await axios.post("http://localhost:3000/login",{
          username,password
        })
        const token = res.data
        localStorage.setItem("token",token)
        console.log(token)
        alert("Logged In successfull")
      navigate('/')
    }catch(error){
     alert("errorr")
    }
setUsername("")
setPassword("")
          }
  return (
    <>
    <div>
      <div className="main">
    <p className="sign" style={{textAlign:"center"}}>Log in</p>
    <form className="form1" method="post" action="/Todo">
      <input className="un " type="text" style={{textAlign:"center"}} placeholder="Username" name="username" 
      onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
      <input className="pass" type="password" style={{textAlign:"center"}} placeholder="Password" name="password"
      onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
      <input className="submit"  type="submit" style={{textAlign:"center"}} onClick={post} value="Log In"/>
      <Link to='/Sign' className='text-center' style={{textAlign:"center"}}>New user please Signin</Link>
      </form>      
    </div>
    </div>
    </>
  )
}

export default Login
