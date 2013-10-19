var dump = function (v) {
  console.log(v);
};

function CalendarCtrl($scope, Api) {
  var createDateFromString = function (string) {
    var date = new Date(string);
    if(!date || date == 'Invalid Date') {
      date = string.split('.').reverse();
      date = new Date(date[0], date[1] - 1, date[2]);
    }
    return date;
  };

  $scope.disabledEvents = [];
  $scope.events = [];

  Api.metting.show({id: '1'}, function (meeting) {
    $scope.meeting = meeting;

    if(meeting.proposedTimes && meeting.proposedTimes.length) {
      angular.forEach(meeting.proposedTimes, function (item) {
        var day = createDateFromString(item.date);
        var start = new Date(day.getTime() + (item.start.split(':')[0] * 60 * 60 * 1000))
        var end = new Date(day.getTime() + (item.end.split(':')[0] * 60 * 60 * 1000));
        $scope.addEditableEvent(item.subject, start, end);
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

  /* alert on eventClick */
  $scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
    $scope.$apply(function(){
      $scope.addEvent(date);
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
    header:{
      left: '',
      center: '',
      right: 'today prev,next'
    },
    dayClick: $scope.alertEventOnClick,
    eventRender: function (view, el) {
      for(var i = 0; i <= 48; i++) {
        $('.fc-slot' + i).removeClass('editableRow');
      }
      angular.forEach($scope.events, function (item) {
        if(item.start >= view.start && item.start <= view.end) {
          var startRows = item.start.getHours() * 2;
          var endRows = (item.end.getHours() * 2) - 1;
          for(var i = startRows; i <= endRows; i++) {
            $('.fc-slot' + i).addClass('editableRow');
          }
        }

      });
    }
  };

  /* event sources array*/
  $scope.eventSources1 = [$scope.events];
}
/* EOF */
