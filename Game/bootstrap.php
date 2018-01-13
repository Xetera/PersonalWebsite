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
<HTML ng-app="nameApp">
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


    <!-- GAME FILES -->
    <script language="javascript" src="Scripts/Resources.js"></script>
    <script language="javascript" src="Scripts/UI.js"></script>
    <script language="javascript" src="Scripts/Tooltip.js"></script>
    <script language="javascript" src="Scripts/Utility.js"></script>
    <script language="javascript" src="Scripts/Buildings.js"></script>
    <script language="javascript" src="Scripts/Generators.js"></script>
    <script language="javascript" src="Scripts/Empire.js"></script>
    <script language="javascript" src="Scripts/Upgrades.js"></script>
    <script language="javascript" src="Scripts/Save.js"></script>
    <script language="javascript" src="Scripts/Runtime.js"></script>


</HEAD>
<!------------------------ BODY --------------------------->
<body>
<div id="main" >
    <!----------LEFT --------->
    <div id="left-container" class="cont large-container" >
        <div class="display-parent">
            <div class="display-text display-title">POPULATION</div>
            <div id="population-display" class="large-container display">
                <div class="population-display-row">
                    <img src="images/population.png" class="upgrade-image">
                    <progress id="progress-bar" class="spawn" value="0" max="100"></progress><br/>
                </div>
            </div>
        </div>
        <div id="resources" class="display-parent unselectable">
            <div class="display-text display-title">RESOURCES</div>
            <div id="resource-display-header" class="display">
                <div class="resource-display-row header">
                    <span>Resource</span>
                    <span>Amount</span>
                    <span>Icon</span>
                    <span>Income</span>
                    <span>Cap</span>
                    <span>Workers</span>
                </div>
            </div>
            <div id="resource-display" class="display" >
                <div id="foodRow" class="resource-display-row">
                    <div class="display-col display-text">Food</div>
                    <div id="foodCount" class="display-col display-text"> </div>

                    <img src="images/wheat.png" class="display-col display-image">
                    <div class="display-col display-text"><span id="foodPerSecond"></span>/s</div>

                    <div class="foodCap display-text"></div>
                    <div class="display-text foodWorker"></div>
                </div>
                <div id="woodRow" class="resource-display-row">
                    <div class="display-col display-text">Wood</div>
                    <div id="woodCount" class="display-col display-text"> </div>

                    <img src="images/log.png" class="display-col display-image">

                    <div class="display-col display-text"><span id="woodPerSecond"></span>/s</div>
                    <div class="display-text woodCap"></div>
                    <div class="display-text woodWorker"></div>
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
        <div>
            <div class="display-parent unselectable">
                <div class="display-text display-title">Workers</div>
                <div class="generator-display-row display header">
                    <span>Worker</span>
                    <span>Icon</span>
                    <span>Amount</span>
                </div>
                <div id="generators-display" class="display">
                    <div id="unemployedRow" class="generator-display-row">
                        <span class="display-text">Hunter</span>
                        <img src="images/archery.png" class="display-image">
                        <div class="foodWorker display-text"></div>
                    </div>
                    <div id="foodWorkerRow" class="generator-display-row">123</div>
                    <div id="woodWorkerRow" class="generator-display-row">123</div>
                    <div id="stoneWorkerRow" class="generator-display-row">123</div>
                </div>
            </div>
        </div>

    </div>



    <!----------- MIDDLE ---------->
    <div id="middle-container" class="">
        <div id="middle-parent">
            <div id="header">
                <div id="stats-left">

                </div>
                <div style="display:flex;">
                    <div id="title" class="cont large-container">
                        <div id="title-text">An Empire Through Time</div>
                        <img src="images/colloseum.png" id="title-image">

                    </div>

                </div>
                <div id="description" ></div>
            </div>
            <div id="tabcontainer">
                <button id='createtab' class="tablink btn-primary" onclick="openTab('create', this)">Create</button>
                <button id='TODOtab' class="tablink" onmousedown="openTab('TODO', this)">TODO</button>
            </div>
            <div id="create" class="tabcontent cont large-container">
                <div id="middle-grid" class="cont large-container">
                    <div id="generators-container">
                        <div id="generatorMultiplier">
                            <button class="btn btn-blue btnGen btn-primary" onclick="generatorMult = 1">1x</button>
                            <button class="btn btn-blue btnGen" onclick="generatorMult = 10">10x</button>
                            <button class="btn btn-blue btnGen" onclick="generatorMult = 100">100x</button>
                            <button class="btn btn-blue btnGen" onclick="generatorMult = 1000">1000x</button>
                        </div>
                        <div class="display-parent">
                            <div class="generators-grid"">
                            <div id="hunterGroup" class="cont large-container generator-row">
                                <img src="images/archery.png" class="display-image">
                                <span>Hunter</span>
                                <a class="btn btn-blue genBtn" href="#" id="removeHunter" onmousedown="hunter.remove(generatorMult)"> < </a>
                                <div class="foodWorker"></div>
                                <a class="btn btn-blue genBtn" href="#" id="addHunter" onmousedown="hunter.add(generatorMult)"> > </a>
                            </div>
                            <div id="lumberjackGroup" class="cont large-container generator-row">
                                <img src="images/lumberjack.png" class="display-image">
                                <span>Lumberjack</span>
                                <a class="btn btn-blue genBtn" href="#" id="addLumberjack" onmousedown="lumberjack.remove(generatorMult)"> < </a>
                                <div class="woodWorker"></div>
                                <a class="btn btn-blue genBtn" href="#" id="removeLumberjack" onmousedown="lumberjack.add(generatorMult)"> > </a>
                            </div>
                        </div>
                    </div>
                </div>
                    <div id="buildings-container">
                        <div class="display-parent">
                            <div class="buildings-grid cont large-container">
                                <img class="display-image" id="tentIcon" src="images/tent.png">
                                <a class="btn btn-blue genBtn" href="#" id="buyTent" onmousedown="buyTent(1);">Build a Tent</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div id="TODO" class="tabcontent cont large-container" style="display:none">
                <div class="cont large-container">
                    <ul>
                        <li>Prevent the browser from caching JS files in while in debug mode</li>
                        <li>Move Population display to the header</li>
                        <li>Display time left until next spawn in population</li>
                        <li>Create a generator (worker) display section in #left-container</li>
                        <li>Make a season system that interacts with resources and generators</li>
                        <li>Add random chance events like immigration and traders</li>
                        <li>Expand worker spawn to take up a larger portion of the screen</li>
                        <li>Add starvation</li>
                        <li>Make upgrades "peekable" where the user has goals to reach</li>
                        <li>Redo entire upgrades system including its (nonworking) dynamic calls</li>
                        <li>Add unemployed to the workers display</li>
                        <li>Eventually give users ability to mass-assign professions like 10x or 100x</li>
                        <li>Implement knowledge system for game advancement</li>
                        <li>Run number assignments through a parser that converts large values to engineering notation</li>
                        <li>Add color coded (red - green) income levels to let users know their current situation</li>
                        <li>Move away from a clicking based system to something more fun</li>
                        <li>Achievements?</li>
                        <li>Overhaul price increase algorithm to something that's not linear</li>
                        <li></li>
                    </ul>
                </div>
            </div>

        </div>

    </div>



    <!--------------RIGHT------------->
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


</body>
</html>


