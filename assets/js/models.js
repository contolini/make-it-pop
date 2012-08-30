function DataModel() {
  this.url = '/app/twitter.php';
}

DataModel.prototype.getData = function() {
  $.ajax({
    url: this.url,
    dataType: 'json',
    context: this,
    success: this.onSuccess
  });
};

DataModel.prototype.onSuccess = function(data) {
  $(window).trigger('DataModel:success', data);
};