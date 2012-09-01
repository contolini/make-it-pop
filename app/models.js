/**
 * Tweets pulls and parses Twitter search results for commands
 * @param url: url of Twitter JSON
 */
function Tweets(url) {
  this.url = url;
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
  
  /* I switched to regex'ing in php to keep things easier on the client
  var regex = new RegExp("#bnc (" + this.commands.join('|') + ")", "i");
  var commands = {};
  _.each(data, function(val, key) {
    if (val.toLowerCase().match(regex)) {
      commands[key] = val;
    }
  });
  */
  
  //console.log(data);return;
  
  if (data[0]['error']) {
    console.log(data[0]['error']);
  }
  
  var self = this;
  
  _.each(data, function(val, key) {
    self.chooseEffect(val);
  });
    
};

// triggers command event
Tweets.prototype.chooseEffect = function(tweet) {
  
  var effects = [];
  
  switch (tweet.command) {
  
    case "pizaaz":
      effects = ['noise', 'galaxy', 'brightness', 'flipv', 'fliph', 'neon', 'grass'];
      break;
      
    case "timeless":
      effects = ['noise', 'galaxy', 'brightness', 'flipv', 'fliph', 'neon', 'grass'];
      break;
      
    case "jazz it up":
      effects = ['noise', 'galaxy', 'brightness', 'flipv', 'fliph', 'neon', 'grass'];
      break;
      
    case "futuristic":
      effects = ['noise', 'galaxy', 'brightness', 'flipv', 'fliph', 'neon', 'grass'];
      break;
      
    case "friendly":
      effects = ['noise', 'galaxy', 'brightness', 'flipv', 'fliph', 'neon', 'grass'];
      break;
      
    case "eco":
      effects = ['noise', 'galaxy', 'brightness', 'flipv', 'fliph', 'neon', 'grass'];
      break;
      
    case "hip":
      effects = ['noise', 'galaxy', 'brightness', 'flipv', 'fliph', 'neon', 'grass'];
      break;
      
    case "slick":
      effects = ['noise', 'galaxy', 'brightness', 'flipv', 'fliph', 'neon', 'grass'];
      break;
    
    case "artsy":
      effects = ['noise', 'galaxy', 'brightness', 'flipv', 'fliph', 'neon', 'grass'];
      break;
      
    case "in your face":
      effects = ['noise', 'galaxy', 'brightness', 'flipv', 'fliph', 'neon', 'grass'];
      break;
      
    default:
      effects = ['bw', 'neon', 'galaxy', 'sharpen', 'noise'];
      break;
  
  }
  
  var selectedEffect = effects[Math.floor(Math.random()*effects.length)];
  this.triggerEffect(tweet, selectedEffect);
  
};

// triggers command event
Tweets.prototype.triggerEffect = function(tweet, effect) {
  
  var data = [tweet, effect];
  
  $(window).trigger('Tweets:newEffect', data);
  MIP.logos.numEffects++;
  
};


Tweets.prototype.onError = function(jqXHR, textStatus, errorThrown) {
  console.log('Tried to get twitter results via ajax and got: ' + errorThrown);
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
  localStorage.removeItem('MIP.logos');
  localStorage.setItem('MIP.logos', JSON.stringify(this.list));
};

/**
 * Gets logo info from local storage
 * 
 */
Logos.prototype.getLogos = function() {
  var value = localStorage.getItem('MIP.logos');
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
  
  if (!logo) {
    this.resetUsed();
    logo = this.list[0];
  }
    
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

/**
  * Reset used status of logos
  * 
  */
Logos.prototype.resetUsed = function() {

  _.each(this.list, function(val, key) {
    val.used = 0;
  });
  
};