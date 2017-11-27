/*
*  The general idea of the game is to create more of a survival based clicker game rather than a
*  mindless idler. Food is supposed to be a scarce resource that takes the majority of the population
*  to keep up, just like how it is in real life.
*
*  Also, if you're reading this congratz! You really know your inspect element.

*  I copied civclicker's javascript code to begin with but it turns out this is a REALLYYY inefficient way to do things
*  and it will lead me to repeat a lot of code because of a lack of inheritance

*  TODO: switch to a more object oriented system where we can extend parents to be able to create entities more easily.
*  TODO: Extending a building class to define the distinct properties of a hut and villa would help us.
*  TODO: This also means that we will have to change the way that we do the calculations since we're gonna need to
*  TODO: create instances of generators and resources but it's not a big deal because OOP best.
*/

const tick = 100; // TODO: move consts to it's own file to load in the html header

let game = { // probably a useless obj but whatever
    start: true
};

let population = {
    total: 0,
    sick: 0
};

// ------ initializing instances ---------

let food = new Resource();
let wood = new Resource();
let stone = new Resource();

let farmer = new Farmer();
let lumberjack = new Lumberjack();


function print(string){
    $("<div>"+ string + "<div>").appendTo('#storyBoard');

}


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
    let division = 1000/tick;
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


$(document).ready(function() {
    // here are the things that are going to run once the window loaded
    //TODO: add save checking the first thing in here to not waste time (if it's not done server side)

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

    // we will need to edit this so that it only saves the ones with the save data in it
    // TODO: integrate game saving
});


window.setInterval(() => {
    // the game runs on one big setInterval to avoid having to keep track of multiple
    // intervals and possibly lagging the game later on. Every value that needs to be
    // displayed in a 'per second' basis gets adjusted with tickValue() to convert it
    // to the proper tick amount.

    // adjusting resources according to tick rate and multipliers
    food.total += tickValue(farmer.total * farmer.mult);
    wood.total +=  tickValue(lumberjack.total * lumberjack.mult);
    // stone here <----
    // gold here <-----

    // TODO: keep in mind we don't want to lose our shit with resources, 3 or 4 sounds about right. The main focus
    // TODO: of the game will be to survive, not go up to crazy fucking numbers, we don't want to create a mindless idler

    $('#foodCount').html(food.total.toFixed(1));
    $('#woodCount').html(wood.total.toFixed(1));
    $('#stoneCount').html(stone.total.toFixed(1));

    // ---- per second -------
    $('#foodPerSecond').html((farmer.total * farmer.mult).toFixed(1));
    $('#woodPerSecond').html((lumberjack.total * lumberjack.mult).toFixed(1));
    //$('#stoneperSecond').html(miner.total * lumberjack.mult).toFixed(10));

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



    // ------- generator showing --------
    if (food.total > 9 && farmer.shown===false) {
        $('#storyBoard').show();
        $('#generators').show();
        $('#farmerGroup').show(1000);
        print("Looks like this skill is gonna be really important, I better teach some other people how to do it.")
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
},100); // not refreshed at 60 fps but whatever who cares


