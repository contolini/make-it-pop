<?php

//$last_response_id = file_get_contents('last_response.txt');
$last_response_id = 1;

$search = file_get_contents("http://search.twitter.com/search.json?q=%23bnc&rpp=10&result_type=recent&since_id=" . $last_response_id);
$tweets = json_decode($search);
$tweets = $tweets->results;

$isFirst = true;
$lastTweet = end($tweets);
reset($tweets);

print "{";

foreach($tweets as $tweet) {

    $status = $tweet->text;
    $author = $tweet->from_user;
    echo '"' . $author . '":"' . $status . '"';
    
    if ($tweet->text !== $lastTweet->text) {
      print ',';
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

print "}";

?>