const fs = require('fs');

const str = fs.readFileSync('./src/data/raw.txt', 'utf8');
const arr = str.split('\r\n').map((word) => word.toLowerCase());

const blacklist = fs.readFileSync('./src/data/sb-blacklist.txt', 'utf8');
const blArr = blacklist.split('\n').map((word) => word.toLowerCase());

// Spelling Bee
const spellingBee = arr.filter(
  (word) => word.length > 3 && word.length < 20 && !blArr.includes(word)
);

fs.writeFileSync('./src/data/spellingBee.json', JSON.stringify(spellingBee));

// Wordle
const wordle = arr.filter((word) => word.length === 5);

fs.writeFileSync('./src/data/wordle.json', JSON.stringify(wordle));
