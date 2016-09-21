// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get("/", function homepage(req, res) {
  response.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search result from the
  * query in the request. COMPLETE THIS ENDPOINT LAST
  */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todods
  */
  res.json({"todos": todos});
});

app.post('/api/todos', function create(req, res) {
  /* this endpoint will add a todo to out "database"
  * and a repsonse with the newly created todo.
  */
  var newId = todos[todos.length -1]["_id"] + 1;
  var newTask = req.body.task;
  var newDescription = req.body.description;

  var newObject = {"_id": newId, "task": newTask, "description": newDescription};
  todos.push(newObject);
  res.json(newObject)
});

app.get('/api/todos/:id', function show(req, res) {
  /* this endpoint will return a single todo with the
  * id specified in the route paramete (:id)
  */
  var sentId = req.params.id;
  var result;

  for (var i = 0; i < todos.length; i++) {
    if (sentId == todos[i]["_id"]) {
      result = todos[i];
    }
  }

  res.send(result);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var sentId = req.params.id;
   var recordToDelete;

   for(var i = 0; i < todos.length; i++) {
      if(sentId == todos[i]["_id"]) {
//      recordToDelete = todos[i];f
        todos.splice(todos[i], 1);
//      console.log(todos[i]);
      }
   }
   res.send("204");
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
