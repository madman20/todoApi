const express = require('express')
const auth = require('../middleware/auth.js')
const userService = require('../services/user.js')
const authHelpers = require('../helpers/auth.js')

const router = express.Router()

// @route   POST /auth/signin
// @desc    Authenticate user
// @access  Public
router.post('/signin', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) { return res.status(400).json({ msg: 'Please enter email & password fields' }) }

  // Check for existing user
  let user = {};
  return userService.checkUserExists(email)
  .then(userExists => {
    user = userExists;
    return authHelpers.checkHashPassword(password,user.password)
  })
  .then(() => authHelpers.generateJWTToken(user))
  .then(resObj => res.json(resObj))
  .catch(err => {
    console.log('Error signin route:',err)
    res.status(400).json({msg: err.message})
  });

})

// @route   GET /auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  return userService.getUserById(req.user.id)
  .then(user => res.json(user))
  .catch(err => {
    console.log('Error user info route:',err)
    res.status(400).json({msg: err.message})
  });
})

module.exports = router