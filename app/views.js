/**
 * CanvasView controls logos on the canvas
 * 
 */
function CanvasView(el) {
  this.canvas = $(el)[0];
  this.context = this.canvas.getContext('2d');
  this.bindEvents();
}

/**
 * Watch for custom events
 * 
 */
CanvasView.prototype.bindEvents = function() {
  var self = this;
  $(window).on('Tweets:newEffect', null, function(event, tweet, effect) {
    $.proxy(self.updateLogo(effect), self);
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
  };
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
  
    var logo;
    
    switch (command) {
    
      /**
       * Image effects
       * 
       */
       
      case 'desaturate':
        logo = Pixastic.process(img, "desaturate", {average : false});
        break;
        
      case 'blur': // @avoid this pushes pixels together and ruins logos with thin lines
        logo = Pixastic.process(img, "blurfast", {amount:0.5});
        self.redrawLogo(logo);
        break;
        
      case 'noise':
        logo = Pixastic.process(img, "noise", {mono:true,amount:0.5,strength:0.5});
        logo = Pixastic.process(logo, "emboss", {strength:5,greyLevel:200,direction:"topleft",blend:true});
        self.redrawLogo(logo);
        break;
        
      case 'pointillize': // @avoid super slow and cpu intensive
        logo = Pixastic.process(img, "pointillize", {radius:5, density:1.5, noise:1.0, transparent:false});
        self.redrawLogo(logo);
        break;
        
      case 'pixelate': // @avoid super slow and cpu intensive
        logo = Pixastic.process(img, "mosaic", {blockSize:15});
        self.redrawLogo(logo);
        break;
        
      case 'posterize':
        logo = Pixastic.process(img, "posterize", {levels:2});
        self.redrawLogo(logo);
        break;
        
      case 'sepia':
        logo = Pixastic.process(img, "sepia");
        self.redrawLogo(logo);
        break;
        
      case 'solarize': // kinda makes it dark and inverted colors
        logo = Pixastic.process(img, "solarize");
        self.redrawLogo(logo);
        break;
        
      case 'brightness': // kinda boring
        logo = Pixastic.process(img, "brightness", {brightness:90,contrast:0.5});
        self.redrawLogo(logo);
        break;
        
      case 'glow':
        logo = Pixastic.process(img, "brightness", {brightness:90,contrast:0.5});
        logo = Pixastic.process(img, "glow", {amount:1.0,radius:1.0});
        self.redrawLogo(logo);
        break;
        
      case 'invert':
        logo = Pixastic.process(img, "invert");
        self.redrawLogo(logo);
        break;
        
      case 'sharpen': // futuristic outline
        logo = img;
        for (var c = 0; c < 5; c++) {
          logo = Pixastic.process(logo, "sharpen", {amount:1});
        }
        self.redrawLogo(logo);
        break;
        
      case 'flipv':
        logo = Pixastic.process(img, "flipv");
        self.redrawLogo(logo);
        break;
        
      case 'fliph':
        logo = Pixastic.process(img, "fliph");
        self.redrawLogo(logo);
        break;
        
      case 'histogram':
        logo = Pixastic.process(img, "colorhistogram", {
          paint:true,returnValue:hist
        });
        var hist = {};
        hist.rvals = 112; // <- array[255] red channel
        hist.gvals = 99; // <- array[255] green channel
        hist.bvals = 167; // <- array[255] blue channel
        self.redrawLogo(logo);
        break;
        
      /**
       * Background effects
       * 
       */
        
      case 'paper': // eco
        self.setBackground('paper');
        break;
        
      case 'supermodel':
        self.setBackground('supermodel');
        break;
        
      case 'lebron':
        self.setBackground('lebron');
        break;
        
      case 'rainbow-smoke':
        self.setBackground('rainbow-smoke');
        break;
        
      case 'sunbeam':
        self.setBackground('sunbeam');
        break;
        
      case 'illusion':
        self.setBackground('illusion');
        break;
        
      /**
       * Masking effects
       * 
       */
      case 'neon': 
        self.setMask('neon');
        break;
        
      case 'green': // eco
        self.setMask('green');
        break;
        
      case 'grass': // eco
        self.setMask('grass');
        break;
        
      case 'bw':
        self.setMask('bw');
        break;
        
      case 'galaxy':
        self.setMask('galaxy');
        break;
        
      case 'gold':
        self.setMask('gold');
        break;
        
      case 'distressed':
        self.setMask('distressed');
        break;
        
      case 'white-on-rainbow':
        self.setMask('white');
        self.setBackground('hip');
        break;
        
       /**
       * Rotation effects
       * 
       */
      case 'rotate45': 
        self.rotateLogo(img, 45);
        break;
        
      case 'rotate135': // eco
        self.rotateLogo(img, 135);
        break;
        
      case 'rotate225': // eco
        self.rotateLogo(img, 225);
        break;
        
      case 'rotate270':
        self.rotateLogo(img, 270);
        break;
        
      /**
       * Foreground image effects
       * 
       */
      case 'balloons': 
        self.overlayImage('balloons');
        break;
        
      case 'cat': 
        self.overlayImage('cat');
        break;
        
      case 'unicorn': 
        self.overlayImage('unicorn');
        break;
        
      case 'unicorn2': 
        self.overlayImage('unicorn2');
        break;
        
      case 'eagle': 
        self.overlayImage('eagle');
        break;
        
      case 'cat-star': 
        self.overlayImage('cat-star');
        break;
        
      case 'flower': 
        self.overlayImage('flower');
        break;
        
      case 'butterfly': 
        self.overlayImage('butterfly');
        break;
        
      case 'bow': 
        self.overlayImage('bow');
        break;
        
      case 'rainbow': 
        self.overlayImage('rainbow');
        break;
        
      case 'fireworks': 
        self.overlayImage('fireworks');
        break;
        
      case 'icp': 
        self.overlayImage('icp');
        break;
        
      case 'roses': 
        self.overlayImage('roses');
        break;
        
      case 'hearts': 
        self.overlayImage('hearts');
        break;
        
      case 'stars': 
        self.overlayImage('stars');
        break;
        
      case 'alien': 
        self.overlayImage('alien');
        break;
        
      case 'cat': 
        self.overlayImage('cat');
        break;
        
      case 'cat2': 
        self.overlayImage('cat2');
        break;
        
      case 'grandparents': 
        self.overlayImage('grandparents');
        break;
        
      case 'recycle': 
        self.overlayImage('recycle');
        break;
        
      case 'dolphins': 
        self.overlayImage('dolphins');
        break;
        
      case 'shapes': 
        self.overlayImage('shapes');
        break;
        
      case 'bling': 
        self.overlayImage('bling');
        break;
        
      case 'splatter': 
        self.overlayImage('splatter');
        break;
        
      case 'splatter2': 
        self.overlayImage('splatter2');
        break;
        
      case 'burst': 
        self.overlayImage('burst');
        break;
        
      /**
       * Tile and center foreground image effects
       * 
       */
      case 'sparkle':
        self.setForeground('tile sparkle');
        break;
        
      case 'frame':
        self.setForeground('center frame');
        break;
        
      case 'loading':
        self.setForeground('center loading');
        break;
        
      case 'loading':
        self.setForeground('center mustache');
        break;
        
      case 'glare':
        self.setForeground('center glare');
        break;
        
      case 'tile-logo':
        self.setForeground('tile logo');
        break;
        
      /**
       * Bottom border image effects
       * 
       */
      case 'flames':
        self.overlayBorder('flames');
        break;
        
      /**
       * Drop a shadow
       * 
       */
      case 'shadow':
        self.dropShadow();
        break;

      default:
        console.log("error: effect switch defaulted");
    }
    
    MIP.debugView.pushMsg('Effect applied: ' + command);

  };

};

/**
 * Drop a shadow
 * 
 */
CanvasView.prototype.dropShadow = function() {

  var logo = new Image();
  logo.src = this.canvas.toDataURL();
  
  this.context.save(); 
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.translate((logo.width / 2), (logo.height / 2));
  this.context.shadowColor = 'black';
  this.context.shadowBlur = 25;
  this.context.shadowOffsetX = 10;
  this.context.shadowOffsetY = 15;
  var x = (this.canvas.width / 2) - (logo.width / 2);
  var y = (this.canvas.height / 2) - (logo.height / 2);
  this.context.drawImage(logo, -(logo.width / 2), -(logo.height / 2));
  this.context.restore();

};

/**
 * Overlay images onto the logo
 * 
 */
CanvasView.prototype.overlayImage = function(fgEffect) {
  
  var img = new Image();
  var fgimg = _.find(MIP.images.list, function(item){
    return item.effect == fgEffect;
  });
  img.src = MIP.images.dir + fgimg.name;
  
  var x = Math.floor(Math.random() * ($(window).width() - 400)) + 'px';
  var y = Math.floor(Math.random() * ($(window).height() - 200)) + 'px';
  
  $(img).addClass('fg');
  $(img).css({'top': y, 'left': x});
  
  if (Math.floor(Math.random()*2)) {
    $(img).addClass('flip');
  }
  
  $('body').append(img);

};

/**
 * Overlay a border onto the bottom of the screen
 * 
 */
CanvasView.prototype.overlayBorder = function(borderImage) {
  
  var div = document.createElement('div');
  
  $(div).addClass('fg border ' + borderImage);
  
  $('body').append(div);

};

/**
 * Set a centered or tiled foreground image
 * 
 */
CanvasView.prototype.setForeground = function(imageClasses) {

  var div = document.createElement('div');
  $(div).addClass('fg ' + imageClasses);

  if (imageClasses === 'tile logo') {
    var img = this.canvas.toDataURL();
    $(div).css('background-image', 'url(' + img + ')');
  }
  
  $('body').append(div);

};

/**
 * Redraw the logo after we modify it with an effect
 * 
 */
CanvasView.prototype.redrawLogo = function(logo) {

  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  var x = (this.canvas.width / 2) - (logo.width / 2);
  var y = (this.canvas.height / 2) - (logo.height / 2);
  this.context.drawImage(logo, x, y);
  
};

/**
 * Rotate and redraw logo
 * 
 */
CanvasView.prototype.rotateLogo = function(logo, angle) {

  this.context.save(); 
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.translate((logo.width / 2), (logo.height / 2));
  this.context.rotate(angle*Math.PI/180)
  var x = (this.canvas.width / 2) - (logo.width / 2);
  var y = (this.canvas.height / 2) - (logo.height / 2);
  this.context.drawImage(logo, -(logo.width / 2), -(logo.height / 2));
  this.context.restore(); 
  
};

/**
 * Change the page's background
 * 
 */
CanvasView.prototype.setBackground = function(bgClass) {

  $('body').removeClass().addClass('bg fullscreen ' + bgClass);
  
};

/**
 * Use Canvas Mask (https://github.com/benbarnett/Canvas-Mask) to mask the logo
 * 
 */
CanvasView.prototype.setMask = function(mask) {

  var maskImg;

  switch (mask) {
  
    case 'neon':
      maskImg = 'assets/images/effects/mask_neon.png';
      break;
      
    case 'green':
      maskImg = 'assets/images/effects/mask_green.png';
      break;
      
    case 'bw':
      maskImg = 'assets/images/effects/mask_bw.png';
      break;
      
    case 'grass':
      maskImg = 'assets/images/effects/mask_grass.jpg';
      break;
      
    case 'galaxy':
      maskImg = 'assets/images/effects/mask_galaxy.jpg';
      break;
      
    case 'white':
      maskImg = 'assets/images/effects/mask_white.gif';
      break;
      
    case 'gold':
      maskImg = 'assets/images/effects/mask_gold.jpg';
      break;
      
    case 'distressed':
      maskImg = 'assets/images/effects/mask_distressed.jpg';
      break;
      
    default:
      maskImg = 'assets/images/effects/mask_galaxy.png';
  
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
      applyCanvasMask(images.base, images.alpha, width, height), 0, 0, 0, 0, width, height
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
};


/**
 * NotiView shows notifications on the screen
 * 
 */
function NotiView() {
  this.bindEvents();
};

/**
 * Watch for custom events
 * 
 */
NotiView.prototype.bindEvents = function() {
  var self = this;
  $(window).on('Tweets:newEffect', null, function(event, tweet, effect) {
    $.proxy(self.addNotification(tweet), self);
  });
};

/**
 * Add Gritter notification
 * 
 */
NotiView.prototype.addNotification = function(tweet) {
  $.gritter.add({
      title: "Client request!",
      text: tweet.username + " wants " + tweet.command,
      image: 'https://api.twitter.com/1/users/profile_image?screen_name=' + tweet.username + '&size=bigger',
      sticky: false, 
      time: 4000,
      class_name: 'my-class',
      before_open: function(){
    
      },
      after_open: function(e){
    
      },
      before_close: function(e, manual_close){
    
      },
      after_close: function(){
    
      }
  });
};


/**
 * Debugging functionality
 * 
 */
function DebugView() {

};

DebugView.prototype.pushMsg = function(msg) {
  var d = new Date();
  console.log(d + ' ' + msg);
};


/**
 * Stuff to do when a logo is finished
 * 
 */
function FinaleView() {

  var img = new Image();
  var num = (Math.floor(Math.random() * 4) + 1);
  img.src = MIP.images.dir + 'client' + num + '.png';
  
  $(img).addClass('client');
  $(img).css({'bottom': '-530px', 'left': '0'});
  
  $('body').append(img);

};

/**
 * Animated client functionality
 * 
 */
FinaleView.prototype.show = function() {
    
  $('img.client').animate({
    'bottom': '0px'
  });
  
  if (Math.floor(Math.random() * 4) == 3) {
  
    var div = document.createElement('div');
    $(div).addClass('fg splash');
    
    window.setTimeout(function() {
      $('body').append(div).fadeIn();
      window.setTimeout(function() {
        window.location.reload();
      }, 8000);
    }, 8000);
    
  } else {
  
    window.setTimeout(function() {
      window.location.reload();
    }, 8000);
    
  }
  
};