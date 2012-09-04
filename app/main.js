/**
 * Make it pop!
 * 
 */
var MIP = MIP || {};

$(function() {

  MIP.debugView = new DebugView();

  MIP.tweets = new Tweets('bnc');
  MIP.logos = new Logos();
  MIP.images = new Images();
  MIP.canvasView = new CanvasView('canvas');
  MIP.notiView = new NotiView();
  MIP.clientView = new ClientView();
  
  MIP.canvasView.initLogo();
  
  $('button').click(function(){
    MIP.tweets.getData();
  });
  
  /* // search for tweets every five seconds
  window.setInterval(function() {
    MIP.tweets.getData();
    if (MIP.logos.numEffects >= 10) {
      MIP.clientView.show();
    }
  }, 5000);*/

  
  // check every sixty seconds if no one has done anything, fake a tweet if so
  window.setInterval(function() {
    var t = new Date().getTime() / 1000;
    if (t - MIP.tweets.getTweetTime() >= 59 || !MIP.tweets.getTweetTime()) {
      MIP.tweets.fakeIt();
    }
  }, 60000);
  
  
  /**
   * Debug tools
   * 
   */
  //localStorage.clear(); // erases logos from storage
  
  
});

