/*
*  The general idea of the game is to create more of a survival based clicker game rather than a
*  mindless idler. Food is supposed to be a scarce resource that takes the majority of the population
*  to keep up, just like how it is in real life.
*
*  Also, if you're reading this congratz! You really know your inspect element.
*/
const tick = 100; // TODO: move consts to it's own file to load in the html header
const second = 1000;


// ------ initializing instances ---------

let food = new Food(0);
let wood = new Wood(0);
let stone = new Stone(0);

let farmer = new Farmer();
let lumberjack = new Lumberjack();

let empire = new Empire();


function print(string){
    $("<div>"+ string + "<div>").appendTo('#storyBoard');

}
//----------------- functions------------------

function addFarmer(amount){
    let priceOfFarmer = amount * (document.getElementById('farmerCost').innerHTML);
    // price scales with the amount bought
    // return if you can't afford the cost
    if (priceOfFarmer > food.total){
        console.log("Could not buy farmer, current food is " + food.total);
        return
    }
    food.total -= priceOfFarmer;
    // we want cost to increase based on amount since we will later be
    farmer.cost = amount * (farmer.cost * 1.035);
    // able to buy multiple farmers at once
    farmer.total += amount;
    return false;
}


function addLumberjack(amount){
    // same thing as addFarmer()
    let priceOfLumberjack = amount * (document.getElementById('lumberjackCost').innerHTML);
    if (priceOfLumberjack > food.total){
        return;
    }
    food.total -= priceOfLumberjack;
    // again we want cost to go up based on how much we're buying
    lumberjack.cost = amount * (lumberjack.cost * 1.035);
    lumberjack.total += amount
}


function tickValue(a){
    // the game feels very laggy when it updates once a second so we want to make sure every value that we're
    // adding to the counter shows 1/10th of it's actual value but gets updated 10 times faster
    let division = second/tick;
    return a/division;
}


function increment(material, type){
    /*
        this is how we know whether the source is automation or just click, no need to specify how many we're adding
        per click because that's already a property within resource objects (increment). If we need to increase per
        click resource gain we will just need to increase increment for resources.
    */

    if (type === "click"){
        if (material === "food") {
            // pretty straight forward for all
            food.total = food.total + food.increment;
        }
        else if (material === "wood"){
            wood.total = wood.total + wood.increment;
        }
        else if (material === "stone"){
            stone.total = stone.total + wood.increment;
        }
    }
    // we might not need this part since automation already updates total and setInterval() takes care of the rest
    // keeping it here in case we might add more ways to gain resources from other types
    else if (type === 'auto'){
        if (material === "food") {
            //
        }
    }

}

loadGame(empire, food, wood, stone, farmer, lumberjack);

$(document).ready(function() {
    // here are the things that are going to run once the window loaded
    //TODO: add save checking the first thing in here to not waste time



    print("Hey! game saves are now a feature but expect your save data to get wiped as new features are added.");
    // ------- hovers -------
    $('#upgradesTableParent').hover(() => {
        $('#upgradeTable').show();
        $('#arrow').hide();
        $('#logout').show();
        $('#upgradesTableParent').removeClass('glow'); // glow will be applied if new
    }, () => {
        $('#arrow').show();
        $('#logout').hide();
        $('#upgradeTable').hide();
    });



});


window.setInterval(() => {
    // the game runs on one big setInterval (except save) to avoid having to keep track
    // of multiple intervals and possibly lagging the game later on. Every value that
    // needs to be displayed in a 'per second' basis gets adjusted with tickValue()
    // to convert it to the proper tick amount.

    // adjusting resources according to tick rate and multipliers
    food.total += tickValue(farmer.total * farmer.mult);
    wood.total +=  tickValue(lumberjack.total * lumberjack.mult);
    // stone here <----

    // TODO: keep in mind we don't want to lose our shit with resources, 3 or 4 sounds about right. The main focus
    // TODO: of the game will be to survive, not go up to crazy fucking numbers, we don't want to create a mindless idler

    $('#foodCount').html(food.total.toFixed(1));
    $('#woodCount').html(wood.total.toFixed(1));
    $('#stoneCount').html(stone.total.toFixed(1));

    // ---- per second -------
    $('#foodPerSecond').html((farmer.total * farmer.mult).toFixed(1));
    $('#woodPerSecond').html((lumberjack.total * lumberjack.mult).toFixed(1));
    //$('#stoneperSecond').html(miner.total * lumberjack.mult).toFixed(1);

    $('#farmerCount').html(farmer.total);
    $('#lumberjackCount').html(lumberjack.total);


    // in order to avoid repeating jquery
    let farmerCost = $('#farmerCost');
    let lumberjackCost = $('#lumberjackCost');


    // ==== generator and upgrade color adjustment ========
    // TODO: might want to put information about population caps on generators once we implement them.
    if (food.total < farmer.cost) {
        farmerCost.css("color", "red");
    }
    else {
        farmerCost.css('color', 'green');
    }
    if (food.total < lumberjack.cost){
        lumberjackCost.css("color", "red");
    }
    else {
        lumberjackCost.css("color", "green");
    }
    farmerCost.html(farmer.cost.toFixed(1));
    lumberjackCost.html(lumberjack.cost.toFixed(1));


    // checking for game progress and showing items dynamically


    //------------SPAWNING WORKERS --------------------
    if (empire.population < empire.maxPopulation){
        // we add 0.1 (tick/second) since that's the tick we're running on
        // this way every time we loop over this it it adds a little bit of progress
        empire.spawnProgress += tick/second;
        // stupid float math throws us off here, we want to see if the spawn progress is equal to spawn interval
        let spawnProgress = parseFloat(empire.spawnProgress).toFixed(1);
        let spawnInterval = parseFloat(empire.spawnInterval).toFixed(1);
        empire.percentSpawnProgress = parseFloat((spawnProgress/spawnInterval)*100).toFixed(1);

        $('#progress-bar').val(empire.percentSpawnProgress); // changes the progress bar value accordingly
        if (spawnProgress === spawnInterval){
            print("Citizen spawned");
            empire.population++;
            empire.spawnInterval = parseFloat(empire.spawnInterval * 1.1).toFixed(1);
            empire.spawnProgress = 0;
        }
    }


    // ------- generator showing --------
    if ((food.total > 9 && !$('#storyBoard').is(":visible"))) {
        $('#storyBoard').show();
        $('#generators').show();
        $('#farmerGroup').show(1000);
        farmer.shown = true;

    }
    if (wood.total > 9) {
        $('#lumberjackGroup').show(1000);

    }


    // ------- resource showing --------

    // gain access to more resources after x amount of farmers to avoid overwhelming the player
    if (farmer.total > 2) {
        $('#woodIncrementer').show(1000);
        $('#woodRow').show(1000);
    }
    if (lumberjack.total > 2){
        $('#stoneRow').show(1000);
        $('#stoneIncrementer').show(1000);
    }
},tick); // 10 fps boysss



// ------ AUTOMATIC GAME SAVING --------
setInterval(function (){
    // here instead of having a crazy mindfuck of values all we have to do is list properties in our
    // instances and save them in a loop
    saveGame();
    // copy this template and replace empire for every instance running, other things should be unnecessary


    // at the end
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    print("Game saved! [" + hour + ":" + minute + "]");
    // TODO: add a way to check whether the last div was a save message, if so just update the time to not spam

}, 120000); // every 5 minutes

