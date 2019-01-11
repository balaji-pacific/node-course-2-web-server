console.log('Starting server.js');

var express = require('express');
var hbs = require('hbs');
var fs = require('fs');


var app = express();
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (anyText) => {
  return anyText.toUpperCase();
});

app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} : ${req.originalUrl}`;
  console.log(log);
  fs.appendFile('app.log', `${log} \n`, (err) => {
    if(err){
      console.log('Unable to write to the log file ');
    }
  });
  next();
});


// app.use((req, res, next) => {
//   res.render('maintainence.hbs', {
//     pageTitle: 'Maintainence Page',
//     headerMessage: 'Something Went wrong',
//     welcomeMessage: 'We will update it soon!!!!!'
//   });
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    headerMessage: 'Welcome to Home page for the Node JS application',
    welcomeMessage: 'Testing Application'
  });
});

app.get('/about', (req, res) => {
  //res.send('This is the sample application created for understanding <br> V 1.0.0');
  res.render('about.hbs', {
    pageTitle: 'About',
    headerMessage: 'Welcome to About Page',
    welcomeMessage: 'This is testing application'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    statusCode: 100,
    headerMessage: 'Unable to handle the request'
  });
});

app.get('/help', (req, res) => {
  res.send();
});

app.listen(3000, () =>{
  console.log('Server started in port 3000');
});
