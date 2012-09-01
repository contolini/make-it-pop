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
  
  var self = this;
  var regex = new RegExp("#bnc [" + this.commands.join('|') + "]", "i");
  var commands = {};
  _.each(data, function(val, key) {
    if (val.toLowerCase().match(regex)) {
      commands[key] = val;
    }
  });
  
  // [pizzaz|timeless|jazz it up|futuristic|friendly|eco|hip|slick|artsy|in your face]
  // @TODO need to regex for one of the above after #bnc and send it to chooseEffect
  
  this.chooseEffect('timeless');
  
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
  
  var command = commands[Math.floor(Math.random()*commands.length)];
  this.triggerEffect(command);
  
};

// triggers command event
Tweets.prototype.triggerEffect = function(command) {
  
  $(window).trigger('Tweets:newEffect', command);
  
};


Tweets.prototype.onError = function(jqXHR, textStatus, errorThrown) {
  console.log('tried to get twitter results via ajax and got: ' + textStatus);
}

/**
 * Logos stores logo names and whether or not they've been used
 * 
 */
function Logos() {
  this.dir = '/assets/images/logos/';
  this.list = [
    {name: 'logo_aa.png', fresh: 1},
    {name: 'logo_adidas.png', fresh: 1},
    {name: 'logo_adobe.png', fresh: 1},
    {name: 'logo_amtrak.png', fresh: 1},
    {name: 'logo_android.png', fresh: 1},
    {name: 'logo_apple.png', fresh: 1},
    {name: 'logo_att.png', fresh: 1},
    {name: 'logo_audi.png', fresh: 1},
    {name: 'logo_bank-of-america.png', fresh: 1},
    {name: 'logo_british-rail.png', fresh: 1},
    {name: 'logo_burton.png', fresh: 1},
    {name: 'logo_cbs.png', fresh: 1},
    {name: 'logo_chase.png', fresh: 1},
    {name: 'logo_continental.png', fresh: 1},
    {name: 'logo_delta.png', fresh: 1},
    {name: 'logo_deutsche.png', fresh: 1},
    {name: 'logo_dolby.png', fresh: 1},
    {name: 'logo_ford.png', fresh: 1},
    {name: 'logo_ge.png', fresh: 1},
    {name: 'logo_good-year.png', fresh: 1},
    {name: 'logo_ibm.png', fresh: 1},
    {name: 'logo_john-deere.png', fresh: 1},
    {name: 'logo_klm.png', fresh: 1},
    {name: 'logo_kodak.png', fresh: 1},
    {name: 'logo_lufthansa.png', fresh: 1},
    {name: 'logo_mayflower.png', fresh: 1},
    {name: 'logo_mcdonalds.png', fresh: 1},
    {name: 'logo_merrill-lynch.png', fresh: 1},
    {name: 'logo_michelin.png', fresh: 1},
    {name: 'logo_mitsubishi.png', fresh: 1},
    {name: 'logo_mobilgas.png', fresh: 1},
    {name: 'logo_monotype.png', fresh: 1},
    {name: 'logo_morton.png', fresh: 1},
    {name: 'logo_nbc.png', fresh: 1},
    {name: 'logo_neenah.png', fresh: 1},
    {name: 'logo_nike.png', fresh: 1},
    {name: 'logo_ny.png', fresh: 1},
    {name: 'logo_panam.png', fresh: 1},
    {name: 'logo_pbs.png', fresh: 1},
    {name: 'logo_penguin.png', fresh: 1},
    {name: 'logo_pepsi.png', fresh: 1},
    {name: 'logo_playboy.png', fresh: 1},
    {name: 'logo_puma.png', fresh: 1},
    {name: 'logo_shell.png', fresh: 1},
    {name: 'logo_starbucks.png', fresh: 1},
    {name: 'logo_swiss.png', fresh: 1},
    {name: 'logo_target.png', fresh: 1},
    {name: 'logo_time.png', fresh: 1},
    {name: 'logo_twitter.png', fresh: 1},
    {name: 'logo_ubs.png', fresh: 1},
    {name: 'logo_underground.png', fresh: 1},
    {name: 'logo_united.png', fresh: 1},
    {name: 'logo_volkswagen.png', fresh: 1},
    {name: 'logo_warner-bros.png', fresh: 1},
    {name: 'logo_warner-comm.png', fresh: 1},
    {name: 'logo_woolmark.png', fresh: 1},
    {name: 'logo_wwf.png', fresh: 1}
  ]
}

/**
 * Saves logo info to local storage
 * 
 */
Logos.prototype.setLogos = function() {
  localStorage.setItem('logos', JSON.stringify(this.list));
}

/**
 * Gets logo info from local storage
 * 
 */
Logos.prototype.getLogos = function() {
  var value = localStorage.getItem('logos');
  console.log("Pulled logo data from local storage.");
  return value && JSON.parse(value);
}

// get a random fresh logo
Logos.prototype.getFresh = function() {
  /*
  var logo = _.find(this.list, function(logo){
    return logo.fresh === 1;
  });
   */
  var logo = this.list[Math.floor(Math.random()*this.list.length)];
  return this.dir + logo.name;
}

// reset fresh status of logos
Logos.prototype.reset = function() {
  
}