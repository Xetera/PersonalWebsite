<?php
session_start();
/*
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] == false) {
    // get the user to login if they're not logged in
    echo '<script>
    let prompt = alert("Hey! if you\'re getting this message it means everything is working. Once saving is implemented" +
     " this alert message will bring you back to the login screen.  ");
    if (prompt) {
        window.location = "http://68.4.235.189:8080/";
    }</script>';
}
*/

if (isset($_POST['logout'])) {
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true){
        unset($_SESSION['loggedin']);
        header("Location:..\\Login\\login.php");
    }
    else {
        echo "<script>alert('You\'re not logged in.')</script>";
    }
}

require('../database.php');

$database = new Database();
// eventually we're going to be creating something here that let's us save the game and continue from where we left off


?>
<!DOCTYPE html>
<HTML>
<HEAD>
    <!-- META DATA --->
    <meta charset="UTF-8">
    <link rel="icon" href="images/colloseum.png">
    <title>Bootstrap Test</title>

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="bootstrap.css">
    <link rel="stylesheet" type="text/css" href="buttonStyles.css">

    <!-- DEPENDENCIES-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>

    <!-- GAME FILES -->
    <script language="javascript" src="Scripts/Resources.js"></script>
    <script language="javascript" src="Scripts/Buildings.js"></script>
    <script language="javascript" src="Scripts/Generators.js"></script>
    <script language="javascript" src="Scripts/Empire.js"></script>
    <script language="javascript" src="Scripts/Upgrades.js"></script>
    <script language="javascript" src="Scripts/Save.js"></script>
    <script language="javascript" src="Scripts/Runtime.js"></script>

</HEAD>
<!------------------------ BODY --------------------------->
<body>
<div id="main">
    <div id="left-container" class="cont large-container">
        <div id="resource-display-header" class="display">
            <div class="resource-display-row">
                <span class="display-text-header">Resource</span>
                <span class="display-text-header">Amount</span>
                <span class="display-text-header">Icon</span>
                <span class="display-text-header">/Second</span>
                <span class="display-text-header">Worker</span>
                <span class="display-text-header">Amount</span>

            </div>
        </div>
        <div id="resource-display" class="display">
            <div id="foodRow" class="resource-display-row">
                <div class="display-col display-text">Food</div>
                <div id="foodCount" class="display-col display-text"> </div>

                <img src="images/wheat.png" class="display-col display-image">

                <div class="display-col display-text"><span id="foodPerSecond"></span>/s</div>
                <img id="farmerIcon" class="display-image" src="images/farmer.png">
                <div id="farmerCount" class="display-text"></div>
            </div>
           <div id="woodRow" class="resource-display-row">
               <div class="display-col display-text">Wood</div>
               <div id="woodCount" class="display-col display-text"> </div>

               <img src="images/log.png" class="display-col display-image">

               <div class="display-col display-text"><span id="woodPerSecond"></span>/s</div>
               <img src="images/lumberjack.png" id="lumberjackIcon" class="display-image">
               <div id="lumberjackCount" class="display-text"></div>
           </div>
            <div id="stoneRow" class="resource-display-row">
                <div class="display-col display-text">Stone</div>
                <div id="stoneCount" class="display-col display-text"></div>
                <img src="images/stones.png" class="display-col display-image">
                <div class="display-col display-text"><span id="stonePerSecond"></span>/s</div>
            </div>
            <div id="knowledgeRow" class="resource-display-row">
                <div id="knowledgeCount" class="display-col display-text">Knowledge</div>
                <div id="knowledgeCount" class="display-col display-test"></div>
                <img src="images/book.png" class="display-col display-image">
                <div class="display-col display-text"><span id="knowledgePerSecond"></span>/s</div>
            </div>
        </div>



        <div id="population-display" class="large-container display">
            <img src="images/population.png" class="display-image-large tltp">
            <progress id="progress-bar" class="spawn" value="0" max="100"></progress><br/>
        </div>
    </div>
    <div id="middle-container" class="">
        <div id="middle-flex">
            <div id="title" class="cont large-container"> HELLO </div>
            <div id="middle-grid" class="cont large-contaier">
                <div id="description" class="display">asd</div>
            </div>
        </div>


    </div>

    <div id="right-container" class="cont large-container">
        <div id="upgrades">
            <div class="upgrade"></div>
        </div>
        <form method="post">
            <button id="logout" class="btn btn-blue genBtn" name="logout"> Logout </button>
            <button onmousedown="localStorage.clear();" >Reset Game</button>
        </form>
    </div>
</div>

</body>
</html>


