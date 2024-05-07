const fs = require('fs')
async function deleteEntryById(sectionName, idToDelete) {
try {
const data = await fs.promises.readFile('./Test.json', 'utf-8');
const jsonData = JSON.parse(data);
const section = jsonData.find(entry => entry.hasOwnProperty(sectionName));

if (section) {
const indexToDelete = section[sectionName].findIndex(entry => entry.id === idToDelete);
if (indexToDelete !== -1) {
section[sectionName].splice(indexToDelete, 1);
console.log(`Entry with ID ${idToDelete} deleted successfully in section ${sectionName}.`);
} else {
console.log(`Entry with ID ${idToDelete} not found in section ${sectionName}.`);
}
} else {
console.log(`Section ${sectionName} not found.`);
}
await fs.promises.writeFile('./Test.json', JSON.stringify(jsonData, null, 2)); // Change this to your actual JSON file path
} catch (error) {
console.error('Error:', error.message);
}
}

module.exports = deleteEntryById