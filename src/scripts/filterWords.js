const fs = require('fs');

const wordList = require('../data/raw.json');
const blacklist = require('../data/sb-blacklist.json');

// Spelling Bee
const spellingBee = wordList.filter(
  (word) =>
    // Valid words are between 3 and 20 letters
    word.length > 3 &&
    word.length < 20 &&
    // Only include curated words
    !blacklist.includes(word)
);

fs.writeFileSync('./src/data/spellingBee.json', JSON.stringify(spellingBee));

// Wordle
const wordle = wordList.filter((word) => word.length === 5);

fs.writeFileSync('./src/data/wordle.json', JSON.stringify(wordle));
