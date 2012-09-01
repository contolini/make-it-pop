/**
 * Make it pop!
 * 
 */
var MIP = MIP || {};

$(function() {

  MIP.tweets = new Tweets('/app/twitter/tweets.php');
  
  MIP.logos = new Logos();
  MIP.logos.getLogos();

  MIP.canvasView = new CanvasView('#main canvas');
  MIP.canvasView.initLogo();
  
  MIP.notiView = new NotiView();
  
  $('#msg').click(function(){
    MIP.tweets.getData();
  });
  
  $(window).on('Tweets:newEffect', function(){
    //console.log("Tweets:newEffect event fired");
  });
  
});

/**
 * Debug functions
 * 
 */
//localStorage.clear(); // erase logos from storage





