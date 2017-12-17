<?php
session_start();
require_once("Gallery.php");



?>

<!Doctype HTML>
<Head>
    <script type="javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="roverJS.js"></script>
</Head>
<body>
    <textarea id="textarea" title="textarea"></textarea>
    <button onmousedown="pictures();">Click Me</button>
</body>