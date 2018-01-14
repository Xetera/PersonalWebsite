function tickValue(a){
    // the game feels very laggy when it updates once a second so we want to make sure every value that we're
    // adding to the counter shows 1/10th of it's actual value but gets updated 10 times faster
    let division = second/tick;
    return a/division;
}


function upgradesIsOpen(){
    return $('#upgrades-container').height() > 80;
}

log = {};
log.error = function(str){
    if (!debug) return;
    console.log('%c[ERROR]: ' + str, "color:red");
};

log.warning = function(str){
    if (!debug) return;
    console.log('%c[WARNING]: ' + str, 'color:orange');
};