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

  var commands = {};
  _.each(data, function(val, key) {
    if (val.toLowerCase().match(/#bnc [accessories|coming]/g)) {
      commands[key] = val;
    }
  });
  
  // [pizzaz|timeless|jazz it up|futuristic|friendly|eco|hip|slick|artsy|in your face]
  // @TODO need to somehow grap the word after #bnc and send it to sendCommand
  
  this.sendCommand('mosaic');

  //console.log(commands);
  
};

//
Tweets.prototype.sendCommand = function(command) {
  
  $(window).trigger('Tweets:newCommand', command);
  
};


Tweets.prototype.onError = function(jqXHR, textStatus, errorThrown) {
  console.log('tried to get twitter results via ajax and got: ' + textStatus);
}

/**
 * Logos stores logo names and whether or not they've been used
 * 
 */
function Logos() {
  this.dir = '/assets/images/';
  this.list = [
    {name: 'logo_aa.png', fresh: 1},
    {name: 'logo_att.png', fresh: 1}
  ]
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