/**
 * Tweets pulls and parses Twitter search results for commands
 * @param url: url of Twitter JSON
 */
function Tweets(url) {
  this.url = url;
}

Tweets.prototype.getData = function() {
  $.ajax({
    url: this.url,
    dataType: 'json',
    context: this,
    success: this.onSuccess
  });
};

Tweets.prototype.onSuccess = function(data) {
  $(document).trigger('Tweets:success', data);
};

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

Logos.prototype.getFresh = function() {
  /*
  var logo = _.find(this.list, function(logo){
    return logo.fresh === 1;
  });
   */
  var logo = this.list[Math.floor(Math.random()*this.list.length)];
  return this.dir + logo.name;
}

Logos.prototype.reset = function() {
  
}