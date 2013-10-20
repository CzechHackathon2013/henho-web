function MeetingCtrl ($scope, $routeParams, $location, Api) {
  var id = $routeParams.id || null;

  if(!id) {
    $location.path('/');
    return;
  }

  $scope.dates = {};

  Api.metting.show({id: id}, function (meeting) {
    $scope.meeting = meeting;

    if(meeting.proposedTimes && meeting.proposedTimes.length) {
      angular.forEach(meeting.proposedTimes, function (item) {
        item.date = createDateFromString(item.date);
        item.timestamp = item.date.getTime();
        item.confirmedStart = item.start;
        item.confirmedEnd = item.end;
        item.declined = false;

        if(!$scope.dates[item.timestamp]) {
          $scope.dates[item.timestamp] = [];
        }

        $scope.dates[item.timestamp].push(item);
      });
    }
  }, function () {
    $location.path('/');
  });

  $scope.confirmMeeting = function () {
    var times = [];
    angular.forEach($scope.dates, function (events) {
      angular.forEach(events, function (event) {
        if(!event.declined) {
          event.start = event.confirmedStart;
          event.end = event.confirmedEnd;
          times.push(event);
        }
      });
    });

    Api.acceptedTime.create({
      id: id,
      times: [],
      note: $scope.note
    }, function () {
      $location.path('/meeting/done');
    }, function () {
      $location.path('/meeting/error');
    });
  };

  $scope.declineMeeting = function () {
    Api.acceptedTime.create({
      id: id,
      times: [],
      note: $scope.note
    }, function () {
      $location.path('/meeting/done');
    }, function () {
      $location.path('/meeting/error');
    });
  }
}