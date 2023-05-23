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

/**
 * Get the blacklisted
 */
async function getSpellingBeeBlacklist() {
  const { data } = await axios.get(
    'https://www.nytimes.com/puzzles/spelling-bee'
  );

  const $ = load(data);

  let gameData = '';
  $('script').each((_, elem) => {
    const script = elem.children[0]?.data;
    if (script?.indexOf('gameData') > -1) {
      gameData = script.replace('window.gameData = ', '');
    }
  });

  const { answers, centerLetter, outerLetters } = JSON.parse(gameData).today;
  const letters = [centerLetter, ...outerLetters].join('');

  const superset = getSpellingBeeResults(letters);
  return superset.filter((word) => !answers.includes(word));
}

module.exports = getSpellingBeeBlacklist;
