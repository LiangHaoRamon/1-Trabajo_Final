const getPlanetas = require('./get-todos');
const getTodo = require('./get-todo');
const createTodo = require('./create-todo');
const updateTodo = require('./update-todo');
const deleteTodo = require('./delete-todo');

module.exports = {
    paths:{
        '/mapa/planetas':{
            ...getPlanetas
        },
        '/todos/{id}':{
            ...getTodo,
            ...updateTodo,
            ...deleteTodo
        }
    }
}