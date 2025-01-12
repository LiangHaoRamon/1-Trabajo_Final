var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { initialize } = require("express-openapi");
var swaggerUI = require("swagger-ui-express");
const docs = require('./src/docs');
const mapRouter = require('./src/routes/router');

var app = express();
const PORT = process.env.PORT || 3030;

app.listen(3030);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/mapa',mapRouter);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

console.log("App running on port http://localhost:3030");
console.log(
  "OpenAPI documentation available in http://localhost:3030/api-docs"
);

module.exports = app;