const Seasons = Object.freeze({
    SUMMER: Symbol('summer'),
    WINTER: Symbol('winter')
});


class Empire {

    constructor(){
        this.population = 0;
        this.maxPopulation = 5;
        this.unemployed = this.population;
        this.autoAssign = true;

        this.sick = 0;
        this.spawnInterval = 1; // we can adjust this number to increase (or decrease) the rate at which people are born
        this.spawnMultiplier = 1.03;
        this.spawnProgress = 0; // keeping track of how far we are along spawning Person
        this.percentSpawnProgress = 0;

        this.season = Seasons.SUMMER;


        // we're going to use these numbers to change the food and wood consumption of the population accordingly
        this.foodConsumption = 1;
        this.woodConsumption = 1;

    }
    seasonMultiplier(summerMult, winterMult){
        if (this.season === "Summer"){
            this.seasonMult *= summerMult;
        }
        if (this.season === "Winter"){
            this.seasonMult *= "placeholder" * summerMult;
        }
    }

}