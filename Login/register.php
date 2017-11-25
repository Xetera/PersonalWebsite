<?php
session_start();
require_once('C:\\xamppnew\\htdocs\\database.php');
#require_once('login.php');

$database = new Database();

?>

<html>
<head>
<link rel="stylesheet" href="login.css">
</head>
    <body>

        <form class="register-form" method="post" action="register.php">
        </form>
    </body>
</html>
