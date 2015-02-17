
crm.controller('AppCtrl', function ($scope,$state,$location,$rootScope) {
  $rootScope.isShowBrand = true;
 var tabs = [    
  {icon:"share", title: ' Dashboard'},
  { title: 'Tasks', content: "You can swipe left and right on a mobile device to change tabs."},
  { title: 'Comapaigns', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
  { title: 'Leads', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
  { title: 'Accounts', content: "If you remove a tab, it will try to select a new one."},
  { title: 'Contacts', content: "There's an ink bar that follows the selected tab, you can turn it off if you want."},
  { title: 'Oppurtinities', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab."},
  { title: 'Team', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"},
];   
$scope.tabs = tabs;  
$scope.selectedIndex = 2;  
$scope.announceSelected = announceSelected;
$scope.announceDeselected = announceDeselected;
function announceDeselected(tab) {
  $scope.farewell = 'Goodbye ' + tab.title + '!';
  if(tab.title === 'Tasks') {
      $state.go("");  
  }
}
function announceSelected(tab) {
  $scope.greeting = 'Hello ' + tab.title + '!';
}
$scope.openTasks = function() { 
    $location.path("/tasklist");
}
$scope.openLeads = function() { 
    $location.path("/leadslist");
}
$scope.openDashboard = function() {
    $location.path("/dblist");
}
$scope.openCampaigns = function() {
    $location.path("/campaignlist")
}

$scope.openContacts =function() {
    $location.path("/contactlist")
}

$scope.openOpp =function() {
    $location.path("/opportunities")
}



}); 
