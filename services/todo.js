const Todo = require('../models/todo.js')

/**
 * To get all todo list 
 * @return {array} - array of todo objects
 */
exports.getAllTodoList = () => Todo.find({}).sort({ date: -1 })

/**
 * To get todo list by user
 * @param {string} - id
 * @return {array} - array of todo objects
 */
exports.getTodoListByUser = id => Todo.find({user:id}).sort({ date: -1 })

/**
 * To save todo list by user
 * @param {string} - task name
 * @param {string} - user id
 * @return {object} - todo object
 */
exports.saveTodoTask = (task,user) => {
    const obj = new Todo({ task ,user })
    return obj.save();
}

/**
 * To delete todo task by id
 * @param {string} - task id
 * @return {object} - todo object
 */
exports.deleteTodoTask = id => Todo.findById(id).then(item => item.remove());

/**
 * To update todo list by task id
 * @param {string} - task id
 * @param {string} - task name
 * @return {object} - todo object
 */
exports.updateTodoTask = (id, task) => new Promise((resolve, reject) => Todo.findOneAndUpdate({_id:id}, task)
    .then(data => {
        if (!data) {
            let errObj = new Error(`Cannot update task with id=${id}. Maybe task was not found!`)
            /* If different HTTP Status Code */
            errObj.httpStatusCode = 404;
            return reject(errObj);
        } else return resolve(true);
    })
    .catch(err => {
        return reject(new Error(`Error updating task with id= ${id}`));
    })
);
