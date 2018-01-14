let help = {
    help: null,
    story: null,
    effect: null,
    width: 300,
    height: 150,
    padding: 10,
    // we need the costs thing here so that we can check it in our game loop
    costs: {
        null: null
    },
    update: function(){
        // we're gonna be calling this every tick in the game loop so we can change
        // the color without having the user re-hover on the upgrade
        for (let i in upgrades) {
            if (!upgrades.hasOwnProperty(i)) continue;
            let resourceColor = this.help.find('#' + i + 'cost');
            if (resources[i].total < upgrades[i]) {
                if (!resourceColor.hasClass('red')) {
                    resourceColor.removeClass('green').addClass('red');
                }
            }
            else if (resources[i].total > upgrades[i]) {
                if (!resourceColor.hasClass('green')) {
                    resourceColor.removeClass('red').addClass('green');
                }
            }
        }
    },
    updateHelpCost(k, v){
        this[k] = v;
    },
    appendCosts: function(upgrade){
        let costContainer = this.help.find('.help-cost');
        let costs = this.costs;

        //looping through costs and appending them to the tooltip properly
        console.log(upgrade.costs);
        for (let key in upgrade.costs){
            let value = upgrade.costs[key];
            console.log(key , value);
            console.log(costs);
            this.updateHelpCost(key, value);
            let resource;
            if (key === 'food'){
                resource = food;
            }
            else if (key === 'wood'){
                resource = wood;
            }
            else if (key === 'stone'){
                resource = stone;
            }
            else if (key === 'knowledge'){
                resource = knowledge;
            }
            let color;
            if (resource.total < value){
                color = 'red'
            }
            else{
                color = 'green'
            }
            let image = $(`<img class="help-image" src="images/${key}.png">`);
            let cost = $(`<p id="${resource}cost" class="help-cost ${color}">${value}</p>`);

            image.appendTo(costContainer);
            cost.appendTo(costContainer);
        }
    },
    create: function(obj, parent){
        console.log(obj);
        if (obj.type === 'upgrade'){
            this.effect = obj.effect;
            this.story = obj.story;
        }

        this.help = $(
            `<div class="help">
                <div class="help-up">
                    <div class="help-header">
                        <img  src="${obj.icon}" class="help-image">
                        <div class="help-name help-text">${obj.name}</div>

                    </div>
                    <div class="help-cost">
                       
                    </div>
                <div class="help-effect">${this.effect}</div>
            </div>
            <p class="help-story">${this.story}</p>

                
            </div>`
        );
        this.appendCosts(obj);
        let parentHeight = parent.getBoundingClientRect().height;
        let x = parent.getBoundingClientRect().x;
        let y = parent.getBoundingClientRect().y;

        console.log(x);
        this.help.css({
            // moving it past the padding next to the upgrades bar
            'left': x - this.width - 2 * this.padding,
            // we wanna make sure we move it up the amount of the parent height so it's centered next to it
            'top': y - parentHeight,
            'width': this.width,
            'z-index': 1000
        });

        this.help.appendTo('body');
    },
    destroy: function() {
        $('.help').remove();
        this.help = null;
        this.costs = {};
    }
};