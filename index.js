// import express from 'express';
// import bodyParser from 'body-parser';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors());

let todos = [];

// 1.GET /todos - Retrieve all todo items
//     Description: Returns a list of all todo items.
//     Response: 200 OK with an array of todo items in JSON format.
//     Example: GET http://localhost:3000/todos

app.get('/todos', (req, res) => {
  res.status(200).json(todos)
})

// 2.GET /todos/:id - Retrieve a specific todo item by ID
//     Description: Returns a specific todo item identified by its ID.
//     Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
//     Example: GET http://localhost:3000/todos/123

app.get('/todos/:id', (req, res)=> {
    var id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if(todo){
        res.json(todo);
    }
    res.status(404).json("id not found");
})

// 3. POST /todos - Create a new todo item
//     Description: Creates a new todo item.
//     Request Body: JSON object representing the todo item.
//     Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
//     Example: POST http://localhost:3000/todos
//     Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
var count = 1;
app.post('/todos', (req, res)=> {
    
    const newTodo = {
        id : count++,
        title : req.body.title,
        description : req.body.description,
        status : false
    }

    todos.push(newTodo);
    res.status(201).json( " todo uploded");
})

// 4. PUT /todos/:id - Update an existing todo item by ID
//     Description: Updates an existing todo item identified by its ID.
//     Request Body: JSON object representing the updated todo item.
//     Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
//     Example: PUT http://localhost:3000/todos/123
//     Request Body: { "title": "Buy groceries", "completed": true }
    
app.put('/todos/:id', (req, res)=>{
    var id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if(!todo) res.status(404).send("todo with id " + id +"not found")

    todo.title = req.body.title
    todo.status = req.body.complete

    todos[id-1] = todo

    res.status(201).json("updated successfully");
})

// 5. DELETE /todos/:id - Delete a todo item by ID
//     Description: Deletes a todo item identified by its ID.
//     Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
//     Example: DELETE http://localhost:3000/todos/123

app.delete('/todos/:id', (req, res)=>{
    const id = parseInt( req.params.id );
    const index = todos.findIndex( t => t.id === id);

    if(id === -1) res.send(404).json("id not found");

    todos.splice(index,1);
    res.status(200).send("id deleted successfully")

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})