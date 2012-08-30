function CanvasView(el) {
  this.$el = $(el);
  this.bindEvents();
}

CanvasView.prototype.bindEvents = function() {
  $(window).on('DataModel:success', $.proxy(this.updateLogo(), this));
};

CanvasView.prototype.updateLogo = function() {
  //this.$el.toggleClass('blue');
  console.log("Logo has been updated.");
};