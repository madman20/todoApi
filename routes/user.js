const userService = require('../services/user.js')
const authHelper = require('../helpers/auth.js')
const express = require('express')

const router = express.Router()

// @route   POST /user
// @desc    Create new User
// @access  Public
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) { return res.status(400).json({ msg: 'Please enter all fields' }) }

  // Check for existing user
  return userService.checkUserExists(email)
    .then(user => {
      res.status(401).json({ msg: 'User already Exists' })
    })
    .catch(err => {
      /* If didn't get statusCode key in error Obj that we set,it means some internal server happened */
      if (err.statusCode !== 404) {
        return res.status(500).json({ msg: 'Something went wrong' })
      }

      /* If user doesnot exist, then we create user*/
      return userService.saveUser(name, email, password)
        .then(user => authHelper.generateJWTToken(user))
        .then(resObj => res.json(resObj))

    })
    .catch(err => {
      console.log('Error in user post route:', err)
      res.status(400).json({ msg: err.message })
    });
})

module.exports = router;