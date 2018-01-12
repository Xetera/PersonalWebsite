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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap Test</title>

    <!-- STYLE -->
    <link rel="stylesheet" type="text/css" href="bootstrap.css">
    <link rel="stylesheet" type="text/css" href="buttonStyles.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

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
    <script language="javascript" src="Scripts/UI.js"></script>
    <script language="javascript" src="Scripts/Runtime.js"></script>

</HEAD>
<!------------------------ BODY --------------------------->
<body>
<div id="main">
    <div id="left-container" class="cont large-container">
        <div class="display-parent">
            <div class="display-text display-title">POPULATION</div>
            <div id="population-display" class="large-container display">
                <img src="images/population.png" class="display-image-large tltp">
                <progress id="progress-bar" class="spawn" value="0" max="100"></progress><br/>
            </div>
        </div>
        <div id="resources" class="display-parent">
            <div class="display-text display-title">RESOURCES</div>
            <div id="resource-display-header" class="display">
                <div class="resource-display-row">
                    <span class="display-text-header">Resource</span>
                    <span class="display-text-header">Amount</span>
                    <span class="display-text-header">Icon</span>
                    <span class="display-text-header">Income</span>
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
                    <div id="hunterCount" class="display-text hunterCount"></div>
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
        </div>
    </div>




    <div id="middle-container" class="">
        <div id="middle-parent">

            <div id="header">
                <div id="stats-left"></div>
                <div style="display:flex;">

                    <div id="title" class="cont large-container">
                        <div id="title-text">An Empire Through Time</div>
                        <img src="images/colloseum.png" id="title-image">

                    </div>
                </div>
                <div id="description" ></div>
            </div>

            <div id="middle-grid" class="cont large-container">
                <div id="generators-container">
                    <div class="generators-grid">
                        <div id="hunterGroup" class="cont large-container generator-row">
                            <img src="images/archery.png" class="display-image">
                            <span>Hunter</span>
                            <a class="btn btn-blue genBtn" href="#" id="removeHunter" onmousedown="hunter.remove(1)"> < </a>
                            <div class="hunterCount"></div>
                            <a class="btn btn-blue genBtn" href="#" id="addHunter" onmousedown="hunter.add(1)"> > </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>




    <div id="right-container" class="">
        <div id="right-body" class="cont large-container">
            <div id="upgrades-container" class=" cont large-container">
                <div id="upgrade-handle">UPGRADES</div>
                <div id="upgrades">
                    <div class="upgrade" aria-label="Your tribe is blessed with the gift of bountiful hunts by gods that do not yet exist.\nEvery hunter generates 0.02 more Food.">
                        <img src="images/archery.png" class="upgrade-image">
                        <div class="upgrade-text unselectable">Blessing of the Hunt</div>
                        <img src="images/book.png" class="upgrade-image">
                        <div class="upgrade-text unselectable">50<span class="upgrade-text unselectable"> Knowledge</span></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cont large-container">
            <div id="options" class="cont large-container">
                <form method="post">
                    <button id="logout" class="btn btn-blue genBtn" name="logout"> Logout </button>
                    <button class="btn btn-blue genBtn" onmousedown="localStorage.clear();" >Reset Game</button>
                </form>
            </div>
        </div>

    </div>
</div>

</body>
</html>


