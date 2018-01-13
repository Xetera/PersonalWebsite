class Upgrades {
    constructor() {
        this.totalUpgrades = 0;
        this.availableUpgrades = 0;
        this.purchased = 0;
        this.displayList = {}; // we will dynamically add new elements into this as they get created
        this.allUpgrades = [];
    }
    get amount(){
        return Object.keys(this.displayList).length;
    }
    display(name){
        this.displayList[name] = allUpgrades[name];
        let upgrade = this.displayList[name];
        // creating a new element dynamically
        let newUpgrade = $(
            `<div id="${name}" class="upgrade" aria-label="${upgrade.description}" onclick="allUpgrades['${name}'].run()">
                <img src="${upgrade.icon}" class="upgrade-image">
                <div class="upgrade-text unselectable">${name}</div>
                <img src="images/book.png" class="upgrade-image">
                <div class="unselectable upgrade-text">${upgrade.cost}
                <span class="upgrade-text unselectable">Knowledge</span></div>
            </div>`
        );
        newUpgrade.appendTo($('#upgrades'));
    }

    purchaseUpgrade(name){
        this.purchased += 1;
        delete this.displayList[name];
        let upgrade = document.getElementById(name);
        // lets add an an animation to this before we remove it from the DOM so it looks nicer
        upgrade.remove();

    }
}

let allUpgrades = {
    'Blessing of The Hunt': {
        name: 'Blessing of The Hunt', // technically not necessary but it makes parsing easier
        icon: 'images/UpgradeIcons/javelin-throw.png',
        description:
            'Your tribe is blessed with the gift of bountiful hunts by gods that do not yet exist.\n' +
            'Every hunter generates 0.02 more Food.',
        cost: 10,
        run: function() {
            console.log(this.name);
            // doing this until knowledge is implemented
            console.log(`Upgrade bought ${this.name}`);
            /*
            if (food.total < this.cost) {
                return;
            }
            */
            food.total -= this.cost;
            hunter.mult += 0.02;
            upgrades.purchaseUpgrade(this.name);
        }
    },
    'Blessing of Fertility':{
        name: 'Blessing of Fertility',
        icon: 'images/UpgradeIcons/family.png',
        description:
            'Your tribe is blessed with the gift of increased fertility by gods that do not yet exist.<br/>' +
            '20% faster citizen creation.',
        cost: 10,
        run: function(){
            empire.spawnMultiplier = empire.spawnMultiplier - (empire.spawnMultiplier * 0.2);
            empire.spawnInterval -= empire.spawnInterval*0.2
        }
    }
};
