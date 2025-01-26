const path = require('path');
const fs = require('fs');

// Logger class for extensibility
class Logger {
    constructor(name) {
        this.name = name;
        this.path = path.join(__dirname, '..', 'log');

        // Ensure the log directory exists
        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.path, { recursive: true });
        }
    }

    log(message) {
        let fileName = 'default.log';
        if (this.name === 'AutoSave') {
            fileName = 'autosave.log';
        }
        
        const timeStampedMessage = `${new Date().toISOString()} - ${message}`;
        this.writeToFile(fileName, timeStampedMessage);
    }

    writeToFile(fileName, message) {
        const filePath = path.join(this.path, fileName);

        // Append the message to the log file
        fs.appendFile(filePath, message + '\n', (err) => {
            if (err) {
                console.error(`Failed to write to log file ${fileName}:`, err);
            }
        });
    }
}

module.exports = Logger;