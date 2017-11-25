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
require('../database.php');

$database = new Database();
// eventually we're going to be creating something here that let's us save the game and continue from where we left off


?>
<!DOCTYPE html>
<HTML>
<HEAD>
    <title>Xetera</title>
    <link rel="stylesheet" type="text/css" href="gameStyle.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script language="javascript" src="gameScript.js"></script>
</HEAD>
<BODY>
    <div id="divResourceCounter">
    <table id="resourceCounter" class="table" cellspacing="1" cellpadding="10">
        <tr>
            <td>
                <img src="images/wheat.png" onclick="increment('food','click');" class="icon">
            </td>
            <td id="foodCount">0</td>
            <td id="foodPerSecond"  align="right">0</td>
            <td align="left">Food/s</td>
        </tr>
        <tr>
            <td>
                <img src="images/log.png" class="icon">
            </td>
            <td id="woodCount">0</td>
            <td id="woodPerSecond" align="right">0</td>
            <td align="left">Wood/s</td>
        </tr>
        <tr>
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
        <tr>
            <td>
                <img id="wheatIcon" class="icon" src="images/sickle.png">
            </td>
            <td>
                <a class="btn btn-blue collectBtn" href="#" id="addFood" onmousedown="increment('food', 'click');">Farm Wheat</a>
            </td>
        </tr>
        <tr>
            <td>
                <img class="icon" src="images/axe.png">
            </td>
            <td>
                <a class="btn btn-blue collectBtn" href="#" id="addWood" onmousedown="increment('wood', 'click');">Cut Wood</a>
            </td>
        </tr>
        <tr>
            <td>
                <img src="images/wagon.png" class="icon" id="stoneIcon">
            </td>
            <td>
                <a class="btn btn-blue collectBtn" href="#" id="addStone" onmousedown="increment('stone', 'click');">Mine Stone</a>
            </td>
        </tr>
    </table>
    </div>

    <div id="divGenerators">
    <table id="generators" class="table" cellspacing="1" cellpadding="10">
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
    <span id="TODO">
        TODO: <br/>
        *Fix stone<br/>
        *Implement saving <br/>
        *Create a summer-winter cycle with events<br/>
        *Make a housing system that controls population<br/>
        *Something to make getting food harder like seasons <br/>
        *Put a hoverable upgrade tab on the right side<br/>
        *Make new resources appear dynamically <br/>
        *Logout button to get back to login<br/>
        *Header for game name and other things<br/>
        *Possibly migrate resources to header?<br/>
        </span>
    <!--<button onmousedown="<?php header("Location:..\Login\\login.php")?>"></button>-->
    <div id="footer">
        <p class="left">[Created by Xetera]</p>
        <p class="left">Tell me your thoughts on Discord! Xetera#9596</p>
    </div>
<!--
<div id="upgrades">
    <a href="#" > Click Me</a>
</div>
-->
</BODY>
</HTML>