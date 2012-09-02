/**
 * Make it pop!
 * 
 */
var MIP = MIP || {};

$(function() {

  MIP.tweets = new Tweets('/app/twitter/tweets.php');
  
  MIP.logos = new Logos();
  
  MIP.images = new Images();

  MIP.canvasView = new CanvasView('#main canvas');
  MIP.canvasView.initLogo();
  
  MIP.notiView = new NotiView();
  
  
  $('button').click(function(){
    MIP.tweets.getData();
  });
  
  
  // search for tweets every three seconds
  window.setInterval(function() {
    MIP.tweets.getData();
  }, 5000);
  
  $(window).on('Tweets:newEffect', function(event, tweet, effect){
    //console.log(tweet);
    //console.log(effect);
  });
  
});

/**
 * Debug functions
 * 
 */
//localStorage.clear(); // erase logos from storage





