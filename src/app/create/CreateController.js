'use strict';

function CreateController(ContactsService) {
  
  console.log('Enterijng Create Controller');
  var vm = this;
  vm.contact = {
    firstName : '',
    lastName : '',
    email : '',
    telephone : ''
  };
  
  vm.save = function save() {
    ContactsService.createContact(vm.contact).then(function(newContact) {
      console.log('created new contact with id: ' + newContact._id);
    });
  };
  
};

CreateController.$inject = ['ContactsService'];

angular
  .module('app')
  .controller('CreateController', CreateController);