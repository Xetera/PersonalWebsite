function swapform() {
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow" );
}

$(function() {
    $('div[class="form"]').toggleClass('hiddenLeft');
});

function offscreen() {
    let obj = $('div[class="form"]');
    obj.preventDefault();
    obj.animate({
        left: '-50%'
    }, 500, function () {
        $(this).css('left', '150%');
        $(this).appendTo('#container');
    });
}