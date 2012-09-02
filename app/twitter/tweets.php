<?php

$last_response_id = file_get_contents('last_response.txt');
//$last_response_id = 1; // @TODO remove

$commands = ['pizzaz', 'timeless', 'jazz it up', 'futuristic', 'friendly', 'eco', 'hip', 'slick', 'artsy', 'in your face'];

$search = file_get_contents("http://search.twitter.com/search.json?q=%23bnc&rpp=20&result_type=recent&since_id=" . $last_response_id);
//$search = file_get_contents("test.json"); // @TODO remove
$tweets = json_decode($search);
$tweets = $tweets->results;

$isFirst = true;
$lastTweet = end($tweets);
reset($tweets);

$arr = array();
$i = 0;

$regex = '/#bnc (' . implode('|', $commands) . ')/i';

foreach($tweets as $tweet) {

  $username = $tweet->from_user;
  $avatar = $tweet->profile_image_url;
  $status = $tweet->text;
  
  if (preg_match($regex, $status, $matches)) {
    $arr[$i]['username'] = $username;
    $arr[$i]['avatar'] = $avatar;
    $arr[$i]['command'] = $matches[1];
    $i++;
  }
  
  if ($isFirst) {
    $myFile = "last_response.txt";
    $fh = fopen($myFile, 'w') or die("can't open file");
    $stringData = $tweet->id;
    fwrite($fh, $stringData);
    fclose($fh);
    $isFirst = false;
  }
    
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