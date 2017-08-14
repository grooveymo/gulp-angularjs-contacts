'use strict';

function ErrorHandlerCtrl($rootScope) {
  
  console.log('***** ErrorHandler instantiated');
  var vm = this;
  vm.showError = false;
  vm.error = '';
  
  $rootScope.$on('onError', function(event, response){
    vm.showError = true;
    vm.error = JSON.stringify(response.data);
    console.log('[BROADCAST] error ==> ' + response.status);
    console.log('[BROADCAST] error ==> ' + JSON.stringify(response.data));
  });
  
  vm.clear = function clear(){
    vm.showError = false;
    vm.error = '';
  }
}

ErrorHandlerCtrl.$inject = ['$rootScope'];

angular
  .module('app')
  .controller('ErrorHandlerCtrl', ErrorHandlerCtrl);