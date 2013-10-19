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

  $scope.events = [];

  Api.metting.show({id: '1'}, function (meeting) {
    $scope.meeting = meeting;

    if(meeting.proposedTimes && meeting.proposedTimes.length) {
      angular.forEach(meeting.proposedTimes, function (item) {
        var day = createDateFromString(item.date);

        $scope.events.push({
          title: meeting.subject || '',
          start: new Date(day.getTime() + (item.start.split(':')[0] * 60 * 60 * 1000)),
          end: new Date(day.getTime() + (item.end.split(':')[0] * 60 * 60 * 1000)),
          allDay: false,
          durationEditable: false,
          startEditable: false,
          editable: true,
          color: 'grey',
          textColor: 'black',
          className: ['proposedTime']
        });
      });
    }
  });

  $scope.goToDate = function (date) {
    date = createDateFromString(date);
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
    selectedDate = new Date(selectedDate);
    var event = {
      title: $scope.meeting.subject || '',
      start: selectedDate,
      end: new Date(selectedDate.getTime() + (60*60*1000)),
      allDay: false,
      className: ['openSesame']
    };
    $scope.events.push(event);
  };
  /* Change View */
  $scope.changeView = function(view,calendar) {
    calendar.fullCalendar('changeView',view);
  };
  /* config object */
  $scope.uiConfig = {
    calendar:{
      defaultView: 'agendaDay',
      height: 450,
      editable: true,
      header:{
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      dayClick: $scope.alertEventOnClick
    }
  };

  /* event sources array*/
  $scope.eventSources = [$scope.events];
}
/* EOF */
