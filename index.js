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


// Get a list of all students/assignments/courses
server.get('/students', (req, res, next) => {
  console.log('GET /students params=>' + JSON.stringify(req.params));
  studentsSave.find({}, function (error, users) {
    res.send(users)
  })
})

server.get('/courses', (req, res, next) => {
  console.log('GET /students params=>' + JSON.stringify(req.params));
  coursesSave.find({}, function (error, users) {
    res.send(users)
  })
})
server.get('/assignment', (req, res, next) => {
  console.log('GET /students params=>' + JSON.stringify(req.params));
  assignmentsSave.find({}, function (error, users) {
    res.send(users)
  })
})
/************************************************************/
// Create a new student/course/assignment user

let numberOfStudents = 0;
let numberOfCourses = 0;
let numberOfAssignments = 0;

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

  numberOfStudents++;

  let newStudent = {
    id: numberOfStudents,
    studentid: req.body.studentId,
    studentname: req.body.name,
    studentaddress: req.body.address,
    studentphone: req.body.phone
  }
  console.log('Final Stage');

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
 
  numberOfCourses++;

  let newCourse = {
    id: numberOfCourses,
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

  numberOfAssignments++;

  let newAssignment = {
    id: numberOfAssignments,
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


