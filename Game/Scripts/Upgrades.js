class Upgrades {
    constructor(){
        this.totalUpgrades = 0;
        this.availableUpgrades = 0;
        this.purchasedUpgrades = 0;
        this.upgrades = {}
    }

    public newUpgrade(name, description, upgradeAmount) {
        this.upgrades[name] = {};
        // I have no idea how I'm gonna make this work
        this.upgrades[name]['object'] = $('<td id=' + name + '>' + description + '</td>');
        // obv this will be different once it's working

        this.upgrades[name].appendTo('#upgradeTable');
        this.availableUpgrades += 1;
        this.totalUpgrades += 1;
    }

    public purchaseUpgrade(name){
        this.purchasedUpgrades += 1;
        delete this.upgrades[name];// <- this shit alone doesn't work. I have to delete the child of #upgradeTable
    }
}