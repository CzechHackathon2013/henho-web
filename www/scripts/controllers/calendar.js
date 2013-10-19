var dump = function (v) {
  console.log(v);
};

function CalendarCtrl($scope, Api) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  Api.metting.show({id: '1'}, function (meeting) {
    $scope.meeting = meeting;
    if(meeting.proposedTime.length && meeting.proposedTime[0]) {
      $scope.goToEvent(meeting.proposedTime[0]);
    }
  });

  $scope.selectedDate = date;

  $scope.goToEvent = function (e) {
    var date = e.date.split('.').reverse();
    date = new Date(date[0], date[1], date[2]);
    $scope.myCalendar2.fullCalendar('gotoDate', date.getFullYear(), date.getMonth(), date.getDate());
  };

  /* event source that calls a function on every view switch */
  $scope.eventsF = function (start, end, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
    callback(events);
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
  $scope.addEvent = function(selectedDate) {
    $scope.events.push({
      title: 'New event!!',
      start: selectedDate,
      end: selectedDate,
      className: ['openSesame']
    });
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
  $scope.eventSources = [$scope.events, $scope.eventsF];
}
/* EOF */
