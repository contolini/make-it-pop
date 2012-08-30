var MIP = MIP || {};


$(function() {

  MIP.tweets = new Tweets('/app/twitter.php');
  
  MIP.logos = new Logos();

  MIP.canvasView = new CanvasView('canvas#main');
  MIP.canvasView.initLogo();
  
  $('#msg').click(function(){
    MIP.tweets.getData();
  });
  
  $(window).on('Tweets:newCommand', function(){
    console.log("Tweets:newCommand event fired");
  });

});












