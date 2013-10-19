var dump = function (v) {
  console.log(v);
};

function CalendarCtrl($scope, Api) {
  var createDateFromString = function (string) {
    var date = new Date(string);
    if(!date || date == 'Invalid Date') {
      date = string.split('.').reverse();
      date = new Date(date[0], date[1], date[2]);
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
        $scope.addDisabledEvent(item.subject, start, end);
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
      className: ['editableTime']
    })
  };

  $scope.addDisabledEvent = function (title, start, end) {
    $scope.disabledEvents.push({
      title: title,
      start: start,
      end: end,
      allDay: false,
      durationEditable: false,
      startEditable: false,
      editable: true,
      color: 'grey',
      textColor: 'black',
      className: ['disabledTime']
    });
  };

  $scope.goToDate = function (date) {
    date = createDateFromString(date);
    $scope.myCalendar1.fullCalendar('gotoDate', date.getFullYear(), date.getMonth(), date.getDate());
    $scope.myCalendar2.fullCalendar('gotoDate', date.getFullYear(), date.getMonth(), date.getDate());
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
  $scope.changeView = function(view,calendar) {
    calendar.fullCalendar('changeView',view);
  };
  /* config object */
  $scope.uiConfig = {
    calendar:{
      defaultView: 'agendaDay',
      firstDay: 1,
      height: 450,
      editable: true,
      header:{
        left: '',
        center: '',
        right: 'today prev,next'
      },
      dayClick: $scope.alertEventOnClick
    }
  };

  /* event sources array*/
  $scope.eventSources1 = [$scope.events];
  $scope.eventSources2 = [$scope.disabledEvents];
}
/* EOF */
