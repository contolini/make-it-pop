/**
 * CanvasView controls logos on the canvas
 * 
 */
function CanvasView(el) {
  this.context = $(el)[0].getContext('2d');
  this.currentLogoImg = new Image();
  this.currentLogoSrc = MIP.logos.getFresh();
  this.numEffects = 0;    // number of effects that have been performed on the logo
  this.bindEvents();
}

CanvasView.prototype.bindEvents = function() {
  var self = this;
  $(window).on('Tweets:success', function(data) {
    //$.proxy(self.initLogo(), self);
    console.log(data);
  });
};

CanvasView.prototype.initLogo = function() {
  var self = this;
  this.currentLogoImg.src = this.currentLogoSrc;
  this.currentLogoImg.onload = function () {
    self.updateLogo(self.currentLogoImg);
  }
};

CanvasView.prototype.desaturate = function() {
  var self = this;
  var img = this.currentLogoImg;
  img.onload = function () {
    var logo = Pixastic.process(img, "desaturate", {average : false});
    self.updateLogo(logo);
    /* shadow
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 10;
    */
  }
  return img;
};

CanvasView.prototype.updateLogo = function(logo) {
  this.context.drawImage(logo, 80, 0);
};

CanvasView.prototype.changeLogo = function() {
  this.currentLogo = MIP.logos.getFresh();
}