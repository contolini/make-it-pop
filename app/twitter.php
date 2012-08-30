<?php

header('Content-type: application/json');

//$last_response_id = file_get_contents('last_response.txt');
$last_response_id = 1;

$search = file_get_contents("http://search.twitter.com/search.json?q=%23bnc&rpp=10&result_type=recent&since_id=" . $last_response_id);
$tweets = json_decode($search);
$tweets = $tweets->results;

$isFirst = true;
$lastTweet = end($tweets);
reset($tweets);

$arr = array();

foreach($tweets as $tweet) {

    $status = str_replace('"', "'", $tweet->text);
    $author = $tweet->from_user;
    $arr[$author] = $status;
    
    if ($isFirst) {
      $myFile = "last_response.txt";
      $fh = fopen($myFile, 'w') or die("can't open file");
      $stringData = $tweet->id;
      fwrite($fh, $stringData);
      fclose($fh);
      $isFirst = false;
    }
    
}

print json_encode($arr);

?>