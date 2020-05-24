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

let createdID = []

chai.use(chaiHttp)

describe('*********** USERS ***********', () => {
  describe('/POST sign up', () => {
    it('it should GET token for the user', (done) => {
      chai
        .request(server)
        .post('/user/signup')
        .send(dummyUserSignUp)
        .end((err, res) => {
          console.log('Response:',res.body)
          createdID.push(res.body.user.id)
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          // tokens.admin = res.body.token
          done()
        })
    })
    it('it should not GET token for the user because mandatory fields are missing', (done) => {
      delete dummyUserSignUp.email;
      chai
        .request(server)
        .post('/user/signup')
        .send(dummyUserSignUp)
        .end((err, res) => {
          console.log('Response:',res.body)
          res.should.have.status(400)
          res.body.should.be.an('object')
          res.body.should.have.property('msg')
          done()
        })
    })
  })
  

  after(() => {
    /* To remove inserted data from DB */
    createdID.forEach((id) => {
      User.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
