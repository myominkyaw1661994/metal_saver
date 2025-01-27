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
    constructor(autoSaveData = {}, currentMetalPrice = {}) {
        this.autoSaveData = autoSaveData;
        this.currentMetalPrice =currentMetalPrice;
        this.autoSaveAccumulator = new AutoSaveAccumulator(
            new DepositHandler(),
            new MetalSaveHandler(),
            new MetalSoldHandler(),
            new WithdrawHandler(),
            new StorageFeeHandler(),
            new Logger("AutoSave")
        );
    }

    setAutoSaveData(autoSaveData) {
        this.autoSaveData = autoSaveData; 
    }

    setCurrentMetalPrice(currentMetalPrice) {
        this.currentMetalPrice = currentMetalPrice;
    }

    getAutoSave(){
        return this.autoSaveData;
    }

    saveMetal() {
        this.autoSaveAccumulator.saveMetal(this.autoSaveData, this.currentMetalPrice);
    }
}


module.exports = AutoSave;