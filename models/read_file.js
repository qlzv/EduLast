const fs = require('fs');
async function readAndProcessFile(filePath) {
try {
const data = await fs.promises.readFile(filePath, 'utf8');
const subjects = JSON.parse(data);
return subjects;
} catch (error) {
console.error('Error reading or parsing the file:', error.message);
}
}

module.exports = readAndProcessFile