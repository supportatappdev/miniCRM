/* TASK CONTROLLER */
crm.controller('TaskCtrl', function($scope, $rootScope, CRMService, $filter, DropDownFactory, $mdDialog, $mdToast) {
    $scope.imagesrvurl = "https://material.angularjs.org";
    $rootScope.isShowBrand = false;
    $scope.isCreateTask = false;
    var tabs = [{
        title: 'Pending',
        code: 'PEND'
    }, {
        title: 'Assigned',
        code: 'ASSGN'
    }, {
        title: 'Completed',
        code: 'COMP'
    }, ];
    $scope.showHideCreateTask = function() {
        $scope.isCreateTask = !$scope.isCreateTask;
        $scope.task = {};
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
    $scope.tasks = [];
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
    var queryTasks = function() {
        CRMService.query({
            'method': 'data'
        }, {
            'ds': 'crmTasks',
            'limit': _limit,
            'offset': offset,
            'orderBy': 'created_at DESC',
            'executeCountSql': 'N'
        }, function(result) {
            if (result.data && result.data.length > 0) {
                $scope.tasks = result.data;
            }
        });
    }
    queryTasks();
    $scope.createTask = function() {
        var currentDate = $filter('date')(new Date(), 'yyyy/MM/dd');
        $scope.task.due_at = currentDate;
        $scope.task.created_at = currentDate;
        var datajson = {
            'ds': 'crmTasks',
            'operation': 'INSERT',
            'data': $scope.task
        };
        CRMService.save({
            'method': 'update'
        }, datajson, function(result) {
            if (result.error) {
                console.log(result);
                $scope.showToast("Error whiel updating task deails.");
                return;
            }
            $scope.showToast("Task created successfully!");
            queryTasks();
            $scope.showHideCreateTask();
             $scope.selectedAssignedToValue = "";
             $scope.selectedCategoryValue = "";
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
  
    var categories = [{
        key: "call",
        value: "Call"
    }, {
        key: "email",
        value: "Email"
    }, {
        key: "follow_up",
        value: "Follow-up"
    }, {
        key: "lunch",
        value: "Lunch"
    }, {
        key: "meeting",
        value: "Meeting"
    }, {
        key: "money",
        value: "Money"
    }, {
        key: "presentation",
        value: "Presentation"
    }, {
        key: "trip",
        value: "Trip"
    }];
    $scope.showCategoryList = function(ev) {
        $rootScope.selectListBox = categories;
        $rootScope.valueAttribute = "value";
        $rootScope.selectTitle = "Categories";
        var callback = function(idx) {
            $scope.task.category = categories[idx].key;
             $scope.selectedCategoryValue = categories[idx].value;
        }
        openListBox(ev, callback);
    }
    $scope.showAssignedList = function(ev) {
        $rootScope.selectTitle = "Assigned To";
        $rootScope.selectListBox = $scope.users;
        $rootScope.valueAttribute = "first_name";
        var callback = function(idx) {
            $scope.selectedAssignedToValue = $scope.users[idx].first_name;
            $scope.task.assigned_to = $scope.users[idx].ID;
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
});

function DialogController($scope, $mdDialog, $rootScope) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.selected = function(index) {
        $mdDialog.hide(index);
    }
    $scope.list = $rootScope.selectListBox;
    $scope.valueAttribute = $rootScope.valueAttribute;
    $scope.title = $rootScope.selectTitle;
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.close = function() {
        $mdDialog.hide();
    };
}