const fs = require('fs');

const fetchWordleSolutions = require('./fetchWordleSolutions');
const getSpellingBeeBlacklistToday = require('./getSpellingBeeBlacklist');

function normalizeArray(arr) {
  return arr
    .map((word) => word.toLowerCase())
    .filter((word) => !!word)
    .sort();
}

async function buildData() {
  // Read .txt files, convert to array, and normalize.
  const rawStr = fs.readFileSync('./src/data/raw.txt', 'utf8');
  const rawArr = normalizeArray(rawStr.split('\r\n'));

  // Fethc today's answer's and diff against the generated list.
  const blacklist = await getSpellingBeeBlacklistToday();
  fs.appendFileSync('./src/data/sb-blacklist.txt', blacklist.join('\n'));

  const blacklistStr = fs.readFileSync('./src/data/sb-blacklist.txt', 'utf8');
  const blacklistArr = normalizeArray(blacklistStr.split('\n'));

  // Create word lists for Spelling Bee & Wordle.
  const spellingBee = rawArr.filter(
    (word) =>
      // Valid words are between 3 and 20 letters
      word.length > 3 &&
      word.length < 20 &&
      // The letter 'S' is always excluded
      !word.includes('s') &&
      // Only include curated words
      !blacklistArr.includes(word)
  );

  const wordle = rawArr.filter((word) => word.length === 5);

  // Write data to .json files
  fs.writeFileSync('./src/data/raw.json', JSON.stringify(rawArr));
  fs.writeFileSync(
    './src/data/sb-blacklist.json',
    JSON.stringify(blacklistArr)
  );
  fs.writeFileSync('./src/data/spellingBee.json', JSON.stringify(spellingBee));
  fs.writeFileSync('./src/data/wordle.json', JSON.stringify(wordle));

  // Fetch Wordle solutions and update static data.
  const solutions = await fetchWordleSolutions();
  fs.writeFileSync(
    './src/data/wordle-solutions.json',
    JSON.stringify(solutions)
  );
}

buildData();
