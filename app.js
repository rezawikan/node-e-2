// packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


// routes
const contactRoutes = require('./routes/contact');

app.use(bodyParser.json()); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: true })); //support parsing of application/x-www-form-urlencoded post data


// Set cors headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(contactRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    res.status(status).json({ message: message});
});

mongoose.connect('mongodb://localhost/contact-app', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
})
.then(result => {
    app.listen(8080);
}).catch(err => console.log(err));