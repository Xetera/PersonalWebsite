<?php

session_start();
require_once('database.php');
$database = new Database();


if (isset($_SESSION['loggedin'])) {
    #echo $_SESSION['hello'];
    $userid = &$_SESSION['userid'];

    $username = $database -> singlesearchDatabase($userid, 'id', 'username');
    $log = $username ." is logged in";
}

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] == false) {
    $log = "User is not logged in";

    header("Location:login.php");
}

if (isset($_POST['logout'])){
        unset($_SESSION['loggedin']);
        header("Location:Login\\login.php");
}
if (isset($_POST['game'])){
    header("Location:Game\landing.php");
}

?>

<!Doctype HTML>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="Login/login.css">
</head>

    <body>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:700,600' rel='stylesheet' type='text/css'>
        <div>
            <form method="POST" action="success.php" class="success-form">
                <h1> <?php echo $log ?> </h1>
                <button type="submit" name="logout" value="logout">Logout</button>
                <button type="submit" name="game" value="game"> Go to Game </button>
            </form>
        </div>
    </body>
</html>

