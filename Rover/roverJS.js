let whatis = 1000;
function toTheRover(){
    $.post('Gallery.php', {data: "hey"})
        .done(function(response) {
            console.log(response);
            $('#textarea').html(response);
        })
        .fail();
}

function pictures(){
    $.post('Gallery.php', {pageNumber:1})
        .done(function(response){
            console.log(response);
            $('#textarea').html(response);
            //addPicture()
        })
}

function addPicture(passedURL){
    $("<img src=`${passedURL}`>").appendTo("body");
}