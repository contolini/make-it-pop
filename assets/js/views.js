/**
 * CanvasView controls logos on the canvas
 * 
 */
function CanvasView(el) {
  this.canvas = $(el)[0];
  this.context = this.canvas.getContext('2d');
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
  var img = new Image();
  img.src = MIP.logos.getFresh();
  img.onload = function () {
    self.redrawLogo(img);
  }
};

CanvasView.prototype.updateLogo = function(command) {
  var self = this;
  var img = new Image();
  img.src = this.canvas.toDataURL();
  img.onload = function () {
    switch (command) {
    
      case 'desaturate':
        var logo = Pixastic.process(img, "desaturate", {average : false});
        break;
      
      /* same as brightness  
      case 'glow':
        var logo = Pixastic.process(img, "glow", {amount:0.8,radius:0.05});
        break;
      */
        
      case 'blur':
        var logo = Pixastic.process(img, "blurfast", {amount:0.5});
        break;
        
      case 'noise':
        var logo = Pixastic.process(img, "noise", {mono:true,amount:0.5,strength:1.0});
        logo = Pixastic.process(logo, "emboss", {strength:10,greyLevel:200,direction:"topleft",blend:true});
        break;
        
      case 'mosaic':
        var logo = Pixastic.process(img, "mosaic", {blockSize:50});
        break;
        
      case 'brightness':
        var logo = Pixastic.process(img, "brightness", {brightness:80,contrast:0.5});
        break;
        
      case 'invert':
        var logo = Pixastic.process(img, "invert");
        break;
        
      case 'flipv':
        var logo = Pixastic.process(img, "flipv");
        break;
        
      case 'fliph':
        var logo = Pixastic.process(img, "fliph");
        break;
        
      case 'histogram':
        var logo = Pixastic.process(img, "colorhistogram", {
      		paint:true,returnValue:hist
      	});
      	var hist = {};
      	hist.rvals; // <- array[255] red channel
      	hist.gvals; // <- array[255] green channel
      	hist.bvals; // <- array[255] blue channel
        break;
        
      default:
        console.log("error: switch defaulted");
    }
    
    self.redrawLogo(logo);
    console.log('Updated logo with effect: ' + command);
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
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.drawImage(logo, 0, 0);
};

CanvasView.prototype.changeLogo = function() {
  this.currentLogo = MIP.logos.getFresh();
}