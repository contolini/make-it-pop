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

/**
 * Watch for custom events
 * 
 */
CanvasView.prototype.bindEvents = function() {
  var self = this;
  $(window).on('Tweets:newEffect', null, function(event, command) {
    $.proxy(self.updateLogo(command), self);
    //console.log(command);
  });
};

/**
 * Initiate random fresh logo on load
 * 
 */
CanvasView.prototype.initLogo = function() {
  var self = this;
  var img = new Image();
  img.src = MIP.logos.getFresh();
  img.onload = function () {
    self.redrawLogo(img);
  }
};

/**
 * Update logo with appropriate effect from given command
 * 
 */
CanvasView.prototype.updateLogo = function(command) {
  var self = this;
  var img = new Image();
  img.src = this.canvas.toDataURL();
  img.onload = function () {
    switch (command) {
    
      /**
       * Image effects
       * 
       */
       
      case 'desaturate':
        var logo = Pixastic.process(img, "desaturate", {average : false});
        break;
        
      case 'blur':
        var logo = Pixastic.process(img, "blurfast", {amount:0.3});
        self.redrawLogo(logo);
        break;
        
      case 'noise':
        var logo = Pixastic.process(img, "noise", {mono:true,amount:0.5,strength:0.5});
        logo = Pixastic.process(logo, "emboss", {strength:5,greyLevel:200,direction:"topleft",blend:true});
        self.redrawLogo(logo);
        break;
        
      case 'pointillize': // super slow and cpu intensive
        var logo = Pixastic.process(img, "pointillize", {radius:5, density:1.5, noise:1.0, transparent:false});
        self.redrawLogo(logo);
        break;
        
      case 'posterize':
        var logo = Pixastic.process(img, "posterize", {levels:2});
        self.redrawLogo(logo);
        break;
        
      case 'sepia':
        var logo = Pixastic.process(img, "sepia");
        self.redrawLogo(logo);
        break;
        
      case 'solarize': // kinda makes it dark and inverted colors
        var logo = Pixastic.process(img, "solarize");
        self.redrawLogo(logo);
        break;
        
      case 'brightness':
        var logo = Pixastic.process(img, "brightness", {brightness:80,contrast:0.5});
        self.redrawLogo(logo);
        break;
        
      case 'invert':
        var logo = Pixastic.process(img, "invert");
        self.redrawLogo(logo);
        break;
        
      case 'sharpen': // futuristic outline
        var logo = img;
        for (var c = 0; c < 5; c++) {
          logo = Pixastic.process(logo, "sharpen", {amount:1});
        }
        self.redrawLogo(logo);
        break;
        
      case 'flipv':
        var logo = Pixastic.process(img, "flipv");
        self.redrawLogo(logo);
        break;
        
      case 'fliph':
        var logo = Pixastic.process(img, "fliph");
        self.redrawLogo(logo);
        break;
        
      case 'histogram':
        var logo = Pixastic.process(img, "colorhistogram", {
      		paint:true,returnValue:hist
      	});
      	var hist = {};
      	hist.rvals; // <- array[255] red channel
      	hist.gvals; // <- array[255] green channel
      	hist.bvals; // <- array[255] blue channel
      	self.redrawLogo(logo);
        break;
        
      /**
       * Background effects
       * 
       */
      case 'galaxy': // futuristic
        self.setBackground('bg fullscreen galaxy');
        break;
        
      case 'paper': // eco
        self.setBackground('bg fullscreen paper');
        break;
        
      /**
       * Masking effects
       * 
       */
      case 'neon':  // hip
        self.setMask('neon');
        break;
        
      case 'green': // eco
        self.setMask('green');
        break;
        
      case 'bw': // hip
        self.setMask('bw');
        self.setBackground('bg fullscreen bw');
        break;
        
      default:
        console.log("error: switch defaulted");
    }
    
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

/**
 * Redraw the logo after we modify it with an effect
 * 
 */
CanvasView.prototype.redrawLogo = function(logo) {
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  var x = (this.canvas.width / 2) - (logo.width / 2);
  var y = (this.canvas.height / 2) - (logo.height / 2)
  this.context.drawImage(logo, x, y);
};

/**
 * Change the page's background
 * 
 */
CanvasView.prototype.setBackground = function(bgClass) {
  $('body').removeClass().addClass(bgClass);
};

/**
 * Use Canvas Mask (https://github.com/benbarnett/Canvas-Mask) to mask the logo
 * 
 */
CanvasView.prototype.setMask = function(mask) {

  switch (mask) {
  
    case 'neon':
      var maskImg = 'assets/images/effects/mask_neon.png';
      break;
      
    case 'green':
      var maskImg = 'assets/images/effects/mask_green.png';
      break;
      
    case 'bw':
      var maskImg = 'assets/images/effects/mask_bw.png';
      break;
      
    default:
      var maskImg = 'assets/images/effects/bg_galaxy.png';
  
  }
  
  var paths = [
      { src: this.canvas.toDataURL(), type: "alpha" }, 
      { src: maskImg, type: "base" }
    ],
    images = {},
    output = this.canvas.getContext && this.canvas.getContext('2d'),
    width = 700,
    height = 800,
    self = this;
  
   
  loadImages(function() {
    output.globalCompositeOperation = "source-over";
    output.putImageData(
      applyCanvasMask(images['base'], images['alpha'], width, height), 0, 0, 0, 0, width, height
    );
    
  });
  

  function loadImages(callback) {
    i = paths.length;
    while (i--) {
      loadImage(paths[i], function(type) {
        images[type] = this;
        
        c = 0;
        for (o in images) c++;
        c === paths.length && callback();
      });
    }
  };
  
  
  function loadImage(obj, callback) {
    var image = new Image();
  
    // set onload actions
    image.onload = function() {
      typeof callback === 'function' && callback.call(this, obj.type);
    };
  
    // kick off image load
    image.src = obj.src;
  
    return this;
  };
  
};

/**
 * @TODO change logo when necessary
 * 
 */
CanvasView.prototype.changeLogo = function() {
  //this.currentLogo = MIP.logos.getFresh();
}