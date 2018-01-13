/*
* The guy who did civclicker did the game well but the organization was fucking garbage, this is the right way of
* of working with large amount of ojects, no clutter.
* Although it may seem
*/

class Resource {
    constructor(total){
        this.total = total;
        this.increment = 1; // how much each click gives us
        // here is where we keep track of our resource in and out so we can display it later as stats
        this.income = {};
        // we will dynamically get every key in here and display its value in per second format
        this.expense = {};
        this.cap = 200;
    }
    increaseCap(amount){
        this.cap += amount;
    }
    update(){
        $.each(this.income, (key, value)=> {
            // we wanna make sure we're controlling for the tick rate
            this.total += tickValue(key.total * value);
        });
    }

    get workers(){
        return Object.keys(this.income);
    }
    getIncome(obi){

    }
    addIncome(obj){
        // this is going to get triggered by the generators when the amount is less than

        if (this.workers.contains(obj)){
            this.income[obj] ++;
        }
        else{
            this.income[obj] = 1;
        }
    }
    addExpense(obj){
        if (this.workers.contains(obj)){
            this.expense[obj] ++;
        }
        else {
            this.expense[obj] = 1;
        }
    }

}

class Food extends Resource {
    constructor(total){
        super(total);
        // we're just assigning workers
        this.income = {
            foodWorker: 0
        }
    }
}

class Wood extends Resource {
    constructor(total){
        super(total);
        this.income = {
            woodWorker: 0
        }
    }
}

class Stone extends Resource {
    constructor(total){
        super(total);
        this.income = {
            stoneWorker: 0
        }
    }
}