class Upgrades {
    constructor() {
        this.totalUpgrades = 0;
        this.availableUpgrades = 0;
        this.purchased = 0;
        this.displayList = {}; // we will dynamically add new elements into this as they get created
        this.allUpgrades = [];
    }

    display(name, upgrade){
        this.displayList[name] = upgrade;
        // creating a new element dynamically
        let newUpgrade = $(
            `<tr id="${name}" class="upgrade" title="${upgrade.description}">
                <td><img src="${upgrade.icon}" class="icon"></td>
                <td>${name}</td>
                <td><img src="images/book.png" class="icon" style="margin-right: 10px;"></td>
                <td>${upgrade.cost}</td>
            </tr>`
        );
        newUpgrade.appendTo($('#upgradeTable'));
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
