'use strict';

function ContactsService($rootScope, $http, ENDPOINT_URI) {
  
  var contactsService = this;
  
  contactsService.createContact = function createContact(contact) {
    console.log('[contactsService] : create contact : ' + JSON.stringify(contact));
    return $http
      .post(ENDPOINT_URI, contact).then(function(response) {
        console.log('[contactsService] POST /contacts completed successfully - ' + JSON.stringify(response));
        return response.data.contact;
      })
      .catch(function(response) {
        console.error('[contactsService, ERROR] performing POST /contacts ', response.status, response.data);
        $rootScope.$broadcast('onError', response);
      });
  };
  
  contactsService.getContacts = function getContacts() {
    return $http
      .get(ENDPOINT_URI)
      .then(function(response){
        return response.data;
      });
  };
  
}


ContactsService.$inject = ['$rootScope', '$http', 'ENDPOINT_URI'];

angular
  .module('app')
  .service('ContactsService', ContactsService);