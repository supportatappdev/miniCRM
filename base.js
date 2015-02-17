
function getBaseURL() {
   return location.protocol + "//" + location.hostname + 
      (location.port && ":" + location.port) + "/";
}  

var crm = angular.module('crm', ['ngMaterial','ui.router','ngRoute','ngResource']);
var baseUrl = getBaseURL()+"api/";
crm.config(function ($routeProvider) {
$routeProvider
.when('/tasklist',{
templateUrl: 'tasks.html',
controller: 'TaskCtrl'
})
.when('/leadslist',{
templateUrl: 'leads.html',
controller: 'LeadsCtrl'
}).when('/dblist',{
templateUrl: 'dashboard.html',
controller: 'DBCtrl'
}).when('/rsclist',{
templateUrl: 'resource.html',
controller: 'RscCtrl'
}).when("/campaignlist",{
templateUrl: 'campaigns.html',
controller: 'CampaignCtrl'
}).when("/acctlist",{ 
templateUrl: 'account.html',
controller: 'AccountsCtrl'
}).when("/contactlist",{ 
templateUrl: 'contact.html',
controller: 'ContactCtrl'
}).when("/opportunities",{ 
templateUrl: 'opportunities.html',
controller: 'OppCtrl'
});



});


crm.factory('CRMService', function($resource) {
return $resource(baseUrl + ':method', {'8180':':8180'}, {
	query: {
		method: 'POST',
		params: {},
		isArray: false
	},
	save: {
		method: 'POST',
		params: {},
		isArray: false
	},
	invoke: {
		method: 'POST',
		params: {},
		isArray: false
	},
	saveAll: {
		method: 'POST',
		params: {},
		isArray: true
	}
});
});


crm.factory('DropDownFactory', ['CRMService',function(CRMService) {
return {
    loadDropDown: function(ds,valueAttribute,displayAttribute,whereClause,callback) {
    	var  options =	{'ds':ds,'limit':100,'offset':0, 
    	 				 'executeCountSql': 'N',  
    	 				 'select': valueAttribute+","+displayAttribute,
    	 				 'orderBy': '#creationDate# DESC'};
		CRMService.query({'method':'data'},options ,callback);
		}
};
}]);

