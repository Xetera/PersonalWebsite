class Upgrades {
    constructor() {
        this.totalUpgrades = 0;
        this.purchased = 0;
        this.newUpgrades = 0;
        this.availableUpgrades = [];
        this.displayedDOMElements = [];
        this.notification = `<div id="notification-circle"></div>`
    }

    get amount(){
        return Object.keys(this.availableUpgrades).length;
    }

    findUpgradeDOM(id){
        let upgrade = this.availableUpgrades[this.availableUpgrades.findIndex(e=> e.id === id)];
        if (upgrade)
            return $(upgrade);
        else
            return -1;
    }

    display(selector){
        let upgrade;
        if (typeof selector === 'number')
            upgrade = allUpgrades[allUpgrades.findIndex(e=> e.id === selector)];
        else if (typeof selector === 'string')
            upgrade = allUpgrades[allUpgrades.findIndex(e=> e.name === selector)];

        this.availableUpgrades.push(upgrade);
        // creating a new element dynamically
        let newUpgrade = $(
            `<div id="upgrade${upgrade.id}" class="upgrade" aria-label="${upgrade.id}">
                <img src="${upgrade.icon}" class="upgrade-image">
                <div class="upgrade-text unselectable">${upgrade.name}</div>
                <img src="images/knowledge.png" class="upgrade-image">
                <div class="upgrade-text unselectable">${upgrade.cost}<span class="upgrade-text unselectable">Knowledge</span></div>
            </div>`
        );
        newUpgrade.appendTo($('#upgrades'));
        this.displayedDOMElements.push(newUpgrade);
        // if the upgrades tab isn't open we want to send a notification about the new available upgrade
        if (!upgradesIsOpen()){
            this.newUpgrades++;
            this.fireUpgradeNotification(newUpgrade);
        }
    }

    buy(id){
        const upgrade = this.availableUpgrades.findIndex(e=> e.id===id);
        if (!upgrade) return;
        upgrade.run();
        this.purchaseUpgrade(id)
    }

    purchaseUpgrade(id){
        this.purchased += 1;
        let upgrade = $('#upgrade' + id);
        // lets add an an animation to this before we remove it from the DOM so it looks nicer
        upgrade.remove();
    }
    update(){
        for (let i in this.availableUpgrades){
            let upgrade = this.findUpgradeDOM(this.availableUpgrades[i].id);

        }
    }
    fireUpgradeNotification(upgrade=null){
        if (upgrade){
            upgrade.addClass('glow');
        }
        let handle = $('#upgrade-handle');
        if (!handle.hasClass('gradient-flow')) handle.addClass('gradient-flow');

        if (!handle.children().length > 0){
            $(this.notification).appendTo(handle).html(this.newUpgrades.toString());
        }
        else if (handle.children().length > 0){
            $('#notification-circle').html(this.newUpgrades.toString());
        }
    }
    removeUpgradeNotification(element){
        let handle = $('#upgrade-handle');
        let notifications = $('#notification-circle');
        this.newUpgrades--;
        $(element).removeClass('glow');
        if (this.newUpgrades === 0){
            this.resetUpgradeNotifications();
            return;
        }
        notifications.html(this.newUpgrades.toString());
    }

    resetUpgradeNotifications(){
        let handle = $('#upgrade-handle');
        handle.removeClass('gradient-flow');
        $('#notification-circle').remove();
    }
}

let allUpgrades = [
    {
        id: 1,
        name: "Curiousity",
        icon: "images/UpgradeIcons/unemployed.svg",
        story: "It's a great world out there, who knows what could become of it.",
        effect: "+0.1 Knowledge/s",
        costs: {
            food: 100
        },
        run: function(){}
    },
    {
        id: 2,
        name: 'Blessing of The Hunt',
        icon: 'images/UpgradeIcons/javelin-throw.png',
        story: 'Your tribe is blessed with the gift of bountiful hunts by gods that do not yet exist.',
        effect: 'Hunters collect +0.02 Food',
        costs: {
            knowledge: 1000,
            food: 10,
            wood: 10,
            stone: 10
        },
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
    {
        id: 3,
        name: 'Blessing of Fertility',
        icon: 'images/UpgradeIcons/family.png',
        story:'Your tribe is blessed with the gift of increased fertility by gods that do not yet exist',
        effect:'Population increases 20% faster.',
        costs: {
            knowledge: 10
        },
        run: function(){
            empire.spawnMultiplier = empire.spawnMultiplier - (empire.spawnMultiplier * 0.2);
            empire.spawnInterval -= empire.spawnInterval*0.2
        }
    },

    {
        id: 5,
        name: "Farsight",
        icon: 'images/UpgradeIcons/farsight.gif',
        story: "Your tribe is now better at anticipating events and outcomes",
        effect: "You can now see upcoming upgrades and events",
        costs: {
            knowledge: 10
        },
        run: function(){}
    }
];

for (let i in allUpgrades){
    allUpgrades[i].type = 'upgrade';
}