import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Sign = () => {
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    

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
            <input className="un " type="text" style={{textAlign:"center"}} placeholder="Email" name="email" 
      onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
      
      <input className="pass" type="password" style={{textAlign:"center"}} placeholder="Password" name="password"
      onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
      <input className="submit"  type="submit" style={{textAlign:"center"}} onClick={post} value="Sign In"/> <br></br>
     <div className='text-center'>
     <Link to='/Login' style={{textAlign:"center"}}>alredy sign in ? <strong>Login</strong></Link>
     </div>
     
      
      </form>      
    </div>
    </div>
    </>
  )
}

export default Sign
