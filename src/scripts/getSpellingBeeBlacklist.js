const axios = require('axios');
const { load } = require('cheerio');

const words = require('../data/spellingBee.json');

function getSpellingBeeResults(letters) {
  return words.filter((word) => {
    // Filter out words that don't inckude the required letter.
    if (!word.includes(letters[0])) {
      return false;
    }

    // Filter out words that contain invalid letters.
    return word.split('').every((letter) => letters.includes(letter));
  });
}

function getBlacklistedWordsForPuzzle({ answers, validLetters }) {
  const superset = getSpellingBeeResults(validLetters);
  return superset.filter((word) => !answers.includes(word));
}

/**
 * Cross-reference answers with master list to see any need to be added.
 */
function getMissingAnswers({ answers }) {
  return answers.filter((answer) => !words.includes(answer));
}

/**
 * Get the blacklisted
 */
async function getSpellingBeeBlacklist() {
  const res = await axios.get('https://www.nytimes.com/puzzles/spelling-bee');

  const $ = load(res.data);

  let gameData = '';
  $('script').each((_, elem) => {
    const script = elem.children[0]?.data;
    if (script?.indexOf('gameData') > -1) {
      gameData = script.replace('window.gameData = ', '');
    }
  });

  const { lastWeek = [], thisWeek = [] } = JSON.parse(gameData).pastPuzzles;

  // Generate blacklist for available data and cross-check answers for any that
  // are missing from master list.
  let blacklist = [];
  let whitelist = [];

  [...lastWeek, ...thisWeek].forEach((puzzle) => {
    blacklist = [...blacklist, ...getBlacklistedWordsForPuzzle(puzzle)];
    whitelist = [...whitelist, ...getMissingAnswers(puzzle)];
  });

  return { blacklist, whitelist };
}

module.exports = getSpellingBeeBlacklist;
