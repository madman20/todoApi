const express = require('express')
const auth = require('../middleware/auth.js')
const todoService = require('../services/todo.js')

const router = express.Router()

// @route   GET /todo
// @desc    Get All Todos
// @access  Public
router.get('/all', (req, res) => {
  return todoService.getAllTodoList()
    .then(tasks => res.json(tasks))
    .catch(err => {
      console.log(err);
      return res.status(500).json({msg:err.message});
    });
});

// @route   GET /todo
// @desc    Get User created Todos
// @access  Private
router.get('/user',auth, (req, res) => {
  return todoService.getTodoListByUser(req.user.id)
    .then(tasks => res.json(tasks))
    .catch(err => {
      console.log(err);
      return res.status(500).json({msg:err.message});
    });
});

// @route   POST /todo
// @desc    Create new Todo
// @access  Private
router.post('/user', auth, (req, res) => {
  console.log(`Request body: ${JSON.stringify(req.body)}`)
  return todoService.saveTodoTask(req.body.task,req.user.id).then(item => res.json(item))
  .catch(err => {
    console.log(err);
    return res.status(500).json({msg:err.message});
  });
})

// @route   DELETE /todo/:id
// @desc    Delete a Todo
// @access  Private
router.delete('/user/:id', auth, (req, res) => {
  return todoService.deleteTodoTask(req.params.id)
  .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
})


// @route   PUT /todo/:id
// @desc    Update a Todo
// @access  Private
router.put('/user/:id', auth, (req, res) => {

  console.log('Request Body:',req.body)
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  return todoService.updateTodoTask(req.params.id,req.body)
  .then(() => res.json({ success: true }))
    .catch(err => { 
      let httpStatusCode = err.httpStatusCode || 500;
      res.status(httpStatusCode).json({ message: err.message })
    });
})

module.exports = router