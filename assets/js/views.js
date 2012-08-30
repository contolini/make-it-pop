/**
 * CanvasView controls logos on the canvas
 * 
 */
function CanvasView(el) {
  this.canvas = $(el)[0];
  this.context = this.canvas.getContext('2d');
  this.currentLogoImg = new Image();
  this.currentLogoSrc = MIP.logos.getFresh();
  this.numEffects = 0;    // number of effects that have been performed on the logo
  this.bindEvents();
}

CanvasView.prototype.bindEvents = function() {
  var self = this;
  $(window).on('Tweets:newCommand', null, function(event, command) {
    $.proxy(self.updateLogo(command), self);
    console.log(command);
  });
};

CanvasView.prototype.initLogo = function() {
  var self = this;
  this.currentLogoImg.src = this.currentLogoSrc;
  this.currentLogoImg.onload = function () {
    self.redrawLogo(self.currentLogoImg);
  }
};

CanvasView.prototype.updateLogo = function(command) {
  var self = this;
  var img = this.currentLogoImg;
  img.src = this.canvas.toDataURL();
  img.onload = function () {
    switch (command) {
    
      case 'desaturate':
        var logo = Pixastic.process(img, "desaturate", {average : false});
        break;
        
      case 'glow':
        var logo = Pixastic.process(img, "glow", {amount:0.5,radius:1.0});
        break;
        
      default:
        console.log("error: switch defaulted");
    }
    
    self.redrawLogo(logo);
    console.log('Updated logo with effect:' + command);
    /* shadow
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 10;
    */
  }
  //return img;
};

CanvasView.prototype.redrawLogo = function(logo) {
  this.currentLogoImg = logo;
  this.context.drawImage(logo, 80, 0);
};

CanvasView.prototype.changeLogo = function() {
  this.currentLogo = MIP.logos.getFresh();
}