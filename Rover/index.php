<?php
session_start();
require_once("Gallery.php");



?>

<!Doctype HTML>
<html lang="en-us" data-ng-app="myApp">
<head>
    <!-- libraries -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <script type="javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

    <!-- stylesheets -->
    <link rel="stylesheet" type="text/css" href="style.css">

    <!--javascript-->
    <script src="roverJS.js"></script>
    <script src="app.js"></script>
</head>
<body>
    <div id="image-holder" ng-controller="mainController">
        <!--<textarea id="textarea" title="textarea"></textarea>-->
        <button onclick="pictures();" class="button">Hack NASA</button>
        <br/>
        <input id="search" title="search-bar">
    </div>
</body>
</html>