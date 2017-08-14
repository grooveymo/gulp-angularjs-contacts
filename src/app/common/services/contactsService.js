'use strict';
function ContactsService($http) {
  
  var contactsService = this;
  
  contactsService.createContact = function createContact(contact) {
    
    return '1234';
    //$http.post(ENDPOINT_URI + '/create', contact).then(function(response) {
    //  return response.data;
    //});
  };
  
}


ContactsService.$inject = ['$http', 'ENDPOINT_URI'];

angular
  .module('app')
  .service('ContactsService', ContactsService);