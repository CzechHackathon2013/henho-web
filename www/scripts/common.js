var dump = function (v) {
  console.log(v);
};

var createDateFromString = function (string) {
  var date = new Date(string);
  if(!date || date == 'Invalid Date') {
    date = string.split('/');
    date = new Date(date[0], date[1] - 1, date[2]);
  }
  return date;
};