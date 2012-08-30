/**
 * CanvasView controls logos on the canvas
 * 
 */
function CanvasView(el) {
  this.$canvas = $(el);
  this.bindEvents();
  this.numEffects = 0;    // number of effects that have been performed on the logo
}

CanvasView.prototype.bindEvents = function() {
  var self = this;
  $(window).on('Tweets:success', function() {
    $.proxy(self.changeLogo(), self);
  });
};

CanvasView.prototype.updateLogo = function() {
  this.$canvas.toggleClass('blue');
  console.log("Logo has been updated.");
};

CanvasView.prototype.changeLogo = function() {
  var ctx = this.$canvas[0].getContext('2d'),
      logo = new Image();
  logo.src = MIP.logos.getFresh();
  logo.onload = function () {
    ctx.drawImage(logo, 80, 0);
  }
}