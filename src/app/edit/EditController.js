'use strict';

function EditController(ContactsService, $state, $stateParams) {
  
  console.log('Enterijng Edit Controller');

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
  
  var id = $stateParams.id;
  
  console.log('$stateParams = ' + JSON.stringify($stateParams));
  
  ContactsService.getContact(id).then(function(contact){
    vm.contact = contact;
  
    console.log('retrieved contact = ' + JSON.stringify(vm.contact));
  
  });
  
  vm.save = function save() {
    ContactsService.updateContact(vm.contact).then(function(updatedContact) {
      //console.log('created new contact with id: ' + updatedContact._id);
      console.log('created new contact with id: ' + JSON.stringify(updatedContact));
      $state.go('list');
    });
  };
  
};

EditController.$inject = ['ContactsService', '$state', '$stateParams'];

angular
  .module('app')
  .controller('EditController', EditController);