// import the require dependencies
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.set('view engine', 'ejs');

// use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// use express session to maintain session data
// app.use(session({
//   secret: 'cmpe273_kafka_passport_mongo',
//   resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//   saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//   duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//   activeDuration: 5 * 60 * 1000,
// }));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const restaurants = [
  {
    username: 'admin1@gmail.com', password: 'admin1', location: 'Fremont, CA', rname: 'Chevys',
  }];

const customers = [
  { username: 'admin2', password: 'admin2' }];

// Route to handle Post Request Call
app.post('/login', (req, res) => {
  console.log('Inside Login Post Request');
  console.log('Req Body : ', req.body);
  let isThere = false;
  let theOBJ;
  for (let i = 0; i < restaurants.length; i += 1) {
    if (req.body.user === restaurants[i].username) {
      if (req.body.pass === restaurants[i].password) {
        isThere = true;
        theOBJ = restaurants[i];
        break;
      }
    }
  }

  if (isThere === true) {
    res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
    res.send(theOBJ);
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.end('Successful Login!');
  } else if (isThere === false) {
    res.writeHead(202, { 'Content-Type': 'text/html' });
    res.end('Unsuccessful Login');
  }
});

app.post('/signup', (req, res) => {
  let isThere = false;
  if (req.body.pers === 'customer') {
    for (let i = 0; i < customers.length; i += 1) {
      if (customers[i].username === req.body.user) {
        isThere = true;
      }
    }
  } else if (req.body.pers === 'restaurant') {
    for (let i = 0; i < restaurants.length; i += 1) {
      if (restaurants[i].username === req.body.user) {
        isThere = true;
      }
    }
  }

  if (isThere === false) {
    if (req.body.pers === 'customer') {
      customers.push({ username: req.body.user, password: req.body.pass });
    } else if (req.body.pers === 'restaurant') {
      restaurants.push({
        username: req.body.user, password: req.body.pass, location: req.body.loc, rname: req.body.rname,
      });
    }

    res.cookie('remember', '1', { maxAge: 900000, httpOnly: false, path: '/' });
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end('Success!');
  } else {
    res.writeHead(202, {
      'Content-Type': 'application/json',
    });
    res.end('Unsuccess!');
  }
});

// start your server on port 3001
app.listen(3001);
console.log('Server Listening on port 3001');
