class Wallet {
    constructor(id, gold, silver, platinum, usd, sgd) {
        this.accounts = {
           id,
           GOLD: gold,
           SILVER: silver,
           PLATINUM: platinum,
           USD: usd,
           SGD: sgd 
        }
    }

    


    deposit(metal, amount) {
        if (amount <= 0) {
            throw new Error("Invalid amount");
        }
        //check the metal type
        if (!Object.keys(this.accounts).includes(metal)) {
            throw new Error("Invalid metal type");
        }

        this.accounts[metal] += amount;
    }

    //write withdraw function
    withdraw(metal, amount) {
        if (amount <= 0) {
            throw new Error("Invalid amount");
        }
        //check the metal type
        if (!Object.keys(this.accounts).includes(metal)) {
            throw new Error("Invalid metal type");
        }

        this.accounts[metal] -= amount;
    }

    makeLog(){
        //TODO: make logger for the wallet
    }

    transferWalletToWallet(from, to) {
        //TODO: check form and to is valid
    }

    makeTransaction(){
        //TODO: create transaction
    }
}

module.exports = Wallet;