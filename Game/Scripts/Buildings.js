class Building {
    constructor(support, strength){
        this.total = 0; // total always 0 because class only get initialized once in the beginning
        this.support = support;
        this.strength = strength;
    }
}

// it looks useless now but we're gonna be using inheritence with more things later on
// super( support = a , strength = b )

class Shack extends Building {
    constructor(){
        super(1,1); // construction of superclass
    }
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
