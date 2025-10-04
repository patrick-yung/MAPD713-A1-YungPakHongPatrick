let SERVER_NAME = 'user-api'
let PORT = 5000;
let HOST = '127.0.0.1';

let errors = require('restify-errors');
let restify = require('restify')

let getStudentsCount = 0
let getCoursesCount = 0
let getAssignmentsCount = 0

let postStudentsCount = 0
let postCoursesCount = 0
let postAssignmentsCount = 0

let delStudentsCount = 0
let delCoursesCount = 0
let delAssignmentsCount = 0

let getStudentsListCount = 0
let getCoursesListCount = 0
let getAssignmentsListCount = 0



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
  delStudentsCount++
  studentsSave.delete(req.params.id, function (error, user) {
    if (error) {
      console.log('Delete /students params=> Failed');
      return next(new Error(JSON.stringify(error.errors)))}
    res.send(204)
  })
})
server.del('/courses/:id', function (req, res, next) {
  console.log('DEL /courses params=>' + JSON.stringify(req.params));
  delCoursesCount++
  coursesSave.delete(req.params.id, function (error, user) {
    if (error){ 
      console.log('Delete /courses params=> Failed');
      return next(new Error(JSON.stringify(error.errors)))}
    res.send(204)
  })
})

server.del('/assignments/:id', function (req, res, next) {
  console.log('DEL /assignments params=>' + JSON.stringify(req.params));
  delAssignmentsCount++
  assignmentsSave.delete(req.params.id, function (error, user) {
    if (error){ 
      console.log('Delete /assignments params=> Failed');
      return next(new Error(JSON.stringify(error.errors)))}
    res.send(204)
  })
})

/************************************************************/
// Get a students/assignments/courses
server.get('/students/:id', (req, res, next) => {
  console.log('GET /students/:id params=>' + JSON.stringify(req.params));
  getStudentsCount++
  studentsSave.findOne({ _id: req.params.id }, function (error, user) {
    if (error) return next(new Error(JSON.stringify(error.errors)))
    if (user) {
      res.send(user)
    } else {
      res.send(404)
      console.log('GET /students params=> Failed to find assignment with id ' + req.params.id);

    }
  })
})

server.get('/courses/:id', (req, res, next) => {
  console.log('GET /courses/:id params=>' + JSON.stringify(req.params));
  getCoursesCount++
  coursesSave.findOne({ _id: req.params.id }, function (error, user) {
    if (error) return next(new Error(JSON.stringify(error.errors)))
    if (user) {
      res.send(user)
    } else {
      res.send(404)
      console.log('GET /courses params=> Failed to find assignment with id ' + req.params.id);
    }
  })
})

server.get('/assignments/:id', (req, res, next) => {
  console.log('GET /assignments/:id params=>' + JSON.stringify(req.params));
  getAssignmentsCount++
  assignmentsSave.findOne({ _id: req.params.id }, function (error, user) {
    if (error) return next(new Error(JSON.stringify(error.errors)))
    if (user) {
      res.send(user)
    } else {
      console.log('GET /assignments params=> Failed to find assignment with id ' + req.params.id);
      res.send(404)
    }
  })
})

/************************************************************/
// Get a list of all students/assignments/courses
server.get('/students', (req, res, next) => {
  getStudentsListCount++
  console.log('GET /students params=>' + JSON.stringify(req.params));
  studentsSave.find({}, function (error, users) {
    res.send(users)
  })
})

server.get('/courses', (req, res, next) => {
  getCoursesListCount++
  console.log('GET /courses params=>' + JSON.stringify(req.params));
  coursesSave.find({}, function (error, users) {
    res.send(users)
  })
})
server.get('/assignments', (req, res, next) => {
  getAssignmentsListCount++
  console.log('GET /assignment params=>' + JSON.stringify(req.params));
  assignmentsSave.find({}, function (error, users) {
    res.send(users)
  })
})
/************************************************************/
// Create a new student/course/assignment user
server.post('/students', function (req, res, next) {
  console.log('POST /students body=>' + JSON.stringify(req.body));
  postStudentsCount++
  if( req.body.studentId === undefined ) {
    console.log('missing argument student id');
    return next(new errors.BadRequestError('student id must be supplied'))
  } else if (req.body.name === undefined) {
    console.log('missing argument student name');
    return next(new errors.BadRequestError('student name must be supplied'))
  } else if (req.body.address === undefined) {
    console.log('missing argument student address');
    return next(new errors.BadRequestError('student address must be supplied'))
  }else if (req.body.phone === undefined) {
    console.log('missing argument student phone');
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
  postCoursesCount++
  if (req.body.courseCode === undefined ) {
    console.log('missing argument courses id');
    return next(new errors.BadRequestError('course id must be supplied'))
  }else if (req.body.shortDescription === undefined ) {
    console.log('missing argument courses shortDescription');
    return next(new errors.BadRequestError('course shortDescription must be supplied'))
  }else if (req.body.fullDescription === undefined ) {
    console.log('missing argument courses fullDescription');
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
  postAssignmentsCount++
  if (req.body.assignmentCode === undefined ) {
    console.log('missing argument assignment id');
    return next(new errors.BadRequestError('assignment id must be supplied'))
  } else if (req.body.dueDate === undefined ) {
    console.log('missing argument assignment duedate');
    return next(new errors.BadRequestError('assignment dueDate must be supplied'))
  } else if (req.body.title === undefined ) {
    console.log('missing argument assignment title');
    return next(new errors.BadRequestError('assignment title must be supplied'))
  }

  let newAssignment = {
    assignmentCode: req.body.assignmentCode,
    courseCode: req.body.courseCode,
    dueDate: req.body.dueDate,
    title: req.body.title 
  }
  assignmentsSave.create( newAssignment, function (error, user) {
  if (error) return next(new Error(JSON.stringify(error.errors)))
    res.send(201, user)
  })
})

/************************************************************/


server.get('/info', function (req, res, next) { 
    console.log('INFO body=>' + JSON.stringify(req.body));
    res.send(200,{
      "Number of Students ID Get Request": getStudentsCount,
      "Number of Courses ID Get Request": getCoursesCount,
      "Number of Assignments ID Get Request": getAssignmentsCount,
      "Number of Students Post Request": postStudentsCount,
      "Number of Course Post Request": postCoursesCount,
      "Number of Assignments Post Request": postAssignmentsCount,
      "Number of Students Delete Request": delStudentsCount,
      "Number of Courses Delete Request": delCoursesCount,
      "Number of Assignments Delete Request": delAssignmentsCount,
      "Number of Students Assignments Request": getStudentsListCount,
      "Number of Course Request": getCoursesListCount,
      "Number of Assignments Request": getAssignmentsListCount
    }) 

})


/************************************************************/



// Update a user by their id
server.put('/students/:id', function (req, res, next) { 
})

// Delete user with the given id
server.del('/users/:id', function (req, res, next) {
 
})


