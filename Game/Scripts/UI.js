function getDimensions(){
    return [$(window).width(), $(window).height()];
}


$(document).ready(function() {
    // here are the things that are going to run once the window loaded
    let upgrades = $('#upgrades');
    // this height is going to change for every available upgrade
    let height = getDimensions()[1] * 0.7;
    let headerHeight = 50;

    function closeUpgrades(){
        $('#description').html("");
    }
    // ------- hovers -------
    $('#upgrades-container').hover(function() { // mouse is hovered
        $(this).stop().animate({
            height: height + 'px'
        });
        upgrades.css('display', 'block');
        // controlling for padding
        upgrades.css('height', height -  headerHeight - 2 * 5);
    },
        function(){    // mouse is unhovered
        $(this).stop().animate({
            height: 50 + 'px'
        }, function(){ // closing animation is over
            upgrades.css('display', 'none');
            upgrades.css('height', headerHeight);
        });
    });

    $('.upgrade').hover(function(){
        $(this).css('cursor', 'pointer');
        console.log($(this).attr('aria-label'));
        // we might want to send this to a handler and check for \n with regex and make a new line dynamically
        // or something like that
        $('#description').html($(this).attr('aria-label'));
        // we don't want to directly set this to empty on hover out, we might want a cookie
        // clicker type scrolling text of random shit later
    }, closeUpgrades);


    //upgrades.display('Blessing of The Hunt', allUpgrades['Blessing of The Hunt']);

    //print("save-message", "Hey! game saves are now a feature but expect your save data to get wiped as new features are added.\n");


    $('.tltp').hover(()=>{
        $('selector').css('cursor', 'pointer');

    });

    // we want a tooltip for anything that has a title in it, this only includes upgrades so far]
});
