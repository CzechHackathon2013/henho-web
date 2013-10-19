function ModalCtrl ($scope, $modalInstance, event){
  $scope.event = event;
  $scope.ok = function () {
    $modalInstance.close($scope.event);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}