var MIP = MIP || {};


$(function() {

  MIP.tweets = new Tweets('/app/twitter.php');
  MIP.tweets.getData();
  
  MIP.logos = new Logos();

  MIP.canvasView = new CanvasView('canvas#main');
  
  $('#msg').click(function(){
    $(document).trigger('Tweets:success');
  });
  
  $(document).on('Tweets:success', function(){
    console.log("Tweets:success event fired");
  });

});












