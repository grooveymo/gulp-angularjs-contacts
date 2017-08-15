function ListController(ContactsService, $state) {

  var vm = this;
  
  vm.contacts = [];
  
  ContactsService.getContacts().then(function(contactsList){
    vm.contacts = contactsList;
  });
  
  vm.editContact = function editContact(id) {
    console.log('calling edit with id : ' + id);
    $state.go('edit', {'id' : id});
  };
  
  vm.deleteContact = function deleteContact(id) {
    console.log('deleting contact with id : ' + id);
    ContactsService.deleteContact(id).then(function(deletedId){
      console.log('removed contact with id: ' + deletedId);
      
      vm.contacts = vm.contacts.filter(function(contact){
        return  contact._id !== deletedId;
      });
      
      console.log('remaining contacts = ' + JSON.stringify(vm.contacts));
    });
    
  }
  
}

ListController.$inject = ['ContactsService', '$state'];

angular
.module('app')
.controller('ListController', ListController);