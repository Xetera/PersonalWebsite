function saveGame(){

    let empireObj = {};
    for (let i=0; i < Object.keys(empire).length; i++){
        let key = Object.keys(empire)[i];
        let value = Object.values(empire)[i];
        empireObj[key] = value;
    }
    localStorage.setItem('Empire', JSON.stringify(empireObj));


    let foodObj = {};
    for (let i=0; i < Object.keys(food).length; i++){
        let key = Object.keys(food)[i];
        let value = Object.values(food)[i];
        foodObj[key] = value;
    }
    localStorage.setItem('Food', JSON.stringify(foodObj));

    let woodObj = {};
    for (let i=0; i < Object.keys(wood).length; i++){
        localStorage.setItem('Wood', {});
        let key = Object.keys(wood)[i];
        let value = Object.values(wood)[i];
        woodObj[key] = value;
    }
    localStorage.setItem('Wood', JSON.stringify(woodObj));

    let stoneObj = {};
    for (let i=0; i < Object.keys(stone).length; i++){
        let key = Object.keys(stone)[i];
        let value = Object.values(stone)[i];
        stoneObj[key] = value;
    }
    localStorage.setItem('Stone', JSON.stringify(stoneObj));

    let farmerObj = {};
    for (let i=0; i < Object.keys(farmer).length; i++){
        let key = Object.keys(farmer)[i];
        let value = Object.values(farmer)[i];
        farmerObj[key] = value;
    }
    localStorage.setItem('Farmer', JSON.stringify(farmerObj));

    let hunterObj = {};
    for (let i=0; i < Object.keys(hunter).length; i++){
        let key = Object.keys(hunter)[i];
        let value = Object.values(hunter)[i];
        hunterObj[key] = value;
    }
    localStorage.setItem('Hunter', JSON.stringify(hunterObj));

    let lumberjackObj = {};
    for (let i=0; i < Object.keys(lumberjack).length; i++){
        let key = Object.keys(lumberjack)[i];
        let value = Object.values(lumberjack)[i];
        lumberjackObj[key] = value;
    }
    localStorage.setItem('Lumberjack', JSON.stringify(lumberjackObj));

    let tentObj = {};
    for (let i=0; i < Object.keys(tent).length; i++){
        let key = Object.keys(tent)[i];
        let value = Object.values(tent)[i];
        tentObj[key] = value;
    }
    localStorage.setItem('Tent', JSON.stringify(tentObj));

}
function loadGame(debug, empire, food, wood, stone, hunter, farmer, lumberjack){
    // don't touch this
    let game = {};
    for (let i = 0, len = localStorage.length; i < len; ++i ) {
        // holy shit I actually came up with this myself, I'm so proud
        game[Object.keys(localStorage)[i]] = JSON.parse(localStorage.getItem(Object.keys(localStorage)[i]));
    }
    if (debug){
    $.each(game, function(key, value) {
            console.log(key, value);
        });
    }
    $.each(game, function(key1, value1){
        let className = value1;
        let name = key1;
        for (const [ key, value ] of Object.entries(className)) {
            if (name === "Empire"){
                empire[key] = value;
            }
            else if (name === "Food"){
                food[key] = value;
            }
            else if (name === "Wood"){
                wood[key] = value;
            }
            else if (name === "Stone"){
                stone[key] = value;
            }
            else if (name === "Farmer"){
                farmer[key] = value;
            }
            else if (name === "Lumberjack"){
                lumberjack[key] = value;
            }
            else if(name === 'Hunter'){
                hunter[key] = value;
            }
            else if (name === 'tent'){
                tent[key] = value;
            }
        }
    });

}