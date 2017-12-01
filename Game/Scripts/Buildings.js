class Building {
    constructor(support, strength){
        this.total = 0; // total always 0 because class only get initialized once in the beginning
        this.support = support;
        this.strength = strength;
        this.foodCost = null;
        this.woodCost = null;
        this.stoneCost = null;
    }
}

// it looks useless now but we're gonna be using inheritence with more things later on
// super( support = a , strength = b )

class Tent extends Building {
    constructor(){
        super(1,1); // construction of superclass
        this.foodCost = 3;
        this.woodCost = 5;
    }

}

function buyTent(amount) {
    if (food.total < tent.foodCost || wood.total < tent.woodCost) {
        return;
    }
    tent.total += amount;

    empire.maxPopulation += tent.support;

    food.total -= tent.foodCost;
    wood.total -= tent.woodCost;

    tent.woodCost *= 1.05;
    tent.foodCost *= 1.02;
}
class Hut extends Building{
    constructor(){
        super(2,2);
    }
}

class House extends Building{
    constructor() {
        super(3,3);
    }
}
