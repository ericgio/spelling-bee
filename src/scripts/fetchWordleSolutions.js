const axios = require('axios');
const { addDays, format, parseISO } = require('date-fns');

const wordleSolutions = require('../data/wordle-solutions.json');

const MAX_DATE = format(addDays(new Date(), -1), 'yyyy-MM-dd');
const MIN_DATE = '2021-06-19';

const API_URL = 'https://www.nytimes.com/svc/wordle/v2';

async function fetchWordleSolutions() {
  const solutions = wordleSolutions || [];

  let date = MIN_DATE;
  while (date <= MAX_DATE) {
    const nextDate = format(addDays(parseISO(date), 1), 'yyyy-MM-dd');

    // Skip fetching solutions for dates we already have.
    if (solutions.find((s) => s.print_date === date)) {
      date = nextDate;
      continue;
    }

    const { data } = await axios.get(`${API_URL}/${date}.json`);
    console.log(`Fetched solution for ${date}`);
    solutions.push(data);

    // Increment the date.
    date = nextDate;
  }

  return solutions;
}

module.exports = fetchWordleSolutions;
