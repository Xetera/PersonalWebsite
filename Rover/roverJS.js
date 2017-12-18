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
            //console.log(response);
            $('#textarea').html(response);
            let parsed = JSON.parse(response);

            for (let i of parsed){
                console.log(i);
                addPicture(i);
            }
        })
}

function addPicture(passedURL){
    $(`<img src=${passedURL}>`).appendTo("body");
}