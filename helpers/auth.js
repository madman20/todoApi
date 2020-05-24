const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

/**
 * To generated hash password
 * @param {string} - password
 * @return {object} - promise object
 */
exports.genHashPassword = password => new Promise((resolve, reject) => bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err);
        return resolve(hash);
    })
}));

/**
 * To check saved hash password
 * @param {string} - old password
 * @param {string} - new password
 * @return {object} - promise object
 */
exports.checkHashPassword = (oldPassword, newPassword) => new Promise((resolve, reject) => {
    return bcrypt.compare(oldPassword, newPassword)
        .then(isMatch => {
            if (!isMatch) return reject(new Error('Invalid credentials'));
            return resolve(true);
        })
})

/**
 * To generate JWT Token
 * @param {object} - user model object
 * @return {string} - token
 */
exports.generateJWTToken = user => new Promise((resolve, reject) => jwt.sign(
    { id: user.id },
    config.get('jwtSecret'),
    { expiresIn: 3600 },
    (err, token) => {
        if (err) return reject(err);
        return resolve({ token, user: { id: user.id, name: user.name, email: user.email}});
    }
));