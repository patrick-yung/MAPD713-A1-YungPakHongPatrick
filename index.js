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
  console.log(' /assignment')
  console.log('********************')
})

server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());


/************************************************************/
// Delate a students/assignments/courses
server.del('/students/:id', function (req, res, next) {
  console.log('DEL /students params=>' + JSON.stringify(req.params));
  studentsSave.delete(req.params.id, function (error, user) {
    if (error) return next(new Error(JSON.stringify(error.errors)))
    res.send(204)
  })
})
server.del('/courses/:id', function (req, res, next) {
  console.log('DEL /courses params=>' + JSON.stringify(req.params));
  coursesSave.delete(req.params.id, function (error, user) {
    if (error) return next(new Error(JSON.stringify(error.errors)))
    res.send(204)
  })
})

server.del('/assignments/:id', function (req, res, next) {
  console.log('DEL /assignments params=>' + JSON.stringify(req.params));
  assignmentsSave.delete(req.params.id, function (error, user) {
    if (error) return next(new Error(JSON.stringify(error.errors)))
    res.send(204)
  })
})

/************************************************************/
// Get a students/assignments/courses
server.get('/students/id', (req, res, next) => {
  console.log('GET /students/:id params=>' + JSON.stringify(req.params));
  studentsSave.findOne({ _id: req.params.id }, function (error, user) {
    if (error) return next(new Error(JSON.stringify(error.errors)))
    if (user) {
      res.send(user)
    } else {
      res.send(404)
    }
  })
})

server.get('/courses/id', (req, res, next) => {
  console.log('GET /courses/:id params=>' + JSON.stringify(req.params));
  coursesSave.findOne({ _id: req.params.id }, function (error, user) {
    if (error) return next(new Error(JSON.stringify(error.errors)))
    if (user) {
      res.send(user)
    } else {
      res.send(404)
    }
  })
})

server.get('/assignments/id', (req, res, next) => {
  console.log('GET /assignments/:id params=>' + JSON.stringify(req.params));
  assignmentsSave.findOne({ _id: req.params.id }, function (error, user) {
    if (error) return next(new Error(JSON.stringify(error.errors)))
    if (user) {
      res.send(user)
    } else {
      res.send(404)
    }
  })
})

/************************************************************/
// Get a list of all students/assignments/courses
server.get('/students', (req, res, next) => {
  console.log('GET /students params=>' + JSON.stringify(req.params));
  studentsSave.find({}, function (error, users) {
    res.send(users)
  })
})

server.get('/courses', (req, res, next) => {
  console.log('GET /courses params=>' + JSON.stringify(req.params));
  coursesSave.find({}, function (error, users) {
    res.send(users)
  })
})
server.get('/assignments', (req, res, next) => {
  console.log('GET /assignment params=>' + JSON.stringify(req.params));
  assignmentsSave.find({}, function (error, users) {
    res.send(users)
  })
})
/************************************************************/
// Create a new student/course/assignment user
server.post('/students', function (req, res, next) {
  console.log('POST /students body=>' + JSON.stringify(req.body));
  if( req.body.studentId === undefined ) {
    return next(new errors.BadRequestError('student id must be supplied'))
  } else if (req.body.name === undefined) {
    return next(new errors.BadRequestError('student name must be supplied'))
  } else if (req.body.address === undefined) {
    return next(new errors.BadRequestError('student address must be supplied'))
  }else if (req.body.phone === undefined) {
    return next(new errors.BadRequestError('student phone must be supplied'))
  }


  let newStudent = {
    studentID: req.body.studentId,
    studentName: req.body.name,
    studentAddress: req.body.address,
    studentPhone: req.body.phone
  }

  studentsSave.create( newStudent, function (error, user) {
  if (error) return next(new Error(JSON.stringify(error.errors)))
    res.send(201, user)
  })
})

server.post('/courses', function (req, res, next) {
  console.log('POST /courses body=>' + JSON.stringify(req.body));
  if (req.body.courseCode === undefined ) {
    return next(new errors.BadRequestError('course id must be supplied'))
  }else if (req.body.shortDescription === undefined ) {
    return next(new errors.BadRequestError('course shortDescription must be supplied'))
  }else if (req.body.fullDescription === undefined ) {
    return next(new errors.BadRequestError('course fullDescription must be supplied'))
  }
 

  let newCourse = {
    courseCode: req.body.courseCode,
    shortDescription: req.body.shortDescription,
    fullDescription: req.body.fullDescription 
  }
  
  coursesSave.create( newCourse, function (error, user) {
  if (error) return next(new Error(JSON.stringify(error.errors)))
    res.send(201, user)
  })
})

server.post('/assignments', function (req, res, next) {
  console.log('POST /assignments body=>' + JSON.stringify(req.body));
  if (req.body.assignmentCode === undefined ) {
    return next(new errors.BadRequestError('assignment id must be supplied'))
  } else if (req.body.dueDate === undefined ) {
    return next(new errors.BadRequestError('assignment dueDate must be supplied'))
  } else if (req.body.title === undefined ) {
    return next(new errors.BadRequestError('assignment title must be supplied'))
  }

  let newAssignment = {
    courseCode: req.body.assignmentCode,
    dueDate: req.body.dueDate,
    title: req.body.title 
  }
  assignmentsSave.create( newAssignment, function (error, user) {
  if (error) return next(new Error(JSON.stringify(error.errors)))
    res.send(201, user)
  })
})

/************************************************************/


// Update a user by their id
server.put('/students/:id', function (req, res, next) { 
})

// Delete user with the given id
server.del('/users/:id', function (req, res, next) {
 
})


