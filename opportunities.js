
crm.controller('OppCtrl', function($scope, $rootScope, CRMService, $filter, DropDownFactory, $mdDialog, $mdToast) {
      $rootScope.isShowBrand = false;  
       $scope.imagesrvurl = "https://material.angularjs.org";
      $rootScope.isShowBrand = false;
      $scope.isCreateOpp  = false;
      $scope.isStatusExpand = false; 
      $scope.isContactExpand = false;
      $scope.leadStatuses = [[true,'Prospecting'],[false,'Analysis'],[true,'Presentation'],[false,'Proposal'],[false,'Negotiation'],[false,'Final Review'],[true,'Closed/Won'],[true,'Closed/Lost'],[true,'Other']];
     
    $scope.showHideCreateContact = function() {
        $scope.isCreateOpp  = !$scope.isCreateOpp;
        $scope.opp = {};
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
    $scope.opp = [];
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
    
    var queryOpp = function() {
        CRMService.query({
            'method': 'data'
        }, {
            'ds': 'crmOpportunities',
            'limit': _limit,
            'offset': offset,
            'orderBy': 'created_at DESC',
            'executeCountSql': 'N'
        }, function(result) {
            
            if (result.data && result.data.length > 0) {
                $scope.opp = result.data;
            }
        });
    }
     
      queryOpp();
      
    
        $scope.createOpp = function() {
        var currentDate = $filter('date')(new Date(), 'yyyy/MM/dd');
        $scope.contacts.due_at = currentDate;
        $scope.contacts.created_at = currentDate;
        $scope.opp.name = $scope.opp.name;
        $scope.opp.stage = $scope.opp.stage;
        //$scope.contacts.email = $scope.opp.closedate ;  
        $scope.opp.probability = $scope.opp.probability;
        $scope.opp.amount = $scope.opp.amount;
        $scope.opp.discount = $scope.opp.discount;
       
       // $scope.contacts.alt_email = $scope.opp.account;
        $scope.opp.source = "No Source";
        //$scope.contacts.mobile=$scope.opp.campaign;
        //$scope.contacts.fax=$scope.opp.tags;
       
        
        var datajson = {
            'ds': 'crmOpportunities',
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
           queryOpp();
            $scope.showHideCreateContact();
            
        });
    }
    
    $scope.showAssignedList = function(ev) {
        $rootScope.selectTitle = "Assigned To";
        $rootScope.selectListBox = $scope.users;
        $rootScope.valueAttribute = "first_name";
        var callback = function(idx) {
            //$scope.selectedAssignedToValue = $scope.users[idx].first_name;
           // $scope.opp.assigned_to = $scope.users[idx].ID;
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