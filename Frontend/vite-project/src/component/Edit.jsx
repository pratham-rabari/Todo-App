import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const Edit = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const { id } = useParams()
  console.log(id)

  const navigate = useNavigate()


  const done = async () => {
    const res = await axios.get(`http://localhost:3000/book/${id}`)
    console.log(res)
    setTitle(res.data.title)
    setDesc(res.data.desc)
  }
  useEffect(() => {
    done()
  }, [])

  const submit = async () => {
    const data = {
      title,
      desc
    }
    try {
      alert("Edited Successfully")
      await axios.put(`http://localhost:3000/book/${id}`, data);
    } catch (error) {
      console.error('Error submitting data:',error);
    }
  }

  const back = ()=>{
    navigate("/")
  }
  return (
    <div>

      <div className="container">

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="title"
            onChange={(e) => { setTitle(e.target.value) }} value={title} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">desc</label>
          <textarea type="text" className="form-control" id="exampleInputPassword1" name="desc"
            onChange={(e) => { setDesc(e.target.value) }} value={desc}></textarea>
        </div>

        <button className="btn btn-danger" onClick={submit}>Edit</button>
        <button className='btn btn-info mx-3' onClick={back}>Back</button>
      </div>
    </div>
  )
}

export default Edit
