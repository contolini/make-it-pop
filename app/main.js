/**
 * Make it pop!
 * 
 */
var MIP = MIP || {};

$(function() {

  /**
   * Debug tools
   * 
   */
  MIP.debugView = new DebugView();
  //localStorage.clear(); // erases logos from storage

  MIP.tweets = new Tweets('bnc');
  MIP.logos = new Logos();
  MIP.images = new Images();
  MIP.canvasView = new CanvasView('canvas');
  MIP.notiView = new NotiView();
  MIP.finaleView = new FinaleView();
  
  /**
   * Query local storage and initialize whatever logo is next in line
   * 
   */
  MIP.canvasView.initLogo();
  
  /**
   * Search for tweets every five seconds, record num of effects, fake tweet if idle for three min
   * 
   */
  var checkTweets = window.setInterval(function() {
    MIP.tweets.getData();
    if (MIP.logos.numEffects >= 10) {
      MIP.finaleView.show();
      clearInterval(checkTweets);
    }
    if ((new Date().getTime() - MIP.tweets.getTweetTime() >= 180000) && (MIP.logos.numEffects > 0)) {
      MIP.tweets.fakeIt();
    }
  }, 5000);
  
});

