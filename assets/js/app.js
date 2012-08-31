/**
 * Make it pop!
 * 
 */
var MIP = MIP || {};

$(function() {

  MIP.tweets = new Tweets('/app/twitter.php');
  
  MIP.logos = new Logos();

  MIP.canvasView = new CanvasView('#main canvas');
  MIP.canvasView.initLogo();
  
  $('#msg').click(function(){
    MIP.tweets.getData();
  });
  
  $(window).on('Tweets:newEffect', function(){
    console.log("Tweets:newEffect event fired");
  });
  
});












