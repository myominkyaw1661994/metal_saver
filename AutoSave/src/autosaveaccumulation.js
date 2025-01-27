
const AutoSave = require('./autosave');

class Accumulator {
    constructor(logger) {
      this.logger = logger || console;
    }
    
    makeAccumulate(){
        //add data to the database.
    }

    log(message) {
      this.logger.log(`[Auto SaveAccumulator]: ${message}`);
    }
  }
  
  
class AutoSaveAccumulator extends Accumulator {
    constructor(depositHandler, metalHandler, soldHandler, withdrawHandler, storageFeeHander, logger) {
      super(logger);
      this.depositHandler = depositHandler;
      this.metalHandler = metalHandler;
      this.soldHandler = soldHandler;
      this.withdrawHandler = withdrawHandler;
      this.storageFeeHander = storageFeeHander;
    }
  
    cashDepositToAutoSave(amount, currency) {
      this.log("Performing cash deposit...");
      this.depositHandler.deposit(amount, currency);
    }
  
    saveMetal(autoSaveData, price) {
      this.log("Saving metal...");
      this.metalHandler.save(autoSaveData, price);
    }
  
    soldMetal(metal, amount) {
      this.log(`Selling ${amount} units of ${metal}...`);
      this.soldHandler.sell(metal, amount);
    }

    storageFee(){
      this.log("Handling storage fee...");
      this.storageFeeHander.calculateStorageFee('GOLD', 10);
    }
  
    withdrawMoneyAutoSave(amount) {
      this.log(`Withdrawing money: ${amount}...`);
      this.withdrawHandler.withdrawMoney(amount);
    }
  
    withdrawMetalAutoSave(metal, amount) {
      this.log(`Withdrawing metal: ${metal}, Amount: ${amount}...`);
      this.withdrawHandler.withdrawMetal(metal, amount);
    }
}
  
  

module.exports = AutoSaveAccumulator;
