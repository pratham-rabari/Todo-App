const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const expressSession = require("express-session")
const bcrypt = require("bcrypt")
const usermodel = require("./models/model")
const todomodel = require("./models/TodoModel")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")
const app = express()
const { AddTodo, GetAllTodo, UpdateTodo, DeleteTodo, GetTodo } = require("./controllers")
const SECRET_KEY = "secretkey"
mongoose.connect('mongodb://127.0.0.1:27017/Todo')


app.use(cors())
app.use(bodyParser.json())

app.use(express.json())
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "hey hey hey"
}))



app.get("/", (req, res) => {
    res.send("30000")
})

app.post("/", AddTodo)

app.get("/data", GetAllTodo)

app.delete("/delete/:id", DeleteTodo)

app.get("/book/:id", GetTodo)

app.put("/book/:id", UpdateTodo)


app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new usermodel({ username, email, password: hashedPassword })
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await usermodel.findOne({ username })
        if (!user) {
            return res.status(401).json({ error: "inavalid detail" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: "invalis detail" })
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })

        res.send(token)
    } catch (error) {
        res.status(500).json({ error: "error in login" })
    }

})

app.listen(3000, () => {
    console.log("server 3000 started")
})

