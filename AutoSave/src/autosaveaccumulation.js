
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
    constructor(autoSave, depositHandler, metalHandler, soldHandler, withdrawHandler, storageFeeHander, logger) {
      super(logger);
      this.autoSave = autoSave;
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
  
    saveMetal() {
      this.log("Saving metal...");
      this.metalHandler.save(this.autoSave.autoSave);
    }
  
    soldMetal(metal, amount) {
      this.log(`Selling ${amount} units of ${metal}...`);
      this.soldHandler.sell(metal, amount, this.autoSave.autoSave);
    }

    storageFee(){
      this.log("Handling storage fee...");
      this.storageFeeHander.calculateStorageFee('GOLD', 10);
    }
  
    withdrawMoneyAutoSave(amount) {
      this.log(`Withdrawing money: ${amount}...`);
      this.withdrawHandler.withdrawMoney(amount, this.autoSave.autoSave);
    }
  
    withdrawMetalAutoSave(metal, amount) {
      this.log(`Withdrawing metal: ${metal}, Amount: ${amount}...`);
      this.withdrawHandler.withdrawMetal(metal, amount, this.autoSave.autoSave);
    }
}
  
  

module.exports = AutoSaveAccumulator;
