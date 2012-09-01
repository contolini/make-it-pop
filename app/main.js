/**
 * Make it pop!
 * 
 */
var MIP = MIP || {};

$(function() {

  MIP.tweets = new Tweets('/app/twitter/tweets.php');
  
  MIP.logos = new Logos();

  MIP.canvasView = new CanvasView('#main canvas');
  MIP.canvasView.initLogo();
  
  MIP.notiView = new NotiView();
  
  $('button').click(function(){
    MIP.tweets.getData();
  });
  
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





