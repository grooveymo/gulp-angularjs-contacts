/**
 * Define routes.
 */
angular.module('app').config(function($stateProvider) {
  var createState = {
    name: 'create',
    url: '/create',
    template: '<h3>Create Contact</h3>'
  };
  var listState = {
    name: 'list',
    url: '/list',
    template: '<h3>List Contacts</h3>'
  };
  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>About</h3>'
  };
  var editState = {
    name: 'edit',
    url: '/edit/:id',
    template: '<h3>Edit Contacts</h3>'
  };
  var searchState = {
    name: 'search',
    url: '/search',
    template: '<h3>Search Contacts</h3>'
  };
  
  $stateProvider.state(createState);
  $stateProvider.state(listState);
  $stateProvider.state(editState);
  $stateProvider.state(searchState);
  $stateProvider.state(aboutState);
});