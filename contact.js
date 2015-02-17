
crm.controller('ContactCtrl', function($scope, $rootScope, CRMService, $filter, DropDownFactory, $mdDialog, $mdToast) {
      $rootScope.isShowBrand = false;  
      $scope.imagesrvurl = "https://material.angularjs.org";
      $rootScope.isShowBrand = false;
      $scope.isCreateContact  = false;
      $scope.isStatusExpand = false; 
      $scope.isContactExpand = false;
      $scope.leadStatuses = [[true,'Affilate'],[false,'Competitor'],[true,'Customer'],[false,'Patner'],[false,'Reseller'],,[false,'Vendor'],[true,'Other']];
     
     var tabs = [
      { title: 'Pending',code:'PEND'},
      { title: 'Assigned',code:'ASSGN'},
      { title: 'Completed',code:'COMP'},
    ];
    
   
   $scope.showHideCreateContact = function() {
        $scope.isCreateContact = !$scope.isCreateContact;
        $scope.contacts = {};
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
    };
    
    $scope.face = "https://material.angularjs.org/img/icons/ic_people_24px.svg";
    
    var _limit = 20;
    var offset = 0;
    $scope.contacts = [];
    $scope.users = [];
    
    var loadUsers = function() {
        DropDownFactory.loadDropDown('usersRef', 'id', 'first_name', undefined, function(result) {
            if (result.error) {
                console.log(result);
                return;
            }
            $scope.users = result.data;
        });
    };
    
    loadUsers();
    
    var queryContacts = function() {
        CRMService.query({
            'method': 'data'
        }, {
            'ds': 'crmContacts',
            'limit': _limit,
            'offset': offset,
            'orderBy': 'created_at DESC',
            'executeCountSql': 'N'
        }, function(result) {
            
            if (result.data && result.data.length > 0) {
                $scope.contacts = result.data;
            }
        });
    }
     
      queryContacts();
      
        $scope.createContact = function() {
        var currentDate = $filter('date')(new Date(), 'yyyy/MM/dd');
        $scope.contacts.due_at = currentDate;
        $scope.contacts.created_at = currentDate;
       // $scope.contacts.lead_id = 'polayya';
       // $scope.contacts.do_not_call = '1';
        //$scope.contacts.reports_to = 'Sreekanth';
         //$scope.contacts.assignedTo = $scope.contacts.assignedTo
        $scope.contacts.first_name = $scope.contacts.firstName;
        $scope.contacts.last_name = $scope.contacts.lastName;
        $scope.contacts.email = $scope.contacts.email ;  
        $scope.contacts.phone = $scope.contacts.phone;
        $scope.contacts.linkedin = $scope.contacts.account;
        $scope.contacts.title = $scope.contacts.title;
       
        $scope.contacts.alt_email = $scope.contacts.altemail;
        $scope.contacts.source = $scope.contacts.company;
        $scope.contacts.mobile=$scope.contacts.mobile;
        $scope.contacts.fax=$scope.contacts.address;
        $scope.contacts.department=$scope.contacts.refferedBy;
        $scope.contacts.background_info = $scope.contacts.comments;
        $scope.contacts.skype=$scope.contacts.tags;
        
        var datajson = {
            'ds': 'crmContacts',
            'operation': 'INSERT',
            'data': $scope.contacts
        };
        CRMService.save({
            'method': 'update'
        }, datajson, function(result) {
            if (result.error) {
                console.log(result);
                $scope.showToast("Error whiel updating Contact deails.");
                return;
            }
            $scope.showToast("Contact Details created successfully!");
            queryContacts();
            $scope.showHideCreateContact();
            
        });
    }
    
    $scope.showAssignedList = function(ev) {
        $rootScope.selectTitle = "Assigned To";
        $rootScope.selectListBox = $scope.users;
        $rootScope.valueAttribute = "first_name";
        var callback = function(idx) {
            $scope.selectedAssignedToValue = $scope.users[idx].first_name;
            $scope.contacts.assigned_to = $scope.users[idx].ID;
        }
        openListBox(ev, callback);
    };
    
    var openListBox = function(ev, callback) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'listbox.tpl.html',
            targetEvent: ev,
        }).then(function(idx) {
           // $scope.showToast('You said the information was "' + idx + '".');
            callback(idx)
        }, function() {
           // $scope.showToast('You cancelled the dialog.');
        });
    } 
    
    
    $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition).filter(function(pos) {
            return $scope.toastPosition[pos];
        }).join(' ');
    };
    $scope.showToast = function(content) {
        $mdToast.show($mdToast
        .simple()
        .content(content)
        .position($scope.getToastPosition())
        .hideDelay(25));
    };
    $scope.alert = '';
    
    
});   