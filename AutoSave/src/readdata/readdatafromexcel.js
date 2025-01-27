const XLSX = require('xlsx')
const path = require('path')
const fs = require('fs')

class ReadExcelData{
    constructor(){
        const target_dir = path.dirname(__dirname, '../');
        this.filepath = path.join(target_dir, '/data/saved NAS GSAP Database 20240603.xlsm');
        this.jsonfilepath = path.join(target_dir, '/json/');
        console.log(this.filepath);
    }


    readTransction() {
        const workbook = XLSX.readFile(this.filepath)
        const worksheet = workbook.Sheets["Statement for Current Mth"]
        const range = {
            s: { c: 0, r: 44 },
            // e: { c: XLSX.utils.decode_range(worksheet['!ref']).e.c, r: XLSX.utils.decode_range(worksheet['!ref']).e.r }
            e: { c: XLSX.utils.decode_range(worksheet['!ref']).e.c, r: 59 }
        }

        const options = { header: 1, range: range }; // Use header: 1 to read all cells without predefined headers
        const rows = XLSX.utils.sheet_to_json(worksheet, options);
        
        const keys = rows[0]; 
        const data = rows.slice(1);

        const objects = data.map(row => {
            const obj = {};
            keys.forEach((key, index) => {
                let value = row[index] || null;
                
                // Format dates
                if (value && key === "Date") {
                    const date = new Date(Math.round((value - 25569) * 86400 * 1000));
                    value = date.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                    });
                }
                if (value && key === "Month") {
                    const monthDate = new Date(Math.round((value - 25569) * 86400 * 1000));
                    value = monthDate.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "short",
                    });
                }

                // Format numbers
                if (value && key === "Ounces") {
                    value = parseFloat(value).toFixed(4);
                }
                if (value && key === "Gram") {
                    value = parseFloat(value).toFixed(4);
                }
                if (value && key === "Debit") {
                    value = `$${parseFloat(value).toFixed(2)}`;
                }
                if (value && key === "Cash Balance") {
                    value = `$${Math.abs(parseFloat(value)).toFixed(2)}`;
                }
                if (value && key === "Accumulated Ounces") {
                    value = parseFloat(value).toFixed(4);
                }
                if (value && key === "Accumulated Grams") {
                    value = parseFloat(value).toFixed(4);
                }
                if (value && key === "Storage Charges") {
                    value = value === null ? null : parseFloat(value).toFixed(9);
                }

                    obj[key] = value;
                });
            return obj;
        });
    
        objects.forEach((obj, index) => {
            console.log(`Object ${index + 1}:`, obj); 
        });

        const transctionJson = path.join(this.jsonfilepath, '/transaction.json');
        this.writeFile(transctionJson, objects);
    }
    
    writeFile(path, objects) {
        fs.writeFile(path, JSON.stringify(objects, null, 2), err => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('Successfully wrote.');
            }
        });
    }

    readMasterClientData(){
        const workbook = XLSX.readFile(this.filepath)
        const worksheet = workbook.Sheets["Master Client List"]
        const range = {
            s: { c: 0, r: 0 },
            e: { c: XLSX.utils.decode_range(worksheet['!ref']).e.c, r: XLSX.utils.decode_range(worksheet['!ref']).e.r }
        }


        const options = { header: 1, range: range }; // Use header: 1 to read all cells without predefined headers
        const rows = XLSX.utils.sheet_to_json(worksheet, options);
        
        const keys = rows[2]; 
        const data = rows.slice(3); 
        
        const objects = data.map(row => {
            const obj = {};
            keys.forEach((key, index) => {
                let value = row[index] || null;
                
                if (value && (key === "Checking" || key === "Started?" || key === "End Date")) {
                    const date = new Date(Math.round((value - 25569) * 86400 * 1000));
                    value = date.toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                }
                
                obj[key] = value;
            });
            return obj;
        });
        

        objects.forEach((obj, index) => {
            console.log(`Object ${index + 1}.`, obj);
        })

        const masterClientJson = path.join(this.jsonfilepath, '/masterclient.json');
        this.writeFile(masterClientJson, objects);
    }    


    readMasterClientMonthlySaveAmount(){
        const workbook = XLSX.readFile(this.filepath)
        const worksheet = workbook.Sheets["June 24"]
        const range = {
            s: { c: 0, r: 0 },
            e: { c: XLSX.utils.decode_range(worksheet['!ref']).e.c, r: XLSX.utils.decode_range(worksheet['!ref']).e.r }
        }

        const options = { header: 1, range: range }; // Use header: 1 to read all cells without predefined headers
        const rows = XLSX.utils.sheet_to_json(worksheet, options);
        
        const keys = rows[2]; 
        const data = rows.slice(3); 
        
        const objects = data.map(row => {
            const obj = {};
            keys.forEach((key, index) => {
                let value = row[index] || null;
                
                if (value && key === "Funds Received Date") {
                    const date = new Date(Math.round((value - 25569) * 86400 * 1000));
                    value = date.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                    });
                }

                if (value && key === "Official Start Date") {
                    const date = new Date(Math.round((value - 25569) * 86400 * 1000));
                    value = date.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                    });
                }

                if (value && key === "Month Payment For") {
                    const monthDate = new Date(Math.round((value - 25569) * 86400 * 1000));
                    value = monthDate.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "short",
                    });
                }
                
                obj[key] = value;
            });
            return obj;
        });
        

        objects.forEach((obj, index) => {
            console.log(`Object ${index + 1}.`, obj);
        })

        const masterClientJson = path.join(this.jsonfilepath, '/masterclientmothly.json');
        this.writeFile(masterClientJson, objects);
    }    

}


module.exports = ReadExcelData;