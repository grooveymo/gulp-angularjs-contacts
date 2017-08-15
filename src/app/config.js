/**
 * Define routes.
 */
angular.module('app').config(function($stateProvider) {
  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl : './common/home.html'
  };
  var createState = {
    name: 'create',
    url: '/create',
    templateUrl : './create/create-contact.html',
    controller : 'CreateController as vm'
  };
  var listState = {
    name: 'list',
    url: '/list',
    templateUrl : './list/list-contacts.html',
    controller : 'ListController as vm'
  };
  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>About</h3>'
  };
  var editState = {
    name: 'edit',
    url: '/edit/:id',
    templateUrl : './edit/edit-contact.html',
    controller : 'EditController as vm'
  };
  var searchState = {
    name: 'search',
    url: '/search',
    template: '<h3>Search Contacts</h3>'
  };
  var viewDetailState = {
    name: 'view-detail',
    url: '/view-detail/:id',
    templateUrl : './detail/contact-detail.html',
    controller : 'ContactDetailController as vm'
  };
  
  $stateProvider.state(homeState);
  $stateProvider.state(createState);
  $stateProvider.state(listState);
  $stateProvider.state(editState);
  $stateProvider.state(searchState);
  $stateProvider.state(aboutState);
  $stateProvider.state(viewDetailState);

});