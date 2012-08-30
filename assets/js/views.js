function CanvasView(el) {
  this.$canvas = $(el);
  this.bindEvents();
}

CanvasView.prototype.bindEvents = function() {
  $(window).on('DataModel:success', $.proxy(this.changeLogo(), this));
};

CanvasView.prototype.updateLogo = function() {
  this.$canvas.toggleClass('blue');
  console.log("Logo has been updated.");
};

CanvasView.prototype.changeLogo = function() {
  var ctx = this.$canvas[0].getContext('2d'),
      logo = new Image();
  logo.src = "/assets/images/logo_aa.png";
  logo.onload = function () {
    ctx.drawImage(logo, 80, 20);
  }
  console.log("New logo has been drawn.");
}