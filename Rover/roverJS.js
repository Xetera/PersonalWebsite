let whatis = 1000;
function toTheRover(){
    $.post('Rover.php', {data: "hey"})
        .done(function(response) {
            console.log(response);
            $('#textarea').html(response);
        })
        .fail();
}

function pictures(){
    $.post('Rover.php', {pageNumber:1})
        .done(function(response){
            console.log(response)
            //addPicture()
        })
}

function addPicture(passedURL){
    $("<img src=`${passedURL}`>").appendTo("body");
}