function ContactDetailController($state, $stateParams, ContactsService) {

  var vm = this;
  
  vm.id = $stateParams.id;
  vm.contact = {};
  
  console.log('[ContactDetailController] id: '+ vm.id);
  
  ContactsService.getContact(vm.id).then(function(contactDetail){
    vm.contact = contactDetail;
    console.log('[ContactDetailController] contact: '+ JSON.stringify(vm.contact));
  });
  
  vm.edit = function edit() {
    console.log('[ContactDetailController] going to edit contact with id: '+ vm.id);
    $state.go('edit', {'id' : vm.id});
  };
  
};

ContactDetailController.$inject = ['$state', '$stateParams', 'ContactsService'];

angular
.module('app')
.controller('ContactDetailController', ContactDetailController);