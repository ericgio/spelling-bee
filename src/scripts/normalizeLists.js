const fs = require('fs');

function normalizeArray(arr) {
  return arr
    .map((word) => word.toLowerCase())
    .filter((word) => !!word)
    .sort();
}

const rawStr = fs.readFileSync('./src/data/raw.txt', 'utf8');
const rawArr = normalizeArray(rawStr.split('\r\n'));

fs.writeFileSync('./src/data/raw.json', JSON.stringify(rawArr));

const blStr = fs.readFileSync('./src/data/sb-blacklist.txt', 'utf8');
const blArr = normalizeArray(blStr.split('\n'));

fs.writeFileSync('./src/data/sb-blacklist.json', JSON.stringify(blArr));
