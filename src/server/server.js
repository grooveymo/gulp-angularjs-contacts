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


var faker = require('faker');
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


router.route('/contacts/generate/:id')
  .get(function(req, res) {
    console.log('generating fake contacts');
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    var randomEmail = faker.internet.email();
    var phone = faker.phone.phoneNumber();
    var firstLineOfAddress = faker.address.streetAddress();
    var secondLineOfAddress = faker.address.secondaryAddress();
    var city = faker.address.city();
    var postCode = faker.address.zipCode();
  
    var contact = new Contact();
  
      contact.firstName = firstName;
      contact.lastName = lastName;
      contact.email = randomEmail;
      contact.telephone = phone;
      contact.address = {
        'firstLineOfAddress' : firstLineOfAddress,
        'secondLineOfAddress' : secondLineOfAddress,
        'city' : city,
        'postCode' : postCode
      }
  
    contact.save(function(err) {
      if (err) {
        console.log('[ERROR] POST /contacts - ' + JSON.stringify(err));
        res.status(400);
        return res.send(err);
      }
    
      res.json({ message: 'New Contact created!', contact: contact });
    });
  
    //res.json(
    //  {
    //    message: 'Successfully deleted',
    //    contact: {
    //      '_id': 1,
    //      'firstName': firstName,
    //      'lastName': lastName,
    //      'email': randomEmail,
    //      'telephone': phone,
    //      '1st line of address': firstLineOfAddress,
    //      '2nd Line of Address': secondLineOfAddress,
    //      'city': city,
    //      'postCode' : postCode
    //    }
    //  });
    //
  });

// ----------------------------------------------------
// CREATE a NEW Contact
// create a todolist (accessed at POST http://localhost:8080/api/todolists)
router.route('/contacts/')
  .post(function(req, res) {
    console.log('calling POST /contacts/ with body : ' + JSON.stringify(req.body));
    var contact = new Contact();		// create a new instance of the TodoList model
    contact.firstName = req.body.firstName;
    contact.lastName = req.body.lastName;
    contact.email = req.body.email;
    contact.telephone = req.body.telephone;
    contact.address = {
      firstLineOfAddress: req.body.address.firstLineOfAddress,
      secondLineOfAddress: req.body.address.secondLineOfAddress,
      city: req.body.address.city,
      postCode: req.body.address.postCode
    };
    contact.save(function(err) {
      if (err) {
        console.log('[ERROR] POST /contacts - ' + JSON.stringify(err));
        res.status(400);
        return res.send(err);
      }
      
      res.json({ message: 'New Contact created!', contact: contact });
    });
  })
  .get(function(req, res) {
    console.log('calling GET /contacts/');
    Contact.find(function(err, contactList) {
      if (err) {
        console.log('[ERROR] GET /contacts - ' + JSON.stringify(err));
        return res.send(err);
      }
      
      res.json(contactList);
    });
  });

//handle get single contact and update contact
router.route('/contacts/:id')
  .put(function(req, res) {
    Contact.findById({ _id: req.params.id }, function(err, contact) {
      if (err) {
        console.log('[ERROR] PUT /contacts - ' + JSON.stringify(err));
        return res.send(err);
      }
      
      contact.firstName = req.body.firstName;
      contact.lastName = req.body.lastName;
      contact.email = req.body.email;
      contact.telephone = req.body.telephone;
      contact.address = {
        firstLineOfAddress: req.body.address.firstLineOfAddress,
        secondLineOfAddress: req.body.address.secondLineOfAddress,
        city: req.body.address.city,
        postCode: req.body.address.postCode
      };
      
      contact.save(function(err, updatedContact) {
        if (err) {
          console.log('[ERROR] PUT /contacts - ' + JSON.stringify(err));
          res.status(400);
          return res.send(err);
        }
        
        res.json({ message: 'Contact updated!', contact: updatedContact });
      });
      
    });
    
  })
  .get(function(req, res) {
    Contact.find({ _id: req.params.id }, function(err, contact) {
      if (err) {
        console.log('[ERROR] GET /contacts - ' + JSON.stringify(err));
        return res.send(err);
      }
      
      res.json(contact);
    });
  })
  .delete(function(req, res) {
    var toBeDeletedId = req.params.id;
    Contact.remove({ _id: toBeDeletedId }, function(err) {
      if (err) {
        console.log('[ERROR] DELETE /contacts - ' + JSON.stringify(err));
        return res.send(err);
      }
      res.json({ message: 'Successfully deleted', id: toBeDeletedId });
    });
    
  });


// =============================================================================
// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);

// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('REST API deployed on port ' + port);