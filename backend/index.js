// import the require dependencies
const express = require('express');
const mysql = require('mysql');

const app = express();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ydvhs2015~',
  database: 'yelp_db',
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});
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

  db.query(`SELECT * FROM restaurant_user WHERE email = '${req.body.user}' AND password = '${req.body.pass}'`, (err, result) => {
    if (result.length > 0) {
      console.log('RESULT');
      isThere = true;
      res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
      res.send({ rname: result[0].r_name, location: result[0].location });
      // res.writeHead(200, {
      //   'Content-Type': 'text/plain',
      // });
      return res.end('Successful Login!');
    }
    db.query(`SELECT * FROM customer_user WHERE email = '${req.body.user}' AND password = '${req.body.pass}'`, (err, result) => {
      console.log('USERs');
      console.log(err);
      if (result.length > 0) {
        isThere = true;
        console.log('USERs');
        res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
        res.send({
          cname: result[0].name, email: result[0].email, yelpingSince: result[0].yelpingSince, thingsILove: result[0].thingsILove, findMeIn: result[0].findMeIn, blogsite: result[0].blogsite, dob: result[0].dob, city: result[0].city, state: result[0].state, country: result[0].country, nickname: result[0].nickname, phone: result[0].phone, persona: 'customer',
        });
        // res.writeHead(200, {
        //   'Content-Type': 'text/plain',
        // });
        res.end('Successful Login!');
      } else {
        res.writeHead(202, {
          'Content-Type': 'application/json',
        });
        res.end('Unsuccess!');
      }
    });

    // isThere = false;
  });
  console.log(isThere);
  // if (isThere === false) {
  //   db.query(`SELECT * FROM customer_user WHERE email = '${req.body.user}' AND password = '${req.body.pass}'`, (err, result) => {
  //     console.log('USERs');
  //     console.log(err);
  //     if (result.length > 0) {
  //       isThere = true;
  //       console.log('USERs');
  //       res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
  //       res.send({ rname: result[0].r_name, location: result[0].location });
  //       // res.writeHead(200, {
  //       //   'Content-Type': 'text/plain',
  //       // });
  //       res.end('Successful Login!');
  //     } else {
  //       res.writeHead(202, {
  //         'Content-Type': 'application/json',
  //       });
  //       res.end('Unsuccess!');
  //     }
  //   });
  // }
  // if (isThere === true) {
  //   res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
  //   // let theOBJ = {username: 'admin1@gmail.com', password: 'admin1', location: 'Fremont, CA', rname: 'Chevys'};
  //   // res.send(theOBJ);
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain',
  //   });
  //   res.end('Successful Login!');
  // } else if (isThere === false) {
  //   res.writeHead(202, { 'Content-Type': 'text/html' });
  //   res.end('Unsuccessful Login');
  // }
});

app.post('/signup', (req, res) => {
  if (req.body.pers === 'customer') {
    const customer = {
      email: req.body.user, password: req.body.pass, name: req.body.cname,
    };
    const sql = 'INSERT INTO customer_user SET ?';
    const query = db.query(sql, customer, (err, result) => {
      if (err) {
        res.writeHead(202, {
          'Content-Type': 'application/json',
        });
        res.end('Unsuccess!');
      } else {
        res.cookie('remember', '1', { maxAge: 900000, httpOnly: false, path: '/' });
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end('Success!');
      }
    });
  } else if (req.body.pers === 'restaurant') {
    const restaurant = {
      email: req.body.user, password: req.body.pass, location: req.body.loc, r_name: req.body.rname, timings: '', description: '',
    };
    const sql = 'INSERT INTO restaurant_user SET ?';
    const query = db.query(sql, restaurant, (err, result) => {
      if (err) {
        res.writeHead(202, {
          'Content-Type': 'application/json',
        });
        res.end('Unsuccess!');
      } else {
        res.cookie('remember', '1', { maxAge: 900000, httpOnly: false, path: '/' });
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end('Success!');
      }
    });
  }
});

app.post('/updateprofile', (req, res) => {
  const restaurant = {
    email: req.body.emailid, location: req.body.loc, r_name: req.body.rname, timings: req.body.time, description: req.body.desc,
  };
  db.query(`UPDATE restaurant_user SET r_name = '${restaurant.r_name}', location = '${restaurant.location}', timings = '${restaurant.timings}', description = '${restaurant.description}' WHERE email = '${restaurant.email}'`, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(202, {
        'Content-Type': 'application/json',
      });
      res.end('Unsuccess!');
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end('Success!');
    }
  });
});

app.post('/updatecustomer', (req, res) => {
  const customer = {
    yelpingSince: req.body.yelpSince, thingsILove: req.body.love, findMeIn: req.body.findIn, blogsite: req.body.weblog, dob: req.body.dob, city: req.body.acity, state: req.body.astate, country: req.body.acountry, nickname: req.body.nname, phone: req.body.aPhone, email: req.body.email, name: req.body.fullname,
  };
  db.query(`UPDATE customer_user SET yelpingSince = '${customer.yelpingSince}', thingsILove = '${customer.thingsILove}', findMeIn = '${customer.findMeIn}', blogsite = '${customer.blogsite}', dob = '${customer.dob}', city = '${customer.city}', state = '${customer.state}', country = '${customer.country}', nickname = '${customer.nickname}', phone = '${customer.phone}', email = '${customer.email}', name = '${customer.name}' WHERE email = '${customer.email}'`, (err, result) => {
    console.log(err);
    if (err) {
      res.writeHead(202, {
        'Content-Type': 'application/json',
      });
      res.end('Unsuccess!');
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end('Success!');
    }
  });
});

app.post('/addevent', (req, res) => {
  const event = {
    name: req.body.ename, description: req.body.desc, time: req.body.atime, date: req.body.adate, location: req.body.loc, hashtags: req.body.htag,
  };
  const sql = 'INSERT INTO restaurant_events SET ?';
  const query = db.query(sql, event, (err, result) => {
    console.log(err);
    if (err) {
      res.writeHead(202, {
        'Content-Type': 'application/json',
      });
      res.end('Unsuccess!');
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end('Success!');
    }
  });
});

app.post('/restaurantevents', (req, res) => {
  db.query('SELECT * FROM restaurant_events', (err, result) => {
    console.log(result);
    res.send(result);
  });
});
// start your server on port 3001
app.listen(3001);
console.log('Server Listening on port 3001');
