// Ionic Starter App
(function(){
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('myNewsFeed', ['ionic','angularMoment'])

app.controller('neCtrl',function($http,$scope){
$scope.stories=[];

function loadStories(params,callback){

$http.get('https://www.reddit.com/r/Android/new/.json',{params:params})
  .success(function(response){
    var stories=[];
    angular.forEach(response.data.children,function(child){
   stories.push(child.data);
    });
    callback(stories);
  });
}

$scope.loadOlder=function(){
var params={};
if($scope.stories.length>0){
  params["after"]=$scope.stories[$scope.stories.length-1].name;
}
loadStories(params,function(loadOlder){
$scope.stories=$scope.stories.concat(loadOlder);
$scope.$broadcast('scroll.infiniteScrollComplete');
});
};

$scope.loadNewer=function(){
var params={'before':$scope.stories[0].name};
loadStories(params,function(newerStories){
$scope.stories=newerStories.concat($scope.stories);
$scope.$broadcast('scroll.refreshComplete');
});
};

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
}());
