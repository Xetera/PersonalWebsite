<?php
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] == false) {
    // get the user to login if they're not logged in
    echo '<script>
    let prompt = alert("Hey! if you\'re getting this message it means everything is working. Once saving is implemented" +
     " this alert message will bring you back to the login screen.  ");
    if (prompt) {
        window.location = "http://68.4.235.189:8080/";
    }</script>';
}


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
    <!-- HEAD --->
    <link rel="icon" href="images/colloseum.png">
    <title>Sexy Title Here</title>

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="gameStyle.css">

    <!-- DEPENDENCIES-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>

    <!-- SCRIPTS (order is important) -->
    <script language="javascript" src="Scripts/Resources.js"></script>
    <script language="javascript" src="Scripts/Buildings.js"></script>
    <script language="javascript" src="Scripts/Generators.js"></script>
    <script language="javascript" src="Runtime.js"></script>
</HEAD>
<body>
    <div id="allResources">
    <div id="divResourceCounter">
    <table id="resourceCounter" class="table" cellspacing="1" cellpadding="10">
        <tr id="foodRow">
            <td>
                <img src="images/wheat.png" onclick="increment('food','click');" class="icon">
            </td>
            <td id="foodCount">0</td>
            <td id="foodPerSecond"  align="right">0</td>
            <td align="left">Food/s</td>
        </tr>
        <tr id="woodRow" style="display: none;">
            <td>
                <img src="images/log.png" class="icon">
            </td>
            <td id="woodCount">0</td>
            <td id="woodPerSecond" align="right">0</td>
            <td align="left">Wood/s</td>
        </tr>
        <tr id="stoneRow" style="display: none;">
            <td>
                <img src="images/stones.png" class="icon">
            </td>
            <td id="stoneCount">0</td>
            <td id="stonePerSecond" align="right">0</td>
            <td align="left">Stone/s</td>
        </tr>

    </table>
    </div>

    <!-- RESOURCES -->
    <br/>
    <div id="divResourceIncrement">
        <table id="resources" class="table" cellspacing="1" cellpadding="10">
            <tr id="foodIncrementer">
                <td>
                    <img id="wheatIcon" class="icon" src="images/sickle.png">
                </td>
                <td>
                    <a class="btn btn-blue collectBtn" href="#" id="addFood" onmousedown="increment('food', 'click');">Farm Wheat</a>
                </td>
            </tr>
            <tr id="woodIncrementer" style="display: none;">
                <td>
                    <img class="icon" src="images/axe.png">
                </td>
                <td>
                    <a class="btn btn-blue collectBtn" href="#" id="addWood" onmousedown="increment('wood', 'click');">Cut Wood</a>
                </td>
            </tr>
            <tr id="stoneIncrementer" style="display: none;">
                <td>
                    <img src="images/wagon.png" class="icon" id="stoneIcon">
                </td>
                <td>
                    <a class="btn btn-blue collectBtn" href="#" id="addStone" onmousedown="increment('stone', 'click');">Mine Stone</a>
                </td>
            </tr>
        </table>
    </div>
    </div>
    <div id="divGenerators" >
        <table id="generators" class="table" cellspacing="1" cellpadding="10" style="display: none">
            <tr id="farmerGroup" class="group">
                <td>
                    <img id="farmerIcon" class="icon" src="images/farmer.png" >
                </td>
                <td>
                    <a class="btn btn-blue genBtn" href="#" id="addFarmer" onmousedown="addFarmer(1)">Get Farmer</a>
                </td>
                <td>Cost</td>
                <td id="farmerCost">10</td>
                <td>Farmers:</td>
                <td id="farmerCount">0 </td>
            </tr>
            <tr id="lumberjackGroup" class="group">
                <td>
                    <img class="icon" id="lumberjackIcon" src="images/lumberjack.png">
                </td>
                <td>
                    <a class="btn btn-blue genBtn" href="#" id="addLumberjack" onmousedown="addLumberjack(1)">Get Lumberjack</a>
                </td>
                <td>Cost</td>
                <td id="lumberjackCost">0</td>
                <td>Lumberjacks:</td>
                <td id="lumberjackCount">0</td>
            </tr>
        </table>
    </div>


    <div id="rightBar">
        <div id="story">
            <div id="storyBoard" style="display: none">

            </div>
        </div>
        <div id="upgradesTableParent" class="glow">
            <img src="images/left-arrow.png" id="arrow" class="smallicon">
            <table id="upgradeTable" cellpadding="12" cellspacing="10" style="display: none">
                <tr class="rowStyle">
                    <td>
                        Hello Placeholder!
                    </td>
                </tr>
                <tr>
                    <td>
                        Upgrades will Be placed here
                    </td>

                </tr>

            </table>
            <form method="post">
                <button id="logout" style="display: none;" name="logout"> Logout </button>
            </form>
        </div>
    </div>
    <div id="footer">
        <span id="TODO">
            TODO: <br/>
            <strike>*Fix stone</strike><br/>
            *Implement saving <br/>
            *Create a summer-winter cycle with events<br/>
            *Make a housing system that controls population<br/>
            *Something to make getting food harder like seasons <br/>
            <strike>*Put a hoverable upgrade tab on the right side</strike><br/>
            <strike>*Make new resources appear dynamically</strike> <br/>
            <strike>*Logout button to get back to login</strike><br/>
            *Header for game name and other things<br/>
            *Possibly migrate resources to header?<br/>
            *Happiness system<br/>
            <strike>*Switch to OOP</strike><br/>
        </span>

        <p class="left">[Created by Xetera]</p>
        <p class="left">Tell me your thoughts on Discord! Xetera#9596 </p>
    </div>
</body>
</HTML>