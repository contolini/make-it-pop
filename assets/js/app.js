var MIP = MIP || {};


$(function() {

  MIP.tweets = new Tweets('/app/twitter.php');
  
  MIP.logo = new Logos();
  
  console.log(MIP.logo.getFresh());

  MIP.canvasView = new CanvasView('canvas#main');

});












