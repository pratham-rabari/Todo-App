import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Sign = () => {
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[name,setName]=useState('')

    const navigate = useNavigate()



    const post = async(e)=>{
  e.preventDefault()
  const res = await axios.post("http://localhost:3000/register",{
    username,email,password
  })
  alert("registration successfull")
  setUsername("")
setPassword("")
setEmail("")

navigate('/Login')

    }

  return (
    <>
   
    <div>
      <div className="main">
    <p className="sign" style={{textAlign:"center"}}>Sign in</p>
    <form className="form1" method="post" action="/Todo">
      <input className="un " type="text" style={{textAlign:"center"}} placeholder="Username" name="username" 
      onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
            <input className="un " type="text" style={{textAlign:"center"}} placeholder="Username" name="email" 
      onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
      
      <input className="pass" type="password" style={{textAlign:"center"}} placeholder="Password" name="password"
      onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
      <input className="submit"  type="submit" style={{textAlign:"center"}} onClick={post} value="Sign In"/> <br></br>
     
     <Link to='/Login' className='text-center' style={{textAlign:"center"}}>alredy sign in ? Login</Link>
      
      </form>      
    </div>
    </div>
    </>
  )
}

export default Sign
