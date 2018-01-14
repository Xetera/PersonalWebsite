/*
*  The general idea of the game is to create more of a survival based clicker game rather than a
*  mindless idler. Food is supposed to be a scarce resource that takes the majority of the population
*  to keep up, just like how it is in real life.
*
*  Also, if you're reading this congratz! You really know your inspect element.
*/

const tick = 50; // TODO: move consts to it's own file to load in the html header
const second = 1000;

const debug = true;
// ------ initializing instances ---------

let empire = new Empire();


let food = new Food(0);
let wood = new Wood(0);
let stone = new Stone(0);
let knowledge = new Knowledge(0);
// setting them in arrays for referencing later
let resources = [food, wood, stone, knowledge];

let hunter = new Hunter();
let farmer = new Farmer();
let lumberjack = new Lumberjack();



let generatorMult = 1;

let tent = new Tent();

let upgrades = new Upgrades();

// doesn't do anything if there's no load game found
// bool in the beginning is debug command for dumping load information in the console
loadGame(true, empire, food, wood, stone, hunter, farmer, lumberjack);


//----------------- functions------------------

function print(type="default", string){
    let storyBoard = $("#storyBoard");
    $("<div class=\""+ type +"\">"+ string + "<div><br/>").appendTo('#storyBoard');
    storyBoard.scrollTop(storyBoard.height());
}
function notification(text){
    // we want to make sure that notifications don't overlap so we check if other notifications'
    // dimensions are out of the way by callign this function on every member of the array (which is definitely only)
    // going to be 1 or 2 elements max
    // TODO: SO FAR THIS SHIT DOES NOT WORK
    function checkArray(value){
        return value > randPos && value < randPos + notificationWidth
    }
    let randID = Math.random(); // < unnecessary
    let windowWidth = $(document).width();
    let notificationWidth = 200;
    let randPos = Math.random() * (windowWidth);

    // if notification is out of bounds of the window length, keep making a new number until it's inbounds

    while ((randPos > windowWidth - (200 + notificationWidth) || randPos < 100)){
        randPos = Math.random() * (windowWidth);
    }
    let newNotification = $('<div>');
    newNotification.addClass('notification').html(text);
    newNotification.css({
        'width':notificationWidth+'px',
        'height':100+'px',
        'background-color': '#84537e',
        'position':'fixed',
        'border-width':  '0',
        'border': '5px solid black',
        'left':randPos+'px',
        'bottom':'-150px',
        'display':'none'
    }).appendTo('body').fadeIn(100);
    newNotification.animate({'bottom': '100'}).delay(1700).animate({'bottom': '-150'});
    setTimeout(function() {
        newNotification.remove();
    }, 3000);
}

function sendTimestamp(){

    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (minute.length === 1){
        minute = "0" + minute.toString()
    }

    notification("Game saved! [" + hour + ":" + minute + "]");
}

function toggleAutoAssign(){
    let text = $('#toggleAutoAssign');
    if (text.html() === 'Turn off Autoassign'){
        text.html('Turn on Autoassign');
        empire.autoAssign = false;
    }
    else if (text.html() === 'Turn on Autoassign'){
        text.html('Turn off Autoassign');
        empire.autoAssign = true;
    }
    else {
        // error catching pretty much
        console.error(text.html())
    }
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
            food.total += food.increment;
        }
        else if (material === "wood"){
            wood.total += wood.increment;
        }
        else if (material === "stone"){
            stone.total += wood.increment;
        }
    }
    // we might not need this part since automation already updates total and setInterval() takes care of the rest
    // keeping it here in case we might add mo~re ways to gain resources from other types
    else if (type === 'auto'){
        if (material === "food") {
            //
        }
    }

}
function numberize(){
    // convert number to engineering notation here
}



$(function(){
    upgrades.display(1);
    upgrades.display(2);
});

window.setInterval(() => {
    // the game runs on one big setInterval (except save) to avoid having to keep track
    // of multiple intervals and possibly lagging the game later on. Every value that
    // needs to be displayed in a 'per second' basis gets adjusted with tickValue()
    // to convert it to the proper amount/tick.

    // adjusting resources according to tick rate and multipliers
    // *@ this should really be a property of resources
    let seasonMultiplier = 1; // placeholder

    // we genereally don't want hunters and farmers to be present at the same time but this will have to do for now
    let popFoodConsumption = empire.population * empire.foodConsumption;
    // we're not going to use this number during summer
    let popWoodConsumption = empire.population * empire.woodConsumption;

    // it would make sense for these calculations to be a part of resources
    let hunterTick = seasonMultiplier * (hunter.total * hunter.mult);
    let farmerTick = seasonMultiplier * (farmer.total * farmer.mult);


    food.income['Hunter'] = hunterTick;
    food.income['Farmer'] = farmerTick;
    food.expense['Population'] = popFoodConsumption;

    let foodTick =  ((farmerTick + hunterTick) - popFoodConsumption);
    let woodTick = (lumberjack.total * lumberjack.mult);

    // tick is 100ms, values we're working in are per 1000 secs so we need to adjust it based on the tickvalue we have
    food.total += tickValue(foodTick);
    wood.total +=  tickValue(woodTick);
    // stone here <----

    // TODO: keep in mind we don't want to lose our shit with resources, 3 or 4 sounds about right. The main focus
    // TODO: of the game will be to survive, not go up to crazy fucking numbers, we don't want to create a mindless idler

    if (food.total < 0){
        // we don't want to display negative numbers because it doesn't make sense
        // instead we want to edit the food display to make sure that the player knows that they're going on negative
        // numbers and keep track of the # of ticks they've been in the red for so we can start killing off population
        food.total = 0;
    }

    updateUIValues();

    $('#foodPerSecond').html(foodTick.toFixed(1));
    $('#woodPerSecond').html((lumberjack.total * lumberjack.mult).toFixed(1));
    //$('#stoneperSecond').html(miner.total * lumberjack.mult).toFixed(1);


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

            // we need to check for a condition here that sees which type of worker is 'main'
            // hunter or farmer or further? so we can assign it to the main accordingly
            if (empire.autoAssign){
                // we have to trigger unemployed here because addHunter checks for unemployed citizens
                empire.unemployed++;
                hunter.add(1); // this branch always just spawns 1 citizen at a time so (1) is right
            }
            else{
                empire.unemployed++;
            }
            empire.population++;
            empire.spawnInterval = parseFloat(empire.spawnInterval * empire.spawnMultiplier).toFixed(1);
            empire.spawnProgress = 0;
            notification(`Citizen Born! [${empire.population}/${empire.maxPopulation}]`);
        }
    }


    // ------- generator visual changes --------
    if (wood.total > 9) {
        $('#lumberjackGroup').show(1000);
    }
    if (empire.unemployed <= 0){
        $('#addHunter').removeClass('btn-blue');
    }
    else if (empire.unemployed > 0) {
        $('#addHunter').addClass('btn-blue');
    }
    if (hunter.total <= 0){
        $('#removeHunter').removeClass('btn-blue');
    }
    else if (hunter.total > 0){
        $('#removeHunter').addClass('btn-blue');
    }

    if (empire.unemployed <= 0){
        $('#addLumberjack').removeClass('btn-blue');
    }
    else if (empire.unemployed > 0) {
        $('#addLumberjack').addClass('btn-blue');
    }
    if (lumberjack.total <= 0){
        $('#removeLumberjack').removeClass('btn-blue');
    }
    else if (lumberjack.total > 0){
        $('#removeLumberjack').addClass('btn-blue');
    }




    // ------- resource showing --------
    // gain access to more resources after x amount of farmers to avoid overwhelming the player
    if (farmer.total > 2 || hunter.total > 2) {
        $('#woodIncrementer').show(1000);
        $('#woodRow').show(1000);
    }
    if (lumberjack.total > 2){
        $('#stoneRow').show(1000);
        $('#stoneIncrementer').show(1000);
    }

    // ------- housing changes ----------
    let tentFoodCost = $('#tentFoodCost');
    let tentWoodCost = $('#tentWoodCost');
    tentFoodCost.html(tent.foodCost.toFixed(1));
    tentWoodCost.html(tent.woodCost.toFixed(1));

    if (food.total < tentFoodCost.html()){
        tentFoodCost.css('color','red');
    }
    else {
        tentFoodCost.css('color','green');
    }

    if (wood.total < tentWoodCost.html()){
        tentWoodCost.css('color', 'red')
    }
    else {
        tentWoodCost.css('color', 'green')
    }


}, tick); // 10 fps boysss



// ------ AUTOMATIC GAME SAVING --------
setInterval(function (){

    saveGame();
    sendTimestamp();
    // anything that redirects the user from the page should call the saveGame() function to prevent losing data.

}, 120000); // every 2 minutes