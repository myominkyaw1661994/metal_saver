const ReadExcelData = require('./src/readdata/readdatafromexcel');
const AutoSave = require('./src/autosave');
const ReadAndWriteJson = require('./src/readdata/readjsondata');
const WriteDataToExcel = require('./src/readdata/writeDataToExcel');


// const wirteDataToExcel = new WriteDataToExcel();
// wirteDataToExcel.wirteDataToExcel("", "test", [
//     {
//         "name": "test",
//         "type": "A",
//         "value": "model"
//     },
//     {
//         "name": "test one",
//         "type": "B",
//         "value": "model"
//     },
//     {
//         "name": "test two",
//         "type": "C",
//         "value": "model"
//     },
// ])


// const read = new ReadExcelData();
// read.readMasterClientData();
// const readAndWriteJson = new ReadAndWriteJson();



// const goldPircePerOzInSGD = 3730.75;
// const silverPircePerOzInSGD = 41.24;
// const platinumPircePerOzInSGD = 1307.6;


// const autosave = new AutoSave();
// autosave.setAutoSaveData({"id": "1000", "name": "Mg Mg"});
// autosave.setCurrentMetalPrice({
//     "XAGUSD.GSW": goldPircePerOzInSGD,
//     "XAUUSD.GSW": silverPircePerOzInSGD,
//     "XPTUSD.GSW": platinumPircePerOzInSGD
// });
// autosave.saveMetal();