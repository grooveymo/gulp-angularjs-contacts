/**
 * api endpoint - http://localhost:9090/api/contacts
 */
// =============================================================================
// import required packages
// =============================================================================
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');

//declare mongo models
var Contact = require('./models/contact').Contact;

//declare name of db
var db = 'contacts-db';

// =============================================================================
// configure app
// =============================================================================
// log requests to the console
app.use(morgan('dev'));

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
//var port = process.env.PORT || 8080;
var port = process.env.PORT || 9090;

// connect to our database
mongoose.connect('mongodb://localhost/' + db);

// =============================================================================
// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('request received');
  
  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); //enable react-todo app to connect
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');// enable angular2-todo app to connect
//  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4005');// enable angularjs app to connect
  res.setHeader('Access-Control-Allow-Origin', '*');// enable angularjs app to connect
  
  
  
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to Contacts api!' });
});


// ----------------------------------------------------
// CREATE a NEW Contact
// create a todolist (accessed at POST http://localhost:8080/api/todolists)
router.route('/contacts/')
  .post(function(req, res) {
    console.log('calling POST /contacts/');
    var contact = new Contact();		// create a new instance of the TodoList model
    contact.firstName = req.body.firstName;
    contact.lastName = req.body.lastName;
    contact.save(function(err) {
      if (err) {
        return res.send(err);
      }
      
      res.json({ message: 'New Contact created!', contact: contact });
    });
  })
  .get(function(req, res) {
    console.log('calling GET /contacts/');
    Contact.find(function(err, contactList) {
      if (err) {
        return res.send(err);
      }
      
      res.json(contactList);
    });
  });
//  .put(function(req, res) {
//
//    Contact.findById(req.params.contactId, function(err, originalContact) {
//      if (err) {
//        return res.send(err);
//      }
//
//      originalContact.firstName = req.body.firstName;
//      originalContact.lastName = req.body.lastName;
//
//      originalContact.save(function(err, contact) {
//        if (err) {
//          console.log('Problem updating contact : ' + err.message);
//        }
//
//
//        res.send(contact);
//      });
//
//    });
//  })
//.
//delete(function(req, res) {
//  console.log('deleting ', req.params.contactId);
//
//  Contact.remove({ _id: req.params.contactId }, function(err, contact) {
//    if (err) {
//      return res.send(err);
//    }
//
//    res.json({ message: 'Successfully deleted' });
//  });
//});


// =============================================================================
// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);

// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('REST API deployed on port ' + port);