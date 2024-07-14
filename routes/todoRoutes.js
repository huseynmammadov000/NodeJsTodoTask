

const express = require("express")
const router = express.Router();
const Todo = require("../models/todo");


router.get("/", async (req, res) => {
    
        const todos = await Todo.find();
        res.json(todos); 
   
});

router.post("/create", async (req, res) => {
   
    const { title, content, completed } = req.body;
    const newTodo = new Todo({
        title,
        content,
        completed
    });

    await newTodo.save();
    res.status(201).json(newTodo);

});

router.get("/:id", async (req, res) => {
   
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    
});

router.put("/edit/:id", async (req, res) => {
   
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content,
            completed: req.body.completed,
        });

        if (updatedTodo) {
            res.json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    
});

router.delete("/delete/:id", async (req, res) => {
        const status = await Todo.findByIdAndDelete(req.params.id);
        res.json(status ? "todo deleted" : "Error");
  
});



module.exports = router;