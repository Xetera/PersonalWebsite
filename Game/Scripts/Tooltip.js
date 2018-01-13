let tooltip = {
    tooltip:"",
    story: "",
    effect: "",
    update: function(){

    },
    create: function(story, effect){
        this.effect = effect;
        this.story = story;
        this.tooltip = $(`<div class="tooltip">`);

        this.tooltip.css({
            'left': 500,
            'top': 500,
            'z-index': 1000
        });

        this.tooltip.appendTo('body');
    }
};