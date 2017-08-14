var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
