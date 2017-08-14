var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema  = new Schema({
                                  firstLineOfAddress: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: 'Please supply a first line of address'
                                  },
                                  secondLineOfAddress: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: false
                                  },
                                  city: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: 'Please supply a city'
                                  },
                                  postCode: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: 'Please supply a postcode'
                                  }
                                });

var ContactsSchema = new Schema({
                                  firstName: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: 'first name cannot be blank'
                                  },
                                  lastName: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: 'last name cannot be blank'
                                  },
                                  email: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: 'email cannot be blank'
                                  },
                                  telephone: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: 'telephone cannot be blank'
                                  },
  
                                  address : {
                                    type : AddressSchema,
                                    required : false
                                  },
/*
                                  isCompleted: {
                                    type: Boolean,
                                    default: false
                                  },
*/
                                  created: {
                                    type: Date,
                                    default: Date.now
                                  }
                                });

module.exports.Contact = mongoose.model('Contact', ContactsSchema);
module.exports.Address = mongoose.model('Address', AddressSchema);
