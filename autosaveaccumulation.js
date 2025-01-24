
const AutoSave = require('./autosave');
const Wallet = require('./wallet');

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
  
  // Logger class for extensibility
class Logger {

    constructor(name){
       this.name = name
    }


    log(message) {
        let fileName = 'default.log';
        if(this.name == 'AutoSave'){
            fileName = 'autosave.log'
        }
    }


    writeToFile(fileName, message){

    }
}
  
class AutoSaveAccumulator extends Accumulator {
    constructor(autoSave, depositHandler, metalHandler, soldHandler, withdrawHandler, logger) {
      super(logger);
      this.autoSave = autoSave;
      this.depositHandler = depositHandler;
      this.metalHandler = metalHandler;
      this.soldHandler = soldHandler;
      this.withdrawHandler = withdrawHandler;
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
  
    withdrawMoneyAutoSave(amount) {
      this.log(`Withdrawing money: ${amount}...`);
      this.withdrawHandler.withdrawMoney(amount, this.autoSave.autoSave);
    }
  
    withdrawMetalAutoSave(metal, amount) {
      this.log(`Withdrawing metal: ${metal}, Amount: ${amount}...`);
      this.withdrawHandler.withdrawMetal(metal, amount, this.autoSave.autoSave);
    }
}
  
class DepositHandler {
    deposit(amount, currency) {
      console.log(`Deposited ${amount} ${currency}`);
    }
}
  
class MetalHandler {
    save(autoSave) {
      console.log(autoSave);
      console.log("Metal saved successfully.");
    }
}
  
class SoldHandler {
    sell(metal, amount, autoSave) {
        console.log(`Sold ${amount} units of ${metal}`);
    }
}
  
class WithdrawHandler {
    withdrawMoney(amount, autoSave) {
        console.log(`Withdrew ${amount} units of currency.`);
    }

    withdrawMetal(metal, amount, autoSave) {
        console.log(`Withdrew ${amount} units of ${metal}`);
    }
}
  

module.exports = {
    Logger,
    AutoSaveAccumulator,
    MetalHandler,
    SoldHandler,
    DepositHandler,
    WithdrawHandler 
}
