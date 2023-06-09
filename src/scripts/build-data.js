const fs = require('fs');

const fetchWordleSolutions = require('./fetchWordleSolutions');
const getSpellingBeeBlacklist = require('./getSpellingBeeBlacklist');

const raw = require('../data/raw.json');
const _blacklist = require('../data/sb-blacklist.json');

function normalizeArray(arr) {
  return Array.from(new Set(arr))
    .map((word) => word.toLowerCase())
    .filter((word) => !!word)
    .sort();
}

async function buildData() {
  // Read .txt files, convert to array, and normalize.
  // const rawStr = fs.readFileSync('./src/data/raw.txt', 'utf8');
  // const rawArr = normalizeArray(rawStr.split('\r\n'));

  // Fetch available puzzle answers and diff against the generated list.
  const { blacklist, whitelist } = await getSpellingBeeBlacklist();
  const blacklistArr = normalizeArray([..._blacklist, ...blacklist]);

  // Create word lists for Spelling Bee & Wordle.
  const spellingBee = raw.filter(
    (word) =>
      // Valid words are between 3 and 20 letters
      word.length > 3 &&
      word.length < 20 &&
      // The letter 'S' is always excluded
      !word.includes('s') &&
      // Only include curated words
      !blacklistArr.includes(word)
  );

  // Write data to .json files
  // fs.writeFileSync('./src/data/raw.json', JSON.stringify(rawArr));
  fs.writeFileSync(
    './src/data/sb-blacklist.json',
    JSON.stringify(blacklistArr)
  );
  fs.writeFileSync(
    './src/data/spellingBee.json',
    JSON.stringify(normalizeArray([...spellingBee, ...whitelist]))
  );

  const wordle = raw.filter((word) => word.length === 5);
  fs.writeFileSync('./src/data/wordle.json', JSON.stringify(wordle));

  // Fetch Wordle solutions and update static data.
  const solutions = await fetchWordleSolutions();
  fs.writeFileSync(
    './src/data/wordle-solutions.json',
    JSON.stringify(solutions)
  );
}

buildData();
