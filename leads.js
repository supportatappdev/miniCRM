/*
LEADS CONTROLLER
*/
crm.controller('LeadsCtrl', function ($scope,$rootScope) {
      $rootScope.isShowBrand = false;  
       $scope.imagesrvurl = "https://material.angularjs.org";
      $rootScope.isShowBrand = false;
      $scope.isCreateTask  =false;
      $scope.isStatusExpand = false;
      $scope.isContactExpand = false;
      $scope.leadStatuses = [[true,'New'],[false,'Contacted'],[true,'Converted'],[false,'Rejected'],[false,'Other']];
     $scope.todos = [
      { 
        what: 'Brunch this weekend?',
        who: 'Min Li Chan', 
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      }, { 
        what: 'Brunch this weekend2?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your 2 neighborhood doing errands"
      }
    ] 
     var tabs = [
      { title: 'Pending',code:'PEND'},
      { title: 'Assigned',code:'ASSGN'},
      { title: 'Completed',code:'COMP'},
    ];
    $scope.createLead = function(){
        $scope.isCreateLead = !$scope.isCreateLead;
    };
    $scope.tabs = tabs;  
    $scope.selectedIndex = 0;
    $scope.selected = selected;
    $scope.deselected = deselected;
    function deselected(tab) {
      console.log(tab.code);
    }
    function selected(tab) {
      console.log(tab.code);
    };$scope.face = "https://material.angularjs.org/img/icons/ic_people_24px.svg";
     $scope.messages = [
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan', 
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan', 
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : '/img/list/60.jpeg',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
    ];
    
});   