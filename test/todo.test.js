const User = require('../models/user')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

const dummyUserSignUp = {
    name: faker.random.words(),
    email: faker.internet.email(),
    password: faker.random.words()
  }

let token = ''
let createdID = []
let taskId = ''

chai.use(chaiHttp)

describe('*********** TODO ***********', () => {
  describe('/POST user/signup', () => {
    it('it should GET token for the user', (done) => {
      chai
        .request(server)
        .post('/user/signup')
        .send(dummyUserSignUp)
        .end((err, res) => {
          console.log('Response:',res.body)
          /* For deleting insert after test case complete */
          createdID.push(res.body.user.id)
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          /* assigning token to use protected routes */
          token = res.body.token
          done()
        })
    })
  })

  describe('/GET todo/', () => {
    it('it should GET all todo list', (done) => {
      chai
        .request(server)
        .get('/todo/all')
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Response:',res.body)
          res.body.should.be.an('array')
          done()
        })
    })
  })


  describe('/POST todo/', () => {
    it('it should GET success msg', (done) => {

      let body = {task : faker.random.words()}
      chai
        .request(server)
        .post('/todo/user')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Response:',res.body)
          res.body.should.be.an('object')
          res.body.should.have.property('id')
          taskId = res.body.id
          done()
        })
    })
  })

  describe('/PUT todo/', () => {
    it('it should GET success msg', (done) => {

      let body = {task : `Changed ${faker.random.words()}`}
      chai
        .request(server)
        .put(`/todo/user/${taskId}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Response:',res.body)
          res.body.should.be.an('object')
          res.body.should.have.property('success').eql(true)
          done()
        })
    })
  })

  describe('/GET todo/user', () => {
    it('it should GET current user todo list', (done) => {
      chai
        .request(server)
        .get('/todo/user')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Response:',res.body)
          res.body.should.be.an('array')
          res.body[0].should.have.property('task')
          done()
        })
    })
  }) 


  describe('/DELETE todo/user', () => {
    it('it should GET user safe details', (done) => {
      chai
        .request(server)
        .delete(`/todo/user/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Response:',res.body)
          res.body.should.be.an('object')
          res.body.should.have.property('success').eql(true)
          done()
        })
    })
  })
 
  after(() => {
    createdID.forEach((id) => {
      User.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
