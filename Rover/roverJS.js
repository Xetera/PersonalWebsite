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
            // response is str
            let parsed = JSON.parse(response);

            for (let i of parsed){
                console.log(i);

                // this will be called upon reaching the end of scroll
                addPicture(i);
            }
        })
}

function addPicture(passedURL){
    // gonna be adding classes to specify its size when adding to the infinite scroll
    $(`<img src=${passedURL} class="image">`).appendTo("#image-holder");
}