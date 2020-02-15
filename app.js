var express = require('express');
var app = express();
var router = require('./router/router.js');
var ejs = require("ejs");

app.use(express.static("./public"));

app.set("view engine","ejs");
app.get("/",router.showput);
app.get("/doput",router.doput);
app.get("/show/:number",router.show);

app.listen(3000);