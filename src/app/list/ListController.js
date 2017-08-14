function ListController(ContactsService) {

  var vm = this;
  
  vm.contacts = [];
  
  ContactsService.getContacts().then(function(contactsList){
    vm.contacts = contactsList;
  });
}

ListController.$inject = ['ContactsService'];

angular
.module('app')
.controller('ListController', ListController);