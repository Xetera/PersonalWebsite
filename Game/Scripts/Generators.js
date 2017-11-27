class Generator {
    // these values will almost all be overridden
    constructor(multiplier, cost){
        this.total = 0;
        this.mult = multiplier;
        this.cost = cost;
        this.shown = false; // all generators start off hidden
    }
}

class Farmer extends Generator{
    constructor(){
        super(0.1, 10); // values subject to change
    }
    // should have an addPerson method here that adds to population
}

class Lumberjack extends Generator {
    constructor(){
        super(0.1,10);
    }
}

