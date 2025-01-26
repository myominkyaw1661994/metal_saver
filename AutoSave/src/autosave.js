const AutoSaveAccumulator  = require('./autosaveaccumulation')
const {
    DepositHandler,
    MetalSaveHandler,
    MetalSoldHandler,
    WithdrawHandler,
    StorageFeeHandler
} = require('./handlers');
const Logger = require('./logger/logger');


class AutoSave {
    constructor(autoSave = {}) {
        this.autoSave = autoSave;
        this.autoSaveAccumulator = new AutoSaveAccumulator(
            this,
            new DepositHandler(),
            new MetalSaveHandler(),
            new MetalSoldHandler(),
            new WithdrawHandler(),
            new StorageFeeHandler(),
            new Logger("AutoSave")
        );
    }

    setAutoSave(autoSave) {
        this.autoSave = autoSave; 
    }

    getAutoSave(){
        return this.autoSave;
    }

    updateAutoSave(){
    }

    saveMetal() {
    }
}


module.exports = AutoSave;