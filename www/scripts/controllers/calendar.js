var dump = function (v) {
  console.log(v);
};

function CalendarCtrl($scope, $modal, Api) {
  var createDateFromString = function (string) {
    var date = new Date(string);
    if(!date || date == 'Invalid Date') {
      date = string.split('/');
      date = new Date(date[0], date[1] - 1, date[2]);
    }
    return date;
  };

  $scope.dates = {};
  $scope.events = [];

  Api.metting.show({id: '1'}, function (meeting) {
    $scope.meeting = meeting;

    if(meeting.proposedTimes && meeting.proposedTimes.length) {
      angular.forEach(meeting.proposedTimes, function (item) {
        var day = createDateFromString(item.date);
        var start = new Date(day.getTime() + (item.start.split(':')[0] * 60 * 60 * 1000))
        var end = new Date(day.getTime() + (item.end.split(':')[0] * 60 * 60 * 1000));
        $scope.addEditableEvent(item.subject, start, end);
        if(!$scope.dates[item.date]) {
          $scope.dates[item.date] = []
        }

        $scope.dates[item.date].push(item);
      });
    }
  });

  $scope.addEditableEvent = function (title, start, end) {
    $scope.events.push({
      title: title,
      start: start,
      end: end,
      allDay: false,
      startEditable: false,
      className: ['editableTime']
    })
  };

  $scope.goToDate = function (date) {
    date = createDateFromString(date);
    $scope.myCalendar1.fullCalendar('gotoDate', date.getFullYear(), date.getMonth(), date.getDate());
  };


  $scope.onEventClick = function(event){
//    dump(event);
    $scope.$apply(function () {
      var modalInstance = $modal.open({
        templateUrl: '/views/modals/timepicker.html',
        controller: ModalCtrl,
        resolve: {
          event: function () {
            return event;
          }
        }
      });

      modalInstance.result.then(function (event) {
    });


    });
  };

  /* add custom event*/
  $scope.addEvent = function(selectedDate) {
    var start = new Date(selectedDate);
    var end = new Date(selectedDate.getTime() + (60*60*1000));
    $scope.addEditableEvent($scope.meeting.subject || '', start, end)
  };
  /* Change View */
  $scope.changeView = function(view) {
    $scope.myCalendar1.fullCalendar('changeView',view);
  };

  $scope.calendar1 = {
    defaultView: 'agendaDay',
    firstDay: 1,
    height: 450,
    editable: true,
    allDaySlot: false,
    slotMinutes: 30,
    header:{
      left: 'agendaWeek,agendaDay',
      center: '',
      right: ''
    },
    eventClick: $scope.onEventClick
  };

  /* event sources array*/
  $scope.eventSources1 = [$scope.events];
}
/* EOF */
