/**
 * Tweets pulls and parses Twitter search results for commands
 * @param url: url of Twitter JSON
 */
function Tweets(url) {
  this.url = url;
  this.commands = ['pizzaz', 'timeless', 'jazz it up', 'futuristic', 'friendly', 'eco', 'hip', 'slick', 'artsy', 'in your face'];
}

// get twitter json
Tweets.prototype.getData = function() {
  $.ajax({
    type: 'get',
    url: this.url,
    dataType: 'json',
    context: this,
    success: this.parseData,
    error: this.onError
  });
};

// parse twitter json
Tweets.prototype.parseData = function(data) {
  
  var regex = new RegExp("#bnc [" + this.commands.join('|') + "]", "i");
  var commands = {};
  _.each(data, function(val, key) {
    if (val.toLowerCase().match(regex)) {
      commands[key] = val;
    }
  });
  
  // [pizzaz|timeless|jazz it up|futuristic|friendly|eco|hip|slick|artsy|in your face]
  // @TODO need to regex for one of the above after #bnc and send it to chooseEffect
  // @TODO send author so we can grab his pic for notification
  
  this.chooseEffect('twitter_username', 'timeless');
  
};

// triggers command event
Tweets.prototype.chooseEffect = function(author, command) {
  
  var commands = [];
  
  switch (command) {
  
    case "pizaaz":
      commands = ['blur', 'noise', 'posterize', 'sharpen', 'brightness', 'invert', 'flipv', 'fliph', 'histogram', 'sepia', 'solarize'];
      break;
      
    case "timeless":
      commands = ['bw', 'neon', 'galaxy', 'sharpen', 'noise'];
      break;
      
    case "jazz it up":
      commands = ['blur', 'noise', 'posterize', 'sharpen', 'brightness', 'invert', 'flipv', 'fliph', 'histogram', 'sepia', 'solarize'];
      break;
      
    case "futuristic":
      commands = ['blur', 'noise', 'posterize', 'sharpen', 'brightness', 'invert', 'flipv', 'fliph', 'histogram', 'sepia', 'solarize'];
      break;
      
    case "friendly":
      commands = ['blur', 'noise', 'posterize', 'sharpen', 'brightness', 'invert', 'flipv', 'fliph', 'histogram', 'sepia', 'solarize'];
      break;
      
    case "eco":
      commands = ['blur', 'noise', 'posterize', 'sharpen', 'brightness', 'invert', 'flipv', 'fliph', 'histogram', 'sepia', 'solarize'];
      break;
      
    case "hip":
      commands = ['blur', 'noise', 'posterize', 'sharpen', 'brightness', 'invert', 'flipv', 'fliph', 'histogram', 'sepia', 'solarize'];
      break;
      
    case "slick":
      commands = ['blur', 'noise', 'posterize', 'sharpen', 'brightness', 'invert', 'flipv', 'fliph', 'histogram', 'sepia', 'solarize'];
      break;
    
    case "artsy":
      commands = ['blur', 'noise', 'posterize', 'sharpen', 'brightness', 'invert', 'flipv', 'fliph', 'histogram', 'sepia', 'solarize'];
      break;
      
    case "in your face":
      commands = ['blur', 'noise', 'posterize', 'sharpen', 'brightness', 'invert', 'flipv', 'fliph', 'histogram', 'sepia', 'solarize'];
      break;
  
  }
  
  var selectedCommand = commands[Math.floor(Math.random()*commands.length)];
  this.triggerEffect(selectedCommand);
  
};

// triggers command event
Tweets.prototype.triggerEffect = function(command) {
  
  $(window).trigger('Tweets:newEffect', command);
  MIP.logos.numEffects++;
  
};


Tweets.prototype.onError = function(jqXHR, textStatus, errorThrown) {
  console.log('tried to get twitter results via ajax and got: ' + textStatus);
};

/**
 * Logos stores logo names and whether or not they've been used
 * 
 */
function Logos() {
  this.dir = '/assets/images/logos/';
  this.list = this.getLogos() || [
    {name: 'logo_aa.png', used: 0},
    {name: 'logo_adidas.png', used: 0},
    {name: 'logo_adobe.png', used: 0},
    {name: 'logo_amtrak.png', used: 0},
    {name: 'logo_android.png', used: 0},
    {name: 'logo_apple.png', used: 0},
    {name: 'logo_att.png', used: 0},
    {name: 'logo_audi.png', used: 0},
    {name: 'logo_bank-of-america.png', used: 0},
    {name: 'logo_british-rail.png', used: 0},
    {name: 'logo_burton.png', used: 0},
    {name: 'logo_cbs.png', used: 0},
    {name: 'logo_chase.png', used: 0},
    {name: 'logo_continental.png', used: 0},
    {name: 'logo_delta.png', used: 0},
    {name: 'logo_deutsche.png', used: 0},
    {name: 'logo_dolby.png', used: 0},
    {name: 'logo_ford.png', used: 0},
    {name: 'logo_ge.png', used: 0},
    {name: 'logo_good-year.png', used: 0},
    {name: 'logo_ibm.png', used: 0},
    {name: 'logo_john-deere.png', used: 0},
    {name: 'logo_klm.png', used: 0},
    {name: 'logo_kodak.png', used: 0},
    {name: 'logo_lufthansa.png', used: 0},
    {name: 'logo_mayflower.png', used: 0},
    {name: 'logo_mcdonalds.png', used: 0},
    {name: 'logo_merrill-lynch.png', used: 0},
    {name: 'logo_michelin.png', used: 0},
    {name: 'logo_mitsubishi.png', used: 0},
    {name: 'logo_mobilgas.png', used: 0},
    {name: 'logo_monotype.png', used: 0},
    {name: 'logo_morton.png', used: 0},
    {name: 'logo_nbc.png', used: 0},
    {name: 'logo_neenah.png', used: 0},
    {name: 'logo_nike.png', used: 0},
    {name: 'logo_ny.png', used: 0},
    {name: 'logo_panam.png', used: 0},
    {name: 'logo_pbs.png', used: 0},
    {name: 'logo_penguin.png', used: 0},
    {name: 'logo_pepsi.png', used: 0},
    {name: 'logo_playboy.png', used: 0},
    {name: 'logo_puma.png', used: 0},
    {name: 'logo_shell.png', used: 0},
    {name: 'logo_starbucks.png', used: 0},
    {name: 'logo_swiss.png', used: 0},
    {name: 'logo_target.png', used: 0},
    {name: 'logo_time.png', used: 0},
    {name: 'logo_twitter.png', used: 0},
    {name: 'logo_ubs.png', used: 0},
    {name: 'logo_underground.png', used: 0},
    {name: 'logo_united.png', used: 0},
    {name: 'logo_volkswagen.png', used: 0},
    {name: 'logo_warner-bros.png', used: 0},
    {name: 'logo_warner-comm.png', used: 0},
    {name: 'logo_woolmark.png', used: 0},
    {name: 'logo_wwf.png', used: 0}
  ];
  this.numEffects = 0;    // number of effects that have been performed on the current logo
}

/**
 * Saves logo info to local storage
 * 
 */
Logos.prototype.setLogos = function() {
  localStorage.removeItem('logos');
  localStorage.setItem('logos', JSON.stringify(this.list));
};

/**
 * Gets logo info from local storage
 * 
 */
Logos.prototype.getLogos = function() {
  var value = localStorage.getItem('logos');
  if (value) {
    console.log("Pulled logo data from local storage.");
    return JSON.parse(value);
  } else {
    console.log("Did not pull logo data from local storage.");
    return false;
  }
};

/**
 * Gets a random fresh logo
 * 
 */
Logos.prototype.getFresh = function() {
  
  var logo = _.find(this.list, function(item){
    return !item.used;
  });
  
  console.log(logo);
  
  this.markUsed(logo);
  
  //var logo = this.list[Math.floor(Math.random()*this.list.length)];
  
  this.setLogos();
  
  return this.dir + logo.name;
};

/**
 * Marks a logo as no longer fresh (we used it already)
 * 
 */
Logos.prototype.markUsed = function(logo) {
  
  logo.used = 1;
  
};

// reset fresh status of logos
Logos.prototype.reset = function() {
  
};