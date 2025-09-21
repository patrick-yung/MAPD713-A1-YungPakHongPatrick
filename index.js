let SERVER_NAME = 'user-api'
let PORT = 3000;
let HOST = '127.0.0.1';

let errors = require('restify-errors');
let restify = require('restify')

  // Get a persistence engine for the users
  , studentsSave = require('save')('students')
  , coursesSave = require('save')('courses')
  , assignmentsSave = require('save')('assignments')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('**** Resources: ****')
  console.log('********************')
  console.log(' /student')
  console.log(' /course')  
})

server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());

// Get a single user by their user id
server.get('/users/:id', (req, res, next) => {
  
})

// Create a new student user
server.post('/students', function (req, res, next) {
  console.log('POST /students body=>' + JSON.stringify(req.body));
  if (req.body.id === undefined ) {
    return next(new errors.BadRequestError('student id must be supplied'))
  }
  let newStudent = {
    id: req.body.id, 
  }
  studentsSave.create( newStudent, function (error, user) {
  if (error) return next(new Error(JSON.stringify(error.errors)))
    res.send(201, user)
  })
})

// Create a new course user
server.post('/courses', function (req, res, next) {
  console.log('POST /courses body=>' + JSON.stringify(req.body));
  if (req.body.id === undefined ) {
    return next(new errors.BadRequestError('course id must be supplied'))
  }
  let newCourse = {
    id: req.body.id, 
  }
  coursesSave.create( newCourse, function (error, user) {
  if (error) return next(new Error(JSON.stringify(error.errors)))
    res.send(201, user)
  })
})

// Create a new assignment user
server.post('/assignments', function (req, res, next) {
  console.log('POST /assignments body=>' + JSON.stringify(req.body));
  if (req.body.id === undefined ) {
    return next(new errors.BadRequestError('assignment id must be supplied'))
  }
  let newAssignment = {
    id: req.body.id, 
  }
  assignmentsSave.create( newAssignment, function (error, user) {
  if (error) return next(new Error(JSON.stringify(error.errors)))
    res.send(201, user)
  })
})


// Update a user by their id
server.put('/students/:id', function (req, res, next) { 
})

// Delete user with the given id
server.del('/users/:id', function (req, res, next) {
 
})


