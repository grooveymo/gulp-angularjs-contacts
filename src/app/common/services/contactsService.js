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
      .get(ENDPOINT_URI, {
        transformResponse: function(data) {
          var contacts = angular.fromJson(data);
          angular.forEach(contacts, function(contact) {
            contact.fullName = contact.firstName + ' ' + contact.lastName;
          });
          return contacts;
        }
      })
      .then(function(response) {
        return response.data;
      })
      .catch(function(response) {
        console.error('[contactsService, ERROR] performing GET /contacts ', response.status, response.data);
        $rootScope.$broadcast('onError', response);
      });
    
  };
  
  
  contactsService.getContact = function getContact(id) {
    return $http
      .get(ENDPOINT_URI + '/' + id, {
                                      transformResponse: function(data) {
                                        var contact = angular.fromJson(data)[0];
                                        contact.fullName = contact.firstName + ' ' + contact.lastName;
                                        console.log('opera -> ' + JSON.stringify(contact));
                                        return contact;
                                      }
                                    })
      .then(function(response) {
        return response.data;
      })
      .catch(function(response) {
        console.error('[contactsService, ERROR] performing GET /contact ', response.status, response.data);
        $rootScope.$broadcast('onError', response);
      });
  };
  
  contactsService.updateContact = function updateContact(contact) {
    console.log('[contactsService] : update contact : ' + JSON.stringify(contact));
    return $http
      .put(ENDPOINT_URI + '/' + contact._id, contact).then(function(response) {
        console.log('[contactsService] PUT /contacts completed successfully - ' + JSON.stringify(response));
        return response.data.contact;
      })
      .catch(function(response) {
        console.error('[contactsService, ERROR] performing PUT /contacts ', response.status, response.data);
        $rootScope.$broadcast('onError', response);
      });
  };
  
  contactsService.deleteContact = function deleteContact(id) {
    console.log('[contactsService] : delete contact with : ' + id);
    return $http
      .delete(ENDPOINT_URI + '/' + id).then(function(response) {
        console.log('[contactsService] DELETE /contacts completed successfully - ' + JSON.stringify(response));
        return response.data.id;
      })
      .catch(function(response) {
        console.error('[contactsService, ERROR] performing delete /contacts ', response.status, response.data);
        $rootScope.$broadcast('onError', response);
      });
  };
  
}


ContactsService.$inject = ['$rootScope', '$http', 'ENDPOINT_URI'];

angular
  .module('app')
  .service('ContactsService', ContactsService);