<?php
header("Expires: Mon, 26 Jul 1990 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <!--[if lt IE 9]>
    <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/jquery.gritter.css" />
  </head>
  <body>
    
    <section>
      <canvas width="700px" height="700px"></canvas>
    </section>
    
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js"></script>
    <script type="text/javascript" src="assets/js/pixastic.min.js"></script>
    <script type="text/javascript" src="assets/js/canvasMask.min.js"></script>
    <script type="text/javascript" src="assets/js/jquery.gritter.min.js"></script>
    <script type="text/javascript" src="https://raw.github.com/silentmatt/javascript-biginteger/master/biginteger.js"></script>
    <script type="text/javascript" src="app/main.js"></script>
    <script type="text/javascript" src="app/models.js"></script>
    <script type="text/javascript" src="app/views.js"></script>
  </body>
</html>