<?php
session_start();
require_once("Gallery.php");



?>

<!Doctype HTML>
<head>
    <!-- libraries -->
    <script type="javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <!-- stylesheets -->
    <link rel="stylesheet" type="text/css" href="style.css">
    <!--javascript-->
    <script src="roverJS.js"></script>
</head>
<body>
    <div id="image-holder">
        <!--<textarea id="textarea" title="textarea"></textarea>-->
        <button onclick="pictures();" class="button">Hack NASA</button>
        <br/>
        <input id="search" title="search-bar">
    </div>
</body>