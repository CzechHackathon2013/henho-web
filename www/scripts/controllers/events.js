function EventsCtrl ($scope, Api) {

  $scope.dates = {};

  Api.metting.show({id: '1'}, function (meeting) {
    $scope.meeting = meeting;

    if(meeting.proposedTimes && meeting.proposedTimes.length) {
      angular.forEach(meeting.proposedTimes, function (item) {
        item.date = createDateFromString(item.date);
        item.timestamp = item.date.getTime();
        item.confirmedStart = item.start;
        item.confirmedEnd = item.end;

        if(!$scope.dates[item.timestamp]) {
          $scope.dates[item.timestamp] = [];
        }

        $scope.dates[item.timestamp].push(item);
      });
    }
  });

  $scope.confirmMeeting = function () {
    dump($scope.dates);
  };

  $scope.declineMeeting = function () {
    angular.forEach($scope.dates, function (events) {
      angular.forEach(events, function (event) {
        event.declined = true;
      });
    });
  }
}