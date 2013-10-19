function ModalCtrl ($scope, $modalInstance, event){
  $scope.event = event;
  $scope.selectedStart = 'aa';
  $scope.ok = function () {
    $modalInstance.close($scope.event);
    dump($scope.selectedStart);
    console.log($("#pickadateContainer").scope().selectedStart);
  };

  dump($('#pickadate'));


  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}