const config = require('config')     // keep constants in files not code
const cors = require('cors')         // cross origin resourse sharing
const express = require('express')   // web framework for Node.js
const mongoose = require('mongoose') // MongoDB object modeling  
const morgan = require('morgan')     // HTTP request logger middleware 

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGODB_URI || config.get("mongoURI")
const port = process.env.PORT || config.get("port");

// create Express app
const app = express();

// use middleware to parse requests containing json payloads
app.use(express.json());

// use middleware to enable cross-origin-resource-sharing for all requests
app.use(cors())

// use middleware to log HTTP requests with morgan
app.use(morgan('combined'))

//missed routed
app.use(function(req, res, next) {
  var err = new Error('Not Found ' + req.method + ' ' + req.url + "\n\n");
  err.status = 404;
  res.status(404).json({ status:err.status, msg: err.message });
});

// Use middleware to set up routes
app.use('/todo', require('./routes/todo'))
app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))
app.use('/', (req,res)=> {res.send('USE /todo/all')})



// catch all errors
app.use(function(err, req, res, next) {
  console.error(err, err.stack);
})

// Connect to data store
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

  // start listening & inform user
app.listen(port, () =>{
   console.log(`App running on ${port} in ${environment}.`)
})

process.on('exit', (code) => {
  mongoose.connection.close()
  console.log(`About to exit with code: ${code}`);
});


process.on('SIGINT', function() {
  console.log("Caught interrupt signal");
  process.exit();
});

module.exports = app
