angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope,$state, $ionicModal, $timeout,$cordovaDeviceMotion,Service) {
// watch Acceleration
  var options = { frequency: 500 };
  $scope.login = function(data) {
    localStorage.setItem("ip",data.ip);
    $state.go("app.playlists");
  }
 
  document.addEventListener("deviceready", function () {
    
    var watch = $cordovaDeviceMotion.watchAcceleration(options);
    watch.then(
      null,
      function(error) {
      // An error occurred
      },
      function(result) {
        $timeout(function(){ 
          $scope.$apply(function () {
              $scope.X = result.x;
              $scope.Y = result.y;
              $scope.Z = result.z;
              $scope.timeStamp = result.timestamp;

              if($scope.Y > 3 && $scope.X < 2 && $scope.X > -2){
                $scope.rotate = "0";//Geri
                $scope.text = "Geri";
              }/*else if($scope.X < 0 && $scope.Y > 1){
                $scope.rotate = "4";//Sag Geri
                $scope.text = "Sağ Geri";
              }else if($scope.X > 1 && $scope.Y > 1){
                $scope.rotate = "5";//Sol Geri
                $scope.text = "Sol Geri"; 
              }*/else if($scope.Y < 0 && $scope.X < 2 && $scope.X > -2){
                $scope.rotate = "1";//İleri
                $scope.text = "İleri";//
              }/*else if($scope.X < 0 && $scope.Y < 0){
                $scope.rotate = "6";//Sag İleri
                $scope.text = "Sağ Geri"; 
              }else if($scope.X > 1 && $scope.Y < 0){
                $scope.rotate = "7";//Sol İleri
                $scope.text = "Sol İleri"; 
              }*/else if($scope.X > 2 && $scope.Y < 2 && $scope.Y > -2){
                $scope.rotate = "2";//Sol
                $scope.text = "Sol";
              }else if($scope.X < 0 && $scope.Y < 2 && $scope.Y > -2){
                $scope.rotate = "3";//Sag
                $scope.text = "Sag";
              }else if($scope.X > 0 && $scope.X < 2 && $scope.Y < 2 && $scope.Y > 0){
                $scope.rotate = "8";//Sabit
                $scope.text = "Sabit"; 
              }

              Service.sendRotate($scope.rotate).then(function (response) {
                if(response == 1){
                  $scope.status = "Komut Gönderildi";
                }else{
                  $scope.status = "Komut gönderilirken bi hata oluştu.Tekrar deneyiniz";
                }
                  
              }, function (response) {
                 


              });

          });
        });
    });


    /*watch.clearWatch();
    // OR
    $cordovaDeviceMotion.clearWatch(watch)
      .then(function(result) {
        // success
        }, function (error) {
        // error
      });*/

  }, false);
})

.controller('PlaylistsCtrl', function($scope) {
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
