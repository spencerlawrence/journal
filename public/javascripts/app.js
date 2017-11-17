var app = window.angular.module('app', [])

app.factory('diaryFetcher', diaryFetcher)
app.controller('mainCtrl', mainCtrl)

function diaryFetcher ($http) {

  var API_ROOT = 'diary'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
    post: function (formData) {
      return $http
         .post(API_ROOT,formData)
         .then(function (resp) {
           console.log("Post worked");
         })
    }
  }
}

function mainCtrl ($scope, diaryFetcher) {

  $scope.entrys = []

  diaryFetcher.get()
    .then(function (data) {
      $scope.entrys = data
    })
  $scope.createEntry = function() {
      var formData = {date:Date(),content:$scope.formContent};
      console.log(formData);
      diaryFetcher.post(formData); // Send the data to the back end
      $scope.entrys.push(formData); // Update the model
    }
  };
