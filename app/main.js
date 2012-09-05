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
  MIP.finaleView = new FinaleView();
  
  MIP.canvasView.initLogo();
  
  /**
   * Search for tweets every five seconds
   * 
   */
  window.setInterval(function() {
    MIP.tweets.getData();
    if (MIP.logos.numEffects >= 10) {
      MIP.finaleView.show();
    }
    if (new Date().getTime() - MIP.tweets.getTweetTime() >= 59000) {
      MIP.tweets.fakeIt();
    }
  }, 5000);
  
  
  /**
   * Debug tools
   * 
   */
  //localStorage.clear(); // erases logos from storage
  
  
});

