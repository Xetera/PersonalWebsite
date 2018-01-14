let keywords = [
  "more food", "more wood", "more stone"
];

let mouseLocation = {
    x: 0,
    y: 0
};
function getDimensions(){
    return [$(window).width(), $(window).height()];
}

function parseDescription(str){
    let lines = str.split('\\n');
    let display ="";
    /*
    for (let i in lines){
        for (let word in keywords){
            let keyword = new RegExp(`${keywords[word]}`, 'i');
            let match = lines[i].match(keyword);
            console.log(match);
            if (match){
                console.log(keyword);
                lines[i].replace(keywords[word], '<p style="color: green;">'+ keywords[word] +'</p>')
            }
        }
    }
    */
    for (let i in lines){
        display += '<p> ' +  lines[i] + '</p>';
    }

    $('#description').html(display)
}

function openTab(name, ref){
    // Hide all elements with class="tabcontent" by default */
    let tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Show the specific tab content

    let destination = $('#' + name);
    console.log(destination);
    destination.css('display', "block");

    let tabs = $('.tablink');
    // no need to create loops when selecting classes with jQuery
    tabs.removeClass('btn-primary');

    $('#' + name + 'tab').addClass('btn-primary');
}


function focusMultiplierButtons(btn){
    let buttons = $('#generatorMultiplier > button');
    buttons.removeClass('btn-primary');
    console.log($(btn));
    $(btn).addClass('btn-primary');
}





function updateAllImages(targetClass, image){
    targetClass = $('.' + targetClass);
    targetClass.attr('src', image);
}

function updateUIValues(){
    $('#foodCount').html(food.total.toFixed(1));
    $('#woodCount').html(wood.total.toFixed(1));
    $('#stoneCount').html(stone.total.toFixed(1));

    $('.foodWorker').each(function(){
        $(this).html(hunter.total);
    });

    $('.woodWorker').each(function(){
        $(this).html(lumberjack.total);
    });

    $('.foodCap').each(function(){
        $(this).html(food.cap);
    });

    $('.woodCap').each(function(){
        $(this).html(wood.cap);
    });

    $('.unemployedWorker').each(function(){
        $(this).html(empire.unemployed);
    });


    if (food.total >= food.cap){
        $('.foodCap').css('color', '#c71e2d');
    }
    else{
        $('.foocCap').css('color', 'black');
    }

    if (wood.total >= wood.cap){
        $('.woodCap').css('color', '#c71e2d');
    }
    else{
        $('.woodCap').css('color', 'black');
    }

    if (stone.total >= stone.cap){
        $('.stoneCap').css('color', '#c71e2d');
    }
    else{
        $('.stoneCap').css('color', 'black');
    }

    $('#lumberjackCount').html(lumberjack.total);

    $('#tentCount').html(tent.total);

    $('#population').html(empire.population);
    $('#maxPopulation').html(empire.maxPopulation);


    // ---- per second -------
}

$(function() {
    // here are the things that are going to run once the window loaded



    let upg = $('#upgrades');
    // this height is going to change for every available upgrade
    let height = getDimensions()[1] * 0.7;
    //let height = upgrades.amount * 40;
    let headerHeight = 50;

    function closeUpgrades(){
        // we'll end up updating this later on
        $('#description').html("");
    }
    // ------- hovers -------
    $('#upgrades-container').hover(function() { // mouse is hovered
        $(this).stop().animate({
            height: height + 'px'
        });
        upg.css('display', 'block');
        // controlling for padding
        upg.css('height', height -  headerHeight - 2 * 5);

    },function(){    // mouse is unhovered
        $(this).stop().animate({
            height: 60 + 'px'
        }, function(){ // closing animation is over
            upg.css('display', 'none');
            upg.css('height', headerHeight);
        });
    });


    // displaying tooltips
    $('.upgrade').hover(function(){
        let id = $(this).attr('aria-label');
        let index = allUpgrades.findIndex(e => e.id === parseInt(id));
        let upgrade = allUpgrades[index];
        help.create(upgrade, this);
        $(this).css('cursor', 'pointer');

        upgrades.removeUpgradeNotification($(this));

    }, function() { //unhovered
        closeUpgrades();
        help.destroy()
    });


    //upgrades.display('Blessing of The Hunt', allUpgrades['Blessing of The Hunt']);

    //print("save-message", "Hey! game saves are now a feature but expect your save data to get wiped as new features are added.\n");


    // we want a tooltip for anything that has a title in it, this only includes upgrades so far]

    $('.tabcontent').on('click', function(name, ref){
        if (!$(name).hasClass('tabcontent')) return;
        openTab(name, ref);
    });

    $('.genMultBtn').click(function(){
        focusMultiplierButtons($(this));
        $('#currentGeneratorMultiplier > span').html(`x${generatorMult}`);
    })

});
