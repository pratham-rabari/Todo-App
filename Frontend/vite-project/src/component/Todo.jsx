import { useEffect, useState } from "react";
import React from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Todo() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [cards, setCards] = useState([])
  const navigate = useNavigate()
  const isUserSignedIn = !!localStorage.getItem("token")

  const dele = () => {
    navigate("/Login")
    localStorage.removeItem('token')
  }


  const action = async (e) => {
    e.preventDefault()
    if (!title || !desc) {
      return alert("pleas fullfill the detail")
    }
    if (!isUserSignedIn) {
      return alert("Please Login First")
    }
    setTitle("")
    setDesc("")
    await axios.post("http://localhost:3000/", {
      title, desc
    })
  }

  const get = async () => {
    const res = await axios.get("http://localhost:3000/data")

    setCards(res.data)
  }

  useEffect(() => {
    get()
  }, [cards])

  const remove = async (id) => {
    await axios.delete("http://localhost:3000/delete/" + id)
  }

  const clear = () => {
    setTitle("")
    setDesc("")
  }


  return (
    <>
      <nav className="navbar">
        <div className="container-fluid my-2" style={{ position: "relative" }}>
          {
            isUserSignedIn ? (
              <>
                <Link to="/Sign" className="btn btn-info mt-3" style={{ position: "absolute", right: "0px" }} onClick={dele}>Log Out</Link>
              </>
            ) : (
              <>
                <Link to="/Sign" className="btn btn-info mt-3" style={{ position: "absolute", right: "0px" }}>Log in</Link>
              </>
            )
          }

        </div>
      </nav>
      <div className="container d-flex flex-column justify-content-center">
        <form method="post" >
          <div className="mb-3 my-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="title"
              onChange={(e) => { setTitle(e.target.value) }} value={title} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">desc</label>
            <textarea type="text" className="form-control" id="exampleInputPassword1" name="desc"
              onChange={(e) => { setDesc(e.target.value) }} value={desc}></textarea>
          </div>

          <button type="submit" className="btn btn-info mx-2 my-1" onClick={action}>Submit</button>
          <span className="btn btn-danger my-1" onClick={clear}>Clear</span>
        </form>


      </div>

      <div className="container text-center">
        <div className="row mx-3">
          {
            cards.map((val) => (
              <div className="mx-2 my-2 bg-info col-4" style={{ width: "300px", height: "170px", overflow: "auto", position: "relative", textAlign: "center" }} key={val._id}>
                <h3>{val.title}</h3><hr></hr>
                <h5>{val.desc}</h5>
                <div style={{ position: "absolute", bottom: "0px" }} className="px-2 py-1">
                  <img className="mx-2" onClick={() => remove(val._id)} src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" style={{ height: "30px", width: "30px" }} />
                  <Link to={`/Edit/${val._id}`}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png" style={{ height: "30px", width: "30px" }} />
                  </Link>

                </div>
              </div>

            ))
          }
        </div>
      </div>


    </>
  )
}