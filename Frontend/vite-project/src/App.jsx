import React from "react"
import Todo from "./component/Todo" 
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Edit from "./component/Edit"
import Sign from "./component/Sign"
import Login from "./component/Login"


function App() {
  const isUserSignedIn =!!localStorage.getItem("token")
    return (
<BrowserRouter>
    <Routes>
   
 <Route path="/" element={<Todo/>}/>
  <Route path="/Edit/:id" element={<Edit/>}/>
  <Route path="/Sign" element={<Sign/>}/>
  <Route path="/Login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>

     
  )
}

export default App
