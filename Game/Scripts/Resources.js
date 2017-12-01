/*
* The guy who did civclicker did the game well but the organization was fucking garbage, this is the right way of
* of working with large amount of ojects, no clutter.
* Although it may seem
*/

class Resource {
    constructor(total){
        this.total = total;
        this.increment = 1;
        // here is where we keep track of our resource in and out so we can display it later as stats

        this.income = {};
        // we will dynamically get every key in here and display its value in per second format
        this.expense = {};
    }
    gather(){
        // it's a good idea to convert the calculations of every resource gain within its class rather than runtime
    }
}
