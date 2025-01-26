  
class WithdrawHandler {
    withdrawMoney(amount, autoSave) {
        console.log(`Withdrew ${amount} units of currency.`);
    }

    withdrawMetal(metal, amount, autoSave) {
        console.log(`Withdrew ${amount} units of ${metal}`);
    }
}
  

module.exports = WithdrawHandler;