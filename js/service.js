var ip = localStorage.getItem("ip");
var baseUrl = "http://"+ip+"/gomulu";


angular.module('starter.service', [])

.service('Service', function($http, $q) {
   
   this.sendRotate = function (rotate) {
    
     var defer = $q.defer();

     params = "/index.php?mode=set&rotate="+rotate;

      $http.get(baseUrl+params).then(function (response) {

        defer.resolve(response.data);

      }, function (response) {

          defer.reject(response);

      })

      return defer.promise;

    }
});