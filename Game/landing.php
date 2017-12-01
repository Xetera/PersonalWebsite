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
    <!-- META DATA --->
    <meta charset="UTF-8">
    <link rel="icon" href="images/colloseum.png">
    <title>An Empire Through Time</title>

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="gameStyle.css">

    <!-- DEPENDENCIES-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <script src="jquery.qtip.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>

    <!-- GAME FILES -->
    <script language="javascript" src="Scripts/Resources.js"></script>
    <script language="javascript" src="Scripts/Buildings.js"></script>
    <script language="javascript" src="Scripts/Generators.js"></script>
    <script language="javascript" src="Scripts/Empire.js"></script>
    <script language="javascript" src="Scripts/Upgrades.js"></script>
    <script language="javascript" src="Scripts/Save.js"></script>
    <script language="javascript" src="Runtime.js"></script>
</HEAD>
<body>
    <div id="allResources">
    <div id="divResourceCounter">
    <table id="resourceCounter" class="table" cellspacing="1" cellpadding="7">
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
        <table id="resources" class="table" cellspacing="1" cellpadding="7">
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
        <table id="generators" class="table" cellspacing="1" cellpadding="10">
            <tr id="hunterGroup">
                <td>
                    <img id="hunterIcon" class="icon" src="images/archery.png">
                </td>
                <td>Hunter</td>
                <td>
                    <a class="btn btn-blue genBtn" href="#" id="removeHunter" onmousedown="hunter.remove(1)"> < </a>
                </td>
                <td id="hunterCount"></td>
                <td>
                    <a class="btn btn-blue genBtn" href="#" id="addHunter" onmousedown="hunter.add(1)"> > </a>
                </td>
            </tr>
            <tr id="farmerGroup" class="group">
                <td>
                    <img id="farmerIcon" class="icon" src="images/farmer.png" >
                </td>
                <td>
                    <a class="btn btn-blue genBtn" href="#" id="addFarmer" onmousedown="farmer.add(1)">Get Farmer</a>
                </td>
                <td>Cost</td>
                <td id="farmerCost">10</td>
                <td>Farmers:</td>
                <td id="farmerCount">0 </td>
            </tr>
            <tr id="lumberjackGroup">
                <td>
                    <img id="lumberjackIcon" class="icon" src="images/lumberjack.png">
                </td>
                <td>Lumberjack</td>
                <td>
                    <a class="btn btn-blue genBtn" href="#" id="removeLumberjack" onmousedown="lumberjack.remove(1)"> < </a>
                </td>
                <td id="lumberjackCount"></td>
                <td>
                    <a class="btn btn-blue genBtn" href="#" id="addLumberjack" onmousedown="lumberjack.add(1)"> > </a>
                </td>
            </tr>
        </table>

    </div>
    <div id="populationCounter">
        <img src="images/population.png" class="icon" style="margin-left: 50%; margin-right: 50%;">
        <br/>
        <progress id="progress-bar" class="spawn" value="0" max="100"></progress><br/>
        <span>Population:
            <span id="population"></span>
                <span>/
                    <span id="maxPopulation"></span><br/>
                    <button id="toggleAutoAssign" onmousedown="toggleAutoAssign();">Turn off Autoassign</button>
                </span>
            </span>
    </div>
    <br/>
    <!-- Housing -->
    <div id="housingArea" >
        <table id="housingTable" class="table" cellspacing="5" cellpadding="5">
            <tr id="tentRow">
                <td>
                    <img class="icon" id="tentIcon" src="images/tent.png">
                </td>
                <td>
                    <a class="btn btn-blue genBtn" href="#" id="buyTent" onmousedown="buyTent(1);">Build a Tent</a>
                </td>
                <td>
                    <div class="buildingCostHolder">
                        <img class="smallicon" src="images/wheat.png"><div class="buildingCost" id="tentFoodCost">10</div>
                    </div>
                    <br/>
                    <div class="buildingCostHolder">
                        <img class="smallicon" src="images/log.png"><div class="buildingCost" id="tentWoodCost">10</div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="housingDisplay">
        <table id="housingDisplayTable" class="table" cellspacing="5" cellpadding="5">
            <tr id="tentRow">
                <td>
                    <img class="icon" id="tentIcon" src="images/tent.png">
                </td>
               <td id="tentCount"></td>
            </tr>
        </table>
    </div>

    <div id="storyBoard" class="scrollbar">

        <div class="force-overflow"></div>

    </div>
    <div id="rightBar">


        </div>
        <div id="upgradesTableParent" class="glow">
            <img src="images/left-arrow.png" id="arrow" class="smallicon">
            <table id="upgradeTable" cellpadding="12" cellspacing="0" style="display: none">
            </table>
            <form method="post">
                <button id="logout" class="btn btn-blue genBtn" style="display: none;" name="logout"> Logout </button>
                <button onmousedown="localStorage.clear();">Reset Game</button>
            </form>
        </div>
    <a class="btn btn-blue genBtn" href="#" style="display: none;" onmousedown="notification();">Notification!</a>
    <div id="footer">
        <span id="TODO">
            TODO: <br/>
            *Change worker-buying to interval based worker spawning<br/>
            <strike>*Implement saving</strike><br/>
            *Create a summer-winter cycle with events<br/>
            <strike>*Make a housing system that controls population</strike><br/>
            *Something to make getting food harder like seasons <br/>
            <strike>*Put a hoverable upgrade tab on the right side</strike><br/>
            *Convert numbering system to ENG notation <br/>
            <strike>*Logout button to get back to login</strike><br/>
            *Header for game name and other things<br/>
            *Possibly migrate resources to header?<br/>
            *Happiness system<br/>
            <strike>*Switch to OOP</strike><br/>
            *Move everything to Bootstrap
        </span>

        <p class="left">[Created by Xetera]</p>
        <p class="left">Tell me your thoughts on Discord! Xetera#9596 </p>
    </div>
</body>
</HTML>