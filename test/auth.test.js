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

let { email, password } = dummyUserSignUp
const dummyUserSignIn = { email, password }
let token = ''
let createdID = []

chai.use(chaiHttp)

describe('*********** AUTH ***********', () => {
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
          done()
        })
    })
  })
  describe('/POST auth/signin', () => {
    it('it should GET token for the user', (done) => {
      console.log('Request Body:',dummyUserSignIn);
      chai
        .request(server)
        .post('/auth/signin')
        .send(dummyUserSignIn)
        .end((err, res) => {
          console.log('Response:',res.body)
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          token = res.body.token
          done()
        })
    })
  })

  describe('/GET auth/user', () => {
    it('it should GET user safe details', (done) => {
      chai
        .request(server)
        .get('/auth/user')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('name')
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
