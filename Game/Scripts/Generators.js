class Generator {
    // these values will almost all be overridden
    constructor(name, multiplier){
        this.name = name; // not sure if this is even necessary
        this.total = 0;
        this.mult = multiplier;
        this.shown = false; // all generators start off hidden (kinda)
        this.displayTutorial = true;
    }

    add(amount){
        //we're checking whether we have enough unemployed people that we can assign to farming
        let multipliedAmount = generatorMult * amount;
        if (empire.unemployed - multipliedAmount < 0){
            this.total += empire.unemployed;
            empire.unemployed -= empire.unemployed;
            return;
        }
        empire.unemployed -= multipliedAmount;
        this.total += multipliedAmount;

    }

    remove(amount){
        let multipliedAmount = generatorMult * amount;
        if (this.total - multipliedAmount < 0){
            this.total -= this.total;
            empire.unemployed += this.total;
            return;
        }
        this.total -= multipliedAmount;
        empire.unemployed += multipliedAmount;

    }
}

class Hunter extends Generator{
    constructor(){
        super("hunter", 1.05)
    }
    toFarmer(){
        this.mult += 0.2;
        this.name = farmer;
    }

}


class Farmer extends Generator{
    constructor(){
        super("farmer", 1.2); // values subject to change
    }
}

class Lumberjack extends Generator {
    constructor(){
        super("lumberjack", 1.0);
    }
}

class Miner extends Generator {
    constructor(){
        super('miner', 1.0);
    }
}
