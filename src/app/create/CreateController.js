'use strict';

function CreateController(ContactsService, $state) {
  
  console.log('Enterijng Create Controller');
  var vm = this;
  vm.contact = {
    firstName : '',
    lastName : '',
    email : '',
    telephone : '',
    address : {
      firstLineOfAddress : '',
      secondLineOfAddress : '',
      city : '',
      postCode : ''
    }
  };
  
  vm.save = function save() {
    ContactsService.createContact(vm.contact).then(function(newContact) {
      console.log('created new contact with id: ' + newContact._id);
      $state.go('list');
    });
  };
  
};

CreateController.$inject = ['ContactsService', '$state'];

angular
  .module('app')
  .controller('CreateController', CreateController);