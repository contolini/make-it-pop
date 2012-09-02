<?php

$last_response_id = $_GET['tweet_id'];
$hashtag = $_GET['hashtag'];

//$last_response_id = 1; // @TODO remove

$commands = array('pizzaz', 'pizzazz', 'timeless', 'jazz it up', 'futuristic', 'friendly', 'eco', 'hip', 'slick', 'artsy', 'in your face', 'debug');

$search = file_get_contents('http://search.twitter.com/search.json?q=%23' . $hashtag . '&rpp=20&result_type=recent&since_id=' . $last_response_id);
//$search = file_get_contents("test.json"); // @TODO remove
$tweets = json_decode($search);
$tweets = $tweets->results;

$isFirst = true;

$arr = array();
$i = 0;

$regex = '/#bnc (' . implode('|', $commands) . ')+/i';

foreach($tweets as $tweet) {

  $username = $tweet->from_user;
  $avatar = $tweet->profile_image_url;
  $status = $tweet->text;
  $timestamp = $tweet->created_at;
  
  if (preg_match($regex, $status, $matches)) {
    $arr[$i]['username'] = $username;
    $arr[$i]['avatar'] = $avatar;
    $arr[$i]['command'] = $matches[1];
    $arr[$i]['timestamp'] = strtotime($timestamp);
    
    if ($matches[1] === 'debug') {
      $regex2 = '/debug (.*)/i';
      preg_match($regex2, $status, $matches);
      $arr[$i]['command'] = 'debug ' . $matches[1];
    }
    
  }
  
  if ($isFirst) {
    $arr[$i]['tweet_id'] = strval($tweet->id);
    $isFirst = false;
  } else {
    $arr[$i]['tweet_id'] = 0;
  }
  
  $i++;
    
}

header("Content-type: application/json");
header("Expires: Mon, 26 Jul 1990 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

if (empty($arr)) {
  print json_encode($arr[0]['error'] = 'No tweet commands found.');
} else {
  print json_encode($arr);
}

?>