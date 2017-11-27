class Empire {
    constructor(){
        this.population = 0;
        this.maxPopulation = 5;
        this.sick = 0;
        this.spawnInterval = 1; // we can adjust this number to increase (or decrease) the rate at which people are born
        this.spawnProgress = 0; // keeping track of how far we are along spawning Person
        this.percentSpawnProgress = 0;
    }
}