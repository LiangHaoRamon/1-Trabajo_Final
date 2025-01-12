var express = require("express");
var path = require("path");
// var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { initialize } = require("express-openapi");
var swaggerUI = require("swagger-ui-express");
const docs = require('./src/docs');
const router = require('./src/routes/router');

var app = express();

// Let the server know we want to use templates
// with the rendering engine ejs. 
// More info on EJS here: http://embeddedjs.com/
app.set('view engine', 'ejs');

app.use(logger("dev"));

//  archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
// app.use(cookieParser());
app.use('/',router);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

// Start the server.
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Web available on http://localhost:" + port);
  console.log(
    `OpenAPI documentation available on http://localhost:${port}/api-docs`
  );
});

module.exports = app;