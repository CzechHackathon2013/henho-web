var dump = function (v) {
  console.log(v);
};

function CalendarCtrl($scope, Api) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

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
        $scope.addEvent(item.date);
      });
    }
  });

  $scope.selectedDate = date;

  $scope.goToDate = function (date) {
    date = new Date(date);
    $scope.myCalendar2.fullCalendar('gotoDate', date.getFullYear(), date.getMonth(), date.getDate());
  };

  /* alert on eventClick */
  $scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
    $scope.$apply(function(){
      $scope.selectedDate = date;
      $scope.alertMessage = ('Day Clicked ' + date);
    });
  };
  /* alert on Drop */
  $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
    $scope.$apply(function(){
      $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
    });
  };
  /* alert on Resize */
  $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
    $scope.$apply(function(){
      $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
    });
  };

  /* add custom event*/
  $scope.addEvent = function(selectedDate, endDate) {
    selectedDate = createDateFromString(selectedDate);
    var event = {
      title: selectedDate.getDate() + '.' + selectedDate.getMonth() + '.' + selectedDate.getFullYear(),
      start: selectedDate,
      end: endDate || selectedDate,
      allDay: false,
      className: ['openSesame']
    };
//    dump(event);
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
      dayClick: $scope.alertEventOnClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize
    }
  };

  /* event sources array*/
  $scope.eventSources = [$scope.events];
}
/* EOF */
