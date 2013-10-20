function EventsCtrl ($scope, Api) {

  $scope.dates = {};

  Api.metting.show({id: '1'}, function (meeting) {
    $scope.meeting = meeting;

    if(meeting.proposedTimes && meeting.proposedTimes.length) {
      angular.forEach(meeting.proposedTimes, function (item) {
        item.date = createDateFromString(item.date);
        item.timestamp = item.date.getTime();
        if(!$scope.dates[item.timestamp]) {
          $scope.dates[item.timestamp] = [];
        }

        $scope.dates[item.timestamp].push(item);
      });
    }
  });

  $scope.confirmMeeting = function () {
    dump($scope.dates);
  }
}