const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const multer=require('multer')
const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

mongoose.connect("mongodb+srv://shubham:Q0mHsgCUtVEFowST@cluster0.qhjri.mongodb.net",)
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3700, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3700))
});