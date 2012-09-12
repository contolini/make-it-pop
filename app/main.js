/**
 * Make it pop!
 * 
 */
var MIP = MIP || {};

$(function() {

  /**
   * Optional debug view
   * 
   */
  MIP.debugView = new DebugView();

  /**
   * Initialize everything
   * 
   */
  MIP.tweets = new Tweets('bnc');
  MIP.logos = new Logos();
  MIP.images = new Images();
  MIP.canvasView = new CanvasView('canvas');
  MIP.notiView = new NotiView();
  MIP.finaleView = new FinaleView();
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

