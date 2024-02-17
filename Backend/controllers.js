const todomodel = require("./models/TodoModel")

const AddTodo = async (req, res) => {
    let tit = req.body.title
    let dio = req.body.desc

    let user = await todomodel.create({
        title: tit,
        desc: dio
    })
}

const GetAllTodo = async (req, res) => {
    let all = await todomodel.find()
    res.send(all)
}

const UpdateTodo = async (req, res) => {
    const { id } = req.params;
    const cat = await todomodel.findByIdAndUpdate(id, req.body)
    if (!cat) {
        return res.status(404).send({ Message: "TodoNotFind" })
    }
}

const DeleteTodo = async (req, res) => {
    const { id } = req.params;
    const dele = await todomodel.findByIdAndDelete({ _id: id })
}

const GetTodo = async (req, res) => {
    const { id } = req.params;
    const find = await todomodel.findById(id)
    res.send(find)
}

module.exports = {
    AddTodo,
    GetAllTodo,
    UpdateTodo,
    DeleteTodo,
    GetTodo
};
