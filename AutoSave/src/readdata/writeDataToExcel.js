const path = require('path');
const XLSX = require('xlsx');


class WriteDataToExcel {
    constructor(){
        this.writeFilePath = path.join(__dirname, '..', 'output/result.xlsm');
    }
    

    wirteDataToExcel(filePath, sheetName, data){
        try {
            if (!Array.isArray(data)) {
                throw new Error("The second parameter must be an array of objects.");
            }

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
            XLSX.writeFile(workbook, this.writeFilePath);
            console.log(`Successfully wrote data`);
        } catch (error) {
            console.error(`Error writing data to Excel file: ${error.message}`);
            throw error; 
        }
    }


}

module.exports = WriteDataToExcel;