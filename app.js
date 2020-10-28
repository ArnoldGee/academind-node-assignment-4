const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');

const users = []; // users database

const app = express();
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // serve CSS files as static files

/******************
 * OUR APP ROUTES *
 ******************/

app.get('/', (req, res, next) => {
  res.render('index', {pageTitle: 'Main site'});
});

app.get('/users', (req, res, next) => {
  res.render('users', {pageTitle: 'Users list', users});
});

app.post('/add-user', (req, res, next) => {
  const {userName} = req.body;
  users.push({userName});
  console.log(users);
  res.redirect('/users');
});

/***************
 * 404 MESSAGE *
 ***************/

app.use('/', (req, res, next) => {
  res.status(404).render('404', {pageTitle: '404 Page not found. '});
});

/********************
 * START THE SERVER *
 ********************/

app.listen(3000);
