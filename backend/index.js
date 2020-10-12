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
const ImageController = require('./ImageController');

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
      console.log(result);
      isThere = true;
      res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
      res.send({
        r_name: result[0].r_name, location: result[0].location, description: result[0].description, timings: result[0].timings 
      });
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
    res.send(result);
  });
});

app.post('/customerevents', (req, res) => {
  db.query('SELECT * FROM restaurant_events ORDER BY date ASC', (err, result) => {
    res.send(result);
  });
});

app.post('/customerevent', (req, res) => {
  db.query(`SELECT * FROM restaurant_events WHERE name = '${req.body.asearch}'`, (err, result) => {
    res.send(result[0]);
  });
});

app.post('/showRegistered', (req, res) => {
  db.query(`SELECT event_name FROM customer_events WHERE email = '${req.body.aEmail}'`, (err, result) => {
    res.send(result);
  });
});

app.post('/registerevent', (req, res) => {
  const register = { event_name: req.body.eName, email: req.body.aEmail };
  const sql = 'INSERT INTO customer_events SET ?';
  const query = db.query(sql, register, (err, result) => {
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

app.post('/registeredlist', (req, res) => {
  db.query(`SELECT name FROM customer_user t1 INNER JOIN customer_events t2 ON t1.email = t2.email WHERE event_name = '${req.body.eName}'`, (err, result) => {
    res.send(result);
  });
});

app.post('/viewcustomer', (req, res) => {
  db.query(`SELECT * FROM customer_user WHERE name = '${req.body.cname}'`, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result[0]);
  });
});

app.post('/addmenuitem', (req, res) => {
  const menu = {
    restaurant_name: req.body.rname, dish_name: req.body.mname, ingredients: req.body.mingredients, price: req.body.mprice, category: req.body.mcategory, description: req.body.mdescription,
  };
  const sql = 'INSERT INTO restaurant_menu SET ?';
  const query = db.query(sql, menu, (err, result) => {
    console.log(err);
    console.log(result);
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

app.post('/menu', (req, res) => {
  db.query(`SELECT * FROM restaurant_menu WHERE restaurant_name = '${req.body.rname}'`, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.post('/customerpage', (req, res) => {
  const arr = new Array();
  db.query(`SELECT * FROM restaurant_user t1 LEFT JOIN restaurant_menu t2 ON t1.r_name = t2.restaurant_name UNION SELECT * FROM restaurant_user t1 RIGHT JOIN restaurant_menu t2 ON t1.r_name = t2.restaurant_name WHERE r_name = '${req.body.val}' OR location = '${req.body.val}' OR dish_name = '${req.body.val}'`, (err, result) => {
    console.log(req.body.val);
    console.log(err);
    console.log(result[0]);
    let isThere = false;
    for (let i = 0; i < result.length; i += 1) {
      if (result[i].r_name === req.body.val || result[i].location === req.body.val || result[i].dish_name === req.body.val) {
        isThere = true;
      }

      if (isThere === true) {
        if (!arr.includes(result[i].r_name)) {
          arr.push(result[i].r_name);
        }
      }
      isThere = false;
    }
    console.log(arr);
    res.send(arr);
  });
});

app.post('/viewrestaurant', (req, res) => {
  // console.log(req.body.rsults);
  const arr = req.body.rsults;
  const quotedAndCommaSeparated = `'${arr.join("','")}'`;
  // console.log(quotedAndCommaSeparated);
  // const ares = [...req.body.rsults];
  // const arr = ares.split(',');
  db.query(`SELECT * FROM restaurant_user WHERE r_name IN (${quotedAndCommaSeparated})`, (err, result) => {
    console.log(err);
    console.log(result);
    if (err) {
      res.writeHead(202, {
        'Content-Type': 'application/json',
      });
      res.end('Unsuccess!');
    } else {
      res.send(result);
    }
    // res.send(result);
  });
});

app.post('/restaurantprof', (req, res) => {
  db.query(`SELECT * FROM restaurant_user WHERE r_name = '${req.body.name}'`, (err, result) => {
    res.send(result);
  });
});

app.post('/makereview', (req, res) => {
  const review = {
    customer_email: req.body.customer_email, customer_name: req.body.customer_name, date: req.body.date, rating: req.body.rating, comments: req.body.comment, r_name: req.body.r_name,
  };
  const sql = 'INSERT INTO customer_reviews SET ?';
  const query = db.query(sql, review, (err, result) => {
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

app.post('/rprofreviews', (req, res) => {
  db.query(`SELECT * FROM customer_reviews WHERE r_name = '${req.body.name}'`, (err, result) => {
    res.send(result);
  });
});

app.post('/placeorder', (req, res) => {
  const order = {
    items: req.body.items, cName: req.body.cName, rName: req.body.rName, date_time: req.body.date_time, delivery_option: req.body.delivery_option, real_datetime: req.body.real_datetime, order_option: 'Order Recieved'
  };
  const sql = 'INSERT INTO customer_orders SET ?';
  const query = db.query(sql, order, (err, result) => {
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

app.post('/restaurantorders', (req, res) => {
  db.query(`SELECT * FROM customer_orders WHERE rName = '${req.body.rName}'`, (err, result) => {
    // console.log(err);
    // console.log(result);
    res.send(result);
  });
});

app.post('/updateorder', (req, res) => {
  const order = {
    items: req.body.items, order_option: req.body.order_option,
  };
  db.query(`UPDATE customer_orders SET order_option = '${order.order_option}' WHERE items = '${order.items}'`, (err, result) => {
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

app.post('/filterorder', (req, res) => {
  if (req.body.filter === 'Delivered Orders') {
    db.query(`SELECT * FROM customer_orders WHERE rName = '${req.body.rName}' AND order_option = 'Delivered'`, (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    });
  } else if (req.body.filter === 'New Orders') {
    db.query(`SELECT * FROM customer_orders WHERE rName = '${req.body.rName}' AND order_option = 'Order Recieved' ORDER BY 'items'`, (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    });
  } else if (req.body.filter === 'Cancelled Orders') {
    db.query(`SELECT * FROM customer_orders WHERE rName = '${req.body.rName}' AND order_option = 'Cancel'`, (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    });
  } else if (req.body.filter === 'All Orders') {
    db.query(`SELECT * FROM customer_orders WHERE order_option LIKE '%'`, (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    });
  }
});

app.post('/customerorders', (req, res) => {
  db.query(`SELECT * FROM customer_orders WHERE cName = '${req.body.cName}'`, (err, result) => {
    res.send(result);
  });
});

app.post('/cancelorder', (req, res) => {
  const order = {
    items: req.body.items,
  };
  db.query(`UPDATE customer_orders SET order_option = 'Cancel' WHERE items = '${order.items}'`, (err, result) => {
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

app.post('/editdish', (req, res) => {
  db.query(`SELECT * FROM restaurant_menu WHERE restaurant_name = '${req.body.restaurant_name}' AND dish_name = '${req.body.dish_name}'`, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.post('/updatedish', (req, res) => {
  const customer = {
    dish_name: req.body.dname, ingredients: req.body.ing, price: req.body.prce, category: req.body.cat, description: req.body.desc,
  };
  db.query(`UPDATE restaurant_menu SET ingredients = '${customer.ingredients}', price = '${customer.price}', category = '${customer.category}', description = '${customer.description}' WHERE dish_name = '${customer.dish_name}'`, (err, result) => {
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

app.post('/reviews', (req, res) => {
  db.query(`SELECT * FROM customer_reviews WHERE r_name = '${req.body.r_name}'`, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.post('/uploadImage', ImageController.uploadImageToS3);

app.post('/customerurl', (req, res) => {
  console.log(req.body);
  const url = {
    email: req.body.anEmail, url: req.body.url,
  };
  db.query(`UPDATE customer_user SET url = '${url.url}' WHERE email = '${url.email}'`, (err, result) => {
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

app.post('/getcustomerurl', (req, res) => {
  console.log('EMAIL');
  console.log(req.body.email);
  db.query(`SELECT url FROM customer_user WHERE email = '${req.body.email}'`, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.post('/dishurl', (req, res) => {
  console.log(req.body);
  db.query(`UPDATE restaurant_menu SET url = '${req.body.url}' WHERE dish_name = '${req.body.dish_namez}'`, (err, result) => {
    console.log(result);
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

app.post('/filtcustomerorder', (req, res) => {
  if (req.body.filter === 'Order Recieved') {
    db.query(`SELECT * FROM customer_orders WHERE cName = '${req.body.cName}' AND order_option = 'Order Recieved'`, (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    });
  } else if (req.body.filter === 'Preparing') {
    db.query(`SELECT * FROM customer_orders WHERE cName = '${req.body.cName}' AND order_option = 'Preparing'`, (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    });
  } else if (req.body.filter === 'On the Way') {
    db.query(`SELECT * FROM customer_orders WHERE cName = '${req.body.cName}' AND order_option = 'On the Way'`, (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    });
  } else if (req.body.filter === 'Delivered') {
    db.query(`SELECT * FROM customer_orders WHERE cName = '${req.body.cName}' AND order_option = 'Delivered'`, (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    });
  } else if (req.body.filter === 'Pick Up Ready') {
    db.query(`SELECT * FROM customer_orders WHERE cName = '${req.body.cName}' AND order_option = 'Pick Up Ready'`, (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    });
  } else if (req.body.filter === 'Picked Up') {
    db.query(`SELECT * FROM customer_orders WHERE cName = '${req.body.cName}' AND order_option = 'Picked Up'`, (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    });
  }
});

app.post('/getcustomeremail', (req, res) => {
  db.query(`SELECT email FROM customer_user WHERE name = '${req.body.cname}'`, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});
// start your server on port 3001
app.listen(3001);
console.log('Server Listening on port 3001');
