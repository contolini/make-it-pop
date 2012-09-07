/**
 * Tweets pulls and parses Twitter search results for commands
 * @param url: url of Twitter JSON
 */
function Tweets(hashtag) {
  this.hashtag = hashtag;
  this.commands = ['pizzaz', 'pizzazz', 'timeless', 'jazz it up', 'futuristic', 'friendly', 'eco', 'hip', 'slick', 'artsy', 'in your face', 'debug'];
}

/**
 * Get Twitter search results JSON
 * 
 */
Tweets.prototype.getData = function() {
  this.url = 'http://search.twitter.com/search.json?q=%23' + this.hashtag + '&rpp=20&result_type=recent&since_id=' + this.getTweetId();
  //this.url = 'http://search.twitter.com/search.json?q=%23' + this.hashtag + '&rpp=20&result_type=recent&since_id=1';
  $.ajax({
    type: 'get',
    url: this.url,
    dataType: 'jsonp',
    context: this,
    success: this.parseData,
    error: this.onError
  });
};

/**
 * Parse Twitter JSON
 * 
 */
Tweets.prototype.parseData = function(data) {
  
  var tweets = data.results,
      self = this,
      regex = new RegExp("#bnc (" + this.commands.join('|') + ")", "i");
      
  if (tweets.length < 1) {
    MIP.debugView.pushMsg('No tweet commands found.');
    return; 
  }
      
  _.each(tweets, function(val, key) {
    
    var username = val.from_user,
        avatar = val.profile_image_url,
        status = val.text,
        timestamp = val.created_at,
        tweet_id = val.id_str,
        commandMatches;
                
    if (BigInteger(tweet_id).compare(self.getTweetId()) > 0) {
    
      self.setTweetId(tweet_id);
      self.setTweetTime(timestamp);
      
    }
        
    if ((commandMatches = regex.exec(status)) !== null) {
    
      var command = {};
      command.username = username;
      command.avatar = avatar;
      command.command = commandMatches[1];
      command.timestamp = timestamp;
      
      if (command.command === 'debug') {
        var debugRegex = new RegExp("debug (.*)", "i");
        var debugCommand = debugRegex.exec(status);
        command.command = 'debug ' + debugCommand[1];
      }
      
      self.chooseEffect(command);
      
    }
        
  });
    
};

/**
 * Fake a tweet if no one is participating
 * 
 */
Tweets.prototype.fakeIt = function() {

  var command = this.commands[Math.floor(Math.random()*(this.commands.length-1))];

  var fakeTweet = {
    command: command,
    username: 'publicsociety',
    tweet_id: this.getTweetId()
  };
  
  this.setTweetTime(new Date().getTime());
  this.chooseEffect(fakeTweet);
  
  MIP.debugView.pushMsg('Faked a tweet.');
  
}

/**
 * Saves last tweet id to local storage
 * 
 */
Tweets.prototype.setTweetId = function(id) {
  localStorage.removeItem('MIP.tweet_id');
  localStorage.setItem('MIP.tweet_id', id);
};

/**
 * Gets last tweet id from local storage
 * 
 */
Tweets.prototype.getTweetId = function() {
  var value = localStorage.getItem('MIP.tweet_id');
  if (value) {
    //MIP.debugView.pushMsg("Pulled last tweet ID from local storage: " + value);
    return value;
  } else {
    //MIP.debugView.pushMsg("Failed to load last tweet ID.");
    return 1;
  }
};

/**
 * Saves time of tweet
 * 
 */
Tweets.prototype.setTweetTime = function(time) {
  var time = new Date(time).getTime();
  localStorage.removeItem('MIP.tweet_time');
  localStorage.setItem('MIP.tweet_time', time);
};

/**
 * Gets time of last tweet
 * 
 */
Tweets.prototype.getTweetTime = function() {
  var time = localStorage.getItem('MIP.tweet_time');
  if (time) {
    return time;
  }
};

/**
 * Choose a random effect from given command
 * 
 */
Tweets.prototype.chooseEffect = function(tweet) {
  
  var effects = [];
  
  switch (tweet.command) {
  
    case "pizzaz":
      effects = ['sparkle', 'flames', 'sunbeam', 'cat-star', 'icp'];
      break;
      
    case "pizzazz":
      effects = ['sparkle', 'flames', 'sunbeam', 'cat-star', 'icp'];
      break;
      
    case "timeless":
      effects = ['frame', 'loading', 'mustache', 'roses'];
      break;
      
    case "jazz it up":
      effects = ['neon', 'rainbow-smoke', 'unicorn', 'unicorn2', 'hearts', 'star', 'bow'];
      break;
      
    case "futuristic":
      effects = ['galaxy', 'alien', 'sharpen'];
      break;
      
    case "friendly":
      effects = ['blur', 'cat', 'cat2', 'balloons', 'grandparents'];
      break;
      
    case "eco":
      effects = ['grass', 'paper', 'recycle', 'dolphins'];
      break;
      
    case "hip":
      effects = ['white-on-rainbow', 'tile-logo', 'shapes', 'noise'];
      break;
      
    case "slick":
      effects = ['rotate45', 'glare', 'gold', 'bling'];
      break;
    
    case "artsy":
      effects = ['splatter', 'splatter2', 'distressed'];
      break;
      
    case "in your face":
      effects = ['burst', 'eagle', 'illusion', 'shadow'];
      break;
      
    default:
      var debugEffect = tweet.command.replace('debug ','');
      effects = [debugEffect];
      break;
  
  }
  
  var selectedEffect = effects[Math.floor(Math.random()*effects.length)];
  this.triggerEffect(tweet, selectedEffect);
  
};

/**
 * Triggers effect
 * 
 */
Tweets.prototype.triggerEffect = function(tweet, effect) {
  
  var data = [tweet, effect];
  
  $(window).trigger('Tweets:newEffect', data);
  MIP.logos.numEffects++;
  
};

/**
 * Log any Twitter API errors
 * 
 */
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
  this.numLogos = 1;      // number of logos that have been shown
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
    MIP.debugView.pushMsg("Pulled logo data from local storage.");
    return JSON.parse(value);
  } else {
    MIP.debugView.pushMsg("Did not pull logo data from local storage.");
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


/**
 * Images to overlay on the logos
 * 
 */
function Images() {
  
  this.dir = '/assets/images/effects/';
  this.list = [
    {name: 'fg_balloons.png', effect: 'balloons'},
    {name: 'fg_bow.gif', effect: 'bow'},
    {name: 'fg_butterfly.png', effect: 'butterfly'},
    {name: 'fg_cat-star.png', effect: 'cat-star'},
    {name: 'fg_cat.gif', effect: 'cat'},
    {name: 'fg_eagle.gif', effect: 'eagle'},
    {name: 'fg_flower.png', effect: 'flower'},
    {name: 'fg_grass.png', effect: 'grass'},
    {name: 'fg_unicorn.gif', effect: 'unicorn'},
    {name: 'fg_unicorn2.gif', effect: 'unicorn2'},
    {name: 'fg_rainbow.gif', effect: 'rainbow'},
    {name: 'fg_fireworks.gif', effect: 'fireworks'},
    {name: 'fg_icp.png', effect: 'icp'},
    {name: 'fg_roses.gif', effect: 'roses'},
    {name: 'fg_hearts.gif', effect: 'hearts'},
    {name: 'fg_stars.gif', effect: 'stars'},
    {name: 'fg_alien.png', effect: 'alien'},
    {name: 'fg_cat.gif', effect: 'cat'},
    {name: 'fg_cat2.gif', effect: 'cat2'},
    {name: 'fg_grandparents.png', effect: 'grandparents'},
    {name: 'fg_recycle.png', effect: 'recycle'},
    {name: 'fg_dolphins.gif', effect: 'dolphins'},
    {name: 'fg_shapes.gif', effect: 'shapes'},
    {name: 'fg_bling.gif', effect: 'bling'},
    {name: 'fg_glare.png', effect: 'glare'},
    {name: 'fg_splatter.png', effect: 'splatter'},
    {name: 'fg_splatter2.png', effect: 'splatter2'},
    {name: 'fg_burst.png', effect: 'burst'}
  ];

}