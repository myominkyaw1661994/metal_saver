const {
    Logger, 
    AutoSaveAccumulator,
    MetalHandler, 
    SoldHandler, 
    DepositHandler, 
    WithdrawHandler
}  = require('./autosaveaccumulation')


class AutoSave {
    constructor(autoSave = {}) {
        this.autoSave = autoSave;
        this.autoSaveAccumulator = new AutoSaveAccumulator(
            this,
            new DepositHandler(),
            new MetalHandler(),
            new SoldHandler(),
            new WithdrawHandler(),
            new Logger("AutoSvae")
        );
    }

    setAutoSave(autoSave) {
        // if (!Array.isArray(autoSave)) {
        //     throw new Error("Invalid auto save");
        // }

        // if (autoSave.length === 0) {
        //     throw new Error("Auto save is empty");
        // }
        
        this.autoSave = autoSave; 
    }

    static createNewAutoSave(){

    }

    getAutoSave(){
        return this.autoSave;
    }

    updateAutoSave(){
        this.autoSaveAccumulator.cashDepositToAutoSave(10, 'USD');
        this.autoSaveAccumulator.saveMetal();
        this.autoSaveAccumulator.soldMetal('GOLD', 10);
        this.autoSaveAccumulator.withdrawMoneyAutoSave(10);
        this.autoSaveAccumulator.withdrawMetalAutoSave('GOLD', 10);
        console.log("update AutoSave");
    }

    saveMetal() {
        this.autoSaveAccumulator.saveMetal();
    }
}

const autosave = new AutoSave();
autosave.setAutoSave({"a" :  1, "b" : 2});
autosave.saveMetal();