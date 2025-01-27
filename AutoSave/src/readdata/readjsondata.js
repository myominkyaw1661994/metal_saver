const path = require('path');
const fs = require('fs');
const { json } = require('stream/consumers');

class ReadAndWriteJson {
    constructor(){
        this.jsonFileDirectory = path.join(__dirname, '..', 'json');
        this.masterClientDirectory = path.join(this.jsonFileDirectory, 'masterclient.json');
        this.masterClientMonthlyDirectory = path.join(this.jsonFileDirectory, 'masterclientmonthl.json');
        this.transactionDirectory = path.join(this.jsonFileDirectory, 'transaction.json');
    }

    readAutoSaveData(){
        let masterClientsJson = this.readJsonFile(this.masterClientDirectory)
        let masterClientsMonthlyJson = this.readJsonFile(this.masterClientMonthlyDirectory)
        let transactionClientsJson = this.readJsonFile(this.transactionDirectory);

        return {
            "masterClient" : masterClientsJson,
            "masterClientMonthly" : masterClientsJson,
            "transactionClients" : transactionClientsJson
        }
    }

    readJsonFile(filePath) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf-8'); // Read file content as a string
            const jsonData = JSON.parse(fileData); // Parse the JSON string into an object/array
            return jsonData;
        } catch (error) {
            console.error(`Error reading or parsing the JSON file: ${error.message}`);
            throw error; // Re-throw the error for the caller to handle
        }
    }

    writeObjectsToJsonFile(filePath, data) {
        try {
            if (!Array.isArray(data)) {
                throw new Error("The second parameter must be an array of objects.");
            }
  
            let existingData = [];
            if (fs.existsSync(filePath)) {
                const fileData = fs.readFileSync(filePath, 'utf-8');
                try {
                    existingData = JSON.parse(fileData); // Parse existing JSON data
                } catch (parseError) {
                    console.error("Existing JSON file is not valid, starting with an empty array.");
                }
            }

            existingData = existingData.concat(data);
            const jsonData = JSON.stringify(existingData, null, 2);
            fs.writeFileSync(this.masterClientDirectory, jsonData, 'utf-8');
            console.log(`Successfully wrote ${data.length} objects to ${this.masterClients}`);
        } catch (error) {
            console.error(`Error writing to JSON file: ${error.message}`);
            throw error;
        }
    }

}


module.exports = ReadAndWriteJson;