
const tick = 100;

let game = {
    start: true
};
let food = {
    total:0,
    increment:1
};

let wood = {
    total:0,
    increment:1
};
let stone = {
    total:0,
    increment:1
};

let gold = {
    total:0,
    increment:0
};

let population = {
    total:0
};


let farmer = {
    total: 0,
    mult: 0.1,
    cost: 10
};

let lumberjack = {
    total:0,
    mult: 0.1,
    cost: 10
};

function addFarmer(amount){
    let priceOfFarmer = document.getElementById('farmerCost').innerHTML;
    console.log("Price of farmer: "+ priceOfFarmer);
    if (priceOfFarmer > food.total){
        console.log("Could not buy farmer, current food is " + food.total);
        return
    }
    food.total -= priceOfFarmer;
    farmer.cost = farmer.cost * 1.035;
    farmer.total += amount;
    return false;
}


$(document).ready(function() {

    $('#generators').hide();
    $('.group').hide();


    // we will need to edit this so that it only saves the ones with the save data in it
    // TODO: integrate game saving


});




function addLumberjack(amount){
    let priceOfLumberjack = document.getElementById('lumberjackCost').innerHTML;
    if (priceOfLumberjack > food.total){
        return;
    }
    food.total -= priceOfLumberjack;
    lumberjack.cost = lumberjack.cost * 1.035;
    lumberjack.total += amount
}

function tickValue(a){
    // the game feels very laggy when it updates once a second so we want to make sure every value that we're
    // adding to the counter shows 1/10ths of it's actual value but gets updated 10 times faster
    let division = 1000/tick;
    return a/division;
}



window.setInterval(() => {
    // adjusting values according to tick rate and multipliers
    food.total += tickValue(farmer.total * farmer.mult);
    wood.total +=  tickValue(lumberjack.total * lumberjack.mult);

    $('#foodCount').html(food.total.toFixed(1));
    $('#woodCount').html(wood.total.toFixed(1));

    $('#foodPerSecond').html((farmer.total * farmer.mult).toFixed(1));
    $('#woodPerSecond').html((lumberjack.total * lumberjack.mult).toFixed(1));

    $('#farmerCount').html(farmer.total);
    $('#lumberjackCount').html(lumberjack.total);

    let farmerCost = $('#farmerCost');
    let lumberjackCost = $('#lumberjackCost');

    if (food.total < farmer.cost) {
        farmerCost.css("color", "red");

    }
    else {
        $('#farmerIcon').addClass('glow');
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


    // checking for game progress and showing items
    if (food.total > 9) {
        $('#generators').show();
        $('#farmerGroup').show(1000);
    }
    if (wood.total > 9) {
        $('#lumberjackGroup').show(1000);

    }
},100);

function increment(material, type){ // this is how we know whether the source is automation or just click
    if (type === "click"){
        if (material === "food") {
            // increases
            food.total = food.total + food.increment;
        }
        else if (material === "wood"){
            wood.total = wood.total + wood.increment;
        }
    }
    else if (type === 'auto'){
        if (material === "food") {
            //
        }
    }

}
