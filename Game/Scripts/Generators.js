class Generator {
    // these values will almost all be overridden
    constructor(name,multiplier){
        this.name = name; // not sure if this is even necessary
        this.total = 0;
        this.mult = multiplier;
        this.shown = false; // all generators start off hidden (kinda)
        this.displayTutorial = true;
    }

    add(amount){
        //we're checking whether we have enough unemployed people that we can assign to farming
        if (empire.unemployed - amount < 0){
            return;
        }
        empire.unemployed -= amount;
        this.total += amount;

    }

    remove(amount){
        if (this.total > 0){
            this.total -= amount;
            empire.unemployed += amount;
        }
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

